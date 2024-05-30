// https://www.tarantool.io/en/doc/latest/reference/reference_lua/tarantool/

import * as tarantool from 'tarantool';

tarantool;
// - build:
//     test_build: false
//     target: Linux-x86_64-RelWithDebInfo
//     flags: ' -fexceptions -funwind-tables -fasynchronous-unwind-tables -static-libstdc++
//       -fno-common -msse2  -fmacro-prefix-map=/tarantool=. -std=c11 -Wall -Wextra -Wno-gnu-alignof-expression
//       -fno-gnu89-inline -Wno-cast-function-type -O2 -g -DNDEBUG -ggdb -O2 '
//     options: cmake . -DCMAKE_INSTALL_PREFIX=/tarantool/static-build/tarantool-prefix
//       -DENABLE_BACKTRACE=TRUE
//     linking: static
//     mod_format: so
//     asan: false
//     compiler: GNU-8.3.1
//   package: Tarantool
//   debug:
//     getsources: 'function: 0x7f418f8cfcc8'
//   version: 3.1.0-0-g96f6d88597
//   pid: 'function: 0x7f418f888698'
//   uptime: 'function: 0x7f418f888660'

tarantool.pid(); // - 70395
tarantool.uptime(); // - 91398.093679633

tarantool.debug.getsources('strict');
// - |
//   -- strict.lua
//   -- checks uses of undeclared global variables
//   -- All global variables must be 'declared' through a regular assignment
//   -- (even assigning nil will do) in a main chunk before being used
//   -- anywhere or assigned to inside a function.
//   --

//   local getinfo, error, rawset, rawget = debug.getinfo, error, rawset, rawget

//   local mt = {}

//   mt.__declared = {}

//   local function what ()
//     local d = getinfo(3, "S")
//     return d and d.what or "C"
//   end

//   mt.__newindex = function (t, n, v)
//     if not mt.__declared[n] then
//       local w = what()
//       if w ~= "main" and w ~= "C" then
//         error("assign to undeclared variable '"..n.."'", 2)
//       end
//       mt.__declared[n] = true
//     end
//     rawset(t, n, v)
//   end

//   mt.__index = function (t, n)
//     if not mt.__declared[n] and what() ~= "C" then
//       error("variable '"..n.."' is not declared", 2)
//     end
//     return rawget(t, n)
//   end

//   local function off()
//       mt.__declared = {}
//       local m = getmetatable(_G)
//       if m == nil then
//           return
//       end
//       if m == mt then
//           setmetatable(_G, nil)
//       else
//           m.__newindex = nil
//           m.__index = nil
//       end
//   end

//   local function on()
//       local m = getmetatable(_G)
//       if  m == mt then
//           return
//       end
//       if m == nil then
//           setmetatable(_G, mt)
//       else
//           m.__newindex = mt.__newindex
//           m.__index = mt.__index
//       end
//   end

//   on()

//   return {
//       on = on,
//       off = off,
//   }
