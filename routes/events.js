const express = require('express')
const Event = require('../models/event')
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('events/new', { event: new Event() })
})

router.get('/:slug', async(req, res) => {
    const event = await Event.findOne({
        slug: req.params.slug
    })
    if (event == null) res.render("/")
    res.render('events/show', { event: event })
})

router.post('/', async(req, res) => {
    let event = new Event({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        event = await event.save()
        res.redirect(`/events/${event.slug}`)
    } catch (e) {
        console.log(e)
        res.render('events/new', { event: event })
    }

})


router.delete('/:id', async(req, res) => {
    await Event.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
module.exports = router;