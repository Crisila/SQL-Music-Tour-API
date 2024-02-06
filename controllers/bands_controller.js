// Dependencies
const bands = require('express').Router();
const { Op } = require('sequelize');
const db = require('../models');
const { Band, Meet_Greet, Event, Set_Time } = db;


// INDEX: find all bands
bands.get('/', async (req, res) => {
     try {
          const foundBands = await Band.findAll({
               order: [['available_start_time', 'ASC']],
               where: {
                    name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
               },
               include: [Meet_Greet, Set_Time]
          });
          res.status(200).json(foundBands);
     } catch (err) {
          console.error(err); // Log the error for debugging
          res.status(500).json(err);
     }
});

// SHOW: find specific band
bands.get('/:name', async (req, res) => {
     try {
          const foundBand = await Band.findOne({
               where: { name: req.params.name },
               include: [{
                    model: Meet_Greet,
                    as: "meet_greets",
                    attributes: { exclude: ["band_id", "event_id"] },
                    include: {
                         model: Event,
                         as: "events",
                         where: { name: { [Op.like]: `%${req.query.events ? req.query.events : ''}%` } }
                    }
               },
               {
                    model: Set_Time,
                    as: "set_times",
                    attributes: { exclude: ["band_id", "event_id"] },
                    include: {
                         model: Event,
                         as: "events",
                         where: { name: { [Op.like]: `%${req.query.events ? req.query.events : ''}%` } }
                    }
               }
               ]
          });
          res.status(200).json(foundBand);
     } catch (err) {
          console.error(err); // Log the error for debugging
          res.status(500).json(err);
     }
});


// CREATE A BAND
bands.post('/', async (req, res) => {
     try {
          const newBand = await Band.create(req.body);
          res.status(200).json({
               message: 'Successfully inserted a new band',
               data: newBand
          });
     } catch (err) {
          console.error(err); // Log the error for debugging
          res.status(500).json(err);
     }
});

// UPDATE A BAND
bands.put('/:id', async (req, res) => {
     try {
          const updatedBands = await Band.update(req.body, {
               where: {
                    band_id: req.params.id
               }
          });
          res.status(200).json({
               message: `Successfully updated ${updatedBands} band(s)`
          });
     } catch (err) {
          console.error(err); // Log the error for debugging
          res.status(500).json(err);
     }
});

// DELETE A BAND
bands.delete('/:id', async (req, res) => {
     try {
          const deletedBands = await Band.destroy({
               where: {
                    band_id: req.params.id

               }
          });
          res.status(200).json({
               message: `Successfully deleted ${deletedBands} band(s)`
          });
     } catch (err) {
          console.error(err); // Log the error for debugging
          res.status(500).json(err);
     }
});

// EXPORT
module.exports = bands;