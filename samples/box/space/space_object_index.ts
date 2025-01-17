// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_space/index_data/

import { Box } from 'tarantoolscript';

declare const box: Box;

// checking the number of indexes for space 'tester'
let counter = 0;
for (const i of $range(0, box.space.get('tester').index.length())) {
    if (box.space.get('tester').index.get(i) != undefined) {
        counter += 1;
    }
}
print(counter);

// checking the type of index 'primary'
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
box.space.get('tester').index.get('primary').type;
