const db = require('../data/db-config.js');

module.exports ={
    add,
    get,
    findById,
    findBy,
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
function findBy(filter) {
    return db('users')
    .where(filter);
}
function add(user) {
    return db('users')
    .insert(user, 'id')
    .then(ids => {
        const [id] = ids;
        return findById(id);
    })
}
function findById(id) {
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