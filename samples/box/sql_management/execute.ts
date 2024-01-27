// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_sql/execute/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.execute('CREATE TABLE tt (column1 INT PRIMARY key, column2 VARCHAR(10));');
// - row_count: 1

box.execute('INSERT INTO tt VALUES (1, \'x\');');
// - row_count: 1

const x = [2, 'x'];
box.execute('INSERT INTO tt VALUES (?, ?);', x);
// - row_count: 1

box.execute('INSERT INTO tt VALUES (:a, :b);', [{ [':a']: 3 }, { [':b']: 'x' }]);
// - row_count: 1

for (const i of $range(4, 10, 1)) {
    box.execute(`insert into tt values (${i}, 'x');`);
}

box.execute('SELECT "COLUMN1" FROM tt WHERE "COLUMN1" = 5;');
// - metadata:
//   - name: COLUMN1
//     type: integer
//   rows:
//   - [5]
