// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_ctl/wait_ro/

import { Box } from 'tarantoolscript';

declare const box: Box;

if (!box.info().ro) {
    box.ctl.wait_ro(0.1);
}
