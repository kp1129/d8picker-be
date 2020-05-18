const router = require('express').Router();
const Template = require('../model/templateModel');


// GET global posts
router.get('/:googleId', (req, res) => {
  const googleId = req.params.googleId;
  Template.findTemplatesByGoogleId(googleId)
    .then(templates => {
        if(templates.length === 0){
            res.status(200).json({ message: 'no templates' })
        } else {
            res.status(200).json(templates)
        }
    })
    .catch(err => {
        console.log('findTemplatesByGoogleId', err.details);
        res.status(500).json(err);
    });
});
 

// POST to DB
router.post('/', (req, res) => {
    const template = req.body;  
    Template.addTemplate(template)
    .then(templates => {
        if(templates.length === 0){
            res.status(500).json({ message: 'error creating template'})
        } else {
            res.status(201).json({ message: 'template created successfully' })
        }
    })
    .catch(err => {
      console.log('addTemplate', err.details);
      res.status(500).json(err);
    });
  
});

// DELETE a specific post
router.delete('/:templateId', validateTemplateID, (req, res) => {
    const templateId = req.params.templateId;
    Template.removeTemplate(templateId)
    .then(response => res.status(200).json({ message: 'template deleted successfully' }))
    .catch(err => res.status(500).json(err))
});


module.exports = router;


// middleware checks for templateID
function validateTemplateID(req, res, next){
    Template.findTemplateById(req.params.templateId)
        .then(template => {
            if(!template) {
                res.status(404).json({ message: 'template ID does not exist' });
            } else {
                next();
            }
        })
        .catch(err => res.status(500).json({ error: 'error finding template' }));
}