// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_schema/func_create/

import { Box } from 'tarantoolscript';

declare const box: Box;

// Example 1: a non-persistent Lua function
// The example below shows how to create a non-persistent Lua function:
box.schema.func.create('calculate');
box.schema.func.create('calculate', { if_not_exists: false });
box.schema.func.create('calculate', { setuid: false });
box.schema.func.create('calculate', { language: 'LUA' });


// Example 2: a persistent Lua function
// The example below shows how to create a persistent Lua function, show its definition using box.func.{func-name},
// and call this function using box.func.{func-name}:call([parameters]):
const lua_code = 'function(a, b) return a + b end';
box.schema.func.create('sum', { body: lua_code });
box.func.get('sum');
// - is_sandboxed: false
//   is_deterministic: false
//   id: 2
//   setuid: false
//   body: function(a, b) return a + b end
//   name: sum
//   language: LUA

box.func.get('sum').call([1, 2]);
// - 3


// Example 3: a persistent SQL expression used in a tuple constraint
// The code snippet below defines a function that checks a tuple’s data using the SQL expression:
box.schema.func.create('check_person', {
    language: 'SQL_EXPR',
    is_deterministic: true,
    body: '"age" > 21 AND "name" != \'Admin\''
});
// Then, this function is used to create a tuple constraint:
const customers = box.schema.space.create('customers', { constraint: 'check_person' });
customers.format([
    { name: 'id', type: 'number' },
    { name: 'name', type: 'string' },
    { name: 'age', type: 'number' },
]);
customers.create_index('primary', { parts: [1] });
// On an attempt to insert a tuple that doesn’t meet the required criteria, an error is raised:
customers.insert([2, 'Bob', 18]);
// error: Check constraint 'check_person' failed for a tuple


// function_options.takes_raw_args
// If set to true for a Lua function and the function is called via net.box (conn:call()) or by box.func.<func-name>:call(),
// the function arguments are passed being wrapped in a MsgPack object:
import * as msgpack from 'msgpack';
box.schema.func.create('my_func', {takes_raw_args: true});
const my_func = function(this: void, mp: unknown) {
    if (msgpack.is_object(mp)) {
        const args = mp.decode(); // array of arguments
    }
};
