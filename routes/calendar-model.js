const db = require('../data/db-config.js');   // Calendar-Modal

module.exports = {
get ,
getEvents,
getById,
add,
remove,
update
} 

function get(){
    return db('calendars')
    .select('calendarName','calendarDescription', 'userId')
}
function getEvents(id) {
    return db('calendars as c')
    .join('events as e', 'e.calendarId', 'c.id')
    .select(
        'e.id', 
        'e.eventName', 
        'e.eventInfo', 
        'e.calendarId',
        )
    .where('e.calendarId', id)
}
function getById(calId){
  return db('calendars')
   .where('calId' , calId);

} 

function add(calender){
  return db('calendars')

  .insert(calender , 'id')
} 
function remove(calId){
  return db('calendars') 
  .where({calId})
  .del();
} 
function update(calId , updated){
    return db('calendars')
    .where({calId})
    .update(updated)
}