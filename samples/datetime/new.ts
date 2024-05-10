// https://www.tarantool.io/en/doc/latest/reference/reference_lua/datetime/new/

import * as datetime from 'datetime';

datetime.new_({
    nsec: 123456789,
    sec: 20,
    min: 25,
    hour: 18,
    day: 20,
    month: 8,
    year: 2021,
    tzoffset: 180,
});
// 2021-08-20T18:25:20.123456789+0300

datetime.new_({
    nsec: 123456789,
    sec: 20,
    min: 25,
    hour: 18,
    day: 20,
    month: 8,
    year: 2021,
    tzoffset: 60,
    tz: 'Europe/Moscow',
});
// 2021-08-20T18:25:20.123456789 Europe/Moscow

datetime.new_({
    day: -1,
    month: 2,
    year: 2021,
});
// 2021-02-28T00:00:00Z

datetime.new_({
    timestamp: 1656664205.123,
    tz: 'Europe/Moscow',
});
// 2022-07-01T08:30:05.122999906 Europe/Moscow

datetime.new_({
    nsec: 123,
    timestamp: 1656664205,
    tz: 'Europe/Moscow',
});
// 2022-07-01T08:30:05.000000123 Europe/Moscow
