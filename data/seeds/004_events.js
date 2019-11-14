
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('events').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {
          id: 1,
          eventName: 'event 1',
          eventInfo: 'event 1',
          startDate: 'now',
          endDate: 'now',
          startTime: 'now',
          endTime: 'now',
          isFullDayEvent: false,
          isRecurring: true,


        },
        {
          id: 2,
          eventName: 'event2',
          eventInfo: 'info for event2',
          startDate: 'now',
          endDate: 'now',
          startTime: 'now',
          endTime: 'now',
          isFullDayEvent: false,
          isRecurring: true,

        },
        {
          id: 3,
          eventName: 'event3',
          eventInfo: 'info for event3',
          startDate: 'now',
          endDate: 'now',
          startTime: 'now',
          endTime: 'now',
          isFullDayEvent: false,
          isRecurring: true,

        },
      ]);
    });
};
