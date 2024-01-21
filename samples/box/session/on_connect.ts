// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_session/on_connect/

import { Box } from 'tarantoolscript';

declare const box: Box;

declare let x: number;
function f(this: void) {
    x += 1;
}

box.session.on_connect(f);
