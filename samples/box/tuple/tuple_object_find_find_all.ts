// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_tuple/find/

import { Box } from 'tarantoolscript';

declare const box: Box;

const t = box.tuple.new(['a', 'b', 'c', 'a']);

t.find('a');
// - 1

t.findall('a');
// - 1
// - 4

t.findall(2, 'a');
// - 4
