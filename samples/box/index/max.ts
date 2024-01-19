// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_index/max/

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

// Find the maximum value in the specified index
const max = box.space.get('bands').index.get('year').max();
// --[[
// ---
// - [8, 'Nirvana', 1987]
// ...
// --]]

// Find the maximum value that matches the partial key value
const max_partial = box.space.get('bands').index.get('year_band').max(1965);
// --[[
// ---
// - [7, 'The Doors', 1965]
// ...
// --]]
