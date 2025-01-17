// https://luafun.github.io/basic.html

import * as fun from 'fun';

// https://luafun.github.io/basic.html#fun.iter
for (const [_it, a] of fun.iter([1, 2, 3])) {
    print(a);
}
// 1
// 2
// 3

for (const [_it, k, v] of fun.iter({ a: 1, b: 2, c: 3 })) {
    print(k, v);
}
// b 2
// a 1
// c 3

for (const [_it, a] of fun.iter('abcde')) {
    print(a);
}
// a
// b
// c
// d
// e

function mypairs_gen(
    this: void,
    max: number,
    state: number
): LuaMultiReturn<[number, number] | [undefined, undefined]> {
    if (state >= max) {
        return $multi(undefined, undefined);
    }
    return $multi(state + 1, state + 1);
}

function mypairs(this: void, max: number) {
    return $multi(mypairs_gen, max, 0);
}

const [gen, param, state] = mypairs(10);

for (const [_it, a] of fun.iter(gen, param, state)) {
    print(a);
}
// 1
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
// 10

// https://luafun.github.io/basic.html#fun.each
fun.each(print, { a: 1, b: 2, c: 3 });
// b 2
// a 1
// c 3

fun.each(print, [1, 2, 3]);
// 1
// 2
// 3
