
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('userCalendars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('userCalendars').insert([
        {
          id: 1,
          userId: 1, 
          calendarId: 1
        },
        {
          id: 2,
          userId: 1, 
          calendarId: 2
        },
        {
          id: 3,
          userId: 2, 
          calendarId: 3
        },
      ]);
    });
};

