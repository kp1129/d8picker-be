
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('contact_admin').del()
    .then(function () {
      // Inserts seed entries
      return knex('contact_admin').insert([
        { 
          id: 1, 
          adminId: '26', 
          contactId: '1'
        },
        {
          id: 2, 
          adminId: '26', 
          contactId: '2'
        },
        {
          id: 3, 
          adminId: '26', 
          contactId: '3'
        }
      ]);
    });
};
