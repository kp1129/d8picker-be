const router = require('express').Router();

// const authenticate = require('../auth/authenticate-middleware');
const Events = require('./event-model');

router.get('/:cal_id/events/', (req, res) => {
    const { cal_id } = req.params;
    Events.get(cal_id)
    .then(events => {
        res.status(200).json(events);
    })
    .catch(err => {
        console.log('event GET error', err);
        res.status(400).json({ message: 'error fetching events', error: `${err}`});
    })
})

router.get('/:cal_id/events/:id', async (req, res) => {
    try {
        const { cal_id, id } = req.params;
        const response = await Events.getById(cal_id, id);

        res.status(200).json(response);
    } catch (err) {
        console.log('event GET BY ID error', err);
        res.status(400).json({ message: 'error fetching event', error: `${err}`});
    }
})

router.post('/:cal_id/events/', async (req, res) => {
    try {
        const { cal_id } = req.params;
        const { event } = req.body;
        const response = await Events.add(cal_id, event);
        console.log("res ",response)

        res.status(200).json(response);
    } catch (err) {
        console.log('event POST error', err);
        res.status(400).json({ message: 'error adding event', error: `${err}`});
    }})

router.delete('/:cal_id/events/:id', async (req, res) => {
    try {
        const { cal_id, id } = req.params;
        const response = await Events.remove(cal_id, id);

        res.status(200).json(response);
    } catch (err) {
        console.log('event DELETE error', err);
        res.status(400).json({ message: 'error deleting event', error: `${err}`});
    }
})

router.put('/:cal_id/events/:id', async (req, res) => {
    try {
        const { cal_id, id } = req.params;
        const { event } = req.body;
        const response = await Events.update(cal_id, id, event);

        res.status(200).json(response);
    } catch (err) {
        console.log('event PUT error', err);
        res.status(400).json({ message: 'error updating event', error: `${err}`});
    }
})
module.exports = router;