const starterFiles = new Map()

starterFiles.set('c', `#include <stdio.h>\nint main(void) {\n\t// your code goes here\n\treturn 0;\n}`)

starterFiles.set('cpp', `#include <iostream>\nusing namespace std;\nint main() {\n\t// your code goes here\n\treturn 0;\n}`)

starterFiles.set('java', `import java.util.*;\nimport java.lang.*;\nimport java.io.*;\n\nclass Ideone\n{\n\tpublic static void main (String[] args) throws java.lang.Exception\n\t{\n\t\t// your code goes here\n\t}\n}`)

starterFiles.set('python', `# your code goes here`)

export default starterFiles