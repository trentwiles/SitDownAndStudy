import express from 'express';
import chatgpt from "../chatapis/index.js";

const app = express();
const PORT = 47283;

app.use(express.json());



app.get('/getQuestion', async (req, res) => {
  const x = await chatgpt("hard", "java", false, "iterate through a hashmap")
  return res.send(x);
});

app.post('/getQuestion', async (req, res) => {
  const qDiff = req.body.difficulty
  const qLang = req.body.language
  const isRandom = req.body.isRandom
  const q = req.body.question

  if(qDiff == null || qLang == null || isRandom == null) {
    return res.status(400).send(JSON.parse(`{"error": true}`))
  }

  if (isRandom == true && q == null) {
    return res.status(400).send(JSON.parse(`{"error": true}`))
  }

  const result = await chatgpt.getResponse(qDiff, qLang, isRandom, q)
  return res.send(result)
})

app.post("/getTopic", async (req, res) => {
  const topic = req.body.topic
  const language = req.body.language
  if(topic == null || language == null) {
    return res.status(400).send(JSON.parse(`{"error": true}`))
  }

  const result = await chatgpt.getTopicResponse(topic, language)
  return res.send(result)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});