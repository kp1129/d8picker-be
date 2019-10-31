
exports.up = function(knex, Promise) {
  return knex.schema 
  .createTable('users', table => {
      table.increments();
      table.string('name', 255).notNullable();
      table.string('username', 255).notNullable().unique();
      table.string('email').notNullable().unique();
      table.integer('phoneNumber').notNullable();
      table.string('password').notNullable();
      table.boolean('isAdmin').notNullable().defaultTo(false);
      
  }) 
  .createTable("calendars" , table => {
     table.increments();
     table.string("calendarName")
     table.string('calendarDescription')
  })
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
      .integer('calenderId')
      .unsigned()
      .references('id')
      .inTable('calendars')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
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
  }) 
  .createTable("events" , table => {
    table.increments();
    table.string('eventName')
    table.string('eventInfo')
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
