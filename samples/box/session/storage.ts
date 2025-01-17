// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_session/storage/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.session.peer(box.session.id());
// - 127.0.0.1:45129

// eslint-disable-next-line quotes
box.session.storage.set('random_memorandum', "Don't forget the eggs");

box.session.storage.set('radius_of_mars', 3396);

let m = '';

for (const [k, v] of pairs(box.session.storage)) {
    m = m + k + '=' + v + ' ';
}

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
m;
// - 'radius_of_mars=3396 random_memorandum=Don't forget the eggs. '
