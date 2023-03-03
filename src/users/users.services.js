const {json} = require('express')
const usersController = require('./users.controllers')
const responses = require('../utils/handleResponses')
const hashPassword = require('../utils/crypt')

const getAllUsers = (req, res) => {
  usersController.findAllUsers()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json(err)
    })
}

const getUserById = (req, res) => {
  const id = req.params.id
  usersController.findUsersById(id)
    .then(data => {
      if(data){
        res.status(200).json(data)
      }else{
         res.status(404).json({message: 'User Not Found'})
      }
    })
    .catch(err => {
      res.status(404).json(err)
    })
}

const postNewUser = (req, res) => {
  const userObject = req.body
  usersController.createNewUser(userObject)
    .then( data  => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(400).json(err)
    })
}

const deleteUser = (req, res) => {
  const id = req.params.id
  usersController.deleteUsers(id)
   .then(data => {
      if(data){
        res.status(204).json({message: 'Hola mundo'})
      }else{
        res.status(404).json({message: 'User not Found'})
      }
   })
   .catch(err => {
    res.status(400).json(err)
   })
}

const patchUser = (req, res) => {
  const id = req.params.id
  const userObjerct = req.body
  usersController.updateUser(id, userObjerct)
    .then(data => {
      if(data){
        res.status(200).json({message: `User with id : ${id} update succesfully`})
      }else{
        res.status(404).json({message: 'user not Found'})
      }
    })
    .catch(err => {
      res.status(400).json(err)
    })
}

const putUser = () => {
  const id = req.params.id
  const userObject = req.body
  if(!userObject.firstName || !userObject.lastName || !userObject.email || !userObject.password || !userObject.profile_image || !userObject.is_active || !userObject.phone){
    return res.status(400).json({
      message: 'missing data',
      example_fields :{
        firstName: 'string',
        lastName: 'string',
        email: 'example@example.com',
        password: 'string',
        profile_image: 'https//google.com/image.png',
        is_active: true,
        phone: 12345678
      }
    })
  }
  usersController.updateUser(id, userObject)
  .then(data => {
    if(data){
      res.status(200).json({message: `User with id : ${id} update succesfully`})
    }else{
      res.status(404).json({message: 'User not Found'})
    }
  })
  .catch(err => {
    res.status(400).json(err)
  })
}

//? los servicios para las acciones dem mi propio usuario: 

const getMeUser = (req, res) => {
  const id = req.user.id
  usersController.findUsersById(id)
    .then(data => {
      responses.success({
        res, 
        status: 200,
        message: 'this is your current user',
        data
      })
    })
    .catch(err => {
      responses.error({
        res,
        status: 400,
        message: 'Something bad getting the current user',
        data: err
      })
    })
}

const deleteMeUser = (req, res) => {
  const id = req.user.id
  usersController.deleteUsers(id)
    .then(data => {
      responses.success({
        res, 
        status: 200,
        message: 'this current user was delete',
        data
      })
    })
    .catch(err => {
      responses.error({
        res,
        status: 400,
        message: 'Something bad getting the current user',
        data: err
      })
    })
}

const patchMeUser = (req, res) => {
  const id = req.user.id
  const {firstName, lastName, email, password, profile_image, phone} = req.body

  const userObject = {
     firstName,
     lastName,
     email,
     password: hashPassword(password),
     profile_image,
     phone
  }
  usersController.updateUser(id,userObject)

  .then(data => {
    responses.success({
      res, 
      status: 200,
      message: 'Your user has been update succesful',
      data
    })
  })
  .catch(err => {
    responses.error({
      res,
      status: 400,
      message: 'Something bad getting the current user',
      data: err
    })
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  postNewUser,
  deleteUser,
  patchUser,
  getMeUser,
  deleteMeUser,
  patchMeUser
}