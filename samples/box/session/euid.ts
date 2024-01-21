// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_session/euid/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.session.su('admin');
(function() { return $multi(box.session.uid(), box.session.euid()); })();
// - 1
// - 1

function f(this: void) {
    return $multi(box.session.uid(), box.session.euid());
}

box.session.su('guest', f);
// - - 1
//   - 0
