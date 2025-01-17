// https://www.tarantool.io/en/doc/latest/reference/reference_lua/osmodule/

import * as os from 'os';
import * as string from 'string';

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/osmodule/#lua-function.os.execute
os.execute('ls -l /usr');
// total 200
// drwxr-xr-x   2 root root 65536 Apr 22 15:49 bin
// drwxr-xr-x  59 root root 20480 Apr 18 07:58 include
// drwxr-xr-x 210 root root 65536 Apr 18 07:59 lib
// drwxr-xr-x  12 root root  4096 Apr 22 15:49 local
// drwxr-xr-x   2 root root 12288 Jan 31 09:50 sbin

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/osmodule/#lua-function.os.rename
os.rename('local', 'foreign');
// - null
// - 'local: No such file or directory'
// - 2

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/osmodule/#lua-function.os.getenv
os.getenv('PATH'); // - /usr/local/sbin:/usr/local/bin:/usr/sbin

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/osmodule/#lua-function.os.remove
os.remove('file'); // - true

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/osmodule/#lua-function.os.date
os.date('%A %D %d'); // - Sunday April 24

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/osmodule/#lua-function.os.time
os.time(); // - 1716757497

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/osmodule/#lua-function.os.clock
os.clock(); // - 1.896212

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/osmodule/#lua-function.os.tmpname
os.tmpname(); // - /tmp/lua_7SW1m2

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/osmodule/#lua-function.os.environ
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
os.environ().get('TERM') + os.environ().get('SHELL'); // - xterm/bin/bash

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/osmodule/#lua-function.os.setenv
os.setenv('VERSION', '99');

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/osmodule/#lua-function.os.setlocale
string.sub(os.setlocale()!, 1, 20); // - LC_CTYPE=en_US.UTF-8

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/osmodule/#lua-function.os.difftime
os.difftime(os.time() - 0); // - 1716757823

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/osmodule/#lua-function.os.exit
os.exit();
