const checkUsersCredentials = require('./auth.controller')
const handleResponses = require('../utils/handleResponses')
const jwt = require('jsonwebtoken')

const postLogin = (req, res) => {
  const {email, password} = req.body
  checkUsersCredentials(email, password)
  .then(data => {
   if(data){

    const token = jwt.sign({
      id: data.id,
      email: data.email,
    }, 'academlo', {
      expiresIn: '1d'
    })
    handleResponses.success({
      res,
      status:200,
      message: 'Correct Credentials',
      data: token
    })
   }else{
    handleResponses.error({
      res,
      status:401,
      message: 'Invalid Credentials'
    })
   }
  })
  .catch(err => {
    handleResponses.error({
      res,
      status:400,
      data: err,
      message: 'Something bad'
    })
  })
}

module.exports = postLogin