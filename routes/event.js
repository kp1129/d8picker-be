const router = require('express').Router();

//Pull in knex helper models
const Event = require('../model/Event');



module.exports = router;



//Global GET
router.get('/', (req, res) => {
    
 app.get("/events", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

 app.get("/personnel", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});
    
//GET by id
router.get('/:id', (req, res) => {
    
});

//POST
router.post('/', (req, res) => {
    
});

//PUT by id
router.put('/:id', (req, res) => {
    
});

//DELETE by id
router.delete('/:id', (req, res) => {
    
});