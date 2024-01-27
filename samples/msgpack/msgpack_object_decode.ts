// https://www.tarantool.io/en/doc/latest/reference/reference_lua/msgpack/#lua-function.msgpack_object.decode

import * as msgpack from 'msgpack';

const mp_from_number = msgpack.object(123);
const mp_from_string = msgpack.object('hello world');

// Decode MsgPack data
const mp_number_decoded = mp_from_number.decode(); // Returns 123
const mp_string_decoded = mp_from_string.decode(); // Returns 'hello world'
