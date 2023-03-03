const bcrypt = require('bcrypt')

const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, 10)
}

const comparePassword = (plainPassword, hashpassword) => {
  return bcrypt.compareSync(plainPassword, hashpassword)
}

module.exports = {
  hashPassword,
  comparePassword
}