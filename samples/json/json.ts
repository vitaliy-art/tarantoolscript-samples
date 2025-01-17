// https://www.tarantool.io/en/doc/latest/reference/reference_lua/json/

import * as json from 'json';
import * as http_client from 'http.client';

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/json/#lua-function.json.encode
json.encode(123);
// - '123'

json.encode([123]);
// - '[123]'

json.encode([123, 234, 345]);
// - '[123,234,345]'

json.encode({ abc: 234, cde: 345 });
// - '{"cde":345,"abc":234}'

json.encode({ hello: ['world'] });
// - '{"hello":["world"]}'

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/json/#lua-function.json.decode
json.decode('123');
// - 123

json.decode('[123, "hello"]');
// - [123, 'hello']

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
(json.decode('{"hello": "world"}') as { [key: string]: unknown }).hello;
// - world

// __serialize parameter:
const smt = setmetatable as (
    this: void,
    obj: unknown,
    mt: { __serialize: string }
) => unknown;
json.encode(smt(['A', 'B'], { __serialize: 'seq' }));
// - '["A","B"]'

json.encode(smt(['A', 'B'], { __serialize: 'map' }));
// - '{"1":"A","2":"B"}'

json.encode([smt({ f1: 'A', f2: 'B' }, { __serialize: 'map' })]);
// - '[{"f2":"B","f1":"A"}]'

json.encode([smt({ f1: 'A', f2: 'B' }, { __serialize: 'seq' })]);
// - '[[]]'

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/json/#lua-function.json.cfg
// example 1:
json.cfg({ encode_invalid_numbers: true });
const x = 0 / 0;
const y = 1 / 0;
json.encode([1, x, y, 2]);
// - '[1,nan,inf,2]

// example 2:
const client = http_client.new_() as unknown as { curl: unknown };
json.encode(client.curl);
// - error: unsupported Lua type 'userdata'
json.encode(client.curl, { encode_use_tostring: true });
// - '"userdata: 0x010a4ef2a0"'

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/json/#lua-data.json.NULL

// When nil is assigned to a Lua-table field, the field is null
const a = { 1: null, 2: 'a', 3: 'b' };
// - - null
//   - a
//   - b

// When json.NULL is assigned to a Lua-table field, the field is json.NULL
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
[json.NULL, 'a', 'b'];
// - - null
//   - a
//   - b

// When json.NULL is assigned to a JSON field, the field is null
json.encode({ field2: json.NULL, field1: 'a', field3: 'c' });
// - '{"field2":null,"field1":"a","field3":"c"}'
