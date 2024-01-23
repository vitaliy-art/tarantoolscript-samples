// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_space/on_replace/

import { Box, TriggerFunction, TupleObject } from 'tarantoolscript';

declare const box: Box;

// Example 1:
let x = 0;
function f(this: void) {
    x += 1;
}
box.space.get('my_space_name').on_replace(f);


// Example 2:
box.schema.space.create('space_1');
box.space.get('space_1').create_index('space_1_index', {});
const on_replace_function: TriggerFunction = (oldTuple: TupleObject, newTuple: TupleObject, space: string, request: string) => {
    print(oldTuple);
    print(request);
};
box.space.get('space_1').on_replace(on_replace_function);
box.space.get('space_1').insert([1, 'Hi']);
box.space.get('space_1').delete([1]);


// Example 3:
const s = box.schema.space.create('space53');
s.create_index('primary', { parts: [{ field: 1, type: 'unsigned' }] });
function replace_trigger(this: void) {
    replace_counter += 1;
}
s.on_replace(replace_trigger);
let replace_counter = 0;
let t = s.insert([1, 'First replace']);
t = s.insert([2, 'Second replace']);
s.drop();
replace_counter;


// Example 4:
/** @todo implement fiber module declaration */
