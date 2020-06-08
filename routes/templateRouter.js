const router = require('express').Router();
const Template = require('../model/templateModel');

// middleware checks for templateID
const {validateTemplateID} = require('../api/middleware/authenticator');

// GET global posts
router.get('/:googleId', (req, res) => {
  const googleId = req.params.googleId;
  Template.findTemplatesByGoogleId(googleId)
    .then(templates => {
        if(templates.length === 0){
            res.status(200).json({ templates: [] })
        } else {
            res.status(200).json({templates: templates})
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
      console.log('addTemplate', err);
      res.status(500).json({errorMessageCatch: err});
    });
  
});

// DELETE a specific template
router.delete('/:templateId', validateTemplateID, (req, res) => {
    const templateId = req.params.templateId;
    Template.removeTemplate(templateId)
    .then(response => res.status(200).json({ message: 'template deleted successfully' }))
    .catch(err => res.status(500).json(err))
});

// EDIT a specific template
router.put('/:templateId', validateTemplateID, (req, res) => {
    const templateId = req.params.templateId;
    const changes = req.body;
    Template.updateTemplate(templateId, changes)
    .then(response => {
        if(response === 1){
            res.status(200).json({ message: 'template updated successfully' })
        }
        else {
            res.status(500).json({ message: 'error updating template'})
        }
    })
    .catch(err => res.status(500).json(err))
});


module.exports = router;

