// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#checks-union-type

// You can import module directly and use function checks: checks.checks
// import * as checks from 'checks';
// Or you can import Checks as type, declare constant checks and use it directly
import { Checks } from 'tarantoolscript';

import * as datetime from 'datetime';
import * as decimal from 'decimal';
import { Box, Checkers } from 'tarantoolscript';
import * as uuid from 'uuid';

declare const checks: Checks;
declare const checkers: Checkers;
declare const box: Box;


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#one-argument
function greet(this: void, name: string) {
    checks('string');
    return `Hello, ${name}`;
}
/**
 * greet('John')
 * // returns 'Hello, John'
 *
 * greet(123)
 * // raises an error: bad argument #1 to nil (string expected, got number)
 */


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#multiple-arguments
function greet_fullname(this: void, firstname: string, lastname: string) {
    checks('string', 'string');
    return `Hello, ${firstname} ${lastname}`;
}
/**
 * greet_fullname('John', 'Smith')
 * // returns 'Hello, John Smith'
 *
 * greet_fullname('John', 1)
 * // raises an error: bad argument #2 to nil (string expected, got number)
 */


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#variable-number-of-arguments
function extra_arguments_num(this: void, a: string, b: number, ...$vararg: unknown[]) {
    checks('string', 'number');
    return select('#', ...$vararg);
}
/**
 * extra_arguments_num('a', 2, 'c')
 * // returns 1
 *
 * extra_arguments_num('a', 'b', 'c')
 * // raises an error: bad argument #1 to nil (string expected, got number)
 */


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#tarantool-types
function sqrt(this: void, value: decimal.DecimalNumber) {
    checks('decimal');
    return decimal.sqrt(value);
}
/**
 * sqrt(decimal.new(16))
 * // returns 4
 *
 * sqrt(16)
 * // raises an error: bad argument #1 to nil (decimal expected, got number)
 */


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#custom-function
checkers.set('positive', function(this: void, value: unknown) {
    return (type(value) == 'number') && (value as number > 0);
});

function get_doubled_number(this: void, value: number) {
    checks('positive');
    return value * 2;
}
/**
 * get_doubled_number(10)
 * // returns 20
 *
 * get_doubled_number(-5)
 * // raises an error: bad argument #1 to nil (positive expected, got number)
 */


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#metatable-type
const blue = setmetatable([0, 0, 255], { __type: 'color' } as object);
function get_blue_value(this: void, color: number[]) {
    checks('color');
    return color[2];
}
/**
 * get_blue_value(blue)
 * // returns 255
 *
 * get_blue_value({0, 0, 255})
 * // raises an error: bad argument #1 to nil (color expected, got table)
 */


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#union-types
function get_argument_type(this: void, value: number | string) {
    checks('number|string');
    return type(value);
}
/**
 * get_argument_type(1)
 * // returns 'number'
 *
 * get_argument_type('key1')
 * // returns 'string'
 *
 * get_argument_type(true)
 * // raises an error: bad argument #1 to nil (number|string expected, got boolean)
 */


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#optional-types
function greet2(this: void, name?: string) {
    checks('?string');
    if (name != null) {
        return `Hello, ${name}`;
    } else {
        return 'Hello from Tarantool';
    }
}
/**
 * greet('John')
 * // returns 'Hello, John'
 *
 * greet()
 * // returns 'Hello from Tarantool'
 *
 * greet(123)
 * // raises an error: bad argument #1 to nil (string expected, got number)
 */


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#skipping-argument-checking
function greet_fullname_any(this: void, firstname: string, lastname: unknown) {
    checks('string', '?');
    return `Hello, ${firstname} ${lastname}`;
}
/**
 * greet_fullname_any('John', 'Doe')
 * // returns 'Hello, John Doe'
 *
 * greet_fullname_any('John', 1)
 * // returns 'Hello, John 1'
 */


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#table-type-qualifier
// The code below checks that the first and second table values have the string and number types.
function configure_connection(this: void, options: [string, number]) {
    checks(['string', 'number']);
    const ip_address = options[0] || '127.0.0.1';
    const port = options[1] || 3301;
    return `${ip_address}:${port}`;
}
/**
 * configure_connection({'0.0.0.0', 3303})
 * // returns '0.0.0.0:3303'
 *
 * configure_connection({'0.0.0.0', '3303'})
 * // raises an error: bad argument options[2] to nil (number expected, got string)
 */

// In the next example, the same checks are made for the specified keys.
function configure_connection_opts(this: void, options: { ip_address: string, port: number }) {
    checks({ ip_address: 'string', port: 'number' });
    const ip_address = options.ip_address || '127.0.0.1';
    const port = options.port || 3301;
    return `${ip_address}:${port}`;
}
/**
 * configure_connection_opts({ip_address = '0.0.0.0', port = 3303})
 * // returns '0.0.0.0:3303'
 *
 * configure_connection_opts({ip_address = '0.0.0.0', port = '3303'})
 * // raises an error: bad argument options.port to nil (number expected, got string)
 *
 * configure_connection_opts({login = 'testuser', ip_address = '0.0.0.0', port = 3303})
 * // raises an error: unexpected argument options.login to nil
 */


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#lua-function.checkers.datetime
const is_datetime = checkers.datetime(datetime.new_({ day: 1, month: 6, year: 2023 }));
const is_interval = checkers.interval(datetime.interval.new_({ day: 1 }));


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#lua-function.checkers.decimal
const is_decimal = checkers.decimal(decimal.new_(16));


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#lua-function.checkers.error
const server_error = box.error.new({ code: 500, reason: 'Server error' });
const is_error = checkers.error(server_error);


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#lua-function.checkers.int64
const is_int64 = checkers.int64(-1024);
const is_uint64 = checkers.uint64(2048);


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#lua-function.checkers.tuple
const is_tuple = checkers.tuple(box.tuple.new([1, 'The Beatles', 1960]));


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/checks/#lua-function.checkers.uuid
const is_uuid = checkers.uuid(uuid.new_());
const is_uuid_bin = checkers.uuid_bin(uuid.bin());
const is_uuid_str = checkers.uuid_str(uuid.str());
