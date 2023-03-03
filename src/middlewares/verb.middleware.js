//? Importaciones necesarias para trabajar el token del usuario password-jwt
const {ExtractJwt, Strategy} = require('passport-jwt')
const passport = require('passport')
//? importacion para validar si el usuario esta en la base de datos
const {findUsersById} = require('../users/users.controllers')

//? Configuraciones basicas para trabajar con jwt
const passportConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'academlo'
}

//? Done()
passport.use(new Strategy(passportConfig, (tokenDecoded, done) => {
  findUsersById(tokenDecoded.id)
    .then(data => {
      if(data){
        done(null, tokenDecoded) //? el ususario si existe y es valido 
      }else{
        done(null, false) //? el usuario no existe
      }
    })
    .catch(err => {
      done(err, false) //? err en la base de datos
    })
}))

module.exports = passport
