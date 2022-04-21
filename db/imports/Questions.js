const mongoose = require('mongoose');
const { Question } = require('../index.js');
const fs = require('fs');
const fastcsv = require('fast-csv');

//-----QUESTION CSV IMPORT
const importQuestions = function () {
  let stream = fs.createReadStream('/Users/abarraw/MongoDB data/questions.csv');

  let csvStream = fastcsv
    .parse({ skipLines: 1 })
    .on('data', function (data) {
      csvStream.pause();
      let csvData = {
        question_id: Number(data[0]),
        product_id: Number(data[1]),
        questionBody: data[2],
        questionDate: data[3],
        askerName: data[4],
        askerEmail: data[5],
        reported: Number(data[6]),
        helpfulness: Number(data[7])
      };

      Question.insertMany(csvData, (err, results) => {
        if (err) {
          console.log('err adding to collection', err);
        } else {
          console.log(`imported ${data[0]} questions`);
          csvStream.resume();
        }
      });

    })
    .on('end', function () {
      console.log('Finsihed inserting all questions');
    });

  stream.pipe(csvStream);
};

importQuestions();

module.exports = { importQuestions };