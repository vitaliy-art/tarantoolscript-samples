// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_txn_management/begin/

import { Box } from 'tarantoolscript';

declare const box: Box;

box.schema.space.create('bands');
box.space.get('bands').format([
    ['id', 'unsigned'],
    ['band_name', 'string'],
    ['year', 'unsigned'],
]);
box.space.get('bands').create_index('primary');

// Insert test data
box.space.get('bands').insert([1, 'Roxette', 1986]);
box.space.get('bands').insert([2, 'Scorpions', 1965]);
box.space.get('bands').insert([3, 'Ace of Base', 1987]);

// Begin and commit the transaction explicitly
box.begin();
box.space.get('bands').insert([4, 'The Beatles', 1960]);
box.space.get('bands').replace([1, 'Pink Floyd', 1965]);
box.commit();

// Begin the transaction with the specified isolation level
box.begin({ txn_isolation: 'read-committed' });
box.space.get('bands').insert([5, 'The Rolling Stones', 1962]);
box.space.get('bands').replace([1, 'The Doors', 1965]);
box.commit();
