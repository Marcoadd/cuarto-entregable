const {DataTypes} = require('sequelize')
const Participants = require('./participants.models')

const db = require('../utils/dataBase')

const Message = db.define('message', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  content:{
    type:DataTypes.TEXT ,
    allowNull: false,
  }, 
  participantId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Participants,
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Sent'
  },
})

module.exports = Message