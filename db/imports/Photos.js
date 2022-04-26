const mongoose = require('mongoose');
const { Answer } = require('../index.js');
const fs = require('fs');
const fastcsv = require('fast-csv');

//------PHOTO CSV IMPORT
const importPhotosIntoAnswer = function () {
  let stream = fs.createReadStream('/Users/abarraw/MongoDB data/answers_photos.csv')
  let csvStream = fastcsv
    .parse({ skipLines: 1 })
    .on('data', function (data) {
      console.log(data);
      csvStream.pause();
      console.log('after pause');

      let csvData = {
        id: Number(data[0]),
        answer_id: Number(data[1]),
        url: data[2]
      };

      Answer.updateOne(
        { answer_id: Number(data[1]) },
        { $push: { photos: csvData } }
      )
        .then(() => {
          console.log(`added photo ${data[0]} to ${data[1]}th answer`);
          csvStream.resume();
        })
        .catch((err) => {
          console.log('error in added photos to collection', err);
        });
    })
    .on('end', function () {
      console.log('FINISHED adding photos to answers collection');
    });

  stream.pipe(csvStream);
};

importPhotosIntoAnswer();

module.exports = { importPhotosIntoAnswer };