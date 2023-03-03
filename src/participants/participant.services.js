const {json} = require('express')
const participantsController = require('./participant.controller')

const getAllParticipants = (req, res) => {
  participantsController.findAllParticipants()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json(err)
    })
}

const getParticipantsById = (req, res) => {
  const id = req.params.id
  participantsController.findParticipantsById(id)
    .then(data => {
      if(data){
        res.status(200).json(data)
      }else{
         res.status(404).json({message: 'Participants Not Found'})
      }
    })
    .catch(err => {
      res.status(404).json(err)
    })
}

const postNewParticipants = (req, res) => {
  const ParticipantsObject = req.body
  participantsController.createNewParticipants(ParticipantsObject)
    .then( data  => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(400).json(err)
    })
}

const deleteParticipants = (req, res) => {
  const id = req.params.id
  participantsController.deleteParticipants(id)
   .then(data => {
      if(data){
        res.status(204).json({message: 'Hola mundo'})
      }else{
        res.status(404).json({message: 'Participants not Found'})
      }
   })
   .catch(err => {
    res.status(400).json(err)
   })
}

const patchParticipants = (req, res) => {
  const id = req.params.id
  const ParticipantsObjerct = req.body
  participantsController.updateParticipants(id, ParticipantsObjerct)
    .then(data => {
      if(data){
        res.status(200).json({message: `Participants with id : ${id} update succesfully`})
      }else{
        res.status(404).json({message: 'Participants not Found'})
      }
    })
    .catch(err => {
      res.status(400).json(err)
    })
}

const putParticipants = () => {
  const id = req.params.id
  const ParticipantsObject = req.body
  if(!ParticipantsObject.isAdmin){
    return res.status(400).json({
      message: 'missing data',
      example_fields :{
        isAdmin: true
      }
    })
  }
  participantsController.updateParticipants(id, ParticipantsObject)
  .then(data => {
    if(data){
      res.status(200).json({message: `Participant with id : ${id} update succesfully`})
    }else{
      res.status(404).json({message: 'Participant not Found'})
    }
  })
  .catch(err => {
    res.status(400).json(err)
  })
}

module.exports = {
  getAllParticipants,
  getParticipantsById,
  postNewParticipants,
  deleteParticipants,
  patchParticipants,
  putParticipants
}