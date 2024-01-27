// https://www.tarantool.io/en/doc/latest/reference/reference_lua/msgpack/#lua-object.msgpack.msgpack_object

import { Box } from 'tarantoolscript';
import * as msgpack from 'msgpack';

declare const box: Box;

const bands = box.schema.create_space('bands');
bands.create_index('primary');
box.space.get('bands').insert(msgpack.object([1, 'The Beatles', 1960]));
