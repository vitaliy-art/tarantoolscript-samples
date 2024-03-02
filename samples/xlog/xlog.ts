// https://www.tarantool.io/en/doc/latest/reference/reference_lua/xlog/

import * as xlog from 'xlog';


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/xlog/#lua-function.xlog.pairs
const smt = setmetatable as (this: void, obj: unknown, mt: { __serialize: string }) => unknown;
const t: unknown[] = [];
for (const [k, v] of xlog.pairs('00000000000000000000.xlog')) {
    table.insert(t, smt(v, { __serialize: 'map' }));
}

export default t;
