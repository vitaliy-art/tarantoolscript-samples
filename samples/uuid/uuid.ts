// https://www.tarantool.io/en/doc/latest/reference/reference_lua/uuid/

import { Box } from 'tarantoolscript';
import * as uuid from 'uuid';

declare const box: Box;


// For example, to create such index for a space named test, say:
box.space.get('test').create_index('pk', { parts: [{ field: 1, type: 'uuid' }] });

// Now you can insert UUIDs into the space:
box.space.get('test').insert([uuid.new_()]);
// - [e631fdcc-0e8a-4d2f-83fd-b0ce6762b13f]

box.space.get('test').insert([uuid.fromstr('64d22e4d-ac92-4a23-899a-e59f34af5479')]);
// - [64d22e4d-ac92-4a23-899a-e59f34af5479]

box.space.get('test').select();
// - - [64d22e4d-ac92-4a23-899a-e59f34af5479]
//   - [e631fdcc-0e8a-4d2f-83fd-b0ce6762b13f]


// Example:
uuid.__call();
// - 16ffedc8-cbae-4f93-a05e-349f3ab70baa

uuid.bin();
// - !!binary FvG+Vy1MfUC6kIyeM81DYw==

uuid.str();
// - 67c999d2-5dce-4e58-be16-ac1bcb93160f

const uu = uuid.__call();

uu.bin().length;
// - 16

uu.str().length;
// - 36

type(uu);
// - cdata

uu.isnil();
// - false
