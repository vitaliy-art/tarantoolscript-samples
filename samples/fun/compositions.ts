// https://luafun.github.io/compositions.html

import {
    chain,
    cycle,
    each,
    enumerate,
    partition,
    rands,
    range,
    take,
    zip,
} from "fun";

// https://luafun.github.io/compositions.html#fun.zip
each(print, zip(["a", "b", "c", "d"], ["one", "two", "three"]));
// a one
// b two
// c three

each(print, zip());
//

each(print, zip(range(5), ["a", "b", "c"], rands()));
// 1       a       0.57514179487402
// 2       b       0.79693061238668
// 3       c       0.45174307459403

each(print, zip(...partition((x) => x > 7, range(1, 15, 1))));
// 8       1
// 9       2
// 10      3
// 11      4
// 12      5
// 13      6
// 14      7

// https://luafun.github.io/compositions.html#fun.cycle
each(print, take(15, cycle(range(5))));
// 1
// 2
// 3
// 4
// 5
// 1
// 2
// 3
// 4
// 5
// 1
// 2
// 3
// 4
// 5

each(print, take(15, cycle(zip(range(5), ["a", "b", "c", "d", "e"]))));
// 1       a
// 2       b
// 3       c
// 4       d
// 5       e
// 1       a
// 2       b
// 3       c
// 4       d
// 5       e
// 1       a
// 2       b
// 3       c
// 4       d
// 5       e

// https://luafun.github.io/compositions.html#fun.chain
each(print, chain(range(2), ["a", "b", "c"], ["one", "two", "three"]));
// 1
// 2
// a
// b
// c
// one
// two
// three

each(
    print,
    take(15, cycle(chain(enumerate(["a", "b", "c"]), ["one", "two", "three"])))
);
// 1       a
// 2       b
// 3       c
// one
// two
// three
// 1       a
// 2       b
// 3       c
// one
// two
// three
// 1       a
// 2       b
// 3       c
