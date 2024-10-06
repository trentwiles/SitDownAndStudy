import express from 'express';
import chatgpt from "../chatapis/index.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  const x = await chatgpt("hard", "java", false, "iterate through a hashmap")
  res.send(x);
});

app.post('/', async (req, res) => {
  const qDiff = req.body.difficulty
  const qLang = req.body.language
  const isRandom = req.body.isRandom
  const q = req.body.question

  if(qDiff == null || qLang == null || isRandom == null) {
    res.status(400).send(JSON.parse(`{"error": true}`))
  }

  if (isRandom == true && q == null) {
    res.status(400).send(JSON.parse(`{"error": true}`))
  }

  const result = await chatgpt(qDiff, qLang, isRandom, q)
  res.send(result)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});