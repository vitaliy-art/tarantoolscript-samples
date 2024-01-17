// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_space/create_index/

import { Box, IndexOptionsParts, SpaceObject } from 'tarantoolscript';

declare const box: Box;

// Create a space
const bands = box.schema.space.create('bands');

// Specify field names and types
box.space.get('bands').format([
    { name: 'id', type: 'unsigned' },
    { name: 'band_name', type: 'string' },
    { name: 'year', type: 'unsigned' },
]);

// Create a primary index
box.space.get('bands').create_index('primary', { parts: ['id'] });

// Create a unique secondary index
box.space.get('bands').create_index('band', { parts: ['band_name'] });

// Create a non-unique secondary index
box.space.get('bands').create_index('year', { parts: [['year']], unique: false });

// Create a multi-part index
box.space.get('bands').create_index('year_band', { parts: [['year'], ['band_name']] });

// Alternative way to declare index parts
declare const my_space: SpaceObject;
// with extra braces
my_space.create_index('one_part_idx', { parts: [{ 1: 1, 2: 'unsigned', is_nullable: true } as IndexOptionsParts] });
// witho!ut extra braces
my_space.create_index('one_part_idx', { parts: { 1: 1, 2: 'unsigned', is_nullable: true } as IndexOptionsParts });


// key_part.collation
// Create a space
box.schema.space.create('tester');

// Use the 'unicode' collation
box.space.get('tester').create_index('unicode', { parts: [{
    field: 1,
    type: 'string',
    collation: 'unicode',
}]});

// Use the 'unicode_ci' collation
box.space.get('tester').create_index('unicode_ci', { parts: [{
    field: 1,
    type: 'string',
    collation: 'unicode_ci',
}]});

// Insert test data
box.space.get('tester').insert(['ЕЛЕ']);
box.space.get('tester').insert(['елейный']);
box.space.get('tester').insert(['ёлка']);

// Returns nil
const [select_unicode] = box.space.get('tester').index.get('unicode').select(['ЁлКа']);
// Returns 'ёлка'
const [select_unicode_ci] = box.space.get('tester').index.get('unicode_ci').select(['ЁлКа']);


// key_part.is_nullable
box.space.get('tester').create_index('I', { unique: true, parts: [{ field: 2, type: 'number', is_nullable: true }] });


// Creating an index using field names and numbers
// Example 1 (field names):
// To create a key part by a field name, you need to specify space_object:format() first.
// Create a primary index
box.space.get('bands').create_index('primary', { parts: ['id'] });
// Create a unique secondary index
box.space.get('bands').create_index('band', { parts: ['band_name'] });
// Create a non-unique secondary index
box.space.get('bands').create_index('year', { parts: [['year']], unique: false });
// Create a multi-part index
box.space.get('bands').create_index('year_bands', { parts: [['year'], ['band_name']] });

// Example 2 (field numbers):
// Create a primary index
box.space.get('bands').create_index('primary', { parts: [1] });
// Create a unique secondary index
box.space.get('bands').create_index('band', { parts: [2] });
// Create a non-unique secondary index
box.space.get('bands').create_index('year', { parts: [[3]], unique: false });
// Create a multi-part index
box.space.get('bands').create_index('year_bands', { parts: [3, 2] });


// Creating an index using the path option for map fields (JSON-path indexes)
// Example 1 – The simplest use of path:
box.schema.space.create('space1');
box.space.get('space1').create_index('primary', { parts: [{
    field: 1,
    type: 'scalar',
    path: 'age',
}]});
box.space.get('space1').insert([{ age: 44 }]);
box.space.get('space1').select(44);

// Example 2 – path plus format() plus JSON syntax to add clarity:
box.schema.space.create('space2');
box.space.get('space2').format([
    ['id', 'unsigned'],
    ['data', 'map'],
]);
box.space.get('space2').create_index('info', { parts: [
    ['data.full_name["firstname"]', 'str'],
    ['data.full_name["surname"]', 'str'],
]});
box.space.get('space2').insert([1, { full_name: { firstname: 'John', surname: 'Doe' } }]);
box.space.get('space2').select(['John']);


// Creating a multikey index using the path option with [*]
const my_space_2 = box.schema.space.create('json_documents');
my_space_2.create_index('primary');
const multikey_index = my_space_2.create_index('multikey', { parts: [{
    field: 2,
    type: 'str',
    path: 'data[*].name',
}]});
my_space_2.insert([1, {
    data: [{ name: 'A' }, { name: 'B' }],
    extra_field: 1,
}]);
multikey_index.select([''], { iterator: 'GE' });
// ---
// - - [1, {'data': [{'name': 'A'}, {'name': 'B'}], 'extra_field': 1}]
//   - [1, {'data': [{'name': 'A'}, {'name': 'B'}], 'extra_field': 1}]
// ...


// A function could make a key using only the first letter of a string field.
// Create a space. The space needs a primary-key field, which is not the field that we will use for the functional index:
box.schema.space.create('tester');
box.space.get('tester').create_index('i', { parts: [{ field: 1, type: 'string' }] });
// Create a function. The function expects a tuple.
// In this example, it will work on tuple[2] because the key source is field number 2 in what we will insert.
// Use string.sub() from the string module to get the first character:
let function_code = 'function(tuple) return {string.sub(tuple[2],1,1)} end';
// Make the function persistent using the box.schema.func.create function:
box.schema.func.create('my_func', {
    body: function_code,
    is_deterministic: true,
    is_sandboxed: true,
});
// Create a functional index. Specify the fields whose values will be passed to the function. Specify the function:
box.space.get('tester').create_index('func_index', {
    parts: [{ field: 1, type: 'string' }],
    func: 'my_func',
});
// Insert a few tuples. Select using only the first letter, it will work because that is the key.
// Or, select using the same function as was used for insertion:
box.space.get('tester').insert(['a', 'wombat']);
box.space.get('tester').insert(['b', 'rabbit']);
box.space.get('tester').index.get('func_index').select('w');
// ---
// - - ['a', 'wombat']
// ...
box.space.get('tester').index.get('func_index').select(box.func.get('my_func').call([['tester', 'wombat']]));
// ---
// - - ['a', 'wombat']
// ...


// Functions for functional indexes can return multiple keys. Such functions are called “multikey” functions.
// To create a multikey function, the options of box.schema.func.create() must include is_multikey = true.
// The return value must be a table of tuples. If a multikey function returns N tuples, then N keys will be added to the index.
// Example:
const tester = box.schema.space.create('withdata');
tester.format([
    { name: 'name', type: 'string' },
    { name: 'address', type: 'string' },
]);
const name_index = tester.create_index('name', { parts: [{ field: 1, type: 'string' }] });
function_code = `function(tuple)
    local address = string.split(tuple[2])
    local ret = {}
    for _, v in pairs(address) do
        table.insert(ret, {utf8.upper(v)})
    end
    return ret
end`;
box.schema.func.create('address', {
    body: function_code,
    is_deterministic: true,
    is_sandboxed: true,
    is_multikey: true,
});
const addr_index = tester.create_index('addr', {
    unique: false,
    func: 'address',
    parts: [{ field: 1, type: 'string', collation: 'unicode_ci' }],
});
tester.insert(['James', 'SIS Building Lambeth London UK']);
tester.insert(['Sherlock', '221B Baker St Marylebone London NW1 6XE UK']);
addr_index.select('UK');
// ---
// - - ['James', 'SIS Building Lambeth London UK']
//   - ['Sherlock', '221B Baker St Marylebone London NW1 6XE UK']
// ...
