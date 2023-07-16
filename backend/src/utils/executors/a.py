import ast
import json
import time
import traceback

#Do not change the function definition of the below function
code = '''
def fibonacci(n):
    if n==0:
        return []
    if n == 1:
        return [0]
    fib_sequence = [0, 1]  # Initialize the Fibonacci sequence with the base cases
    for i in range(2, n):
        fib_sequence.append(fib_sequence[i - 1] + fib_sequence[i - 2])  # Calculate the next Fibonacci number using DP
    return fib_sequence
'''
OUTPUT = None
EXCEPTION = None
EXPECTED_OUTPUT = ast.literal_eval("[0, 1, 1, 2, 3]")
start = time.time()
try:
    compiled_code = compile(code, '<string>', 'exec')
    namespace = {}
    exec(compiled_code, namespace)
    OUTPUT = namespace['fibonacci'](5)
except SyntaxError as e:
    tb = traceback.format_exc().splitlines()
    tb = [line for line in tb if not line.strip().startswith('File "<string>"')]
    EXCEPTION = {"type": type(e).__name__, "message": str(e), "traceback": "\\n".join(tb[3:])}
finally:
    end = time.time()
    print(json.dumps({"output": str(OUTPUT), "exception": EXCEPTION, "time": end - start, "passed": EXCEPTION is None and OUTPUT == EXPECTED_OUTPUT, "expectedOutput": str(EXPECTED_OUTPUT),  "input": "5"}))