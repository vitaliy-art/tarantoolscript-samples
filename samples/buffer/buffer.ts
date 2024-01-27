// https://www.tarantool.io/en/doc/latest/reference/reference_lua/buffer/

import * as buffer from 'buffer';
import { Box } from 'tarantoolscript';

declare const box: Box;

box.cfg({listen: 3301});
/** @todo implement net.box package */
