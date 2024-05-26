// https://www.tarantool.io/en/doc/latest/reference/reference_lua/string/

import * as string from 'string';

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/string/#lua-function.string.ljust
string.ljust(' A', 5); // - ' A   '


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/string/#lua-function.string.rjust
string.rjust('', 5, 'X'); // - 'XXXXX'


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/string/#lua-function.string.hex
string.hex('ABC '); // - '41424320'


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/string/#lua-function.string.fromhex
string.fromhex('41424320'); // - 'ABC '


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/string/#lua-function.string.startswith
string.startswith(' A', 'A', 2, 5); // - true


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/string/#lua-function.string.endswith
string.endswith('Baa', 'aa'); // - true


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/string/#lua-function.string.lstrip
string.lstrip(' ABC '); // - 'ABC '


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/string/#lua-function.string.rstrip
string.rstrip(' ABC '); // - ' ABC'


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/string/#lua-function.string.split
string.split('A:B:C:D:F', ':', 2);
// - - A
//   - B
//   - C:D:F


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/string/#lua-function.string.strip
string.strip(' ABC '); // - ABC
