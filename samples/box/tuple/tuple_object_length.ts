// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_tuple/count_fields/

import { Box } from 'tarantoolscript';

declare const box: Box;

const t = box.tuple.new(['Fld#1', 'Fld#2', 'Fld#3', 'Fld#4']);

t.length();
// - 4
