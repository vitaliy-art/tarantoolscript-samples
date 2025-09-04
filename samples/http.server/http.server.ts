// https://github.com/tarantool/http/blob/master/README.md

import * as http_server from 'http.server';
import { rocks, Box } from 'tarantoolscript';
import * as clock from 'clock';

declare const box: Box;

// https://github.com/tarantool/http/blob/master/README.md#creating-a-server
const httpd = http_server.new_('127.0.0.1', 8080, {
    log_requests: true,
    log_errors: true,
    disable_keepalive: ['curl/7.68.0'],
});

// https://github.com/tarantool/http/blob/master/README.md#using-routes
httpd.route({ path: '/path/to' }, 'controller#action');
declare const handle1: (request: rocks.HttpRequest) => rocks.HttpResponse;
httpd.route({ path: '/', template: 'Hello <%= var %>' }, handle1);
declare const handle2: (request: rocks.HttpRequest) => rocks.HttpResponse;
httpd.route({ path: '/:abc/cde', file: 'users.html.el' }, handle2);
declare const handle3: (request: rocks.HttpRequest) => rocks.HttpResponse;
httpd.route({ path: '/objects', method: 'GET' }, handle3);

// https://github.com/tarantool/http/blob/master/README.md#route-handlers
function my_handler(this: void, req: rocks.HttpRequest): rocks.HttpResponse {
    const resp = req.render({ text: `${req.method} ${req.path}` });
    resp.headers?.set('x-test-header', 'test');
    resp.status = 201;
    return resp;
}

// https://github.com/tarantool/http/blob/master/README.md#examples
function my_handler2(this: void, req: rocks.HttpRequest): rocks.HttpResponse {
    return {
        status: 200,
        headers: {
            'content-type': 'text/html; charset=utf8',
        } as unknown as LuaTable<string, string>,
        body: `
            <html>
                <body>Hello, world!</body>
            </html>
        `,
    };
}

// https://github.com/tarantool/http/blob/master/README.md#working-with-stashes
function hello(this: void, self: rocks.HttpRequest): rocks.HttpResponse {
    const id = self.stash('id');
    const [user] = box.space.get('users').select(id);
    if (user == undefined) {
        return self.redirect_to('/users_not_found');
    }

    return self.render({ user: user });
}

httpd.route({ path: '/:id/view', template: 'Hello, <%= user.name %>' }, hello);

// https://github.com/tarantool/http/blob/master/README.md#working-with-cookies
function show_user(this: void, self: rocks.HttpRequest): rocks.HttpResponse {
    const uid = self.cookie('id');
    const [match] = string.match(uid, '^%d$');

    if (uid != undefined && match != undefined) {
        const [user] = box.space.get('users').select(uid);
        return self.render({ user: user });
    }

    return self.redirect_to('/login');
}

// To set a cookie, use the setcookie() method of a response object and pass to it a Lua table defining the cookie to be set:
function user_login(this: void, self: rocks.HttpRequest): rocks.HttpResponse {
    const login = self.param('login');
    const password = self.param('password');

    const [user] = box.space.get('users').select([login, password]);
    if (user != undefined) {
        const resp = self.redirect_to('/');
        resp.setcookie!({ name: 'uid', value: user[0][0], expires: '+1y' });
        return resp;
    }

    return self.redirect_to('/login');
}

// https://github.com/tarantool/http/blob/master/README.md#template-helpers
httpd.helper(
    'time',
    function (this: void, controller: unknown, ...args: unknown[]) {
        return clock.monotonic();
    }
);
httpd.helper('some_name', undefined);

// https://github.com/vitaliy-art/tarantoolscript/issues/152
const s = http_server.new_('', 0);
s.route({ path: '' }, (request: rocks.HttpRequest) => {
    return {};
});
