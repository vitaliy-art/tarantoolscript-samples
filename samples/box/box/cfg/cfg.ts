// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_cfg/

import { Box, ConfigOptions } from 'tarantoolscript';

declare const box: Box;

const cfg: ConfigOptions = {
    listen: 3301,
};

box.cfg(cfg);
