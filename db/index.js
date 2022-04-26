const mongoose = require('mongoose');

const {  questionSchema, answerSchema } = require('./schemas.js');

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, )
.catch(err => console.log(err))
.then(res => console.log('You are connected to Mongoose!'))

module.exports = {
  Question: mongoose.model("Question", questionSchema),
  Answer: mongoose.model("Answer", answerSchema)
}
