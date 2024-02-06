'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stage_Events extends Model {
    static associate({Stage, Event}) {
      Stage_Events.belongsTo(Stage, {
        foreignKey: 'stage_id',
        as: 'stage'
      });

      Stage_Events.belongsTo(Event, {
        foreignKey: 'event_id',
        as: 'event'
      });
    }
  }
  Stage_Events.init({
    stage_event_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stage_id: {
      type: DataTypes.SMALLINT,
      // type: DataTypes.INTEGER,
      allowNull: false
    },
    event_id: {
      type: DataTypes.SMALLINT,
      // type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Stage_Events',
    tableName: 'stage_events',
    timestamps: false
  });
  return Stage_Events;
};
