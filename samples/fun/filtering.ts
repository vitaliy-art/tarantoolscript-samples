// https://luafun.github.io/filtering.html

import {
    duplicate,
    each,
    enumerate,
    filter,
    grep,
    partition,
    range,
    take,
    zip,
} from "fun";

// https://luafun.github.io/filtering.html#fun.filter
each(
    print,
    filter((x) => x % 3 == 0, range(10))
);
// 3
// 6
// 9

each(
    print,
    take(
        5,
        filter((i, x) => i % 3 == 0, enumerate(duplicate("x")))
    )
);
// 3       x
// 6       x
// 9       x
// 12      x
// 15      x

// https://luafun.github.io/filtering.html#fun.grep
const lines_to_grep = [
    "Emily",
    "Chloe",
    "Megan",
    "Jessica",
    "Emma",
    "Sarah",
    "Elizabeth",
    "Sophie",
    "Olivia",
    "Lauren",
];

each(print, grep("^Em", lines_to_grep));
// --[[test
// Emily
// Emma
// --test]]

each(print, grep("^p", lines_to_grep));
// --[[test
// --test]]

each(
    print,
    grep((x) => x % 3 == 0, range(10))
);
// 3
// 6
// 9

// https://luafun.github.io/filtering.html#fun.partition
each(print, zip(...partition((i) => i % 3 == 0, range(10))));
// 3       1
// 6       2
// 9       4
