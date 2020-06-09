
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('groups').insert([
        {  
          id: 1,
          groupName: 'TestGroups1',
          groupDescription: 'Test Description1',
          adminId: '1'
        },
        { 
          id: 2,
          groupName: 'TestGroups2',
          groupDescription: 'Test Description2',
          adminId: '1'
        },
        { 
          id: 3,
          groupName: 'TestGroups3',
          groupDescription: 'Test Description3',
          adminId: '1'
        },
        { 
          id: 4,
          groupName: 'TestGroups4',
          groupDescription: 'TestDescription4',
          adminId: '1'
        }
      ]);
    });
};






