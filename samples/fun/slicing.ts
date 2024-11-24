// https://luafun.github.io/slicing.html#fun.nth

import * as fun from "fun";

// https://luafun.github.io/slicing.html#fun.nth
print(...fun.nth(2, fun.range(5)));
// 2

print(...fun.nth(10, fun.range(5)));
// nil

print(fun.nth(2, ["a", "b", "c", "d", "e"]));
// b

print(...fun.nth(2, fun.drop_n(3, ["a", "b", "c", "d", "e"])));
// e

print(...fun.nth(2, fun.enumerate(["a", "b", "c", "d", "e"])));
// 2 b

// https://luafun.github.io/slicing.html#fun.head
print(fun.head(["a", "b", "c", "d", "e"]));
// a

print(fun.head([]));
// error: head: iterator is empty

print(...fun.head(fun.range(0)));
// error: head: iterator is empty

print(...fun.head(fun.enumerate(["a", "b"])));
// 1 a

// https://luafun.github.io/slicing.html#fun.tail
fun.each(print, fun.tail(["a", "b", "c", "d", "e"]));
// b
// c
// d
// e

fun.each(print, fun.tail([]));
fun.each(print, fun.tail(fun.range(0)));
fun.each(print, fun.tail(fun.enumerate(["a", "b", "c"])));
// 2 b
// 3 c

// https://luafun.github.io/slicing.html#fun.take_n
fun.each(print, fun.take_n(5, fun.range(10)));
// 1
// 2
// 3
// 4
// 5

fun.each(print, fun.take_n(5, fun.enumerate(fun.duplicate("x"))));
// 1 x
// 2 x
// 3 x
// 4 x
// 5 x

// https://luafun.github.io/slicing.html#fun.take_while
fun.each(
    print,
    fun.take_while((x) => x < 5, fun.range(10))
);
// 1
// 2
// 3
// 4

fun.each(
    print,
    fun.take_while((i, a) => i != a, fun.enumerate([5, 3, 4, 4, 2]))
);
// 1       5
// 2       3
// 3       4

// https://luafun.github.io/slicing.html#fun.drop_n
fun.each(print, fun.drop_n(2, fun.range(5)));
// 3
// 4
// 5

fun.each(print, fun.drop_n(2, fun.enumerate(["a", "b", "c", "d", "e"])));
// 3       c
// 4       d
// 5       e

// https://luafun.github.io/slicing.html#fun.drop_while
fun.each(
    print,
    fun.drop_while((x) => x < 5, fun.range(10))
);
// 5
// 6
// 7
// 8
// 9
// 10

// https://luafun.github.io/slicing.html#fun.drop
fun.each(print, fun.zip(...fun.span((x) => x < 5, fun.range(10))));
// 1       5
// 2       6
// 3       7
// 4       8

fun.each(print, fun.zip(...fun.span(5, fun.range(10))));
// 1       6
// 2       7
// 3       8
// 4       9
// 5       10
