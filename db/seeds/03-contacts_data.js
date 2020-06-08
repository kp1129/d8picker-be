exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('contacts').del()
    .then(function () {
      // Inserts seed entries
      return knex('contacts').insert([
        { 
          id: 1, 
          firstName: 'Contact1',
          lastName: 'Test-Data1',
          phoneNumber: '0000000000'
        },
        { 
          id: 2,
          firstName: 'Contact2',
          lastName: 'Test-Data2',
          phoneNumber: '0000000000'
        },
        { 
          id: 3, 
          firstName: 'Contact3',
          lastName: 'Test-Data3',
          phoneNumber: '0000000000'
        },
        { 
          id: 4,
          firstName: 'Contact4',
          lastName: 'Test-Data4',
          phoneNumber: '0000000000'
        }
      ]);
    });
};
