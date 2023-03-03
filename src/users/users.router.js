const userServices = require('./users.services')
const passportJwt = require('../middlewares/verb.middleware')

const router = require('express').Router()

router.get('/users', userServices.getAllUsers)

router.post('/users', userServices.postNewUser)


router.get('/users/me', passportJwt,userServices.getMeUser )

router.patch('/users/', passportJwt, userServices.patchMeUser)

 router.delete('/users/me', passportJwt, userServices.deleteMeUser )


router.get('/users/:id', userServices.getUserById)

router.patch('/users/:id', userServices.patchUser)

router.delete('/users/:id', userServices.deleteUser)

module.exports = router