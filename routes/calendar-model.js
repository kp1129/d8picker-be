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
        )
    .where('e.calendarId', id)
}
function getById(calId){
  return db('calendars')
   .where('calId' , calId);

} 
function getById(id){
      return db('calendars')
       .where({id});
    } 
function add(calendar){
  return db('calendars')
  .insert(calendar , 'id')
} 

function remove(id){
  return db('calendars') 
  .where({id})
  .del();
} 
function update(id , updated){
    return db('calendars')
    .where({id})
    .update(updated)
}