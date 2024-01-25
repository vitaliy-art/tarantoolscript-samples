// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_tuple/update/

import { Box } from 'tarantoolscript';

declare const box: Box;

const t = box.tuple.new(['Fld#1', 'Fld#2', 'Fld#3', 'Fld#4', 'Fld#5']);

t.update([['=', 2, 'B']]);
// - ['Fld#1', 'B', 'Fld#3', 'Fld#4', 'Fld#5']
