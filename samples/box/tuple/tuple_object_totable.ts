// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_tuple/totable/

import { Box } from 'tarantoolscript';

declare const box: Box;

const t = box.tuple.new(['Fld#1', 'Fld#2', 'Fld#3', 'Fld#4', 'Fld#5']);

t.totable();
// - ['Fld#1', 'Fld#2', 'Fld#3', 'Fld#4', 'Fld#5']
