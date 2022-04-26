const  { Question, Answer } = require('./index.js');

const fetchAllQuestions = (productId, callback) => {
  Question.find({product_id: productId}).where('reported').lte(0).exec((err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  })
};

// update when answer aggregation is fixed

const fetchAllAnswers = (questionId, callback) => {
  Answer.find({question_id: questionId}).where('reported').lte(0).exec((err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  })
};

const questionHelpful = (questionId, callback) => {
  Question.findOneAndUpdate(
    {question_id: questionId}, {$inc: {question_helpfulness: 1}}, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
};

const answerHelpful = (answerId, callback) => {
  Answer.findOneAndUpdate(
    {answer_id: answerId}, {$inc: {helpfulness: 1}}, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
};

const questionReport = (questionId, callback) => {
  Question.findOneAndUpdate(
    {question_id: questionId}, {$inc: {reported: 1}}, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
};

const answerReport = (answerId, callback) => {
  Answer.findOneAndUpdate(
    {answer_id: answerId}, {$inc: {reported: 1}}, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
};

const findLastId = (Model, field, callback) => {
Model.find().sort(field).limit(1).then((results) => callback(null, results[0].question_id)).catch((err) => callback(err, null))
};

const addQuestion = (data, callback) => {
  findLastId(Question, '-question_id', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      const question_id = results + 1;
      const questionToAdd = { ...data, question_id };
      Question(questionToAdd).save((error, result) => {
        if (err) {
          callback(error, null);
        } else {
          callback(null, result);
        }
      })
    }
  })
}

const addAnswer = (data, callback) => {
  findLastId(Answer, '-answer_id', (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      const answer_id = results + 1;
      const answerToAdd = {...data, answer_id };
      Answer(answerToAdd).save((error, result) => {
        if (err) {
          callback(error, null);
        } else {
          callback(null, result);
        }
      })
    }
  })
}

module.exports = {
  fetchAllQuestions,
  fetchAllAnswers,
  addAnswer,
  addQuestion,
   answerHelpful,
   answerReport,
   questionHelpful,
   questionReport
};
