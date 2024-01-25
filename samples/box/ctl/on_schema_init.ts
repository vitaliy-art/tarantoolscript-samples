// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_ctl/on_schema_init/

import { Box, TupleObject } from 'tarantoolscript';

declare const box: Box;

function function_for_before_replace(this: void, old?: TupleObject, new_?: TupleObject) {
    if (!(old) && new_ && new_[3] == 'space_name' && new_[4] != 'vinyl') {
        return new_.update([[
            '=',
            4,
            'vinyl'
        ]]);
    }
}

box.ctl.on_schema_init(() => {
    box.space._space.before_replace(function_for_before_replace);
});
