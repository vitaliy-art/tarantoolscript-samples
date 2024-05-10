// https://www.tarantool.io/en/doc/latest/reference/reference_lua/datetime/interval_object/

import * as datetime from 'datetime';

const iv = datetime.interval.new_({ month: 1, adjust: 'last' });
iv.totable();
// - adjust: last
//   sec: 0
//   nsec: 0
//   day: 0
//   week: 0
//   hour: 0
//   month: 1
//   year: 0
//   min: 0
