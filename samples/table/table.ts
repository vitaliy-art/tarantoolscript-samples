// https://www.tarantool.io/en/doc/latest/reference/reference_lua/table/

import * as table from 'table';
import { Box } from 'tarantoolscript';

declare const box: Box;

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/table/#lua-function.table.deepcopy
const input_table = [1, ['a', 'b']];
const output_table = table.deepcopy(input_table);
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
output_table;
// - - 1
//   - - a
//     - b

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/table/#lua-function.table.sort
function tarantool_sort(
    this: void,
    input_table: { [key: string | number]: unknown } | unknown[],
    collation?: string
): void {
    const c = collation || 'binary';
    const tmp_name = 'Temporary_for_tarantool_sort';
    pcall(() => {
        box.space.get(tmp_name).drop();
    });
    box.schema.space.create(tmp_name, { temporary: true });
    box.space.get(tmp_name).create_index('I');
    box.space.get(tmp_name).create_index('I2', {
        unique: false,
        type: 'TREE',
        parts: [{ 1: 2, 2: 'scalar', collation: c, is_nullable: true }],
    });

    for (const i of $range(1, table.maxn(input_table))) {
        box.space.get(tmp_name).insert([i, input_table[i - 1]]);
    }

    const [t] = box.space.get(tmp_name).index.get('I2').select();
    for (const i of $range(1, table.maxn(input_table))) {
        input_table[i - 1] = t![i - 1][2];
    }

    box.space.get(tmp_name).drop();
}
