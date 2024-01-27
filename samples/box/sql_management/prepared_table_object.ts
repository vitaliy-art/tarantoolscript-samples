// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_sql/prepared_table/

import { Box } from 'tarantoolscript';

declare const box: Box;

function f(this: void) {
    box.execute('DROP TABLE IF EXISTS t;');
    box.execute('CREATE TABLE t (s1 INTEGER PRIMARY KEY);');
    const start_time = os.time();
    const p = box.prepare('INSERT INTO t VALUES (?);');
    for (const i of $range(1, 1000000)) {
        p.execute();
    }
    p.unprepare();
    const end_time = os.time();
    box.execute('COMMIT;');
    print(end_time - start_time); // elapsed time
}

f();
