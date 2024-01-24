// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_tuple/field_path/

import { Box, SpaceFieldFormat } from 'tarantoolscript';

declare const box: Box;

const format: SpaceFieldFormat[] = [];
format[0] = { name: 'field1', type: 'unsigned' };
format[1] = { name: 'field2', type: 'array' };

const s = box.schema.space.create('test', { format: format });
const pk = s.create_index('pk');

const field2_value = [1, 'ABC', { key: 'Hello', value: 'world' }];
const t = s.replace([1, field2_value]);

t['[2][3][\'key\']'];
// - Hello
