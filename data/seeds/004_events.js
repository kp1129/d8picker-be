
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('events').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {
          id: 1,
          eventName: 'event1',
          eventInfo: 'info for event1',
          calendarId: 1
        },
        {
          id: 2,
          eventName: 'event2',
          eventInfo: 'info for event2',
          calendarId: 1

        },
        {
          id: 3,
          eventName: 'event3',
          eventInfo: 'info for event3',
          calendarId: 2

        },
      ]);
    });
};
