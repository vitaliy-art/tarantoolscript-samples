// https://www.tarantool.io/en/doc/latest/reference/reference_lua/fiber/

import * as fiber from 'fiber';
import * as clock from 'clock';
import { Box } from 'tarantoolscript';

declare const box: Box;

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/fiber/#lua-function.fiber.create
function greet(this: void, name: string) {
    print('Hello, ' + name);
}

const greet_fiber = fiber.create(greet, 'John');
print('Fiber already started');

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/fiber/#lua-function.fiber.new
function greet2(this: void, name: string) {
    print('Hello, ' + name);
}

const greet_fiber2 = fiber.new_(greet2, 'John');
print('Fiber not started yet');

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/fiber/#lua-function.fiber.self
fiber.self();
// - status: running
//   name: interactive
//   id: 101

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/fiber/#lua-function.fiber.find
fiber.find(101);
// - status: running
//   name: interactive
//   id: 101

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/fiber/#lua-function.fiber.sleep
let counter = 0;
function increment(this: void, period: number) {
    while (true) {
        counter++;
        fiber.sleep(period);
    }
}

const increment_fiber = fiber.create(increment, 2);
increment_fiber.cancel();

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/fiber/#lua-function.fiber.yield
function greet3(this: void) {
    while (true) {
        print('Enter a name:');
        const name = io.read();
        print(`Hello, ${name}. I am fiber ${fiber.id()}`);
        fiber.yield();
    }
}

for (const i of $range(1, 2)) {
    const fiber_object = fiber.create(greet3);
    fiber_object.cancel();
}

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/fiber/#lua-function.fiber.set_max_slice
fiber.set_max_slice({ warn: 1.5, err: 3 });
const time = clock.monotonic();
function long_operation(this: void) {
    while (clock.monotonic() - time < 5) {
        fiber.check_slice();
    }
}

const long_operation_fiber = fiber.create(long_operation);
// Output:
// fiber has not yielded for more than 1.500 seconds
// FiberSliceIsExceeded: fiber slice is exceeded

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/fiber/#lua-function.fiber.set_slice
const time2 = clock.monotonic();
function long_operation2(this: void) {
    fiber.set_slice({ warn: 1.5, err: 3 });
    while (clock.monotonic() - time2 < 5) {
        fiber.check_slice();
    }
}

const long_operation_fiber2 = fiber.create(long_operation2);
// Output:
// fiber has not yielded for more than 1.500 seconds
// FiberSliceIsExceeded: fiber slice is exceeded

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/fiber/#lua-function.fiber.extend_slice
fiber.set_max_slice({ warn: 1.5, err: 3 });
const time3 = clock.monotonic();
function long_operation3(this: void) {
    fiber.extend_slice({ warn: 0.5, err: 1 });
    while (clock.monotonic() - time3 < 5) {
        fiber.check_slice();
    }
}

const long_operation_fiber3 = fiber.create(long_operation3);
// Output:
// fiber has not yielded for more than 2.000 seconds
// FiberSliceIsExceeded: fiber slice is exceeded

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/fiber/#lua-data.fiber_object.storage
function greet4(this: void) {
    while (true) {
        print('Enter a name:');
        const name = io.read();
        if (name != 'bye') {
            fiber.self().storage.set('name', name);
            print(`Hello, ${name}`);
        } else {
            print(`Goodbye, ${fiber.self().storage.get('name')}`);
            fiber.self().cancel();
        }
    }
}

const fiber_object2 = fiber.create(greet4);

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/fiber/#lua-function.fiber_object.join
function add(this: void, a: number, b: number): number {
    return a + b;
}

const add_fiber = fiber.new_(add, 5, 6);
add_fiber.set_joinable(true);
const [is_success, result] = add_fiber.join();
print(`Is successful: ${is_success}`);
print(`Returned value: ${result}`);

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/fiber/#example-of-yield-failure
function function_name(this: void) {
    while (true) {
        print('before testcancel');
        fiber.testcancel();
        print('before yield');
        fiber.yield();
    }
}

const fiber_object3 = fiber.create(function_name);
fiber.sleep(0.1);
fiber_object3.cancel();

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/fiber/#example
const channel = fiber.channel(10);
function consumer_fiber(this: void) {
    while (true) {
        const task = channel.get();
        // ...
    }
}

function consumer2_fiber(this: void) {
    while (true) {
        // 10 seconds
        const task = channel.get(10);
        if (task != undefined) {
            // ...
        } else {
            // timeout
        }
    }
}

function producer_fiber(this: void) {
    while (true) {
        const [task] = box.space.get('some_space').select();
        // ...
        if (channel.is_empty()) {
            // channel is empty
        }

        if (channel.is_full()) {
            // channel is full
        }

        if (channel.has_readers()) {
            // there are some fibers that are waiting for data
        }

        if (channel.has_writers()) {
            // there are some fibers that are waiting for readers
        }

        channel.put(task);
    }
}

function producer2_fiber(this: void) {
    while (true) {
        const [task] = box.space.get('some_other_space').select();
        // 10 seconds
        if (channel.put(task, 10)) {
            // ...
        } else {
            // timeout
        }
    }
}
