// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_backup/stop/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.backup.stop();
