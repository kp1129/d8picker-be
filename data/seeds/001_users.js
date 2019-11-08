
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          username:'username1',
          firstName: 'user1',
          lastName: 'user1 lastname',
          email:'email1',
          phone:123,
          password:'password1',
          isAdmin:true,
          uuid: 1

        },
        {
          id: 2,
          username:'username2',
          firstName: 'user2',
          lastName: 'user2 lastname',
          email:'email2',
          phone:1232,
          password:'password1',
          isAdmin:true,
          uuid: 2

        },
        {
          id: 3,
          username:'username3',
          firstName: 'user3',
          lastName: 'user3 lastname',
          email:'email3',
          phone:1233,
          password:'password1',
          isAdmin:true,
          uuid: 3
        },
      ]);
    });
};
