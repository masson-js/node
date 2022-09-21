const express = require('express');
const mongoose = require('mongoose');
const http = require('http')

const app = express();
const PORT = 3000;

app.use(express.json({ extended: true }));

const MONGODB_URI = 'mongodb+srv://masson:zO3IvErzG6rkxRme@cluster0.pdbfls9.mongodb.net/sample_airbnb?retryWrites=true&w=majority';

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () =>
      console.log('App has been started on port ${PORT}...')
    );
  } catch (e) {
    console.error("Server Error", e.message);
    process.exit(1);
  }
}

start();


 





