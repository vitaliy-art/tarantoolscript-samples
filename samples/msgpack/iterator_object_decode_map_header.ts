// https://www.tarantool.io/en/doc/latest/reference/reference_lua/msgpack/#lua-function.iterator_object.decode_map_header

import * as msgpack from 'msgpack';

const mp_map = msgpack.object({ foo: 123 });
const mp_map_iterator = mp_map.iterator();

const size = mp_map_iterator.decode_map_header(); // returns 1
const first = mp_map_iterator.decode(); // returns 'foo'
const second = mp_map_iterator.decode(); // returns '123'
