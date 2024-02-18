// https://www.tarantool.io/en/doc/latest/reference/reference_rock/luatest/classes/luatest.replica_set/

import * as ReplicaSet from 'luatest.replica_set';
import * as Server from 'luatest.server';
import { ConfigOptions } from 'tarantoolscript';

const box_cfg: ConfigOptions = {
    replication_timeout: 0.1,
    replication_connect_timeout: 10,
    replication_sync_lag: 0.01,
    replication_connect_quorum: 3,
    replication: [
        Server.build_listen_uri('replica1'),
        Server.build_listen_uri('replica2'),
        Server.build_listen_uri('replica3'),
    ],
};

const replica_set = ReplicaSet.new_({
    servers: [
        { alias: 'replica1', box_cfg: box_cfg },
        { alias: 'replica2', box_cfg: box_cfg },
        { alias: 'replica3', box_cfg: box_cfg },
    ],
});
replica_set.start();
replica_set.wait_for_fullmesh();
