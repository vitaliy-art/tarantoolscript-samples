/* eslint-disable @typescript-eslint/no-unused-expressions */
// https://www.tarantool.io/en/doc/latest/reference/reference_lua/crypto

import * as crypto from 'crypto';
import * as digest from 'digest';

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/crypto/#lua-varfunc.crypto.cipher.%7Baes128%7Caes192%7Caes256%7Cdes%7D.%7Bcbc%7Ccfb%7Cecb%7Cofb%7D.decrypt
const _16byte_iv = '1234567890123456';
const _16byte_pass = '1234567890123456';
const e = crypto.cipher.aes128.cbc.encrypt('string', _16byte_pass, _16byte_iv);
crypto.cipher.aes128.cbc.decrypt(e, _16byte_pass, _16byte_iv);

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/crypto/#lua-varfunc.crypto.digest.%7Bsha1%7Csha224%7Csha256%7Csha384%7Csha512%7D
crypto.digest.md4('string');
crypto.digest.sha512('string');

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/crypto/#lua-varfunc.crypto.hmac.%7Bsha1%7Csha224%7Csha256%7Csha384%7Csha512%7D
crypto.hmac.md4('key', 'string');
crypto.hmac.md4_hex('key', 'string');

//https://www.tarantool.io/en/doc/latest/reference/reference_lua/crypto/#incremental-methods-in-the-crypto-module
// print aes-192 digest of 'AB', with one step, then incrementally
const key = 'key/key/key/key/key/key/';
const iv = 'iviviviviviviviv';
print(crypto.cipher.aes192.cbc.encrypt('AB', key, iv));
let c = crypto.cipher.aes192.cbc.encrypt.new(key);
c.init(undefined, iv);
c.update('A');
c.update('B');
print(c.result());
c.free();
// print sha-256 digest of 'AB', with one step, then incrementally
print(crypto.digest.sha256('AB'));
c = crypto.digest.sha256.new();
c.init();
c.update('A');
c.update('B');
print(c.result());
c.free();

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/crypto/#getting-the-same-results-from-digest-and-crypto-modules
declare const b32: string;
declare const b16: string;
crypto.cipher.aes256.cbc.encrypt('x', b32, b16) ==
    digest.aes256cbc.encrypt('x', b32, b16);
crypto.digest.md4('string') == digest.md4('string');
crypto.digest.md5('string') == digest.md5('string');
crypto.digest.sha1('string') == digest.sha1('string');
crypto.digest.sha224('string') == digest.sha224('string');
crypto.digest.sha256('string') == digest.sha256('string');
crypto.digest.sha384('string') == digest.sha384('string');
crypto.digest.sha512('string') == digest.sha512('string');
