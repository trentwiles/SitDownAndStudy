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

const BASE_URL = "http://localhost:3001"

// axios.post(BASE_URL + "/getQuestion", data)
//   .then( function(result) {
//     console.log(result.data)
//   })

// axios.post(BASE_URL + "/getTopic", topic_data)
//   .then( function(result) {
//     console.log(result.data)
//   })

// axios.post(BASE_URL + "/topicSummary", topic_data)
//   .then( function(result) {
//     console.log(result.data)
//   })

axios.post(BASE_URL + "/updateHistory", {"uuid": "82393284829", "topic": "hello this is my tough topic!"})

axios.get(BASE_URL + "/getHistory?id=8393284829")
  .then( function(r) {
    console.log(r)
  })