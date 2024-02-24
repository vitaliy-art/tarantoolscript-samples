// https://www.tarantool.io/en/doc/latest/reference/reference_lua/csv/

import * as csv from 'csv';
import { CsvOptions, CsvReadable } from 'tarantoolscript';

// Readable string has 3 fields, field#2 has comma and space so use quote marks:
csv.load('a,"b,c",d');
// - - - a
//     - 'b,c '
//     - d


// Readable string contains 2-byte character = Cyrillic Letter Palochka: (This displays a palochka if and only if character set = UTF-8.)
csv.load('a\\211\\128b');
// - - - a\211\128b


// Semicolon instead of comma for the delimiter:
csv.load('a,b;c,d', { delimiter: ';' });
// - - - a,b
//     - c,d


// Readable file ./file.csv contains two CSV records.
/** @todo implement module fio */


// CSV-table has 3 fields, field#2 has “,” so result has quote marks:
csv.dump(['a', 'b,c ', 'd']);
// - 'a,"b,c ",d
//
// '


// Round Trip: from string to table and back to string:
const csv_table = csv.load('a,b,v');
csv.dump(csv_table);
// - 'a,b,c
//
// '


// csv.iterate() is the low level of csv.load() and csv.dump().
// To illustrate that, here is a function which is the same as the csv.load() function, as seen in the Tarantool source code:
/** @noSelf */
const load = (readable: CsvReadable, opts?: CsvOptions) => {
    opts = opts || {};
    const result = [];
    for (const [i, tup] of csv.iterate(readable, opts)) {
        result[i-1] = tup;
    }

    return result;
};
load('a,b,c');
// - - - a
//     - b
//     - c
