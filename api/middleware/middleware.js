const Users = require('../users/users-model')

function logger(req, res, next) {
  console.log(`${req.method} to ${req.url} - ${new Date().toISOString()}`)
  next()
}

const validateUserId = async (req, res, next) => {
  try{
    const user = await Users.getById(req.params.id)
    if(!user) {
      res.status(404).json({ message: "user not found" })
    } else {
      req.user = user
      next()
    }
  } catch(err){
    next(err)
  }
}

const validateUser = (req, res, next) => {
  if(!req.body){
    res.status(400).json({ message: "missing user data"})
  } else if(!req.body.name){
    res.status(400).json({ message: "missing required name field" })
  } else {
    next() // continue if body is ok!
  }
}

const validatePost = (req, res, next) => {
 if(!req.body){
   res.status(400).json({ message: "missing post data" })
 } else if(!req.body.text) {
   res.status(400).json({ message: "missing required text field" })
 } else {
   next()
 }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
