// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_index/get/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.schema.create_space('tester');
box.space.get('tester').create_index('primary', { parts: [1, 'unsigned'] });
box.space.get('tester').insert([3, 'Cinema']);
box.space.get('tester').insert([2, 'Music']);

const tuple = box.space.get('tester').index.get('primary').get(2);
// - [2, 'Music']
