
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admin').del()
    .then(function () {
      // Inserts seed entries
      return knex('admin').insert([
        {id: 1, name: 'hash admin 1', email: 'hashadmin1@admin.com', googleID: 'hashAdmin1'}
      ]);
    });
};
