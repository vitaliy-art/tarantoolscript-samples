// https://www.tarantool.io/en/doc/latest/reference/reference_lua/msgpack/#lua-function.iterator_object.take

import * as msgpack from 'msgpack';

const mp_array = msgpack.object([10, 20, 30]);
const mp_array_iterator = mp_array.iterator();

const size = mp_array_iterator.decode_array_header(); // returns 3
const first = mp_array_iterator.decode(); // returns 10
mp_array_iterator.skip(); // returns none, skips 20
const mp_value_under_cursor = mp_array_iterator.take();
const third = mp_value_under_cursor.decode(); // returns 30
