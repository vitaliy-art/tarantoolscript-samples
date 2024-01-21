// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_schema/user_drop/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.schema.user.drop('Lena');

// or

box.schema.user.drop('Lena', { if_exists: false });
