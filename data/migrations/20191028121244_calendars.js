
exports.up = function(knex, Promise) {
  return knex.schema 
  .createTable('users', table => {
      table.increments();
      table.string('name', 255).notNullable();
      table.string('username', 255).notNullable().unique();
      table.string("firstName");
      table.string("lastName");
      table.string('email').notNullable().unique();
      table.integer('phoneNumber').notNullable();
      table.string('password').notNullable();
      table.integer('phone');
      table.boolean('isAdmin').notNullable().defaultTo(false);
      table.string("uuid").notNullable().unique().defaultTo(1);
      table.timestamps(true, true);
  }) 
  .createTable("calendars" , table => {
     table.increments();
     table.string("calendarName")
     table.integer("calendarId")
     table.timestamps(true, true);
  })    
  // .createTable("Events" , table => {
  //   table.increments();
  //   table.integer("eventId")
  //   table.increments('eventName')
  //   table.increments('eventInfo')
  // })

  .createTable('userCalendars', table => {
    table.increments()
    table
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
   table
      .integer('calendarId')
      .unsigned()
      .references('id')
      .inTable('calendars')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
      table.timestamps(true, true);
  })
  .createTable('adminCalendars', table => {
    table.increments()
    table
      .integer('adminId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
      table.timestamps(true, true);
  }) 
  .createTable("events" , table => {
    table.increments();
<<<<<<< HEAD
    table.string('eventName')
    table.string('eventInfo')

=======
    table.string('eventName', 255).notNullable()
    table.string('eventInfo', 255).notNullable()
    table.timestamps(true, true);
>>>>>>> 39e26e4a1b924687b4cf56a5bbdf1de970692532
  })
  .createTable('calendarEvents' , table => {
    table.increments()
    table
      .integer('calendarId')
      .unsigned()
      .references('id')
      .inTable('calendars')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table 
      .integer('eventsId') 
      .unsigned()
      .references('id')
      .inTable('events')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
      table.timestamps(true, true);
  })
}
exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("calendarEvents")
    .dropTableIfExists("events") 
    .dropTableIfExists("adminCalendars") 
    .dropTableIfExists("userCalendars")
    .dropTableIfExists("calendars") 
    .dropTableIfExists("users")
};
