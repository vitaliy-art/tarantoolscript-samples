// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_index/alter/

import { Box } from 'tarantoolscript';

declare const box: Box;

// Example 1:
// You can add and remove fields that make up a primary index:
const s = box.schema.create_space('test');
const i = s.create_index('i', { parts: [{ field: 1, type: 'unsigned' }] });
s.insert([1, 2]);
// - [1, 2]

i.select();
// - - [1, 2]

i.alter({ parts: [{ field: 1, type: 'unsigned' }, { field: 2, type: 'unsigned' }] });
s.insert([1, 't']);
// - error: 'Tuple field 2 type does not match one required by operation: expected unsigned'


// Example 2:
// You can change index options for both memtx and vinyl spaces:
box.space.get('space55').index.get('primary').alter({ type: 'HASH' });
box.space.get('vinyl_space').index.get('i').alter({ page_size: 4096 });
