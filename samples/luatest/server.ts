// https://www.tarantool.io/en/doc/latest/reference/reference_rock/luatest/classes/luatest.server/

import { Box } from 'tarantoolscript';
import * as luatest from 'luatest';

declare const box: Box;

const server = luatest.Server.new_({
    command: '/path/to/executable.lua',
    args: ['--no-bugs', '--fast'],
    env: { SOME_FIELD: 'value' },
    workdir: '/path/to/test/workdir',
    http_port: 8080,
    net_box_port: 3030,
    net_box_credentials: { user: 'username', password: 'secret' },
});
server.start();

const vclock = server.exec(() => box.info.vclock);
const sum = server.exec((a: number, b: number) => a + b, [1, 2]);

server.exec(() => { luatest.assert_equals(math.pi, 3); });
