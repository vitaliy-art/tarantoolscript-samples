// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_space/select/

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

// Select a tuple by the specified primary key
bands.select(4);
// - - [4, 'The Beatles', 1960]

// Select maximum 3 tuples with the primary key value greater than 3
bands.select([3], { iterator: 'GT', limit: 3 });
// - - [4, 'The Beatles', 1960]
//   - [5, 'Pink Floyd', 1965]
//   - [6, 'The Rolling Stones', 1962]

// Select maximum 3 tuples after the specified tuple
bands.select([], { after: [4, 'The Beatles', 1960], limit: 3 });
// - - [5, 'Pink Floyd', 1965]
//   - [6, 'The Rolling Stones', 1962]
//   - [7, 'The Doors', 1965]

// Select first 3 tuples and fetch a last tuple's position
const [result, position] = bands.select([], { limit: 3, fetch_pos: true });

// Then, pass this position as the 'after' parameter
bands.select([], { limit: 3, after: position });
// - - [4, 'The Beatles', 1960]
//   - [5, 'Pink Floyd', 1965]
//   - [6, 'The Rolling Stones', 1962]
