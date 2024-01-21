// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_session/on_auth/

import { Box } from 'tarantoolscript';

declare const box: Box;

// Example 1
declare let x: number;
function f(this: void) {
    x += 1;
}
box.session.on_auth(f);


// Example 2
// On the first server instance, which listens on port 3301
box.cfg({listen: 3301});
function function1(this: void) {
    print('function 1, box.session.user()=' + box.session.user());
}
function function2(this: void, user_name: string) {
    print('function 2, box.session.user()=' + box.session.user());
    print('function 2, user_name=' + user_name);
}
function function3(this: void, user_name: string, status: boolean) {
    print('function 3, box.session.user()=' + box.session.user());
    print('function 3, user_name=' + user_name);
    if (status == true) {
        print('function 3, status = true, authorization succeeded');
    }
}
box.session.on_auth(function1);
box.session.on_auth(function2);
box.session.on_auth(function3);
box.schema.user.passwd('admin');

// On the second server instance, that connects to port 3301
/** @todo implement console package declarations */
// import * as console from 'console';
// console.connect('admin:admin@localhost:3301');

// The result looks like this:
// function 3, box.session.user()=guest
// function 3, user_name=admin
// function 3, status = true, authorization succeeded
// function 2, box.session.user()=guest
// function 2, user_name=admin
// function 1, box.session.user()=guest
