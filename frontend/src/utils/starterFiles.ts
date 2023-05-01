const starterFiles = new Map<string, string>()

starterFiles.set('c', `#include <stdio.h>`)

starterFiles.set('cpp', `#include <iostream>\nusing namespace std;`)

starterFiles.set('java', `import java.util.*;\nimport java.lang.*;\nimport java.io.*;\n\nclass Ideone\n{\n\tpublic static void main (String[] args) throws java.lang.Exception\n\t{\n\t\t// your code goes here\n\t}\n}`)

starterFiles.set('python', ``)

export default starterFiles