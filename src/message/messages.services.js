const {json} = require('express')
const messageController = require('./messages.controller')
const responses = require('../utils/handleResponses')

const getAllMessageByConversation = (req, res) => {
  const conversationId = req.params.conversation_id
  const userId = req.user.id
  
  messageController.findAllMessage(conversationId, userId)
    .then(data => {
      if(data){
        responses.success({
          res,
          data,
          status:201,
          message: 'Find all messages'
        })
      }else{
        responses.error({
          res,
          status:400,
          message:'You are not paraticipant'
        })
      }
    })
    .catch(err => {
      responses.error({
        res,
        status:400,
        message:'Dont find messages',
        data: err
      })
    })
}

/*
const getMessageById = (req, res) => {
  const id = req.params.id
  messageController.findMessageById(id)
    .then(data => {
      if(data){
        res.status(200).json(data)
      }else{
         res.status(404).json({message: 'Message Not Found'})
      }
    })
    .catch(err => {
      res.status(404).json(err)
    })
}

const postNewMessage = (req, res) => {
  const MessageObject = req.body
  messageController.createNewMessage(MessageObject)
    .then( data  => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(400).json(err)
    })
}

const deleteMessage = (req, res) => {
  const id = req.params.id
  messageController.deleteMessage(id)
   .then(data => {
      if(data){
        res.status(204).json({message: 'Hola mundo'})
      }else{
        res.status(404).json({message: 'Message not Found'})
      }
   })
   .catch(err => {
    res.status(400).json(err)
   })
}

const patchMessage = (req, res) => {
  const id = req.params.id
  const MessageObjerct = req.body
  messageController.updateMessage(id, MessageObjerct)
    .then(data => {
      if(data){
        res.status(200).json({message: `Message with id : ${id} update succesfully`})
      }else{
        res.status(404).json({message: 'Message not Found'})
      }
    })
    .catch(err => {
      res.status(400).json(err)
    })
}

const putMessage = () => {
  const id = req.params.id
  const MessageObject = req.body
  if(!MessageObject.content || !MessageObject.status){
    return res.status(400).json({
      message: 'missing data',
      example_fields :{
        content: 'String',
        status: true
      }
    })
  }
  messageController.updateMessage(id, MessageObject)
  .then(data => {
    if(data){
      res.status(200).json({message: `Message with id : ${id} update succesfully`})
    }else{
      res.status(404).json({message: 'Message not Found'})
    }
  })
  .catch(err => {
    res.status(400).json(err)
  })
}
*/

module.exports = {
  getAllMessageByConversation,
  /*
  getMessageById,
  postNewMessage,
  deleteMessage,
  patchMessage,
  putMessage
  */
}