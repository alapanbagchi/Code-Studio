import ast
import json
import time
import traceback

def twosum(nums, target):
    while(True):
        pass
OUTPUT = None
EXCEPTION = None
EXPECTED_OUTPUT = ast.literal_eval("[0, 1]")
start = time.time()
try:
    if time.time() - start > 10:
        raise Exception({
            "type": "TimeoutException",
            "message": "Execution timed out after 10 seconds",
        })
    OUTPUT = twosum(ast.literal_eval("[2, 7, 11, 15]"),ast.literal_eval("9"))
except Exception as e:
    tb = traceback.format_exc().splitlines()
    tb = [line for line in tb if not line.strip().startswith('File "<string>"')]
    EXCEPTION = {
        "type": type(e).__name__,
        "message": str(e),
        # Exclude 5 lines of traceback from array
        "traceback": "\n".join(tb[:4]),
    }
    print("\n".join(tb[3:]))
end = time.time()
print(json.dumps({"output": OUTPUT, "exception": EXCEPTION, "time": end - start, "passed": EXCEPTION is None and OUTPUT == EXPECTED_OUTPUT}))