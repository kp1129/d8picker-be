
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          name: 'user1',
          username:'username1',
          email:'email1',
          password:'password1',
          phoneNumber:123,
          isAdmin:true,
        },
        {
          id: 2,
          name: 'user2',
          username:'username2',
          email:'email2',
          password:'password2',
          phoneNumber:123456,
          isAdmin:true,
        },
        {
          id: 3,
          name: 'user3',
          username:'username3',
          email:'email3',
          password:'password3',
          phoneNumber:1234,
          isAdmin:false,
        },
      ]);
    });
};
