const db = require("../data/db-config.js");

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
        'username',
        'firstName',
        'lastName',
        'email', 
        'phone',
        'password',
        'isAdmin',
        'uuid'
        );
}
function getCalendar(id) {
    return db('users as u')
        .join('userCalendars as uc', 'uc.userId', 'u.id')
        .join('calendars as c', 'c.id', 'uc.calendarId')
        .select(
            'uc.id',
            'c.calendarName',
            'c.calendarDescription',
            'u.id',
            'u.username',
            'c.id'
        )
        .where('uc.userId', id)
}
function getBy(filter) {
	return db("users").where(filter);
}

function getByUuid(uuid) {
	return db("users")
		.where(uuid)
		.first();
}

function find(userId, password) {
	return db("users")
		.where({ username: userId })
		.orWhere({ email: userId })
		.andWhere({ password })
		.first();
}
function add(user) {
	return db("users")
		.insert(user, "id")
		.then(ids => {
			const [id] = ids;
			return getById(id);
		});
}
function getById(id) {
	return db("users")
		.where({ id })
		.first();
}

function update(changes, id) {
	return db("users")
		.where("id", id)
		.update(changes)
		.then(count => {
			count > 0 ? this.get(id) : null;
		});
}
function remove(id) {
	return db("users")
		.where("id", id)
		.del();
}
