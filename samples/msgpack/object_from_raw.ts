// https://www.tarantool.io/en/doc/latest/reference/reference_lua/msgpack/#lua-function.msgpack.object_from_raw

import * as msgpack from 'msgpack';
import * as buffer from 'buffer';

// Create a MsgPack object from a raw MsgPack string
const raw_mp_string = msgpack.encode([10, 20, 30]);
const mp_from_mp_string = msgpack.object_from_raw(raw_mp_string);

// Create a MsgPack object from a raw MsgPack string using buffer
const ibuf = buffer.ibuf();
msgpack.encode([10, 20, 30], ibuf);
const mp_from_mp_string_pt = msgpack.object_from_raw(ibuf.buf, ibuf.size());
