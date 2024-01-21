// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_schema/user_revoke/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.schema.user.revoke('Lena', 'read', 'space', 'tester');
box.schema.user.revoke('Lena', 'execute', 'function', 'f');
box.schema.user.revoke('Lena', 'read,write', 'universe');
box.schema.user.revoke('Lena', 'Accountant');
