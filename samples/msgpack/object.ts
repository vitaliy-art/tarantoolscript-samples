// https://www.tarantool.io/en/doc/latest/reference/reference_lua/msgpack/#lua-function.msgpack.object

import { Box } from 'tarantoolscript';
import * as msgpack from 'msgpack';

declare const box: Box;

// Create a MsgPack object from a Lua object of any type
const mp_from_number = msgpack.object(123);
const mp_from_string = msgpack.object('hello world');
const mp_from_array = msgpack.object([10, 20, 30]);
const mp_from_table = msgpack.object({ band_name: 'The Beatles', year: 1960 });
const mp_from_tuple = msgpack.object(box.tuple.new([1, 'The Beatles', 1960]));
