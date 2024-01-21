// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_schema_sequence/current/

import { Box } from 'tarantoolscript';

declare const box: Box;

const sq = box.schema.sequence.create('test');

sq.current();
// - error: Sequence 'test' is not started

sq.next();
// - 1

sq.current();
// - 1

sq.set(42);

sq.current();
// - 42

sq.reset();

sq.current(); // error
// - error: Sequence 'test' is not started
