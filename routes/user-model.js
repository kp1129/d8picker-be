const db = require('../data/db-config.js');

module.exports ={
    add,
    find,
    findById,
    findBy,
    update,
    remove
}

// // function getTasks(id) {
//   return db('projects as p')
//   .join('tasks as t', 't.project_id', 'p.id')
//   .select('t.id', 't.description', 't.notes', 't.completed')
//   .where('t.project_id', id);


function find() {
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