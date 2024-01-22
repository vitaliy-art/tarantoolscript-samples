// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_space/auto_increment/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.schema.create_space('tester');
box.space.get('tester').create_index('primary');

box.space.get('tester').auto_increment(['Fld#1', 'Fld#2']);
// - [1, 'Fld#1', 'Fld#2']

box.space.get('tester').auto_increment(['Fld#3']);
// - [2, 'Fld#3']
