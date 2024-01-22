// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_space/alter/

import { Box, SpaceFieldFormat } from 'tarantoolscript';

declare const box: Box;

const s = box.schema.create_space('tester');

const format: SpaceFieldFormat[] = [{ name: 'field1', type: 'unsigned' }];

s.alter({ name: 'tester1', format: format });

s.name;
// - tester1

s.format();
// - [{'name': 'field1', 'type': 'unsigned'}]
