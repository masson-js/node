
const axios = require('axios');

const fs = require("fs");
const { stringify } = require("csv-stringify");


async function createCsv() {

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

      console.log('success')
      return;
    }
    console.log('not found')
    }
  catch (err) {
    console.log(err)
  }
}

createCsv();
