// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_space/frommap/

import { Box, SpaceFieldFormat } from 'tarantoolscript';

declare const box: Box;

// Create a format with two fields named 'a' and 'b'.
const format1: SpaceFieldFormat[] = [
    { name: 'a', type: 'unsigned' },
    { name: 'b', type: 'scalar' },
];

// Create a space with that format.
const s = box.schema.create_space('test', { format: format1 });

// Create a tuple based on a map consistent with that space.
s.frommap({ b: 'x', a: 123456 });
// - [123456, 'x']

// Create a table based on a map consistent with that space.
s.frommap({ b: 'x', a: 123456 }, { table: true });
// - - 123456
//   - x
