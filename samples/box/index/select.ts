// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_index/select/

import { Box } from 'tarantoolscript';

declare const box: Box;

const bands = box.schema.space.create('bands');

bands.format([
    { name: 'id', type: 'unsigned' },
    { name: 'band_name', type: 'string' },
    { name: 'year', type: 'unsigned' },
]);

bands.create_index('primary', { parts: ['id'] });
bands.create_index('band', { parts: ['band_name'] });
bands.create_index('year', { parts: [['year']], unique: false });
bands.create_index('year_band', { parts: [['year'], ['band_name']] });

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

// Select a tuple by the specified primary key value
const [select_primary,] = bands.index.get('primary').select([1]);
// --[[
// ---
// - - [1, 'Roxette', 1986]
// ...
// --]]

// Select a tuple by the specified secondary key value
const [select_secondary,] = bands.index.get('band').select(['The Doors']);
// --[[
// ---
// - - [7, 'The Doors', 1965]
// ...
// --]]

// Select a tuple by the specified multi-part secondary key value
const [select_multipart,] = bands.index.get('year_band').select([1960, 'The Beatles']);
// --[[
// ---
// - - [4, 'The Beatles', 1960]
// ...
// --]]

// Select tuples by the specified partial key value
const [select_multipart_partial,] = bands.index.get('year_band').select([1965]);
// --[[
// ---
// - - [5, 'Pink Floyd', 1965]
//   - [2, 'Scorpions', 1965]
//   - [7, 'The Doors', 1965]
// ...
// --]]

// Select maximum 3 tuples by the specified secondary index
const [select_limit,] = bands.index.get('band').select([], { limit: 3 });
// --[[
// ---
// - - [3, 'Ace of Base', 1987]
//   - [9, 'Led Zeppelin', 1968]
//   - [8, 'Nirvana', 1987]
// ...
// --]]

// Select maximum 3 tuples with the key value greater than 1965
const [select_greater,] = bands.index.get('year').select([1965], { iterator: 'GT', limit: 3 });
// --[[
// ---
// - - [9, 'Led Zeppelin', 1968]
//   - [10, 'Queen', 1970]
//   - [1, 'Roxette', 1986]
// ...
// --]]

// Select maximum 3 tuples after the specified tuple
const [select_after_tuple,] = bands.index.get('primary').select([], { after: [4, 'The Beatles', 1960], limit: 3 });
// --[[
// ---
// - - [5, 'Pink Floyd', 1965]
//   - [6, 'The Rolling Stones', 1962]
//   - [7, 'The Doors', 1965]
// ...
// --]]

// Select first 3 tuples and fetch a last tuple's position
const [result, position] = bands.index.get('primary').select([], { limit: 3, fetch_pos: true });
// Then, pass this position as the 'after' parameter
const [select_after_position,] = bands.index.get('primary').select([], { limit: 3, after: position });
// --[[
// ---
// - - [4, 'The Beatles', 1960]
//   - [5, 'Pink Floyd', 1965]
//   - [6, 'The Rolling Stones', 1962]
// ...
// --]]
