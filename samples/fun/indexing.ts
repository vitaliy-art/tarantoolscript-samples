// https://luafun.github.io/indexing.html

import { index, range, each, indexes } from 'fun';

print(index(2, range(0)));
// nil

print(index('b', ['a', 'b', 'c', 'd', 'e']));
// 2

// https://luafun.github.io/indexing.html#fun.indexes
each(print, indexes('a', ['a', 'b', 'c', 'd', 'e', 'a', 'b', 'a', 'a']));
// 1
// 6
// 8
// 9
