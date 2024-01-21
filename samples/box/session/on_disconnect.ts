// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_session/on_disconnect/

import { Box } from 'tarantoolscript';

declare const box: Box;

// Example #1
declare let x: number;
function f(this: void) {
    x += 1;
}
box.session.on_disconnect(f);


// Example #2
// After the following series of requests, a Tarantool instance will write a message using the log module whenever any user connects or disconnects.
/** @todo implement log package */
