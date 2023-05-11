export const dataTypeConvertor = new Map();

// A map between the data types of python and ts
dataTypeConvertor.set('python', {
    'number' : 'int',
    'string' : 'str',
    'boolean' : 'bool',
    'array' : 'list',
    'object' : 'dict',
    'void' : 'None',
    'any' : 'Any',
    'null' : 'None',
    'undefined' : 'None',
    'unknown' : 'Any',
    'bigint' : 'int',
    'symbol' : 'Any',
    'never' : 'Any',
    'function' : 'Callable',
    'class' : 'type',
    'interface' : 'type',
});