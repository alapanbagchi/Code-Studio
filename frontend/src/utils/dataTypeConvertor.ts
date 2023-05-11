export const dataTypeConvertor = new Map();

dataTypeConvertor.set('c',{
    'string': 'char*',
    'number': 'int',
    'boolean': 'bool',
    'any': 'void*',
    'string[]': 'char**',
    'number[]': 'int*',
    'boolean[]': 'bool*',
    'any[]': 'void**',
    'void': 'void',
})

dataTypeConvertor.set('cpp',{
    'string': 'string',
    'number': 'int',
    'boolean': 'bool',
    'any': 'void*',
    'string[]': 'vector<string>',
    'number[]': 'vector<int>',
    'boolean[]': 'vector<bool>',
    'any[]': 'vector<void*>',
    'void': 'void',
})

dataTypeConvertor.set('java',{
    'string': 'String',
    'number': 'int',
    'boolean': 'boolean',
    'any': 'Object',
    'string[]': 'String[]',
    'number[]': 'int[]',
    'boolean[]': 'boolean[]',
    'any[]': 'Object[]',
    'void': 'void',
})