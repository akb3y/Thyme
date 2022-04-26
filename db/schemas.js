
// establish schema - can live here, dont have too

const mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
  question_id: { type: Number, unique: true},
  product_id: { type: Number },
  question_body: String,
  question_date: Date,
  asker_name: String,
  reported: {type: Number, default: 0},
  question_helpfulness: {type: Number, default: 0},
  asker_email: String,
});

let answerSchema = new mongoose.Schema({
  answer_id: { type: Number, unique: true },
  question_id: { type: Number },
  body: String,
  date: Date,
  answerer_name: String,
  answerer_email: String,
  reported: Number,
  helpfulness: Number,
  photos: [
    {
      id: { type: Number, unique: true, sparse: true },
      answer_id: Number,
      url: String
    }
  ]
});

// let Question = mongoose.model('Question', questionSchema);
// let Answer = mongoose.model('Answer', answerSchema);

module.exports = { questionSchema, answerSchema };
