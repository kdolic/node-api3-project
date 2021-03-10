const express = require('express');
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware')
const Users = require('./users-model')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(next)
});

router.put('/:id', validateUserId, validateUser, validatePost, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
  .then(userUpdated => {
    res.status(200).json(userUpdated)
  })
  .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
  .then(userDeleted => {
    res.status(200).json(userDeleted)
  })
  .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
  .then(userPosts => {
    res.status(200).json(userPosts)
  })
  .catch(next)
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.insert({user_id: req.params, text: req.body.text})
  .then(newPost => {
    res.status(200).json(newPost)
  })
  .catch(next)
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: 'NOT WORKING!!!!',
  })
})

// do not forget to export the router
module.exports = router
