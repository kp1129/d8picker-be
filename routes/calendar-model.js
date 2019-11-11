const db = require('../data/db-config.js');   // Calendar-Modal

module.exports = {
get ,
getById,
add,
remove,
update
} 

function get(){
    return db('calendars')
    .select('calendarName')
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