// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_schema/role_grant/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.schema.role.grant('Accountant', 'read', 'space', 'tester');
box.schema.role.grant('Accountant', 'execute', 'function', 'f');
box.schema.role.grant('Accountant', 'read,write', 'universe');
box.schema.role.grant('public', 'Accountant');
box.schema.role.grant('role1', 'role2', undefined, undefined, { if_not_exists: true });
