const db = require('../data/db-config.js');   // Calendar-Modal

module.exports = {
get ,
getById,
add,
remove,
update
} 

function get(){
    return db('calendarEvents')
    .join('events', 'calendars')
    .select(
        'calendarName',
        'calendarDescription',
        'calendarID',
        'eventID'
        )
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