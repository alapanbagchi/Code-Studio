// Error parser for python. I want you to take an error message and return the type of error, the line number, and the error message.
//
// Example:
// Input:
// Traceback (most recent call last):
//   File "main.py", line 1, in <module>
//     print("Hello World")
// NameError: name 'print' is not defined
// Output:
// {
//     type: "NameError",
//     line: 1,
//     message: "name 'print' is not defined"
// }
//

export const pythonErrorParser = (error: string) => {
    const errors = [
        'AssertionError',
        'AttributeError',
        'EOFError',
        'FloatingPointError',
        'GeneratorExit',
        'ImportError',
        'IndexError',
        'KeyError',
        'KeyboardInterrupt',
        'MemoryError',
        'NameError',
        'NotImplementedError',
        'OSError',
        'OverflowError',
        'RecursionError',
        'ReferenceError',
        'RuntimeError',
        'StopIteration',
        'SyntaxError',
        'IndentationError',
        'TabError',
        'SystemError',
        'SystemExit',
        'TypeError',
        'UnboundLocalError',
        'UnicodeError',
        'UnicodeEncodeError',
        'UnicodeDecodeError',
        'UnicodeTranslateError',
        'ValueError',
        'ZeroDivisionError',
    ];
    // Return the error type, line number, and error message
    const errorType = errors.find((errorType) => error.includes(errorType));
    // Ignore the first line number, go to the second line number
    const line = error.split('line ')[2].split(',')[0].trim();
    return {
        type: errorType,
        line: parseInt(line),
        message : error,
    };
}