const router = require('express').Router()

const messagesServices = require('../message/messages.services')
const conversationServices = require('./conversations.services')
const passporJwt = require('../middlewares/verb.middleware')

router.route('/')
  .get(passporJwt ,conversationServices.getAllConversationByUser)
  .post(passporJwt ,conversationServices.postNewConversation)

/*
router.route('/:id')
.get()
.patch()
.delete()
*/

router.route('/:conversation_id/messages')
     .get(passporJwt ,messagesServices.getAllMessageByConversation)
  //.post()


module.exports = router