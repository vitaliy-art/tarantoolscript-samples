// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_schema_sequence/create_index/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.space.get('T').create_index('Q', { sequence: 'Q' });
// - unique: true
//   parts:
//   - type: unsigned
//     is_nullable: false
//     fieldno: 1
//   sequence_id: 8
//   id: 0
//   space_id: 514
//   name: Q
//   type: TREE

box.space.get('T').insert([box.NULL, 0]);
// - [1, 0]


// box.NULL usage:
const s = box.schema.space.create('test');
s.create_index('pk', { parts: [['[1].a.b[1]', 'unsigned']], sequence: true });
s.replace([]); // error
s.replace([{ c: {}}]); // error
s.replace([{ a: { c: [] } }]); // error
s.replace([{ a: { b: [] } }]); // error;
s.replace([{ a: { b: [undefined] } }]); // error
s.replace([{ a: { b: [box.NULL] } }]); // ok
