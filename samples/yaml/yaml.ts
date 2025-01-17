// https://www.tarantool.io/en/doc/latest/reference/reference_lua/yaml/

import * as yaml from 'yaml';
import * as http_client from 'http.client';

// __serialize parameter:
const smt = setmetatable as (
    this: void,
    obj: unknown,
    mt: { __serialize: string }
) => unknown;
yaml.encode(smt(['A', 'B'], { __serialize: 'seq' }));
// - |
//   --- ['A', 'B']
//   ...

yaml.encode(smt(['A', 'B'], { __serialize: 'map' }));
// - |
//   --- {1: 'A', 2: 'B'}
//   ...

yaml.encode([smt({ f1: 'A', f2: 'B' }, { __serialize: 'map' })]);
// - |
//   ---
//   - {'f2': 'B', 'f1': 'A'}
//   ...

yaml.encode([smt({ f1: 'A', f2: 'B' }, { __serialize: 'seq' })]);
// - |
//   ---
//   - []
//   ...

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/yaml/#lua-function.yaml.cfg
// example 1:
yaml.cfg({ encode_invalid_numbers: true });
const x = 0 / 0;
const y = 1 / 0;
yaml.encode([1, x, y, 2]);
// - |
//   ---
//   - 1
//   - -nan
//   - inf
//   - 2
//   ...

// example 2:
const c = http_client.new_() as unknown as { curl: unknown };
yaml.encode(c.curl);
// - error: unsupported Lua type 'userdata'

yaml.encode(c.curl, { encode_use_tostring: true });
// - '"userdata: 0x010a4ef2a0"'

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/yaml/#lua-data.yaml.NULL
const y2 = yaml.encode(['a', 1, 'b', 2]);
const z = yaml.decode(y2) as unknown[];

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
z[0], z[1], z[2], z[3];
// - a
// - 1
// - b
// - 2

if (yaml.NULL == undefined) {
    print('hi');
}
// hi

// Serializing 'A' and 'B' with different __serialize values causes different results:
print(yaml.encode(smt(['A', 'B'], { __serialize: 'sequence' })));
// - A
// - B

print(yaml.encode(smt(['A', 'B'], { __serialize: 'seq' })));
// --- ['A', 'B']

print(yaml.encode([smt({ f1: 'A', f2: 'B' }, { __serialize: 'map' })]));
// - {'f2': 'B', 'f1': 'A'}
