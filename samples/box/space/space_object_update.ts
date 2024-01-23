// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_space/update/

import { SpaceObject } from 'tarantoolscript';

declare const s: SpaceObject;

s.update(44, [['+', 1, 55], ['=', 3, 'x']]);
