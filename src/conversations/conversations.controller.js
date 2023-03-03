const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')
const Users = require('../models/users.models')
const uuid =require('uuid')


const findAllConversationsByUser = async (userId) => {
  const data = await Conversations.findAll({
    include: {
      model: Participants,
      where: {
        userId: userId
      }
    }
  })
  return data.map(({id, name, profileImage, isGroup, createAt}) => ({id, name, profileImage, isGroup, createAt}) )
}

const createConversation = async (conversationObject, userOwnerId, userGuestId) => {
  //? validacion de que el usuario invitado existe
  const userGuest = await Users.findOne({where: {id: userGuestId}})
  if(!userGuest){
    return false
  }
  const generatedConversation = await Conversations.create({
    id: uuid.v4() ,
    name: conversationObject.name,
    profileImage: conversationObject.profileImage,
    isGroup: conversationObject.isGroup
  })

  //? Owner participant
  await Participants.create({
    id: uuid.v4(),
    userId: userOwnerId,
    conversationId: generatedConversation.id, 
    isAdmin: true
  })

  //? guest participant
  await Participants.create({
    id: uuid.v4(),
    userId: userGuestId,
    conversationId: generatedConversation.id,
    isAdmin: false
  })
  return generatedConversation
}


module.exports ={
  findAllConversationsByUser,
  createConversation
}