const { Router } = require("express");
const router = Router()
const UserModel = require('../models/User')


router.post('/user', User);
router.post('/create', CreateUser);
router.get('/find', FindUser);



//check user age for adult

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

async function CreateUser(req, res, next) {
  if (req.body.age && req.body.age > 18) {
    
    let user = new UserModel({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
    });
    await user.save();
    try {
     

    res.status(201).send({ msg: "Done"});

    } 
    catch (err) {
      res.status(400).send({ msg: "Failed to create a new User!" });
    }
  } else {
    res.status(404).send({msg: 'Adult content 18+'});
    }
}

// lets find users by e-mail
// ?email=vava@gg.net

async function FindUser(req, res, next) {
  
  let users = await UserModel.find({email: req.query.email});

  if(!req.query.email) {
    return res.status(403).send({msg: 'please provide any email'});
  }
  

  if(!users.length)
  {
    return res.status(403).send({msg: "no any emails"});
  }

  let listOfFullNames = users.map(usr => usr.name + ' ' + usr.surname);

  res.status(201).send({listOfFullNames});

}

module.exports = router

