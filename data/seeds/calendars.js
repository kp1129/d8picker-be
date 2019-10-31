
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('calendars').del()
    .then(function () {
      // Inserts seed entries
      return knex('calendars').insert([
        {
          id: 1,
          calendarName: 'test1',
          calendarDescription:'descrition for first calendar',
          eventId:1
        },
        {
          id: 2,
          calendarName: 'test2',
          calendarDescription:'descrition for second calendar'
        },
        {
          id: 3,
          calendarName: 'test3',
          calendarDescription:'descrition for third calendar'
        },
      ]);
    });
};
