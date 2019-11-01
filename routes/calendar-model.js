const db = require('../data/db-config.js');   // Calendar-Modal

module.exports = {
get ,
getById,
add,
remove,
update
} 

function get(id){
    return db('users as u')
    .join('calendars as c',  'c.userId', 'u.id')
    .select(
        'c.id',
        'c.calendarName',
        'c.calendarDescription'
    )
    .where('c.userId', id)
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