const {json} = require('express')
const responses = require('../utils/handleResponses')
const conversationController = require('./conversations.controller')

const getAllConversationByUser  = (req, res) => {
  const userId = req.user.id
  conversationController.findAllConversationsByUser(userId)
    .then(data => { 
      responses.success({
        res,
        status: 200,
        message: data.length ?  'Showing all your conversations' :  'Not conversations to show',
        data
      })
    })
    .catch(err => {
      responses.error({
        res,
        status:400,
        message: 'Something bad',
        data: err
      })
    })
}

const postNewConversation = (req, res) => {
  const OwnerId = req.user.id
  const {guestId, ... conversationObject} = req.body
  conversationController.createConversation(conversationObject, OwnerId, guestId)
    .then(data => {
      if(data){
        responses.success({
          res,
          status: 201,
          message: 'conversation created succeful',
          data
        })
      }else{
        responses.error({
          res,
          status: 400,
          message: `User with id: ${guestId} not found`
        })
      }
    })
    .catch(err => {
      responses.error({
        res,
        status: 404,
        message: err.message || 'something bad',
        data: err,
        fields: {
          name: 'string',
          profileImage: 'string',
          isGroup: 'boolean',
          guestId: 'String UUID'
        }
      })
    })
}

module.exports = {
  getAllConversationByUser,
  postNewConversation
}