const express = require('express');
const mongoose = require('mongoose');
const http = require('http')

const port = 3000;

// created local server 

const server = http.createServer(function(req, res) {
  res.console.log('server test')
  res.end()
})

server.listen(port, function(error) {
  if (error) {
    console.log('something went wrong', error)
  } else {
    console.log('Sever is listening on port' + port)
  }
});



