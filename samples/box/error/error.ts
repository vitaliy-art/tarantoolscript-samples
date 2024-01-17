// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_error/error/

import { Box, ErrorObject } from 'tarantoolscript';

declare const box: Box;

// Creating an error
const custom_error = box.error.new({ code: 500, reason: 'Internal server error' });
box.error(custom_error);
// --[[
// ---
// - error: Internal server error
// ...
// --]]

// Raising an error
box.error({ code: 500, reason: 'Internal server error' });
// --[[
// ---
// - error: Custom server error
// ...
// --]]

box.error({
    code: 500,
    reason: 'Internal server error',
    type: 'CustomInternalError',
});
// --[[
// ---
// - error: Internal server error
// ...
// --]]

box.error('CustomConnectionError', 'cannot connect to the given port');
// --[[
// ---
// - error: cannot connect to the given port
// ...
// --]]

box.error('CustomConnectionError', '%s cannot connect to the port %u', 'client', 8080);
// --[[
// ---
// - error: client cannot connect to the port 8080
// ...
// --]]

box.error(box.error.READONLY);
// --[[
// ---
// - error: Can't modify data on a read-only instance
// ...
// --]]

box.error(box.error.NO_SUCH_USER, 'John');
// --[[
// ---
// - error: User 'John' is not found
// ...
// --]]

box.error(box.error.CREATE_SPACE, 'my_space', 'the space already exists');
// --[[
// ---
// - error: 'Failed to create space ''my_space'': the space already exists'
// ...
// --]]

// Getting the last error
box.error.last();
// --[[
// ---
// - error: Internal server error
// ...
// --]]

// Obtaining error details
box.error.last()?.unpack();
// --[[
// ---
// - code: 500
//     base_type: CustomError
//     type: CustomInternalError
//     custom_type: CustomInternalError
//     message: Internal server error
//     trace:
//     - file: '[string "custom_error = box.error.new({ code = 500,..."]'
//     line: 1
// ...
// --]]

// Setting the last error
// Create two errors
const error1 = box.error.new({ code: 500, reason: 'Custom error 1' });
const error2 = box.error.new({ code: 500, reason: 'Custom error 2' });

// Raise the first error
box.error(error1);
// --[[
// ---
// - error: Custom error 1
// ...
// --]]

// Get the last error
box.error.last();
// --[[
// ---
// - Custom error 1
// ...
// --]]

// Set the second error as the last error
box.error.set(error2);

// Get the last error
box.error.last();
// --[[
// ---
// - Custom error 2
// ...
// --]]

// Error lists
const base_server_error = box.error.new({
    code: 500,
    reason: 'Base server error',
    type: 'BaseServerError',
});
const storage_server_error = box.error.new({
    code: 507,
    reason: 'Not enough space',
    type: 'StorageServerError',
});

base_server_error.set_prev(storage_server_error);

box.error(base_server_error);
// --[[
// ---
// - error: Base server error
// ...
// --]]

box.error.last()?.prev?.unpack();
// --[[
// ---
// - code: 507
//     base_type: CustomError
//     type: StorageServerError
//     custom_type: StorageServerError
//     message: Not enough storage
//     trace:
//     - file: '[string "storage_server_error = box.error.new({ code =..."]'
//     line: 1
// ...
// --]]

storage_server_error.set_prev(base_server_error);
// --[[
// ---
// - error: 'builtin/error.lua:120: Cycles are not allowed'
// ...
// --]]

declare const e1: ErrorObject, e2: ErrorObject, e3: ErrorObject, e4: ErrorObject, e5: ErrorObject;
// e1 -> e2 -> e3 -> e4
e1.set_prev(e2);
e2.set_prev(e3);
e3.set_prev(e4);
e2.set_prev(e5);
// there are two lists: e1 -> e2 -> e5 and e3 -> e4

// Clearing errors
box.error.clear();
box.error.last();
// --[[
// ---
// - null
// ...
// --]]

