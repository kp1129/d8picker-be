
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('calendars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('calendars').insert([
        {
          id: 1,
          calendarName: 'calendar1',
          calendarId: 1
        },
        {
          id: 2,
          calendarName: 'calendar2',
          calendarId: 1
        },
        {
          id: 3,
          calendarName: 'calendar3',
          calendarId: 2
        },
      ]);
    });
};
