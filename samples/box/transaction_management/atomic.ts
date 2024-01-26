// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_txn_management/atomic/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.schema.space.create('bands');
box.space.get('bands').format([
    ['id', 'unsigned'],
    ['band_name', 'string'],
    ['year', 'unsigned'],
]);

// Create an index with the specified sequence
box.schema.sequence.create('id_sequence', { min: 1 });
box.space.get('bands').create_index('primary', { parts: ['id'], sequence: 'id_sequence' });

// Insert test data
box.space.get('bands').insert([1, 'Roxette', 1986]);
box.space.get('bands').insert([2, 'Scorpions', 1965]);
box.space.get('bands').insert([3, 'Ace of Base', 1987]);

// Define a function
function insert_band(this: void, band_name: string, year: number) {
    box.space.get('bands').insert([box.NULL, band_name, year]);
}

// Begin and commit the transaction implicitly
box.atomic(insert_band, 'The Beatles', 1960);

// Begin the transaction with the specified isolation level
box.atomic({ txn_isolation: 'read-committed' }, insert_band, 'The Rolling Stones', 1962);
