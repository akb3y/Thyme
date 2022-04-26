
const agg = db.questions.aggregate([
  {
  $lookup: {
          from: "answers",
          localField: "question_id",
          foreignField: "question_id",
          as: "answers"
      }
    },
  {
   $merge: {into: "questions"}
}
])
