import axios from "axios"

// assumes the web server is running on port 3000

/**
 * req.body.difficulty
  const qLang = req.body.language
  const isRandom = req.body.isRandom
  const q = req.body.question
 */

const data = {
  "difficulty": "medium",
  "language": "java",
  "isRandom": false,
  "question": "creating a junit test"
}

const topic_data = {
  "topic": "creating junit tests",
  "language": "java"
}

axios.post("http://localhost:3000/getQuestion", data)
  .then( function(result) {
    console.log(result.data)
  })

axios.post("http://localhost:3000/getTopic", topic_data)
  .then( function(result) {
    console.log(result.data)
  })