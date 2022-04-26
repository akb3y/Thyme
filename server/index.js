const express = require('express');
require('dotenv').config();

const db = require('../db/queries.js');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, (err) => {
  if(err){
    console.error("Error in express: ", err);
  }else {
    console.log(`Listening on port ${PORT}`);
  }
  }) ;

  app.get("/qa/questions", (req, res) => {
    const productId = Number(req.query.product_id);
    db.fetchAllQuestions(productId, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    })
  });

  app.get('/qa/questions/:question_id/answers', (req, res) => {
    const questionId = Number(req.params.question_id);
    db.fetchAllAnswers(questionId, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    })
  });

  app.put('/qa/questions/:question_id/helpful', (req, res) => {
    const questionId = Number(req.params.question_id);
    db.questionHelpful(questionId, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send(results);
      }
    })
  });

  app.put('/qa/answers/:answer_id/helpful', (req, res) => {
    const answerId = Number(req.params.answer_id);
    db.answerHelpful(answerId, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send(results);
      }
    })
  });

  app.put('/qa/questions/:question_id/report', (req, res) => {
    const questionId = Number(req.params.question_id);
    db.questionReport(questionId, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(204).send(results)
      }
    })
  });

  app.put('/qa/answers/:answer_id/report', (req, res) => {
    const answerId = Number(req.params.answer_id);
    db.answerReport(answerId, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(204).send(results)
      }
    })
  });

  app.post('/qa/questions', (req, res) => {
    const data = {
      question_body: req.body.body,
      asker_name: req.body.name,
      asker_email: req.body.email,
      product_id: req.body.product_id,
    };

    db.addQuestion(data, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send(results);
      }
    })
  });

  app.post('/qa/questions/:question_id/answers', (req, res) => {
    const data = {
      body: req.body.body,
      answerer_name: req.body.name,
      answerer_email: req.body.email,
      question_id: req.params.question_id,
      photos: req.body.photos
    };

    db.addAnswer(data, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send(results);
      }
    })
  });
