
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('calendarEvents').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('calendarEvents').insert([
        {
          id: 1,
          calendarId: 1,
          eventsId: 1, 
        },
        {
          id: 2,
          calendarId: 1,
          eventsId: 2, 
        },
        {
          id: 3,
          calendarId: 2,
          eventsId: 3, 
        },
      ]);
    });
};
