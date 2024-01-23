// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_space/create_index/

import { Box, FieldType, IndexOptionsParts, SpaceObject } from 'tarantoolscript';

declare const box: Box;

// Example:
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
box.space.get('bands').create_index('bands', { parts: ['band_name'] });

// Create a non-unique secondary index
box.space.get('bands').create_index('year', { parts: [['year']], unique: false });

// Create a multi-part index
box.space.get('bands').create_index('year_band', { parts: [['year'], ['band_name']] });


// Alternative way to declare index parts
declare const my_space: SpaceObject;
my_space.create_index('one_part_idx', { parts: { 1: 1, 2: 'unsigned', is_nullable: true } as IndexOptionsParts });

// with extra braces
my_space.create_index('one_part_idx', { parts: [{ 1: 1, 2: 'unsigned', is_nullable: true }] as IndexOptionsParts[] });

// without extra braces
my_space.create_index('one_part_idx', { parts: { 1: 1, 2: 'unsigned', is_nullable: true } as IndexOptionsParts });


// key_part.collation
// Example:
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


// Creating an index using field names and numbers
// Example 1 (field names):
// Create a primary index
box.space.get('bands').create_index('primary', { parts: ['id'] });

// Create a unique secondary index
box.space.get('bands').create_index('band', { parts: ['band_name'] });

// Create a non-unique secondary index
box.space.get('bands').create_index('year', { parts: [['year']], unique: false });

// Create a multi-part index
box.space.get('bands').create_index('year_band', { parts: [['year'], ['band_name']] });

// Example 2 (field numbers):
// Create a primary index
box.space.get('bands').create_index('primary', { parts: [1] });

// Create a unique secondary index
box.space.get('bands').create_index('bands', { parts: [2] });

// Create a non-unique secondary index
box.space.get('bands').create_index('year', { parts: [[3]], unique: false });

// Create a multi-part index
box.space.get('bands').create_index('year_band', { parts: [3, 2] });


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
box.space.get('space2').format([['id', 'unsigned'], ['data', 'map']]);
box.space.get('space2').create_index('info', { parts: [
    ['data.full_name["firstname"]', 'str' ],
    ['data.full_name["surname"]', 'str' ]
] as [string, FieldType][] });
box.space.get('space2').insert([1, { full_name: { firstname: 'John', surname: 'Doe' } }]);
box.space.get('space2').select('John');


// Creating a multikey index using the path option with [*]
const space = box.schema.space.create('json_document');
space.create_index('primary');
const multikey_index = space.create_index('multikey', { parts: [{
    field: 2,
    type: 'str',
    path: 'data[*].name',
}]});
space.insert([1, {
    data: [
        { name: 'A' },
        { name: 'B' },
    ],
    extra_field: 1,
}]);
multikey_index.select([''], { iterator: 'GE' });
// - - [1, {'data': [{'name': 'A'}, {'name': 'B'}], 'extra_field': 1}]
//   - [1, {'data': [{'name': 'A'}, {'name': 'B'}], 'extra_field': 1}]


// Creating a functional index
// Example 1:
box.schema.space.create('tester');
box.space.get('tester').create_index('i', { parts: [{ field: 1, type: 'string' }] });
let function_code = 'function(tuple) return {string.sub(tuple[2],1,1)} end';
box.schema.func.create('my_func', {
    body: function_code,
    is_deterministic: true,
    is_sandboxed: true,
});
box.space.get('tester').create_index('func_index', { parts: [{ field: 1, type: 'string' }], func: 'my_func' });
box.space.get('tester').insert(['a', 'wombat']);
box.space.get('tester').insert(['b', 'rabbit']);
box.space.get('tester').index.get('func_index').select('w');
// - - ['a', 'wombat']

box.space.get('tester').index.get('func_index').select(box.func.get('my_func').call([['tester', 'wombat']]));
// - - ['a', 'wombat']

// Example2:
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
    parts: [{
        field: 1,
        type: 'string',
        collation: 'unicode_ci',
    }],
});
tester.insert(['James', 'SIS Building Lambeth London UK']);
tester.insert(['Sherlock', '221B Baker St Marylebone London NW1 6XE UK']);
addr_index.select('Uk');
// - - ['James', 'SIS Building Lambeth London UK']
//   - ['Sherlock', '221B Baker St Marylebone London NW1 6XE UK']
