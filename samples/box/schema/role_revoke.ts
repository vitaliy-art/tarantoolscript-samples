// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_schema/role_revoke/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.schema.role.revoke('Accountant', 'read', 'space', 'tester');
box.schema.role.revoke('Accountant', 'execute', 'function', 'f');
box.schema.role.revoke('Accountant', 'read,write', 'universe');
box.schema.role.revoke('public', 'Accountant');
