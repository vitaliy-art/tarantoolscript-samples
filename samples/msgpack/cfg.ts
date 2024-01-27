// https://www.tarantool.io/en/doc/latest/reference/reference_lua/msgpack/#lua-function.msgpack.cfg

import * as msgpack from 'msgpack';


// example 1:
msgpack.cfg({ encode_invalid_numbers: true });

msgpack.decode(msgpack.encode([1, 0/0, 1/0, false]));
// - [1, -nan, inf, false]
// - 22

msgpack.cfg({ encode_invalid_numbers: false });

msgpack.decode(msgpack.encode([1, 0/0, 1/0, false]));
// - error: ... number must not be NaN or Inf'


// example 2:
/** @todo implement http.client package */
