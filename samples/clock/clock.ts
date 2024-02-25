// https://www.tarantool.io/en/doc/latest/reference/reference_lua/clock/

import * as clock from 'clock';


// This will print an approximate number of years since 1970:
print(clock.time() / (365 * 24 * 60 * 60));


// This will print nanoseconds since the start:
print(clock.monotonic64());


// This will print nanoseconds in the CPU since the start:
print(clock.proc64());


// This will print seconds in the thread since the start:
print(clock.thread64());


// Benchmark a function which sleeps 10 seconds.
// NB: bench() will not calculate sleep time.
// So the returned value will be {a number less than 10, 88}.
/** @todo implement fiber module */
