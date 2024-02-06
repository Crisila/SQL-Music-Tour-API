'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    static associate({ Meet_Greet, Set_Time }) {
      // meet and greets
      Band.hasMany(Meet_Greet, {
        foreignKey: "band_id",
        as: "meet_greets"
      });

      // set times
      Band.hasMany(Set_Time, {
        foreignKey: "band_id",
        as: "set_times"
      });
    }
  }

  Band.init({
    band_id: {
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
    genre: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true // Ensures name is not empty
      }
    },
    available_start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Band',
    tableName: 'bands',
    timestamps: false
  });

  return Band;
};
