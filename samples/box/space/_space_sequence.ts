// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_space/_space_sequence/

import { Box } from 'tarantoolscript';

declare const box: Box;

// Create a sequence
box.schema.sequence.create('id_seq', { min: 1000, start: 1000 });

// Create a space
box.schema.space.create('customers');

// Create an index that uses the sequence
box.space.get('customers').create_index('primary', { sequence: 'id_seq' });

// Create a space
box.schema.space.create('orders');

// Create an index that uses an auto sequence
box.space.get('orders').create_index('primary', { sequence: true });

// Check the connections between spaces and sequences
box.space._space_sequence.select({});
// - - [512, 1, false, 0, '']
//   - [513, 2, true, 0, '']
