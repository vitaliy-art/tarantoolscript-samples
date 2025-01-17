/* eslint-disable @typescript-eslint/no-unused-expressions */
// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_tuple/upsert/

import { Box } from 'tarantoolscript';

declare const box: Box;

const t = box.tuple.new([1, 2, 3]);
let t2 = t.upsert([['=', 5, 100]]);

t;
// - [1, 2, 3]

t2;
// - [1, 2, 3, null, 100]

t2 = t.upsert([
    ['=', 5, 100],
    ['+', 1, 3],
]);

t;
// - [1, 2, 3]

t2;
// - [4, 2, 3, null, 100]
