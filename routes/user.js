const { Router } = require("express");
const router = Router()

const UserModel = require('../models/User')


router.post('/user', User)

function User(req, res, next) {
  if (req.body.age && req.body.age > 18) {
    return res.status(201).send(
      {
        msg: 'hello ' + req.body.name + ' ' + req.body.surname
      }
    )  
  }
  return res.status(403).send({ msg: 'sorry, you too young :)'})
}

// check user and send to DB

async function CheckUser(req, res, next) {
  if (req.body.age && req.body.age > 18) {
    
    let user = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
    });
    
    try {

      await UserModel.save(user);

      res.status(201).send({ message: "Done"}, user);

    } 
    catch (err) {
      res.status(400).send({ message: "Failed to create a new User!" });
    }
  } else {
    res.status(404).send({msg: 'Adult content 18+'});
    }
}





module.exports = router

// first route for check user age, I used Postman for check

