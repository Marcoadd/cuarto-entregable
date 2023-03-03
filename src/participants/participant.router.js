const participantsServices = require('./participant.services')

const router = require('express').Router()

router.get('/participants', participantsServices.getAllParticipants)

router.post('/participants', participantsServices.postNewParticipants)

router.get('/participants/:id', participantsServices.getParticipantsById)

router.patch('/participants/:id', participantsServices.patchParticipants)

router.put('/participants/:id', participantsServices.putParticipants)

router.delete('/participants/:id', participantsServices.deleteParticipants)


module.exports = router