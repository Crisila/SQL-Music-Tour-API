'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate({ Stage, Stage_Events, Meet_Greet, Set_Time }) {
      // stages
      Event.belongsToMany(Stage, {
        foreignKey: "event_id",
        as: "stages",
        through: Stage_Events
      });

      // Meet and Greet
      Event.hasMany(Meet_Greet, {
        foreignKey: "event_id",
        as: "meet_greets"
      });

      // set time
      Event.hasMany(Set_Time, {
        foreignKey: "event_id",
        as: "set_times"
      });
    }
  }

  Event.init(
    {
      event_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true // Ensures name is not empty
        }
        
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true // Ensures name is not empty
        }
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true // Ensures name is not empty
        }
      }
    },
    {
      sequelize,
      modelName: 'Event',
      tableName: 'events',
      timestamps: false
    }
  );

  return Event;
};
