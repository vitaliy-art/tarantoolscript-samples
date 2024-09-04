// https://www.tarantool.io/en/doc/latest/reference/reference_lua/digest/

import * as digest from 'digest';
import { Box } from 'tarantoolscript';

declare const box: Box;

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/digest/#incremental-methods-in-the-digest-module
// print crc32 of 'AB', with one step, then incrementally:
print(digest.crc32('AB'));
const c = digest.crc32.new_();
c.update('A');
c.update('B');
print(c.result());

// print murmur hash of 'AB', with one step, then incrementally
print(digest.murmur('AB'));
const m = digest.murmur.new_();
m.update('A');
m.update('B');
print(m.result());


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/digest/#example
// Example:
function password_insert(this: void) {
    box.space.get('tester').insert([1234, digest.sha1('^S^e^c^ret Wordpass')]);
    return 'OK';
}

function password_check(this: void, password: string) {
    const [t,] = box.space.get('tester').select([12345]);
    if (digest.sha1(password) == t![0][2]) {
        return 'Password is valid';
    } else {
        return 'Password is not valid';
    }
}

password_insert(); // 'OK'
password_check('Secret Password'); // 'Password is not valid'
