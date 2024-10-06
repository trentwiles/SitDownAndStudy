import express from 'express';
import chatgpt from "../chatapis/index.js";
import mdb from './mdb.js';
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.redirect("https://www.youtube.com/watch?v=x81mdCH_FnQ")
})

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

app.get("/getHistory", async (req, res) => {
  // format: /getHistory?id=12345...
  const id = req.query.id
  if(id == null) {
    return res.status(400).send(JSON.parse(`{"error": true}`))
  }
  const query = await mdb.select(id) 
  return res.send(query)
})

app.post("/updateHistory", async (req, res) => {
  const id = req.body.uuid
  const topic = req.body.topic
  if(id == null || topic == null) {
    return res.status(400).send(JSON.parse(`{"error": true}`))
  }

  const worked = await mdb.insert(id, topic)
  return res.send(JSON.parse(`{"status": ${worked}}`))
})

app.post("/topicSummary", async (req, res) => {
  const topicToSum = req.body.topic
  const language = req.body.language

  if(topicToSum == null || language == null) {
    return res.status(400).send(JSON.parse(`{"error": true}`))
  }

  const result = await chatgpt.getTopicSummary(topicToSum, language)
  return res.send(result);
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});