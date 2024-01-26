// https://www.tarantool.io/en/doc/latest/reference/reference_lua/box_txn_management/on_commit/

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

// Define a function called on commit
function print_commit_result(this: void) {
    print('Commit happened');
}

// Commit the transaction
box.begin();
box.space.get('bands').insert([4, 'The Beatles', 1960]);
box.on_commit(print_commit_result);
box.commit();
