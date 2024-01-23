// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_space/_space/

import { Box } from 'tarantoolscript';

declare const box: Box;

// Example #1:
// The following function will display every simple field in all tuples of _space.
function example(this: void) {
    const ta: string[] = [];
    let i, line;
    for (const [k, v] of box.space._space.pairs()) {
        i = 1;
        line = '';
        while (i <= v.length()) {
            if (type(v[i]) != 'table') {
                line += v[i] + ' ';
            }
            i += 1;
        }
        table.insert(ta, line);
    }
    return ta;
}

example();
// - - '272 1 _schema memtx 0  '
//   - '280 1 _space memtx 0  '
//   - '281 1 _vspace sysview 0  '
//   - '288 1 _index memtx 0  '
//   - '296 1 _func memtx 0  '
//   - '304 1 _user memtx 0  '
//   - '305 1 _vuser sysview 0  '
//   - '312 1 _priv memtx 0  '
//   - '313 1 _vpriv sysview 0  '
//   - '320 1 _cluster memtx 0  '
//   - '512 1 tester memtx 0  '
//   - '513 1 origin vinyl 0  '
//   - '514 1 archive memtx 0  '


// The next example is broken. If you'll do that, you'll get the error: - error: 'Illegal parameters, format[2]: name (string) is expected'
// Example #2:
// The following requests will create a space using box.schema.space.create() with a format clause,
// then retrieve the _space tuple for the new space. This illustrates the typical use of the format clause,
// it shows the recommended names and data types for the fields.
// box.schema.space.create('TM', {
//     id: 12345,
//     format: [
//         { name: 'field_1' },
//         { name: '', type: 'unsigned' },
//     ],
// });
// - index: []
//   on_replace: 'function: 0x41c67338'
//   temporary: false
//   id: 12345
//   engine: memtx
//   enabled: false
//   name: TM
//   field_count: 0
// - created

// box.space._space.select(12345);
// - - [12345, 1, 'TM', 'memtx', 0, {}, [{'name': 'field_1'}, {'type': 'unsigned'}]]
