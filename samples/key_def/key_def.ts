// https://www.tarantool.io/en/doc/latest/reference/reference_lua/key_def/

import * as key_def from 'key_def';
import { Box } from 'tarantoolscript';

declare const box: Box;

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/key_def/#lua-function.key_def_object.extract_key
// Example 1:
let k = key_def.new_([{ type: 'string', fieldno: 3 }, { type: 'unsigned', fieldno: 1 }]);
k.extractKey([1, 99.5, 'X', box.NULL, 99.5]); // - ['X', 1]

// Example 2:
box.schema.space.create('T');
const i = box.space.get('T').create_index('I', { parts: [3, 'string', 1, 'unsigned'] });
box.space.get('T').insert([1, 99.5, 'X', box.NULL, 99.5]);
k = key_def.new_(i.parts);
k.extractKey(box.space.get('T')!.get(['X', 1])!); // - ['X', 1]

// Example 3:
const s = box.schema.space.create('test');
const pk = s.create_index('pk');
const sk = s.create_index('test', { unique: false, parts: [
    { 1: 2, 2: 'number', path: 'a' },
    { 1: 2, 2: 'number', path: 'b' },
]});
s.insert([1, { a: 1, b: 1 }]);
s.insert([2, { a: 1, b: 2 }]);
k = key_def.new_(pk.parts);
for (const [, tuple] of sk.pairs([1])) {
    const key = k.extractKey(tuple);
    pk.delete(key);
}


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/key_def/#lua-function.key_def_object.compare
k = key_def.new_([
    { type: 'string', fieldno: 3, collation: 'unicode_ci' },
    { type: 'unsigned', fieldno: 1 },
]);
k.compare([1, 99.5, 'X', box.NULL, 99.5], [1, 99.5, 'x', box.NULL, 99.5]); // - 0


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/key_def/#lua-function.key_def_object.compare_with_key
k = key_def.new_([
    { type: 'string', fieldno: 3, collation: 'unicode_ci' },
    { type: 'unsigned', fieldno: 1 },
]);
k.compareWithKey([1, 99.5, 'X', box.NULL, 99.5], ['x', 1]); // - 0


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/key_def/#lua-function.key_def_object.merge
k = key_def.new_([{ type: 'string', fieldno: 3 }]);
const k2 = key_def.new_([
    { type: 'unsigned', fieldno: 1 },
    { type: 'string', fieldno: 3 },
]);
k.merge(k2);
// - - fieldno: 3
//     sort_order: asc
//     type: string
//     exclude_null: false
//     is_nullable: false
//   - fieldno: 1
//     sort_order: asc
//     type: unsigned
//     exclude_null: false
//     is_nullable: false


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/key_def/#lua-function.key_def_object.totable
k = key_def.new_([{ type: 'string', fieldno: 3 }]);
k.toTable();
// - - fieldno: 3
//     sort_order: asc
//     type: string
//     exclude_null: false
//     is_nullable: false
