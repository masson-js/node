const express = require('express');
const router = express.Router()


router.get('/user', User())

function User(req, res, next) {
  if (req.body.age && req.body.age > 18) {
    res.status(201).send(
      {
        msg: 'hello' + req.body.name + ' ' + req.body.surname
      }
    )
    res.status(403).send({ msg: 'sorry, you too old :)'})
  }
}

module.exports = userCheckAge

// first route for check user age

