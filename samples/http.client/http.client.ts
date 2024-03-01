import * as http_client from 'http.client';

// https://www.tarantool.io/en/doc/latest/reference/reference_lua/http/#default-client
let response = http_client.get('https://httpbin.org/get');


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/http/#creating-a-client
const client = http_client.new_();
response = client.get('https://httpbin.org/get');


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/http/#http-method
response = client.request('GET', 'https://httpbin.org/get');
response = client.get('https://httpbin.org/get');


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/http/#query-parameters
response = client.get('https://httpbin.org/get', {
    params: { page: 1 },
});
print('URL: ' + response.url);


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/http/#headers
response = client.get('http://httpbin.org/headers', {
    headers: {
        'User-Agent': 'Tarantool HTTP client',
        Authorization: 'Bearer abc123',
    },
});
print('Authorization: ' + response.decode()!['headers']['Authorization']);


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/http/#cookies
response = client.get('https://httpbin.org/cookies', {
    headers: {
        Cookie: 'session_id=abc123; csrftoken=u32t4o;',
    },
});
print(response.body);


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/http/#serialization
response = client.post('https://httpbin.org/anything', {
    user_id: 123,
    user_name: 'John Smith',
});
print('Posted data: ' + response.decode()!['data']);

// To send data in the YAML or MsgPack format, set the Content-Type header explicitly to application/yaml or application/msgpack, for example:
response = client.post('https://httpbin.org/anything', {
    user_id: 123,
    user_name: 'John Smith',
}, {
    headers: {
        'Content-Type': 'application/yaml',
    },
});
print('Posted data:\n' + response.decode()!['data']);


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/http/#form-parameters
response = client.post('https://httpbin.org/anything', undefined, {
    params: {
        user_id: 123,
        user_name: 'John Smith',
    },
});
print('User ID: ' + response.decode()!['form']['user_id']);


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/http/#streaming-upload
/** @todo implement json module */


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/http/#status-code
response = client.get('https://httpbin.org/get');
print('Status: ' + response.status + ' ' + response.reason);


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/http/#response-headers
response = client.get('https://httpbin.org/etag/7c876b7e');
print('ETag header value: ' + response.headers!['etag']);


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/http/#response-cookies
response = client.get('https://httpbin.org/cookies/set?session_id=abc123&csrftoken=u32t4o&', {
    follow_location: false,
});
// eslint-disable-next-line quotes
print("'season_id' cookie value: " + response.cookies!['session_id'][0]);


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/http/#deserialization
response = client.get('https://httpbin.org/json');
const document = response.decode();
// eslint-disable-next-line quotes
print("'title' value: " + document!['slideshow']['title']);

/** @todo implement xml module */


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/http/#decompressing
response = client.get('https://httpbin.org/gzip', {
    accept_encoding: 'br, gzip, deflate',
});
print('Is response gzipped: ' + response.decode()!['gzipped']);


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/http/#streaming-download
/** @todo implement json module */


// https://www.tarantool.io/en/doc/latest/reference/reference_lua/http/#redirects
response = client.get('https://httpbin.org/cookies/set?session_id=abc123&csrftoken=u32t4o&', {
    follow_location: false,
});
