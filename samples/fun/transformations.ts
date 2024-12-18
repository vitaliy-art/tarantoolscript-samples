// https://luafun.github.io/transformations.html

import { each, enumerate, intersperse, map, range, zip } from "fun";

// https://luafun.github.io/transformations.html#fun.map
each(
    print,
    map((x) => 2 * x, range(4))
);
// 2
// 4
// 6
// 8

function fun(this: void, ...$vararg: unknown[]) {
    return $multi("map", ...$vararg);
}
each(print, map(fun, range(4)));
// map 1
// map 2
// map 3
// map 4

// https://luafun.github.io/transformations.html#fun.enumerate
each(print, enumerate(["a", "b", "c", "d", "e"]));
// 1 a
// 2 b
// 3 c
// 4 d
// 5 e

each(
    print,
    enumerate(
        zip(["one", "two", "three", "four", "five"], ["a", "b", "c", "d", "e"])
    )
);
// 1 one a
// 2 two b
// 3 three c
// 4 four d
// 5 five e

// https://luafun.github.io/transformations.html#fun.intersperse
each(print, intersperse("x", ["a", "b", "c", "d", "e"]));
// a
// x
// b
// x
// c
// x
// d
// x
// e
// x
