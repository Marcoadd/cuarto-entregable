const Participants = require('../models/participants.models')
const uuid =require('uuid')

const validateUserOnConversation =async (userId, conversationId) => {
  const data = await Participants.findOne({
    where:{
      userId,
      conversationId
    }
  })
  return data
}


module.exports = {
  validateUserOnConversation
}