// Dependencies
const stages = require('express').Router();
const { Op } = require('sequelize');
const db = require('../models');
const { Stage, Event } = db;


// INDEX
stages.get('/', async (req, res) => {
     try {
          const foundStage = await Stage.findAll({
               order: [['stage_name', 'ASC']],
               where: {
                    stage_name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
               }
          });
          res.status(200).json(foundStage);
     } catch (err) {
          res.status(500).json(err);
     }
});

// // SHOW
// stages.get('/:id', async (req, res) => {
//      try {
//           const foundStage = await Stage.findOne({
//                where: { stage_id: req.params.id }
//           });
//           res.status(200).json(foundStage);
//      } catch (err) {
//           res.status(500).json(err);
//      }
// });
// SHOW
stages.get('/:name', async (req, res) => {
     try {
          const foundStage = await Stage.findOne({
               where: { stage_name: req.params.name },
               include: [{
                    model: Event,
                    as: "events",
                    through: { attributes: [] } // Exclude join table attributes
               }]
          });
          res.status(200).json(foundStage);
     } catch (err) {
          res.status(500).json(err);
     }
});

// CREATE A STAGE
stages.post('/', async (req, res) => {
     try {
          const newStage = await Stage.create(req.body);
          res.status(200).json({
               message: 'Successfully inserted a new stage',
               data: newStage
          });
     } catch (err) {
          res.status(500).json(err);
     }
});


// UPDATE A STAGE
stages.put('/:id', async (req, res) => {
     try {
          const updatedStages = await Stage.update(req.body, {
               where: {
                    stage_id: req.params.id
               }
          });
          res.status(200).json({
               message: `Successfully updated ${updatedStages} stage(s)`
          });
     } catch (err) {
          res.status(500).json(err);
     }
});

// DELETE A STAGE
stages.delete('/:id', async (req, res) => {
     try {
          const deletedStages = await Stage.destroy({
               where: {
                    stage_id: req.params.id
               }
          });
          res.status(200).json({
               message: `Successfully deleted ${deletedStages} stage(s)`
          });
     } catch (err) {
          res.status(500).json(err);
     }
});


// EXPORT
module.exports = stages;
