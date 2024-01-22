// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_schema/space_create/

import { Box } from 'tarantoolscript';

declare const box: Box;

// space_opts.constraint
// Define a tuple constraint function
box.schema.func.create('check_person', {
    language: 'LUA',
    is_deterministic: true,
    body: 'function(t, c) return (t.age >= 0 and #(t.name) > 3) end',
});

// Create a space with a tuple constraint
const customers = box.schema.space.create('customers', { constraint: 'check_person' });


// space_opts.foreign_key
// Create a space with a tuple foreign key
box.schema.space.create('orders', {
    foreign_key: {
        space: 'customers',
        field: { customer_id: 'id', customer_name: 'name' },
    },
});

box.space.get('orders').format([
    { name: 'id', type: 'number' },
    { name: 'customer_id' },
    { name: 'customer_name' },
    { name: 'price_total', type: 'number' },
]);


// space_opts.if_not_exists
let s = box.schema.space.create('space55');
s = box.schema.space.create('space55', {
    id: 555,
    temporary: false,
});
// - error: Space 'space55' already exists

s = box.schema.space.create('space55', {
    if_not_exists: true,
});
// ok
