// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_tuple/field_name/

import { Box, SpaceFieldFormat } from 'tarantoolscript';

declare const box: Box;

const format: SpaceFieldFormat[] = [];
format[0] = { name: 'field1', type: 'unsigned' };
format[1] = { name: 'field2', type: 'string' };

const s = box.schema.space.create('test', { format: format });
const pk = s.create_index('pk');
const t = s.replace([1, 'Я']);

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
t['field2'];
// - Я
