// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_space/create_check_constraint/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.schema.space.create('t');
box.space.get('t').format([
    { name: 'f1', type: 'unsigned' },
    { name: 'f2', type: 'string' },
    { name: 'f3', type: 'string' },
]);
box.space.get('t').create_index('i');
box.space.get('t').create_check_constraint('c1', '"f2" > \'A\'');
box.space.get('t').create_check_constraint('c2', '"f2"=UPPER("f3") AND NOT "f2" LIKE \'__\'');

// This insert will fail, constraint c1 expression returns false
box.space.get('t').insert([1, 'A', 'A']);

// This insert will fail, constraint c2 expression returns false
box.space.get('t').insert([1, 'B', 'C']);

// This insert will succeed, both constraint expressions return true
box.space.get('t').insert([1, 'B', 'b']);

// This update will fail, constraint c2 expression returns false
box.space.get('t').update(1, [['=', 2, 'xx'], ['=', 3, 'xx']]);
