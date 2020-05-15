// connection to db
const db = require('../db/dbConfig');

module.exports = {
    findTemplatesByGoogleId,
    findTemplateById,
    addTemplate,
    removeTemplate
}

// get all templates
function findTemplatesByGoogleId(googleId) {
    return db('templates')
        .where({ googleId })
}

// find template by id 
function findTemplateById(templateId) {
    return db('templates')
        .where("id", templateId)
        .first();
}

// post new template
function addTemplate(template) {
    return db('templates')
        .insert(template);
}

// delete specific template
function removeTemplate(templateId) {
    return db('templates')
        .where("id", templateId)
        .del();
}

