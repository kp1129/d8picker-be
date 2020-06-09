
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
          phoneNumber: '0000000000',
          email: 'test1@test.com'
        },
        { 
          id: 2,
          firstName: 'Contact2',
          lastName: 'Test-Data2',
          phoneNumber: '0000000000',
          email: 'test2@test.com'
        },
        { 
          id: 3, 
          firstName: 'Contact3',
          lastName: 'Test-Data3',
          phoneNumber: '0000000000',
          email: 'test3@test.com'
        },
        { 
          id: 4,
          firstName: 'Contact4',
          lastName: 'Test-Data4',
          phoneNumber: '0000000000',
          email: 'test4@test.com'
        }
      ]);
    });
};