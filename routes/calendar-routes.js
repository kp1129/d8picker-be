const router = require('express').Router();
const Calendar = require('./calendar-model')

// gets calendar all calendars
router.get('/' , (req, res) => {
    Calendar.get()
    .then(cal => {
        res.status(200).json({cal})
    })
    .catch(error => {
        res.status(500).json({message : 'Could not get Calendar', error:error})
    })
})
//get calendar event with calendar id 
router.get('/:id/event', (req, res) => {
    const { id } = req.params

    Calendar.getEvents(id)
    .then(events => {
        res.status(200).json({ events })
    })
    .catch(err => console.log('couln not get calendar events', err))
})


router.post('/' , (req,res) => {
    let cal = req.body
    Calendar.add( cal )
    .then(response => res.json({ response }))
    .catch(error => {
        res.status(500).json({message:'could not post', error:error})
    })
}) 
router.delete('/:calId' , (req,res) =>{ 
    var calId= req.params.calId;
    Calendar.remove(calId)
    .then(deleted => {
        res.json({deleted})
    }) 
    .catch(error => {
        res.status(500).json({message : error})
    })
}) 
router.put('/:calId' , (req,res) => {
    var updated = req.body ; 
    var calId = req.params.calId;

    Calendar.update(calId, updated)
    .then(response => {
        if(response > 0){
            Calendar.getById(calId)
            .then(result => {
                res.status(200).json({result})
            })
        } 
        else {
            res.status(404).json({message : "server error"})
        } 
    }) 
    .catch(error => {
        res.status(500).json({message:error})
    })
})  
module.exports = router;