// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_index/tuple_pos/

import { Box } from 'tarantoolscript';

declare const box: Box;

const bands = box.schema.space.create('bands');

bands.format([
    { name: 'id', type: 'unsigned' },
    { name: 'band_name', type: 'string' },
    { name: 'year', type: 'unsigned' },
]);

bands.create_index('primary', { parts: ['id'] });

// Insert test data
bands.insert([1, 'Roxette', 1986]);
bands.insert([2, 'Scorpions', 1965]);
bands.insert([3, 'Ace of Base', 1987]);
bands.insert([4, 'The Beatles', 1960]);
bands.insert([5, 'Pink Floyd', 1965]);
bands.insert([6, 'The Rolling Stones', 1962]);
bands.insert([7, 'The Doors', 1965]);
bands.insert([8, 'Nirvana', 1987]);
bands.insert([9, 'Led Zeppelin', 1968]);
bands.insert([10, 'Queen', 1970]);

// Get a tuple's position
const position = bands.index.get('primary').tuple_pos([3, 'Ace of Base', 1987]);

// Pass the tuple's position as the 'after' parameter
bands.select({}, { limit: 3, after: position });
// - - [4, 'The Beatles', 1960]
//   - [5, 'Pink Floyd', 1965]
//   - [6, 'The Rolling Stones', 1962]
