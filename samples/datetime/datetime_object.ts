// https://www.tarantool.io/en/doc/latest/reference/reference_lua/datetime/datetime_object/

import * as datetime from 'datetime';

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/datetime/datetime_object/#lua-function.datetime_object.totable
let dt = datetime.new_({
    sec: 20,
    min: 25,
    hour: 18,
    day: 20,
    month: 8,
    year: 2021,
});
dt.totable();
// - sec: 20
//   min: 25
//   yday: 232
//   day: 20
//   nsec: 0
//   isdst: false
//   wday: 6
//   tzoffset: 0
//   month: 8
//   year: 2021
//   hour: 18


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/datetime/datetime_object/#lua-function.datetime_object.format
dt = datetime.new_({
    nsec: 123456789,
    sec: 20,
    min: 25,
    hour: 18,
    day: 20,
    month: 8,
    year: 2021,
    tzoffset: 180,
});
dt.format('%d.%m.%y %H:%M:%S.%5f'); // 20.08.21 18:25:20.12345
dt.format(); // 2021-08-20T18:25:20.123456789+0300
dt.format('%FT%T.%f%z'); // 2021-08-20T18:25:20.123456789+0300


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/datetime/datetime_object/#lua-function.datetime_object.set
dt = datetime.new_({
    nsec: 123456789,
    sec: 20,
    min: 25,
    hour: 18,
    day: 20,
    month: 8,
    year: 2021,
    tzoffset: 180,
});
dt.set({ msec: 567 }); // 2021-08-20T18:25:20.567+0300
dt.set({ tzoffset: 60 }); // 2021-08-20T18:25:20.567+0100


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/datetime/datetime_object/#lua-function.datetime_object.parse
datetime.parse('1970-01-01T00:00:00Z'); // 1970-01-01T00:00:00Z
datetime.parse('1970-01-01T00:00:00', { format: 'iso8601', tzoffset: 180 }); // 1970-01-01T00:00:00+0300
datetime.parse('2017-12-27T18:45:32.999999-05:00', { format: 'rfc3339' }); // 2017-12-27T18:45:32.999999-0500
datetime.parse('Thu Jan  1 03:00:00 1970', { format: '%c' }); // 1970-01-01T03:00:00Z
datetime.parse('12/31/2020', { format: '%m/%d/%y' }); // 2020-12-31T00:00:00Z
datetime.parse('1970-01-01T03:00:00.125000000+0300', { format: '%FT%T.%f%z' }); // 1970-01-01T03:00:00.125+0300


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/datetime/datetime_object/#lua-function.datetime_object.add
// Example 1:
dt = datetime.new_({
    day: 26,
    month: 8,
    year: 2021,
    tzoffset: 180,
}); // 2021-08-26T00:00:00+0300
let iv = datetime.interval.new_({ day: 7 }); // - +7 days
dt.add(iv); // 2021-09-02T00:00:00+0300
dt.add({ day: 7 }); // 2021-09-09T00:00:00+0300

// Example 2:
dt = datetime.new_({
    day: 29,
    month: 2,
    year: 2020,
});
dt.add({ month: 1, adjust: 'none' }); // 2020-03-29T00:00:00Z
dt = datetime.new_({
    day: 29,
    month: 2,
    year: 2020,
});
dt.add({ month: 1, adjust: 'last' }); // 2020-03-31T00:00:00Z
dt = datetime.new_({
    day: 31,
    month: 1,
    year: 2020,
});
dt.add({ month: 1, adjust: 'excess' }); // 2020-03-02T00:00:00Z


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/datetime/datetime_object/#lua-function.datetime_object.sub
dt = datetime.new_({
    day: 26,
    month: 8,
    year: 2021,
    tzoffset: 180,
}); // 2021-08-26T00:00:00+0300
iv = datetime.interval.new_({ day: 5 }); // +5 days
dt.sub(iv); // 2021-08-21T00:00:00+0300
dt.sub({ day: 1 }); // 2021-08-20T00:00:00+0300
