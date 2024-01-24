// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_tuple/pairs/

import { Box } from 'tarantoolscript';

declare const box: Box;

const t = box.tuple.new(['Fld#1', 'Fld#2', 'Fld#3', 'Fld#4', 'Fld#5']);

let tmp = '';

for (const [k, v] of t.pairs()) {
    tmp += v;
}

tmp;
// - Fld#1Fld#2Fld#3Fld#4Fld#5
