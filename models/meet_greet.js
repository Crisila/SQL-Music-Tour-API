'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meet_greet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  meet_greet.init({
    event_id: {
      type: Sequelize.SMALLINT,
      allowNull: false
    },
    band_id: {
      type: Sequelize.SMALLINT,
      allowNull: false
    },
    meet_start_time: {
      type: Sequelize.DATE,
      allowNull: false
    },
    meet_end_time: {
      type: Sequelize.DATE,
      allowNull: false
    },
    meet_greet_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    sequelize,
    modelName: 'Meet_Greet',
    tableName: 'meet_greet',
    timestamps: false
  });
  return meet_greet;
};