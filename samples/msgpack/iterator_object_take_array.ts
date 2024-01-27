// https://www.tarantool.io/en/doc/latest/reference/reference_lua/msgpack/#lua-function.iterator_object.take_array

import * as msgpack from 'msgpack';

const mp_array = msgpack.object([10, 20, 30, 40]);
const mp_array_iterator = mp_array.iterator();

const size = mp_array_iterator.decode_array_header(); // returns 4
const first = mp_array_iterator.decode(); // returns 10
const mp_array_new = mp_array_iterator.take_array(2);
const mp_array_new_decoded = mp_array_new.decode(); // returns {20, 30}
const fourth = mp_array_iterator.decode(); // returns 40
