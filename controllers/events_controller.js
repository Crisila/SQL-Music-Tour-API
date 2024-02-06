// Dependencies
const events = require('express').Router();
const { Op } = require('sequelize');
const db = require('../models');
const meet_greet = require('../models/meet_greet');
const { Event, Meet_Greet, Set_Time } = db;


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
// events.get('/:id', async (req, res) => {
//      try {
//           const foundEvent = await Event.findOne({
//                where: { event_id: req.params.id }
//           });
//           res.status(200).json(foundEvent);
//      } catch (err) {
//           res.status(500).json(err);
//      }
// });
// SHOW
events.get('/:name', async (req, res) => {
     try {
          const foundEvent = await Event.findOne({
               where: { name: req.params.name },
               include: [{
                    model: Meet_Greet,
                    as: meet_greets,
                    attributes: { exclude: ["even_id", "band_id"] },
                    include: {
                         model: Band,
                         as: "band",
                    }
               },
               {
                    model: Set_Time,
                    as: "set_times",
                    attributes: { exclude: ["event_id", "stage_id", "band_id"] },
                    include: [
                         {
                              model: Band,
                              as: "band"
                         },
                         {
                              model: Stage,
                              as: "stage"
                         }
                    ]
               },
               {
                    model: Stage,
                    as: "stages",
                    through: { attributes: [] } // Exclude join table attributes
               },
               {
                    model: Meet_Greet,
                    as: "meet_greets",
                    include: {
                         model: Band,
                         as: "bands",
                         where: { name: { [Op.like]: `%${req.query.band ? req.query.band : ''}%` } }
                    }
               },
               {
                    model: Set_Time,
                    as: "set_times",
                    include: {
                         model: Band,
                         as: "bands",
                         where: { name: { [Op.like]: `%${req.query.band ? req.query.band : ''}%` } }
                    }
               }]
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
