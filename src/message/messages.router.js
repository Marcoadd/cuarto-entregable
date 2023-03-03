const messsageServices = require('./messages.services')

const router = require('express').Router()

router.get('/message', messsageServices.getAllMessage)

router.post('/message', messsageServices.postNewMessage)

router.get('/message/:id', messsageServices.getMessageById)

router.patch('/message/:id', messsageServices.patchMessage)

router.put('/message/:id', messsageServices.putMessage)

router.delete('/message/:id', messsageServices.deleteMessage)


module.exports = router