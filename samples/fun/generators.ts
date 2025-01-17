// https://luafun.github.io/generators.html

import * as fun from 'fun';

// https://luafun.github.io/generators.html#fun.range
for (const [_it, v] of fun.range(5)) {
    print(v);
}
// 1
// 2
// 3
// 4
// 5

for (const [_it, v] of fun.range(-5)) {
    print(v);
}
// -1
// -2
// -3
// -4
// -5

for (const [_it, v] of fun.range(1, 6)) {
    print(v);
}
// 1
// 2
// 3
// 4
// 5
// 6

for (const [_it, v] of fun.range(0, 20, 5)) {
    print(v);
}
// 0
// 5
// 10
// 15
// 20

for (const [_it, v] of fun.range(0, 10, 3)) {
    print(v);
}
// 0
// 3
// 6
// 9

for (const [_it, v] of fun.range(0, 1.5, 0.2)) {
    print(v);
}
// 0
// 0.2
// 0.4
// 0.6
// 0.8
// 1
// 1.2
// 1.4

for (const [_it, v] of fun.range(0)) {
    print(v);
}

for (const [_it, v] of fun.range(1)) {
    print(v);
}
// 1

for (const [_it, v] of fun.range(1, 0)) {
    print(v);
}
// 1
// 0

for (const [_it, v] of fun.range(0, 10, 0)) {
    print(v);
}
// error: step must not be zero

// https://luafun.github.io/generators.html#fun.duplicate
fun.each(print, fun.take(3, fun.duplicate('a', 'b', 'c')));
// a       b       c
// a       b       c
// a       b       c

fun.each(print, fun.take(3, fun.duplicate('x')));
// x
// x
// x

for (const [_it, a, b, c, d, e] of fun.take(
    3,
    fun.duplicate(1, 2, 'a', 3, 'b')
)) {
    print(a, b, c, d, e);
}
// 1       2       a       3       b
// 1       2       a       3       b
// 1       2       a       3       b

// https://luafun.github.io/generators.html#fun.tabulate
fun.each(
    print,
    fun.take(
        5,
        fun.tabulate((x) => $multi('a', 'b', 2 * x))
    )
);
// a       b       0
// a       b       2
// a       b       4
// a       b       6
// a       b       8

fun.each(
    print,
    fun.take(
        5,
        fun.tabulate((x) => $multi(x ** 2))
    )
);
// 0
// 1
// 4
// 9
// 16

// https://luafun.github.io/generators.html#fun.zeros
fun.each(print, fun.take(5, fun.zeros()));
// 0
// 0
// 0
// 0
// 0

// https://luafun.github.io/generators.html#fun.ones
fun.each(print, fun.take(5, fun.ones()));
// 1
// 1
// 1
// 1
// 1

// https://luafun.github.io/generators.html#fun.rands
fun.each(print, fun.take(10, fun.rands(10, 20)));
// 19
// 17
// 11
// 19
// 12
// 13
// 14
// 16
// 10
// 11

fun.each(print, fun.take(5, fun.rands(10)));
// 7
// 6
// 5
// 9
// 0

fun.each(print, fun.take(5, fun.rands()));
// 0.79420629243124
// 0.69885246563716
// 0.5901037417281
// 0.7532286166836
// 0.080971251199854
