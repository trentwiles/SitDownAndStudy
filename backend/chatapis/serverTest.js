import axios from "axios"

// assumes the web server is running on port 3000

/**
 * req.body.difficulty
  const qLang = req.body.language
  const isRandom = req.body.isRandom
  const q = req.body.question
 */

const data = {
  "difficulty": "hard",
  "language": "c++",
  "isRandom": false,
  "question": "removing the @ from an email address"
}

axios.post("http://localhost:3000", data)
  .then( function(result) {
    console.log(result.data)
  })