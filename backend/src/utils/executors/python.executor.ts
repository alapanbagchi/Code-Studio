import Docker from 'dockerode'
import tar from 'tar-stream';
import { dataTypeConvertor } from '../dataTypeConvertor';

export const pythonExecutor = async (id, code, testCases, language, returnType) => {
    const docker = new Docker();
    const container = await docker.createContainer({
        Image: 'python:latest',
        Tty: true,
        AttachStdout: true,
        AttachStderr: true,
        OpenStdin: true,
        StdinOnce: false,
        Env: ['PYTHONUNBUFFERED=1'],
        HostConfig: {
            AutoRemove: true,
            Binds: [`/tmp:/sandbox`],
            Cmd: ['/bin/bash', '-c', 'sleep 300'],
            Memory: 256000000
        },
    });

    // > Start the container
    try {
        await container.start();
    } catch (err) {
        return { type: "ERROR", message: "Error starting container", error: err };
    }

    const allOutput = [];
    let finalCode = ""
    const functionName = id
        .toLowerCase()
        .replace(/[^a-zA-Z ]/g, '')
        .replace(/\s/g, '');
    for (const testCase of testCases) {
        const args = []
        testCase.input.map(input => {
            args.push(`ast.literal_eval(${input.type === 'string' ? `'${input.value}'` : JSON.stringify(input.value)})`)
        })
        finalCode = `import ast\nimport json\nimport time\nimport traceback\n${code}\nOUTPUT = None\nEXCEPTION = None\nEXPECTED_OUTPUT = ast.literal_eval(${testCase.output.type === 'string' ? `'${testCase.output.value}'` : JSON.stringify(testCase.output.value)})\nstart = time.time()\ntry:\n    OUTPUT = ${functionName}(${args})\nexcept Exception as e:\n    tb = traceback.format_exc().splitlines()\n    tb = [line for line in tb if not line.strip().startswith('File "<string>"')]\n    EXCEPTION = {"type": type(e).__name__, "message": str(e), "traceback": "\\n".join(tb[3:])}\nend = time.time()\nprint(json.dumps({"output": str(OUTPUT), "exception": EXCEPTION, "time": end - start, "passed": EXCEPTION is None and OUTPUT == EXPECTED_OUTPUT, "expectedOutput": str(EXPECTED_OUTPUT),  "input": ${JSON.stringify(testCase.input)}}))`
        console.log(finalCode);
        const inputStream = tar.pack();
        inputStream.entry({ name: 'code.py' }, finalCode);
        inputStream.finalize();

        await container.putArchive(inputStream, { path: '/sandbox' });
        const exec = await container.exec({
            Cmd: ['/bin/bash', '-c', `timeout 5s python /sandbox/code.py && sleep 2 && kill 1`],
            AttachStdout: true,
            AttachStderr: true,
        })
        const stream = await exec.start({ hijack: true, stdin: true, encoding: 'utf8' });
        const output: any = await new Promise((resolve, reject) => {
            let res = ''
            stream.on('data', (chunk: Buffer) => {
                res = res + chunk.toString();
            });
            stream.on('end', () => {
                resolve(res.substring(res.indexOf('{'), res.lastIndexOf('}') + 1));
            });
            stream.on('error', (err) => {
                reject(err);
            });
        });
        allOutput.push(JSON.parse(output));
    }
    container.kill();
    console.log(allOutput);
    return allOutput; 
}