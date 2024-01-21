// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_schema/user_create/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.schema.user.create('testuser');

// or

box.schema.user.create('testuser', { password: 'foobar' });

// or

box.schema.user.create('testuser', { if_not_exists: true });
