// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_space/upsert/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.space.get('tester').upsert([12, 'c'], [['=', 3, 'a'], ['=', 4, 'b']]);
