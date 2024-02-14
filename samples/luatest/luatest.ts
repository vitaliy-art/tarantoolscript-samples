// https://www.tarantool.io/en/doc/latest/reference/reference_rock/luatest/luatest_overview/

import * as t from 'luatest';
import { Box } from 'tarantoolscript';

declare const box: Box;

const g = t.group('feature');

// Tests. All properties with name staring with `test` are treated as test cases.
g.set('test_example_1', function(this: void){});
g.set('test_example_n', () => {});

// Define suite hooks
t.before_suite(function(this: void){});
t.before_suite(() => {});

// Hooks to run once for tests group
g.before_all(() => {});
g.after_all(() => {});

// Hooks to run for each test in group
g.before_each(() => {});
g.after_each(() => {});

// Hooks to run for a specified test in group
g.before_test('test_example_1', () => {});
g.after_test('test_example_2', () => {});
// before_test runs after before_each
// after_test runs before after_each

// test/other_test.lua
const other_g = t.group('other');
// ...
other_g.set('test_example_2', () => {});
other_g.set('test_example_n', () => {});

// Define parametrized groups
const pg = t.group('pgroup', [{ engine: 'memtx' }, { engine: 'vinyl' }]);
pg.set('test_example_3', cg => {
    // Use cg.params here
    box.schema.space.create('test', {
        engine: cg!.params.engine,
    });
});

// Hooks can be specified for one parameter
pg.before_all({ engine: 'memtx' }, () => {});
pg.before_each({ engine: 'memtx'}, () => {});
pg.before_test('test_example_3', { engine: 'vinyl' }, () => {});

// To change default order use:
t.configure({ shuffle: 'group' });

// The `xfail` mark makes test results to be interpreted vice versa
g.set('test_fail', () => {
    t.xfail('Must fail no matter what');
    t.assert_equals(3, 4);
});

/** @todo implement module log */
declare const log: { info: (this: void, format: string, param: unknown) => void; };

// Test group can be parametrized:
const pgroup_2 = t.group('pgroup', [{ a: 1, b: 4 }, { a: 2, b: 3 }]);
pgroup_2.set('test_params', cg => {
    // ...
    log.info('a = %s', cg!.params.a);
    log.info('b = %s', cg!.params.b);
    // ...
});

// Group can be parametrized with a matrix of parameters using luatest.helpers:
const mgroup = t.group('pgroup', t.helpers.matrix({ a: [1, 2], b: [3, 4] }));
// Will run:
// * a = 1, b = 3
// * a = 1, b = 4
// * a = 2, b = 3
// * a = 2, b = 4

// called before every test
g.before_each(cg => {});

// called before tests when a == 1
g.before_each({ a: 1 }, cg => {});

// called only before the test when a == 1 and b == 3
g.before_each({ a: 1, b: 3 }, cg => {});

// called before test named 'test_something' when a == 1
g.before_test('test-something', { a: 1 }, cg => {});


// Test helpers (https://www.tarantool.io/en/doc/latest/reference/reference_rock/luatest/luatest_overview/#test-helpers)
const server = t.Server.new_({
    command: '/path/to/executable.lua',
    // arguments for process
    args: ['--no-bugs', '--fast'],
    // additional envars to pass to process
    env: { SOME_FIELD: 'value' },
    // passed as TARANTOOL_WORKDIR
    workdir: '/path/to/test/workdir',
    // passed as TARANTOOL_HTTP_PORT, used in http_request
    http_port: 8080,
    // passed as TARANTOOL_LISTEN, used in connect_net_box
    net_box_port: 3030,
    // passed to net_box.connect in connect_net_box
    net_box_credentials: { user: 'username', password: 'secret' },
});
server.start();
// Wait until server is ready to accept connections.
// This may vary from app to app: for one server:connect_net_box() is enough,
// for another more complex checks are required.
t.helpers.retrying({}, () => { server.http_request('get', '/ping'); });

// http requests
server.http_request('get', '/path');
server.http_request('post', '/path', { body: 'text' });
server.http_request('post', '/path', { json: { field: 'value' }, http: {
    // http client options
    headers: { Authorization: 'Basic ' + 'credentials' },
    timeout: 1,
}});

// This method throws error when response status is outside of then range 200..299.
// To change this behaviour, path `raise = false`:
t.assert_equals(server.http_request('get', '/not_found', { raise: false }).status, 404);
t.assert_error(() => { server.http_request('get', '/not_found'); });

// using net_box
server.connect_net_box();
server.eval('return do_something(...)', ['arg1', 'arg2']);
server.call('function_name', ['arg1', 'arg2']);
server.exec(() => box.info());
server.stop();


// There are several small helpers for common actions:
t.helpers.uuid('ab', 2, 1) == 'abababab-0002-0000-0000-000000000001';

declare const failing_function: (arg1: string, arg2: string) => void;
t.helpers.retrying({ timeout: 1, delay: 0.1 }, failing_function, 'arg1', 'arg2');

// wait until server is up
t.helpers.retrying({}, () => { server.http_request('get', '/status'); });
