/* eslint-disable @typescript-eslint/no-unused-expressions */
// https://www.tarantool.io/en/doc/latest/reference/reference_lua/utf8/

import { Utf8 } from 'tarantoolscript';

declare const utf8: Utf8;

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/utf8/#lua-function.utf8.casecmp
utf8.casecmp('é', 'e'), utf8.casecmp('E', 'e');
// - 0
// - 0

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/utf8/#lua-function.utf8.char
utf8.char(229);
// - å

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/utf8/#lua-function.utf8.cmp
utf8.cmp('é', 'e'), utf8.cmp('E', 'e');
// - 1
// - 1

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/utf8/#lua-function.utf8.isalpha
utf8.isalpha('Ж'), utf8.isalpha('å'), utf8.isalpha('9');
// - true
// - true
// - false

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/utf8/#lua-function.utf8.isdigit
utf8.isdigit('Ж'), utf8.isdigit('å'), utf8.isdigit('9');
// - false
// - false
// - true

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/utf8/#lua-function.utf8.islower
utf8.islower('Ж'), utf8.islower('å'), utf8.islower('9');
// - false
// - true
// - false

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/utf8/#lua-function.utf8.isupper
utf8.isupper('Ж'), utf8.isupper('å'), utf8.isupper('9');
// - true
// - false
// - false

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/utf8/#lua-function.utf8.len
utf8.len('G'), utf8.len('ж');
// - 1
// - 1

string.len('G'), string.len('ж');
// - 1
// - 2

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/utf8/#lua-function.utf8.lower
utf8.lower('ÅΓÞЖABCDEFG');
// - åγþжabcdefg

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/utf8/#lua-function.utf8.next
// show next-character position + first-character codepoint
utf8.next('åa', 1);
// - 3
// - 229

// (loop) show codepoint of every character
// ???

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/utf8/#lua-function.utf8.sub
utf8.sub('åγþжabcdefg', 5, 8);
// - abcd

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/utf8/#lua-function.utf8.upper
utf8.upper('åγþжabcdefg');
// - ÅΓÞЖABCDEFG
