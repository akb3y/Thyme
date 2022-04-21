const mongoose = require('mongoose');

const {  questionSchema, answerSchema } = require('./schemas.js');

mongoose.connect('mongodb://localhost/QA', )
.catch(err => console.log(err))
.then(res => console.log('You are connected to Mongoose!'))

async function main() {
  await mongoose.connect('mongodb://localhost/sdc');
}

module.exports = {
  Question: mongoose.model("Question", questionSchema),
  Answer: mongoose.model("Answer", answerSchema)
}