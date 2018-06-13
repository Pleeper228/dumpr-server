const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) {
    return next()
  } else {
    next(new Error('Invalid Id'))
  }
}

function requireAuth(req, res, next) {
  if (req.auth.isAuthenticated) {
    return next()
  } else {
    next(new Error('Unauthorized'))
  }
}

function isValidBathroom(bathroom) {
  const hasName = typeof bathroom.establishment_name == 'string' && bathroom.establishment_name.trim() != ''
  const hasAddress = typeof bathroom.address == 'string' && bathroom.address.trim() != ''
  const hasRating = typeof bathroom.rating == 'number' && bathroom.rating <= 10
  return hasName && hasAddress && hasRating
}

router.get('/', (req, res) => {
  queries.getAll()
    .then(bathrooms => {
      res.json(bathrooms)
    })
})

router.get('/:id', isValidId, (req, res, next) => {
  queries.getOne(req.params.id)
    .then(bathroom => {
      if (bathroom) {
        res.json(bathroom)
      } else {
        next()
      }
    })
})

router.post('/', requireAuth, (req, res, next) => {
  console.log(req)
  if (isValidBathroom(req.body)) {
    queries.create(req.body)
      .then(bathrooms => {
        res.json(bathrooms[0])
      })
  } else {
    next(new Error('Invalid Bathroom'))
  }
})

router.put('/:id', isValidId, requireAuth, (req, res, next) => {
  if (isValidBathroom(req.body)) {
    queries.update(req.params.id, req.body).then(bathrooms => {
      res.json(bathrooms[0])
    })
  } else {
    next(new Error('Invalid Bathroom'))
  }
})

router.delete('/:id', isValidId, requireAuth, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({message: 'Deleted'})
  })
})

module.exports = router
