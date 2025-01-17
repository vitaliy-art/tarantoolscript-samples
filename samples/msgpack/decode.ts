/* eslint-disable @typescript-eslint/no-unused-expressions */
// https://www.tarantool.io/en/doc/latest/reference/reference_lua/msgpack/#lua-function.msgpack.decode

import * as msgpack from 'msgpack';
import * as buffer from 'buffer';

const msgpack_string = msgpack.encode(['a']);
msgpack.decode(msgpack_string, 1);
// - ['a']
// - 4

const ibuf = buffer.ibuf();
const msgpack_string_size = msgpack.encode(['a'], ibuf);
const [a, b] = msgpack.decode(ibuf.rpos, msgpack_string_size);
a;
b - ibuf.rpos;
msgpack_string_size == b - ibuf.rpos;
// - ['a']
// - 3
// - true
