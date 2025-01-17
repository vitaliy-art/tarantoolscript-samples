// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_tuple/new/

import { Box, ToNumber64 } from 'tarantoolscript';

declare const box: Box;
declare const tonumber64: ToNumber64;

const x = box.space
    .get('tester')
    .insert([33, tonumber('1'), tonumber64('2')])
    .totable();
// - [33, 1, 2]

const t = box.tuple.new(['abc', 'def', 'ghi', 'abc']);
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
t;
// - ['abc', 'def', 'ghi', 'abc']
