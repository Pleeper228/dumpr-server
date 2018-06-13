const express = require('express')
const router = express.Router()
const userQueries = require('../db/userQueries')
const bcrypt = require('bcrypt')
const BCRYPT_SALT_ROUNDS = 5


function isValidUser(user) {
  const hasUserName = typeof user.user_name == 'string' && user.user_name.trim() != ''
  const hasPassword = typeof user.password == 'string' && user.password.trim() != ''
  return hasUserName && hasPassword
}

function filterUserforResponse(databaseUser) {
  return {
    id: databaseUser.id,
    user_name: databaseUser.user_name
  }
}

router.get('/', (req, res) => {
  userQueries.getAllUsernames()
  .then(usernames => {
    res.json(usernames)
  })
})

router.get('/current', (req, res, next) => {
  if (req.auth.isAuthenticated) {
    res.json(filterUserforResponse(req.auth.user))
  } else {
    let error = new Error('Unauthorized')
    error.status = 401
    next(error)
  }
})

router.post('/', (req, res, next) => {
  console.log(BCRYPT_SALT_ROUNDS)
  if (isValidUser(req.body)) {
    bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUNDS), (err, hash) => {
      let createUser = {
        user_name: req.body.user_name.trim(),
        password_hash: hash
      }
      userQueries.createUser(createUser)
        .then(users => {
          res.json(filterUserforResponse(users[0]))
        })
        .catch(err => {
          err.message = 'Username already exists'
          next(err)
        })
    })
  } else {
    next(new Error('Invalid User'))
  }
})

router.put('/:userId', (req, res, next) => {
  if (isValidUser(req.body)) {
    bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS, (err, hash) => {
      let updateUser = {
        id: req.params.userId,
        user_name: req.body.user_name.trim(),
        password_hash: hash
      }
      userQueries.update(updateUser)
      .then(users => {
        res.json(filterUserforResponse(users[0]))
      })
    })
  } else {
    next(new Error('Invalud User'))
  }
})

module.exports = router
