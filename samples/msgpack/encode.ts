// https://www.tarantool.io/en/doc/latest/reference/reference_lua/msgpack/#lua-function.msgpack.encode

import * as msgpack from 'msgpack';
import * as buffer from 'buffer';

const ibuf = buffer.ibuf();
const msgpack_string_size = msgpack.encode(['a'], ibuf);
/** @todo implement ffi module declaration */
