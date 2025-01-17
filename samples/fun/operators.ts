// https://luafun.github.io/operators.html

import { operator } from 'fun';

// https://luafun.github.io/operators.html#fun.operator.truediv
print(operator.div(10, 3));
// 3.3333333333333
print(operator.div(-10, 3));
// -3.3333333333333

// https://luafun.github.io/operators.html#fun.operator.floordiv
print(operator.floordiv(10, 3));
// 3
print(operator.floordiv(12, 3));
// 4
print(operator.floordiv(-10, 3));
// -4
print(operator.floordiv(-12, 3));
// -4

// https://luafun.github.io/operators.html#fun.operator.intdiv
print(operator.intdiv(10, 3));
// 3
print(operator.intdiv(12, 3));
// 4
print(operator.intdiv(-10, 3));
// -3
print(operator.intdiv(-12, 3));
// -4

// https://luafun.github.io/operators.html#fun.operator.mod
print(operator.mod(10, 2));
// 0
print(operator.mod(10, 3));
// 2
print(operator.mod(-10, 3));
// 2 -- == -1 in C, Java, JavaScript and but not in Lua, Python, Haskell!

// https://luafun.github.io/operators.html#fun.operator.truth
print(operator.truth(1));
// true
print(operator.truth(0));
// true -- It is Lua, baby!
print(operator.truth(null));
// false
print(operator.truth(''));
// true
print(operator.truth({}));
// true
