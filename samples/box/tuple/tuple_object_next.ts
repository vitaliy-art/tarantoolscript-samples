// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_tuple/next/

import { Box } from 'tarantoolscript';

declare const box: Box;

const tuple = box.tuple.new([5, 4, 3, 2, 0]);

tuple.next();
// - 1
// - 5

tuple.next(1);
// - 2
// - 4

let [ctx, field] = tuple.next();

// Warning: code below causes a freeze of Tarantool console
while (field != undefined) {
    print(field);
    [ctx, field] = tuple.next();
}
