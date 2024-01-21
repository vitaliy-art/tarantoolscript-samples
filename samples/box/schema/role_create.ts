// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_schema/role_create/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.schema.role.create('Accountant');
box.schema.role.create('Accountant', { if_not_exists: false });
