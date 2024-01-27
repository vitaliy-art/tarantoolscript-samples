// https://www.tarantool.io/en/doc/latest/reference/reference_lua/msgpack/#lua-function.msgpack_object.iterator

import * as msgpack from 'msgpack';
import { Box } from 'tarantoolscript';

declare const box: Box;

const mp_from_array = msgpack.object([10, 20, 30]);
const mp_from_table = msgpack.object({ band_name: 'The Beatles', year: 1960 });
const mp_from_tuple = msgpack.object(box.tuple.new([1, 'The Beatles', 1960]));

// Get MsgPack data by the specified index or key
const mp_array_get_by_index = mp_from_array[1]; // Returns 10
const mp_table_get_by_key = mp_from_table['band_name']; // Returns 'The Beatles'
const mp_table_get_by_nonexistent_key = mp_from_table['rating']; // Returns nil
const mp_tuple_get_by_index = mp_from_tuple[3]; // Returns 1960
