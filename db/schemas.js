
// establish schema - can live here, dont have too

const mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
  question_id: { type: Number, unique: true },
  product_id: { type: Number, index: true },
  questionBody: String,
  questionDate: Date,
  askerName: String,
  askerEmail: String,
  reported: Number,
  helpfulness: Number
});

let answerSchema = new mongoose.Schema({
  answer_id: { type: Number, unique: true },
  question_id: { type: Number, index: true },
  answerBody: String,
  answerDate: Date,
  answererName: String,
  answererEmail: String,
  reported: Number,
  helpfulness: Number,
  photos: [
    {
      photo_id: { type: Number, unique: true, sparse: true },
      answerId: Number,
      url: String
    }
  ]
});

// let Question = mongoose.model('Question', questionSchema);
// let Answer = mongoose.model('Answer', answerSchema);

module.exports = { questionSchema, answerSchema };
