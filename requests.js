const express = require('express');
const mongoose = require('mongoose');

const PORT = 3000;
const MONGODB_URI = 'mongodb+srv://masson:VeraSimon1989@cluster0.nibhd.mongodb.net/YOUR_APP_NAME?retryWrites=true&w=majority';

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
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

