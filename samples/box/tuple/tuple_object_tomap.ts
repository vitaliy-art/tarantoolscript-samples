// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_tuple/tomap/

import { Box, FieldType } from 'tarantoolscript';

declare const box: Box;

const format: [string, FieldType][] = [['field1', 'unsigned'], ['field2', 'unsigned']];
const s = box.schema.space.create('test', { format: format });
s.create_index('pk', { parts: [1, 'unsigned', 2, 'unsigned']});
const t1 = s.insert([10, 20]);

const t1map = t1.tomap();
// - 1: 10
//   2: 20
//   field1: 10
//   field2: 20

const t1map_names_only = t1.tomap({ names_only: true });
// - field1: 10
//   field2: 20
