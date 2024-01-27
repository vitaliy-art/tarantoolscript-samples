// https://www.tarantool.io/en/doc/latest/reference/reference_lua/msgpack/#lua-function.iterator_object.decode

import * as msgpack from 'msgpack';

const mp_array = msgpack.object([10, 20, 30, 40]);
const mp_array_iterator = mp_array.iterator();

const size = mp_array_iterator.decode_array_header(); // returns 4
const first = mp_array_iterator.decode(); // returns 10
const second = mp_array_iterator.decode(); // returns 20
mp_array_iterator.skip(); // returns none, skips 30
const fourth = mp_array_iterator.decode(); // returns 40
