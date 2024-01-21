// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_iproto/send/

import { Box } from 'tarantoolscript';

declare const box: Box;

// Send a packet using Lua tables and string IPROTO constants as keys:
box.iproto.send(
    box.session.id(),
    {
        request_type: box.iproto.type.OK,
        sync: 10,
        schema_version: box.info.schema_version,
    },
    {
        data: 1,
    },
);

// Send a packet using Lua tables and numeric IPROTO constants:
box.iproto.send(
    box.session.id(),
    {
        [box.iproto.key.REQUEST_TYPE]: box.iproto.type.OK,
        [box.iproto.key.SYNC]: 10,
        [box.iproto.key.SCHEMA_VERSION]: box.info.schema_version,
    },
    {
        [box.iproto.key.DATA]: 1,
    },
);

// Send a packet that contains only the header:
box.iproto.send(
    box.session.id(),
    {
        request_type: box.iproto.type.OK,
        sync: 10,
        schema_version: box.info.schema_version,
    },
);
