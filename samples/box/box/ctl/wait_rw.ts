// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_ctl/wait_rw/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.ctl.wait_rw(0.1);
