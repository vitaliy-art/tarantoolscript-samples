// https://www.tarantool.io/en/doc/latest/reference/reference_lua/net_box/#conn-delete

import * as net_box from 'net.box';
import {
    Box,
    MsgPackObject,
    NetBoxStreamObject,
    TuplePos,
} from 'tarantoolscript';

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/net_box/#lua-function.net_box.connect
let conn = net_box.connect('localhost:3301');
conn = net_box.connect('127.0.0.1:3302', { wait_connected: false });
conn = net_box.connect('127.0.0.1:3303', { reconnect_after: 5, call_16: true });
conn = net_box.connect('127.0.0.1:3304', {
    required_protocol_version: 4,
    required_protocol_features: ['transactions', 'streams'],
});

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/net_box/#lua-function.conn.ping
net_box.self.ping({ timeout: 0.5 });

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/net_box/#lua-function.conn.wait_connected
net_box.self.wait_connected();

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/net_box/#lua-function.conn.is_connected
net_box.self.is_connected();

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/net_box/#lua-function.conn.wait_state
// wait infinitely for 'active' state:
conn.wait_state('active');
// wait for 1.5 secs at most:
conn.wait_state('active', 1.5);
// wait infinitely for either `active` or `fetch_schema` state:
conn.wait_state({ active: true, fetch_schema: true });

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/net_box/#lua-function.conn.close
conn.close();

// select:
conn.space.get('testspace').select([1, 'B'], {}, { timeout: 1 });

// get:
conn.space.get('testspace').get([1]);

// insert:
conn.space.get('testspace').insert([2, 3, 4, 5], { timeout: 1 });

// replace:
conn.space.get('testspace').replace([5, 6, 7, 8]);

// update:
conn.space.get('testspace').update([1], [['=', 2, 5]], { timeout: 0 });

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/net_box/#lua-function.conn.eval
// Lua-string:
conn.eval('function f5() return 5+5 end; return f5();'); // 10

// Lua-string, {arguments}
conn.eval('return ...', [1, 2, [3, 'x']]);
// - 1
// - 2
// - [3, 'x']

// --Lua-string, {arguments}, {options}
conn.eval('return {nil,5}', [], { timeout: 0.1 }); // [null, 5]

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/net_box/#lua-function.conn.call
// create 2 functions with conn:eval()
conn.eval('function f1() return 5+5 end;');
conn.eval('function f2(x,y) return x,y end;');
// call first function with no parameters and no options
conn.call('f1'); // 10
// call second function with two parameters and one option
conn.call('f2', [1, 'B'], { timeout: 99 });
// - 1
// - B

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/net_box/#lua-function.conn.watch
// Example 1
// Server:
// Broadcast value 42 for the 'foo' key.
declare const box: Box;
box.broadcast('foo', 42);
// Client:
declare const URI: string;
conn = net_box.connect(URI);
import * as log from 'log';
const w = conn.watch('foo', (key, value) => {
    assert(key == 'foo');
    log.info('The box.id value is \'%d\'', value);
});
// If you don’t need the watcher anymore, you can unregister it using the command below:
w.unregister();

// Example 2
conn = net_box.connect('127.0.0.1:4401');
conn.watch('config.storage:/myapp/config/all', (key, value) => {
    log.info('Configuration stored by the \'myapp/config/all\' key is changed');
});

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/net_box/#lua-function.conn.request
// Insert a tuple asynchronously
const future = conn.space
    .get('bands')
    .insert([10, 'Queen', 1970], { is_async: true });
future.is_ready(); // true
future.result(); // [10, 'Queen', 1970]

// Iterate through a space with 10 records to get data in chunks of 3 records
declare let position: TuplePos;

while (true) {
    const future = conn.space
        .get('bands')
        .select(
            {},
            { limit: 3, after: position, fetch_pos: true },
            { is_async: true }
        );
    const result = future.wait_result();
    const tuples = result[0];
    position = result[1];
    if (position == undefined) {
        break;
    }
    print(`Chunk size: ${tuples!.length}`);
}
// Chunk size: 3
// Chunk size: 3
// Chunk size: 3
// Chunk size: 1

// request:
declare const uri: string;
const c = net_box.connect(uri);
const mp = c.eval('eval ...', [1, 2, 3], { return_raw: true }) as MsgPackObject;
mp.decode(); // {1, 2, 3}

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/net_box/#lua-function.conn.new_stream
// Start a server to create a new stream
conn = net_box.connect('localhost:3301');
const conn_space = conn.space.get('test');
const stream = conn.new_stream();
const stream_space = stream.space.get('test');

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/net_box/#lua-function.stream.commit
// Begin stream transaction
stream.begin();
// In the previously created ``accounts`` space with the primary key ``test``, modify the fields 2 and 3
declare const test_1: unknown;
stream.space.get('accounts').update(test_1, [
    ['-', 2, 370],
    ['+', 3, 100],
]);
// Commit stream transaction
stream.commit();

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/net_box/#lua-function.stream.rollback
// Test rollback for memtx space
declare const space: ReturnType<NetBoxStreamObject['space']['get']>;
space.replace([1]);
// Select return tuple that was previously inserted, because this select belongs to stream transaction
space.select([]);
stream.rollback();
// Select is empty, stream transaction rollback
space.select([]);
