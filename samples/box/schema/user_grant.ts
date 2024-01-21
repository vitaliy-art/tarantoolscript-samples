// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_schema/user_grant/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.schema.user.grant('Lena', 'read', 'space', 'tester');
box.schema.user.grant('Lena', 'execute', 'function', 'f');
box.schema.user.grant('Lena', 'read,write', 'universe');
box.schema.user.grant('Lena', 'Accountant');
box.schema.user.grant('Lena', 'read,write,execute', 'universe');
box.schema.user.grant('X', 'read', 'universe', undefined, { if_not_exists: true });
