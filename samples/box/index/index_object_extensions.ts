// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_index/user_defined/

import { Box, IndexObject } from 'tarantoolscript';

declare const box: Box;


// Example 1:
// The example below shows how to extend all memtx indexes with the custom function:
box.schema.space.create('tester1', { engine: 'memtx' });
box.space.get('tester1').create_index('index1');
let global_counter = 5;

// Create a custom function.
function increase_global_counter(this: void) {
    global_counter += 1;
}

// Extend all memtx indexes with the created function.
box.schema.memtx_index_mt['increase_global_counter'] = increase_global_counter;

// Call the 'increase_global_counter' function on 'index1'
//  to change the 'global_counter' value from 5 to 6.
box.space.get('tester1').index.get('index1')['increase_global_counter']();


// Example 2:
// The example below shows how to extend the specified index with the custom function with parameters:
box.schema.space.create('tester2', { engine: 'memtx', id: 1000 });
box.space.get('tester2').create_index('index2');
let local_counter = 0;

// Create a custom function.
function increase_local_counter(this: IndexObject, param: number) {
    local_counter += param + this.space_id;
}

// Extend only the 'index2' index with the created function.
box.schema.memtx_index_mt['increase_local_counter'] = increase_local_counter;
const meta = getmetatable(box.space.get('tester2').index.get('index2'));
(meta as LuaTable<string, unknown>).set('increase_local_counter', increase_local_counter);

// -- Call the 'increase_local_counter' function on 'index2'
// -- to change the 'local_counter' value from 0 to 1005.
box.space.get('tester2').index.get('index2')['increase_local_counter'](5);
