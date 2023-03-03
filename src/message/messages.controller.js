const Message = require('../models/messages.models')
const Participants = require('../models/participants.models')
const uuid =require('uuid')

const findAllMessageByConversation = async (conversationId, userId) => {
  const data = await Message.findAll({
    include: {
      model: Participants,
      where:{
        conversationId:conversationId,
        userId: userId
      }
    }
  })
  return data
}

/*
const findMessageById = async (id) => {
  const data = await Message.findOne({
    where:{
      id: id
    }
  })
  return data
}

const createNewMessage = async (MessageObject) => {
  
const newMessage = {
  id: uuid.v4(),
  content: MessageObject.content,
  status: MessageObject.status
}
const data = await Message.create(newMessage)
return data
}

const updateMessage = async (id, MessageObject) => {
  const data = await Message.update(MessageObject, {
    where: {
      id: id
    }
  })
  return data[0]
}

const deleteMessage = async (id) => {
  const data = await Message.destroy({
    where: {
      id: id
    }
  })
  return data
}
*/
module.exports ={
  findAllMessageByConversation,
  /*
  findMessageById,
  createNewMessage,
  updateMessage,
  deleteMessage
  */
}