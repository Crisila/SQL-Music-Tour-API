// DEPENDENCIES
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');



const app = express()



// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// my dependecies
const bandModel = require('./models/band')
const eventModel = require('./models/event')
const stageModel = require('./models/stage')


// SEQUELIZE CONNECTION
// const sequelize = new Sequelize(process.env.PG_URI, { host: 'localhost', dialect: 'postgres' });
// try {
//     sequelize.authenticate();
//     console.log(`Connected with Sequelize at ${process.env.PG_URI}`);
// } catch (err) {
//     console.log(`Unable to connect to PG: ${err}`);
// }



// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// CONTROLLERS 
const bandsController = require('./controllers/bands_controller')
app.use('/bands', bandsController)

const eventsController = require('./controllers/events_controller');
app.use('/events', eventsController)

const stagesController = require('./controllers/stages_controller');
app.use('/stages', stagesController)

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})