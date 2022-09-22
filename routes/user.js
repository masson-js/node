const { Router } = require("express");
const router = Router()
const UserModel = require('../models/User')

const axios = require('axios');

const fs = require("fs");
const { stringify } = require("csv-stringify");




router.post('/user', User);
router.post('/create', CreateUser);
router.get('/find', FindUser);
router.get('/get-csv',Csv);

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


async function Csv(req, res,) {

  try {
    const apiUsers = await axios
    .get('https://reqres.in/api/users')
    .then(res => res.data)
    .catch((error) => {
      console.log(error)
    });
    if (apiUsers.data && apiUsers.data.length) {
      const filename = "saved_from_db.csv";
      const writableStream = fs.createWriteStream(filename);

      const columns = [
        "ID",
        "Email",
        "First Name",
        "LastName"
      ];
      const stringifier = stringify({ header: true, columns: columns });
        apiUsers.data.forEach(user => {
          let row = [user.id, user.email, user.first_name, user.last_name];
          stringifier.write(row);
        }
        );
      stringifier.pipe(writableStream);

      return res.status(200).send({ msg: 'well done', users: apiUsers.data});
    }
    res.status(400).send({msg: 'not found!', res: apiUsers});
    }
  catch (err) {
    res.status(500).send({msg: 'Server is dead'});
  }
  }

module.exports = router

