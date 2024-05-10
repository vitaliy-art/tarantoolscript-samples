// https://www.tarantool.io/en/doc/latest/reference/reference_lua/datetime/interval_new/

import * as datetime from 'datetime';

datetime.interval.new_(); // 0 seconds

datetime.interval.new_({
    month: 6,
    year: 1,
}); // +1 years, 6 months

datetime.interval.new_({
    day: -1,
}); // -1 days
