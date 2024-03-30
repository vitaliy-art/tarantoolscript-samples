// https://github.com/tarantool/queue?tab=readme-ov-file

import * as queue from 'queue';
import * as log from 'log';
import { Box, TupleObject } from 'tarantoolscript';

declare const box: Box;

// https://github.com/tarantool/queue?tab=readme-ov-file#fifo---a-simple-queue
// add a log record on task completion
function otc_cb(this: void, task: TupleObject, stats_data: string): void {
    if (stats_data == 'delete') {
        log.info('task %s is done', task[1]);
    }
}

queue.create_tube('tube_name', 'fifo' as const, { temporary: true, on_task_change: otc_cb });
queue.tube.get('tube_name').put('my_task_data_1');
queue.tube.get('tube_name').put('my_task_data_2');


// https://github.com/tarantool/queue?tab=readme-ov-file#fifottl---a-simple-priority-queue-with-support-for-task-time-to-live
queue.create_tube('tube_name', 'fifottl' as const, { temporary: true });
queue.tube.get('tube_name').put('my_task_data', { ttl: 60.1, delay: 50 });


// https://github.com/tarantool/queue?tab=readme-ov-file#session-identify
/** @todo implement net.box module */


// https://github.com/tarantool/queue?tab=readme-ov-file#queue-and-replication
// Instance file for the master.
// Queue is in replicaset.
// Clean up session after 5 minutes after disconnect.
queue.cfg({ ttr: 300, in_replicaset: true });

box.cfg({
    listen: 3301,
    replication: [
        'replicator:password@127.0.0.1:3301',  // Master URI.
        'replicator:password@127.0.0.1:3302'   // Replica URI.
    ],
    read_only: false,
});

box.once('schema', () => {
    box.schema.user.create('replicator', { password: 'password' });
    box.schema.user.grant('replicator', 'replication'); // grant replication role
});

/** @todo implement console module */
declare const console: { start(this: void): void };
console.start();
os.exit();

// Instance file for the replica.
// Queue is in replicaset.
// Clean up session after 5 minutes after disconnect.
queue.cfg({ ttr: 300, in_replicaset: true });
box.cfg({
    listen: 3302,
    replication: [
        'replicator:password@127.0.0.1:3301',  // Master URI.
        'replicator:password@127.0.0.1:3302',  // Replica URI.
    ],
    read_only: true,
});

console.start();
os.exit();
