const {DataTypes} = require('sequelize')


const db = require('../utils/dataBase')

const Users = db.define('users', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,  //? not null
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,  //? not null
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,  //? not null
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,  //? not null
  },
  profile_image: {
    type: DataTypes.STRING,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  phone: {
    type: DataTypes.STRING,
  },
})

module.exports = Users