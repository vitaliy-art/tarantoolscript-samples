// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_iproto/override/

import { Box, MsgPackObject } from 'tarantoolscript';

declare const box: Box;

// Define a handler function for the box.iproto.type.SELECT request type:
function iproto_select_handler_lua(this: void, header: MsgPackObject, body: MsgPackObject) {
    if (body.luaGet('space_id') == 512) {
        box.iproto.send(
            box.session.id(),
            {
                request_type: box.iproto.type.OK,
                sync: header.luaGet('SYNC'),
                schema_version: box.info.schema_version,
            },
            {
                data: [1, 2, 3],
            },
        );

        return true;
    }

    return false;
}

// Override box.iproto.type.SELECT handler:
box.iproto.override(box.iproto.type.SELECT, iproto_select_handler_lua);

// Reset box.iproto.type.SELECT handler:
box.iproto.override(box.iproto.type.SELECT, undefined);

declare const iproto_unknown_request_handler_lua: (this: void, header: MsgPackObject, body: MsgPackObject) => boolean;

// Override a handler function for the unknown request type:
box.iproto.override(box.iproto.type.UNKNOWN, iproto_unknown_request_handler_lua);
