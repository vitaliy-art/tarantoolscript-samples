// https://luafun.github.io/reducing.html

import {
    all,
    any,
    drop_n,
    each,
    foldl,
    is_null,
    is_prefix_of,
    iter,
    length,
    max,
    max_by,
    min,
    min_by,
    operator,
    product,
    range,
    sum,
    tomap,
    totable,
    zip,
} from 'fun';
import { FunIterator } from 'tarantoolscript';

// https://luafun.github.io/reducing.html#fun.foldl
print(foldl((acc: number, x) => acc + x, 0, range(5)));
// 15

print(foldl(operator.add, 0, range(5)));
// 15

print(
    foldl(
        (acc: number, x, y) => acc + x * y,
        0,
        zip<number, [number, number]>(range(1, 5), [4, 3, 2, 1])
    )
);
// 20

// https://luafun.github.io/reducing.html#fun.reduce
print(length(['a', 'b', 'c', 'd', 'e']));
// 5

print(length(drop_n(3, ['a', 'b', 'c', 'd', 'e'])));
// 2

print(length([]));
// 0

print(length(range(0)));
// 0

// https://luafun.github.io/reducing.html#fun.totable
let tab = totable('abcdef');
print(type(tab), tab.length);
// table 6
each(print, tab);
// a
// b
// c
// d
// e
// f

const table1 = range(3).totable();
print(table1[0]);
// 1

const table2 = iter({ a: 1, b: 2 }).totable();
print(table2[0]);
// a

// https://luafun.github.io/reducing.html#fun.tomap
tab = tomap(zip<number, [number, string]>(range(1, 7), 'abcdef'));
print(type(tab), tab.length);
// table   6
each(print, iter(tab));
// a
// b
// c
// d
// e
// f

const m = range(10).enumerate().tomap();
print(m.get(1));
// 1

const m2 = zip<number, [string, number]>('abc', range(1, 4)).tomap();
print(m2.get('b'));
// 2

// https://luafun.github.io/reducing.html#fun.is_prefix_of
print(is_prefix_of(['a'], ['a', 'b', 'c']));
// true

print(is_prefix_of(range(6), range(5)));
// false

// https://luafun.github.io/reducing.html#fun.is_null
print(is_null(['a', 'b', 'c', 'd', 'e']));
// false

print(is_null([]));
// true

print(is_null(range(0)));
// true

// https://luafun.github.io/reducing.html#fun.all
print(all((x) => x, [true, true, true, true]));
// true

print(all((x) => x, [true, true, true, false]));
// false

// https://luafun.github.io/reducing.html#fun.any
print(any((x) => x, [false, false, false, false]));
// false

print(any((x) => x, [false, false, false, true]));
// true

// https://luafun.github.io/reducing.html#fun.sum
print(sum(range(5)));
// 15

// https://luafun.github.io/reducing.html#fun.product
print(product(range(1, 5)));
// 120

// https://luafun.github.io/reducing.html#fun.min
print(min(range(1, 10, 1)));
// 1

print(min(['f', 'd', 'c', 'd', 'e']));
// c

print(min([]));
// error: min: iterator is empty

// https://luafun.github.io/reducing.html#fun.min_by
function min_cmp(this: void, a: number, b: number) {
    if (-a < -b) {
        return a;
    } else {
        return b;
    }
}
print(min_by(min_cmp, range(1, 10, 1)));
// 9

// https://luafun.github.io/reducing.html#fun.max
print(max(range(1, 10, 1)));
// 9

print(max(['f', 'd', 'c', 'd', 'e']));
// f

print(max([]));
// error: max: iterator is empty

// https://luafun.github.io/reducing.html#fun.max_by
function max_cmp(this: void, a: number, b: number) {
    if (-a > -b) {
        return a;
    } else {
        return b;
    }
}
print(max_by(max_cmp, range(1, 10, 1)));
// 1
