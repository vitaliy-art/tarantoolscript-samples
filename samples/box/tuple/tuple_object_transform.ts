// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_tuple/transform/

import { Box } from 'tarantoolscript';

declare const box: Box;

const t = box.tuple.new(['Fld#1', 'Fld#2', 'Fld#3', 'Fld#4', 'Fld#5']);

t.transform(2, 2, 'x');
// - ['Fld#1', 'x', 'Fld#4', 'Fld#5']
