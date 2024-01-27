// https://www.tarantool.io/en/doc/latest/reference/reference_lua/msgpack/#lua-function.msgpack.is_object

import * as msgpack from 'msgpack';

const mp_from_string = msgpack.object('hello world');

// Check if the given argument is a MsgPack object
const mp_is_object = msgpack.is_object(mp_from_string); // Returns true
const string_is_object = msgpack.is_object('hello world'); // Returns false
