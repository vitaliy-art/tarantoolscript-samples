// https://www.tarantool.io/en/doc/latest/book/monitoring/api_reference/#examples

import * as metrics from 'metrics';
import * as fiber from 'fiber';

// Using counters:
// create a counter:
const httpRequestsTotalCounter = metrics.counter('http_requests_total');
// somewhere in the HTTP requests middleware:
httpRequestsTotalCounter.inc(1, { method: 'GET' });


// Using gauges:
// create a gauge:
const cpuUsageGauge = metrics.gauge('cpu_usage', 'CPU usage');

// register a lazy gauge value update
// this will be called whenever export is invoked in any plugins
declare function someCpuCollectFunction(this: void): number;
metrics.register_callback(() => {
    const currentCpuUsage = someCpuCollectFunction();
    cpuUsageGauge.set(currentCpuUsage, { app: 'tarantool' });
});


// Using histograms:
// create a histogram:
const httpRequestsLatencyHist = metrics.histogram(
    'http_requests_latency',
    'HTTP requests total',
    [2, 4, 6],
);

// somewhere in the HTTP request middleware:
let t0 = fiber.clock();
declare function observableFunction(this: void): void;
observableFunction();
let t1 = fiber.clock();

let latency = t1 - t0;
httpRequestsLatencyHist.observe(latency);


// Using summaries:
// create a summary with a window of 5 age buckets and a bucket lifetime of 60 s
const httpRequestsLatency = metrics.summary(
    'http_requests_latency',
    'HTTP requests total',
    { [0.5]: 0.01, [0.9]: 0.01, [0.99]: 0.01 },
    { max_age_time: 60, age_buckets_count: 5 },
);

// somewhere in the HTTP requests middleware:
t0 = fiber.clock();
observableFunction();
t1 = fiber.clock();

latency = t1 - t0;
httpRequestsLatency.observe(latency);
