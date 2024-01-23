// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_space/pairs/

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

// Select all tuples by the primary index
for (const [, tuple] of bands.pairs()) {
    print(tuple);
}
// [1, 'Roxette', 1986]
// [2, 'Scorpions', 1965]
// [3, 'Ace of Base', 1987]
// [4, 'The Beatles', 1960]
// [5, 'Pink Floyd', 1965]
// [6, 'The Rolling Stones', 1962]
// [7, 'The Doors', 1965]
// [8, 'Nirvana', 1987]
// [9, 'Led Zeppelin', 1968]
// [10, 'Queen', 1970]

// Select all tuples whose primary key values are between 3 and 6
for (const [, tuple] of bands.pairs(3, { iterator: 'GE' })) {
    if (tuple[1] > 6) {
        break;
    }
    print(tuple);
}
// [3, 'Ace of Base', 1987]
// [4, 'The Beatles', 1960]
// [5, 'Pink Floyd', 1965]
// [6, 'The Rolling Stones', 1962]

// Select all tuples after the specified tuple
for (const [, tuple] of bands.pairs([], { after: [7, 'The Doors', 1965] })) {
    print(tuple);
}
// [8, 'Nirvana', 1987]
// [9, 'Led Zeppelin', 1968]
// [10, 'Queen', 1970]
