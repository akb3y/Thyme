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
      console.log(data)
      csvStream.pause();
      console.log('pause')
      let csvData = {
        question_id: Number(data[0]),
        product_id: Number(data[1]),
        question_body: data[2],
        question_date: data[3],
        asker_name: data[4],
        asker_email: data[5],
        reported: Number(data[6]),
        question_helpfulness: Number(data[7])
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