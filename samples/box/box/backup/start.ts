// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_backup/start/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.backup.start(1);
