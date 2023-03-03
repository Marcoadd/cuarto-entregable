const {DataTypes} = require('sequelize')

const db = require('../utils/dataBase')

const Conversations = db.define('conversation', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profile_image: {
    type: DataTypes.STRING,
  },
  /*
  created_by: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  */
  is_group: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
})

module.exports = Conversations