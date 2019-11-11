const router = require('express').Router();

// const authenticate = require('../auth/authenticate-middleware');
const CalAdmin = require('./calAdmin-model');


router.get('/:cal_id/admins/', async (req, res) => {
    try {
        const { cal_id } = req.params;
        const response = await CalAdmin.get(cal_id);

        res.status(200).json(response);
    } catch (err) {
        console.log('calAdmin GET error', err);
        res.status(400).json({ message: 'error fetching admins', error: `${err}`});
    }
})

router.get('/:cal_id/admins/:id', async (req, res) => {
    try {
        const { cal_id, id } = req.params;
        const response = await CalAdmin.getById(cal_id, id);

        res.status(200).json(response);
    } catch (err) {
        console.log('calAdmin GET BYID error', err);
        res.status(400).json({ message: 'error fetching admin', error: `${err}`});
    }
})

router.post('/:cal_id/admins/', async (req, res) => {
    try {
        const { cal_id } = req.params;
        const { admin } = req.body;
        const response = await CalAdmin.add(cal_id, admin);

        res.status(200).json(response);
    } catch (err) {
        console.log('calAdmin POST error', err);
        res.status(400).json({ message: 'error adding admin', error: `${err}`});
    }
})

router.delete('/:cal_id/admins/:id', async (req, res) => {
    try {
        const { cal_id, id } = req.params;
        const response = await CalAdmin.remove(cal_id, id)

        res.status(200).json(response);
    } catch (err) {
        console.log('calAdmin DELETE error', err);
        res.status(400).json({ message: 'error deleting admin', error: `${err}`});
    }
})

router.put('/:cal_id/admins/:id', async (req, res) => {
    try {
        const { cal_id, id } = req.params;
        const { admin } = req.body;
        const response = await CalAdmin.update(cal_id, id, admin);

        res.status(200).json(response);
    } catch (err) {
        console.log('calAdmin PUT error', err);
        res.status(400).json({ message: 'error updating admin', error: `${err}`});
    }
})
module.exports = router;