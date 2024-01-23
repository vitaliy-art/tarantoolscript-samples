// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_space/delete/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.space.get('tester').delete(1);
// - [1, 'My first tuple']

box.space.get('tester').delete(1);
// - nil

box.space.get('tester').delete('a');
// - error: 'Supplied key type of part 0 does not match index part type: expected unsigned'
