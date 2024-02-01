// Dependencies
const events = require('express').Router();
const { Op } = require('sequelize');
const db = require('../models');
const { Event } = db;


// INDEX
events.get('/', async (req, res) => {
     try {
          const foundEvent = await Event.findAll({
               order: [['start_time', 'ASC']],
               where: {
                    name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
               }
          });
          res.status(200).json(foundEvent);
     } catch (err) {
          res.status(500).json(err);
     }
});

// SHOW
events.get('/:id', async (req, res) => {
     try {
          const foundEvent = await Event.findOne({
               where: { event_id: req.params.id }
          });
          res.status(200).json(foundEvent);
     } catch (err) {
          res.status(500).json(err);
     }
});

// CREATE A EVENT
events.post('/', async (req, res) => {
     try {
          const newEvent = await Event.create(req.body);
          res.status(200).json({
               message: 'Successfully inserted a new event',
               data: newEvent
          });
     } catch (err) {
          res.status(500).json(err);
     }
});

// UPDATE A EVENT
events.put('/:id', async (req, res) => {
     try {
          const updatedEvents = await Event.update(req.body, {
               where: {
                    event_id: req.params.id
               }
          });
          res.status(200).json({
               message: `Successfully updated ${updatedEvents} event(s)`
          });
     } catch (err) {
          res.status(500).json(err);
     }
});

// DELETE A EVENT
events.delete('/:id', async (req, res) => {
     try {
          const deletedEvents = await Event.destroy({
               where: {
                    event_id: req.params.id
               }
          });
          res.status(200).json({
               message: `Successfully deleted ${deletedEvents} event(s)`
          });
     } catch (err) {
          res.status(500).json(err);
     }
});


// EXPORT
module.exports = events;
