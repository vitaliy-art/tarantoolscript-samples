// https://www.tarantool.io/en/doc/latest/reference/reference_lua/strict/

import * as strict from 'strict';

declare const b: unknown;

strict.on();

let a = b; // strict mode is on so this will cause an error
// - error: ... variable ''b'' is not declared'

strict.off();

a = b; // strict mode is off so this will not cause an error
