const userQueries = require('./userQueries')
const bcrypt = require('bcrypt')

function bcryptComparePromise(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (res) {
        resolve()
      } else {
        reject(new Error('Incorrect password'))
      }
    })
  })
}

module.exports = {
  authenticate(userName, password) {
    let userResult = null
    return userQueries.findUserByUserName(userName)
    .then(user => {
      if (user === undefined) {
        let error = new Error('Invalid username')
        throw error
      }
      userResult = user
      return bcryptComparePromise(password, user.password_hash)
    })
    .then(res => {
      return userResult
    })
  }
}
