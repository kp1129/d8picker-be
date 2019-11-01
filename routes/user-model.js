const db = require('../data/db-config.js');

module.exports ={
    add,
    get,
    getCalendar,
    getById,
    getBy,
    update,
    remove
}

function get() {
    return db('users')
    .select(
        'id', 
        'name', 
        'username', 
        'password',
        'email', 
        "phoneNumber",
        'isAdmin'
        );
}
function getCalendar(id) {
    return db('users as u')
    .join('calendars as c', 'c.userId', 'u.id')
    .select(
        'c.id',
        'c.calendarName', 
        'c.calendarDescription',
        'c.userId',
        )
    .where('c.userId', id)
}
function getBy(filter) {
    return db('users')
    .where(filter);
}
function add(user) {
    return db('users')
    .insert(user, 'id')
    .then(ids => {
        const [id] = ids;
        return getById(id);
    })
}
function getById(id) {
    return db('users')
    .where({ id })
    .first();
}
function update(changes, id) {
    return db('users')
    .where('id', id)
    .update(changes)
    .then(count => {
        count > 0 ? this.get(id) : null 
    })
}
function remove(id) {
    return db('users')
    .where('id', id)
    .del();
}