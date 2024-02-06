'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meet_Greet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Band, Event}) {
      // band
      Meet_Greet.belongsTo(Band, {
        foreignKey: "band_id",
        as: "band"
      }),

      // event
      Meet_Greet.belongsTo(Event, {
        foreignKey: "event_id",
        as: "event"
      })
    }
  }
  Meet_Greet.init({
    event_id: {
      type: DataTypes.SMALLINT,
      // type: DataTypes.INTEGER,
      allowNull: false,
      field: 'event_id'
    },
    band_id: {
      type: DataTypes.SMALLINT,
      // type: DataTypes.INTEGER,
      allowNull: false,
      field: 'band_id'
    },
    meet_start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    meet_end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    meet_greet_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    sequelize,
    modelName: 'Meet_Greet',
    tableName: 'meet_greets',
    timestamps: false
  });
  return Meet_Greet;
};