// https://www.tarantool.io/en/doc/latest/reference/reference_lua/iconv/

import * as iconv from 'iconv';
import * as string from 'string';

let converter = iconv.new_('UTF8', 'ASCII');

string.hex('Д'); // - d094

converter = iconv.new_('UTF16BE', 'UTF8');

const utf16_string = converter('Д');

string.hex(utf16_string); // - '0414'
