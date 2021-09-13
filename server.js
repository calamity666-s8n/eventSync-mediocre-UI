const express = require('express')
const mongoose = require('mongoose')
const event = require('./models/event')
const eventsRouter = require('./routes/events')
const methodOverride = require('method-override')
const app = express();


mongoose.connect('mongodb://localhost/event', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.get('/', async(req, res) => {
    const events = await event.find().sort({
        createdAt: "desc"
    });
    res.render('events/index', { events: events })
})

app.use('/events', eventsRouter)


app.listen(5000)