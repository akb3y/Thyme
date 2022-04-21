const mongoose = require('mongoose');
const { Answer } = require('../index.js');
const fs = require('fs');
const fastcsv = require('fast-csv');

//------ANSWER CSV IMPORT
const importAnswers = function () {
  let stream = fs.createReadStream('/Users/abarraw/MongoDB data/answers.csv');

  let csvStream = fastcsv
    .parse({ skipLines: 1 })
    .on('data', function (data) {
      csvStream.pause();

      let csvData = {
        answer_id: Number(data[0]),
        question_id: Number(data[1]),
        answerBody: data[2],
        answerDate: data[3],
        answererName: data[4],
        answererEmail: data[5],
        reported: Number(data[6]),
        helpfulness: Number(data[7]),
        photos: []
      };

      Answer.insertMany(csvData, (err, results) => {
        if (err) {
          console.log('error inserting answer', err);
        } else {
          console.log(`inserted ${data[0]} answers`);
          csvStream.resume();
        }
      });
    })
    .on('end', function () {
      console.log('successfully inserted answers');
    });

  stream.pipe(csvStream);
};

importAnswers();

module.exports = { importAnswers };