const express = require('express');
require('dotenv').config();
const  { Question, Answer } = require('../db/index.js');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(PORT, (err) => {
  if(err){
    console.error("Error in express: ", err)
  }else {
    console.log(`Listening on port ${PORT}`)
  }
  }) ;
