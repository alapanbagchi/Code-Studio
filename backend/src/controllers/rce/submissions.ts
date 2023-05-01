import { Request, Response, Router } from "express";
import Docker from 'dockerode'
import tar from 'tar-stream';
const is_equal = require('is-equal');
function getRunCommand(language) {
    switch (language) {
        case 'c':
            return 'gcc -o /tmp/out /sandbox/code.c && /tmp/out';
        case 'cpp':
            return 'g++ -o /tmp/out /sandbox/code && /tmp/out';
        case 'java':
            return 'javac /code && java -cp /sandbox/code Program';
        case 'python':
            return 'python /sandbox/code.py';
        default:
            throw new Error('Unsupported language');
    }
}

async function getOutput(stream) {
    return new Promise((resolve, reject) => {
        let output = '';

        stream.on('data', (chunk) => {
            output += chunk.toString();
        });

        stream.on('end', () => {
            // Remove the first 8 characters from the output
            resolve(output.slice(8));
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
}

const VALID_LANGUAGES = ['c', 'cpp', 'java', 'python'];
const IMAGE_NAMES = {
    c: 'gcc:latest',
    cpp: 'gcc:latest',
    java: 'openjdk:latest',
    python: 'python:latest',
}
const EXTENSIONS = {
    c: 'c',
    cpp: 'cpp',
    java: 'java',
    python: 'py',
}

export const submissions = async (req: Request, res: Response) => {
    const { id, code, testCases, language } = req.body;
    if (!VALID_LANGUAGES.includes(language)) {
        return res.status(400).json({ type: "ERROR", message: "Invalid language" });
    }
    const docker = new Docker();
    const container = await docker.createContainer({
        Image: IMAGE_NAMES[language],
        Tty: true,
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        HostConfig: {
            AutoRemove: true,
            Binds: [`/tmp:/sandbox`],
            Cmd: ['/bin/bash', '-c', 'sleep 300'],
            OpenStdin: true,
            Memory: 256000000
        },
    });
    try {
        await container.start();
        let allOutputs = []
        const functionName = id
            .toLowerCase()
            .replace(/[^a-zA-Z ]/g, '')
            .replace(/\s/g, '');
        for (const testCase of testCases) {
            let newCode = code;
            if (language === 'python') {
                newCode = `${code}\nprint(${functionName}(${testCase.input.map(input => JSON.stringify(input.value)).join(',')}))`;
                console.log(newCode);
            }
            const inputStream = tar.pack();
            inputStream.entry({ name: 'code.py' }, newCode);
            inputStream.finalize();
            await container.putArchive(inputStream, { path: '/sandbox' });
            const exec = await container.exec({
                Cmd: ['/bin/bash', '-c', `timeout ${req.body.timeout ? req.body.timeout : 5}s ${getRunCommand(language)} < /sandbox/input.txt && sleep 2 && kill 1`],
                AttachStdout: true,
                AttachStderr: true,
            });
            const start = performance.now();
            const stream = await exec.start();
            // Use Inspect to get the exit code from stream
            const end = performance.now();
            const time = (end - start) / 1000;
            let output: any = await getOutput(stream)
            const expectedOutput = JSON.parse(testCase.output) || testCase.output;
            const inspect = await exec.inspect();
            let executionError = inspect.ExitCode !== 0;
            if (inspect.ExitCode === 0) {
                if (output.toString().charCodeAt(output.toString().length - 1) < 32) {
                    output = output.toString().slice(0, -1);
                    // Non stringified output and if it fails to parse, return the stringified output
                    output = JSON.parse(output) || output;
                }
            } else {
                output = output.toString()
            }

            // Console log the non stringified output
            allOutputs.push({
                input: testCase.input,
                output,
                expectedOutput,
                time,
                correct: is_equal(output, expectedOutput),
                executionError
            });
            // If an error occurs, break out of the loop
            if (executionError) {
                break;
            }
        }
        return res.status(200).json({
            type: "SUCCESS",
            data: allOutputs
        });
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        await container.kill()
    }
}