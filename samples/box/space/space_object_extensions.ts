// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_space/user_defined/

import { Box, SpaceObject } from 'tarantoolscript';

declare const box: Box;

// Visible to any space, no parameters.
// After these requests, the value of global_variable will be 6.
box.schema.space.create('t');
box.space.get('t').create_index('i');
let global_variable = 5;
function f(this: SpaceObject) {
    global_variable += 1;
}
box.schema.space_mt['counter'] = f;
(box.space.get('t')['counter'] as () => void)();
