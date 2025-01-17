/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-expressions */
// https://www.tarantool.io/en/doc/latest/reference/reference_lua/socket/

import * as socket_ from 'socket';
import { Box, SocketInfo, SocketObject } from 'tarantoolscript';

const socket = socket_ as socket_.CallableSocket;

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/socket/#lua-function.socket.__call
socket('AF_INET', 'SOCK_STREAM', 'tcp');

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/socket/#lua-function.socket.tcp_connect
let [sock, e] = socket.tcp_connect('127.0.0.1', 3301);
if (sock == undefined) {
    print(e);
}

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/socket/#lua-function.socket.getaddrinfo
socket.getaddrinfo('tarantool.org', 'http');
// ---
// - - host: 188.93.56.70
//     family: AF_INET
//     type: SOCK_STREAM
//     protocol: tcp
//     port: 80
//   - host: 188.93.56.70
//     family: AF_INET
//     type: SOCK_DGRAM
//     protocol: udp
//     port: 80
// ...

// To find the available values for the options use the following:
socket.internal.AI_FLAGS; // SO_TYPE, or DOMAIN
// - AI_ALL: 256
//   AI_PASSIVE: 1
//   AI_NUMERICSERV: 4096
//   AI_NUMERICHOST: 4
//   AI_V4MAPPED: 2048
//   AI_ADDRCONFIG: 1024
//   AI_CANONNAME: 2

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/socket/#lua-function.socket.tcp_server
declare const loop_loop: (this: void) => void;
declare const hfunc: (sock: SocketObject, from: SocketInfo) => void;
declare const pfunc: (sock: SocketObject) => void;
socket.tcp_server('localhost', 3302, (s) => {
    loop_loop();
});
socket.tcp_server('localhost', 3302, { handler: hfunc, name: 'name' });
socket.tcp_server('localhost', 3302, { handler: hfunc, prepare: pfunc });

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/socket/#lua-object.socket.socket_object
sock = socket('AF_INET', 'SOCK_STREAM', 'tcp');
sock!.sysconnect(0, 3301);

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/socket/#use-of-a-tcp-socket-over-the-internet
[sock] = socket.tcp_connect('tarantool.org', 80);
type(sock);
// - table
sock!.error();
// - null
sock!.send('HEAD / HTTP/1.0\r\nHost: tarantool.org\r\n\r\n');
// - 40
sock!.read(17);
// - HTTP/1.1 302 Move
sock!.close();
// - true

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/socket/#use-of-a-udp-socket-on-localhost
const sock_1 = socket('AF_INET', 'SOCK_DGRAM', 'udp');
sock_1!.bind('127.0.0.1');
// - true
const sock_2 = socket('AF_INET', 'SOCK_DGRAM', 'udp');
sock_2!.sendto('127.0.0.1', sock_1!.name().port!, 'X');
// - 1
const message = sock_1!.recvfrom(512);
message;
// - X
sock_1!.close();
// - true
sock_2!.close();
// - true

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/socket/#use-tcp-server-to-accept-file-contents-sent-with-socat
declare const box: Box;
box.cfg({});
socket.tcp_server('0.0.0.0', 3302, {
    handler: (s) => {
        while (true) {
            const request = s.read('\n');
            if (request == '' || request == undefined) {
                break;
            }
            print(request);
        }
    },
    prepare: () => {
        print('Initialized');
    },
});

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/socket/#use-tcp-server-with-handler-and-prepare
box.cfg({});
[sock] = socket.tcp_server('0.0.0.0', 3302, {
    prepare: (sock) => {
        print('listening on socket ' + sock.fd());
        sock.setsockopt('SOL_SOCKET', 'SO_REUSEADDR', true);
        return 5;
    },
    handler: (sock, from) => {
        print('accepted connection from: ');
        print('  host: ' + from.host);
        print('  family: ' + from.family);
        print('  port: ' + from.port);
    },
});
