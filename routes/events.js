const router = require('express').Router();

//Pull in knex helper models
const Event = require('../model/Event');

//Global GET
router.get('/', (req, res) => {
    Event.find({}),((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

    
//GET by id
router.get('/:id', (req, res) => {
    Event.findOne({ "_id": (request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});   


//POST
router.post('/', async (req, res) => {
    // Event.insert(request.body, (error, result) => {
    //     if(error) {
    //         return response.status(500).send(error);
    //     }

        const { name, description, location } = req.body;

        
  try {
    // check if event already exists
    const eventExist = await User.findOne({ _name });
    if (eventExist)
      return res.status(400).json({ message: "Event has already been created." });

    //Create new event
        const event = new Event({
            name,
            description,
            location,
           
          });
      
          const newEvent = await event.save();
          res.send({
            id: newEvent._id,
            name: newEvent.name,
            email: newEvent.email
          });
       
    }

 catch (error) {
    res.status(400).json({ message: "Error caught in .catch" });
  } 
})


//PUT by id
router.put('/:id', (req, res) => {
    Event.findByIdAndUpdate({"_name":new ObjectId(request.params.name) }, (error, result) => {
        if(error) {
            return response.status(500).json({message: "Event not found"})}
        response.send(result.result);
    });
});      


//DELETE by id
router.delete('/:id', (req, res) => {
    Event.findByIdAndRemove({"_id":new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).json({message: "Event not found"})} 
            
            response.send(result.result);
});
});

module.exports = router