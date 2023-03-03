const Users = require('../models/users.models')
const uuid =require('uuid')
const {hashPassword} = require('../utils/crypt')


const findAllUsers = async () => {
  const data = await Users.findAll()
  return data
}

const findUsersById = async (id) => {
  const data = await Users.findOne({
    where:{
      id: id
    }
  })
  return data
}

const findUserByEmail = async (email) => {
  const data = await Users.findOne({
    where: {
      email: email
    }
  })
  return data
}

const createNewUser = async (userObject) => {
  
const newUser = {
  id: uuid.v4(),
  firstName: userObject.firstName,
  lastName: userObject.lastName  ,
  email: userObject.email ,
  password: hashPassword(userObject.password) ,
  profile_image: userObject.profile_image ,
  is_active: userObject.is_active ,
  phone: userObject.phone
}
const data = await Users.create(newUser)
return data
}

const updateUser = async (id, userObject) => {
  const data = await Users.update(userObject, {
    where: {
      id: id
    }
  })
  return data[0]
}

const deleteUsers = async (id) => {
  const data = await Users.destroy({
    where: {
      id: id
    }
  })
  return data
}

module.exports ={
  findAllUsers,
  findUsersById,
  findUserByEmail,
  createNewUser,
  updateUser,
  deleteUsers
}