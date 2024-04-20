// https://www.tarantool.io/en/doc/latest/book/monitoring/getting_started/

import * as metrics from 'metrics';
import * as http_server from 'http.server';
import * as json_exporter from 'metrics.plugins.json';
import { HttpRequest, HttpResponse } from 'tarantoolscript/src/rocks';
import { Box } from 'tarantoolscript';

declare const box: Box;

// Using the metrics module
// https://www.tarantool.io/en/doc/latest/book/monitoring/getting_started/#using-the-metrics-module
// Define helper functions
function http_metrics_handler(this: void, request: HttpRequest): HttpResponse {
    return request.render({
        text: json_exporter.export_(),
    });
}

// Start the database
box.cfg({
    listen: 3301,
});

// Configure the metrics module
metrics.cfg({
    labels: {
        alias: 'my-tnt-app',
    },
});

// Run the web server
const server = http_server.new_('0.0.0.0', 8081);
server.route({ path: '/metrics' }, http_metrics_handler);
server.start();

// Collecting HTTP metrics
// https://www.tarantool.io/en/doc/latest/book/monitoring/getting_started/#collecting-http-metrics
// Create a summary collector for latency
metrics.http_middleware.configure_default_collector('summary');

// Set a route handler for latency summary collection
const httpd = http_server.new_('0.0.0.0', 8082);
declare function handler1(this: void, req: HttpRequest): HttpResponse;
declare function handler2(this: void, req: HttpRequest): HttpResponse;
httpd.route({ path: '/path-1', method: 'POST' }, metrics.http_middleware.v1(handler1));
httpd.route({ path: '/path-2', method: 'GET' }, metrics.http_middleware.v1(handler2));

// Start HTTP routing
httpd.start();


// Creating custom metric
// https://www.tarantool.io/en/doc/latest/book/monitoring/getting_started/#creating-custom-metric
const responseCounter = metrics.counter('response_counter', 'Response counter');

// Define helper functions
function httpMetricsHandler(this: void, request: HttpRequest): HttpResponse {
    return request.render({ text: json_exporter.export_() });
}

function checkHandler(this: void, request: HttpRequest): HttpResponse {
    const labelPairs = {
        path: request.path,
        method: request.method,
    };

    responseCounter.inc(1, labelPairs);
    return request.render({ text: 'ok' });
}

// Start the database
box.cfg({
    listen: 3301,
});

// Configure the metrics module
metrics.set_global_labels({ alias: 'my-tnt-app' });

// Run the web server
const server2 = http_server.new_('0.0.0.0', 8081);
server2.route({ path: '/metrics' }, httpMetricsHandler);
server2.route({ path: '/check' }, checkHandler);
server2.start();
