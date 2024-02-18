// https://www.tarantool.io/en/doc/latest/reference/reference_lua/log/

import { Box, ConfigLogging } from 'tarantoolscript';
import * as log from 'log';

declare const box: Box;

// The example below shows how to set the log level to ‘debug’ and how to send the resulting log to the ‘tarantool.log’ file:
log.cfg({ level: 'debug', log: 'tarantool.log' });

// The example below shows how to log a message with the warning level:
log.warn('Warning message');
// --[[
// 2023-07-20 11:03:57.029 [16300] main/103/interactive/tarantool [C]:-1 W> Warning message
// ---
// ...
// --]]

// A message may contain C-style format specifiers %d or %s. Example:
log.info('Info %s', box.info.version);

// A message may be a scalar data type or a table. Example:
log.error([500, 'Internal error']);

// The code snippet below shows how to set the verbose level for module1 and the error level for module2:
const box_cfg: ConfigLogging = {
    log_level: 'warn',
    log_modules: {
        module1: 'verbose',
        module2: 'error',
    },
};
box.cfg(box_cfg);

// To create the module1 and module2 loggers, call the new() function:
const module1_log = log.new_('module1');
const module2_log = log.new_('module2');

// Then, you can call functions corresponding to different logging levels to make sure that events with severities above
// or equal to the given levels are shown:
module1_log.info('Info message from module1');
// --[[
// [16300] main/103/interactive/module1 I> Info message from module1
// ---
// ...
// --]]

module1_log.debug('Debug message from module1');
// --[[
// ---
// ...
// --]]

module2_log.info('Info message from module2');
// --[[
// ---
// ...
// --]]
