const express = require('express')

const handleResponses = require('./utils/handleResponses')
const db = require('./utils/dataBase')
const initModels = require('./models/initModels')

const passportJwt = require('./middlewares/verb.middleware')
const authRouter = require('./auth/auth.router')
const userRouter = require('./users/users.router')
const conversationRouter = require('./conversations/conversations.router')
const participantRouter = require('./participants/participant.router')
const messageRouter = require('./message/messages.router')


const app = express()

app.use(express.json())

db.authenticate()
    .then(() => console.log('Base de Datos Autenticada'))
    .catch(err => console.log(err))

db.sync()
    .then(() => console.log('Base de Datos Sincronizada'))
    .catch(err => console.log(err))

initModels()

app.get('/', (req, res) => {
    handleResponses.success({
        res,
        status: 200,
        message: 'Servidor inicializado correctamente',
        data: {
            "users": "http://localhost:9000/api/v1/users",
            "conversations": "http://localhost:9000/api/v1/conversations"
        }
    })
})

app.get('/protected', passportJwt.authenticate('jwt', {session: false}),
    (req, res) => {
    res.status(200).json({
        message: `Hola ${req.user.email} este mensaje solo lo puedes ver si tienes sesion iniciada`,
        tokenDecoded: req.user
    })
})

app.use('/api/v1', userRouter)
app.use('/api/v1', conversationRouter)
app.use('/api/v1', participantRouter)
app.use('/api/v1', messageRouter)
app.use('/api/v1/auth', authRouter)

//? Esta debe ser la ultima ruta en mi app
app.use('*', (req, res)=> {
    handleResponses.error({
        res,
        status: 404,
        message: 'URL not found, please try with http://localhost:9000/',
    })
})

app.listen(9000,() => {
    console.log('Server started at port 9000')
})