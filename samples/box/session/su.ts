// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_session/su/

import { Box } from 'tarantoolscript';

declare const box: Box;

function f(this: void, a: string) {
    return box.session.user() + a;
}

box.session.su('guest', f, '-xxx');
// - guest-xxx

box.session.su('guest', function(this: void, ...$vararg: number[]) { return $multi(...$vararg); }, 1, 2);
// - 1
// - 2
