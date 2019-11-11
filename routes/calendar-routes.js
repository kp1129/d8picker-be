const router = require('express').Router();
const Calendar = require('./calendar-model')

router.get('/' , (req,res) => {
    Calendar.get()
    .then(cal => {
        res.status(200).json({cal})
    })
    .catch(error => {
        res.status(500).json({message : 'Could not get Calendar'})
    })
}) 
router.get('/:id' , (req,res) => {
    var id = req.params.id;
    Calendar.getById(id)
    .then(cal => {
        res.status(200).json({cal})
    })
    .catch(error => {
        res.status(500).json({message : 'Could not get Calendar'})
    })
}) 
router.post('/' , (req,res) => {
    let cal = req.body
    Calendar.add( cal )
    .then(response => res.status().json({ response }))
    .catch(error => {
        res.status(500).json({message:'could not post', error:error})
    })
}) 
router.delete('/:id' , (req,res) =>{ 
    var id = req.params.id;
    Calendar.remove(id)
    .then(deleted => {
        res.json({deleted})
    }) 
    .catch(error => {
        res.status(500).json({message : error})
    })
}) 
router.put('/:id' , (req,res) => {
    var updated = req.body ; 
    var id = req.params.id;

    Calendar.update(id, updated)
    .then(response => {
        if(response > 0){
            Calendar.getById(id)
            .then(result => {
                res.status(200).json({result})
            })
        } 
        else {
            res.status(404).json({message : "server error"})
         }  
         } )
    .catch(error => {
        res.status(500).json({message:error})
    })
})  
module.exports = router;