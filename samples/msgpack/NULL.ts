/* eslint-disable @typescript-eslint/no-unused-expressions */
// https://www.tarantool.io/en/doc/latest/reference/reference_lua/msgpack/#lua-data.msgpack.NULL

import * as msgpack from 'msgpack';
import { Box } from 'tarantoolscript';

declare const box: Box;

const y = msgpack.encode(['a', 1, 'b', 2]);

const [result] = msgpack.decode(y);
const z = result as (string | number)[];

z[0];
z[1];
z[2];
z[3];
// - a
// - 1
// - b
// - 2

const tester = box.schema.create_space('tester');
tester.create_index('primary');
box.space.get('tester').insert([20, box.NULL, 20]);
// - [20, null, 20]
