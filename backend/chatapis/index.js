import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
});

async function getResponse(message) {
  if (message == null) {
    throw new Error("Message cannot be null");
  }
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: message,
      },
    ],
  });

  if (completion.choices[0].refusal == null) {
    return completion.choices[0].message["content"];
  }
  throw new Error("Refusal from ChatGPT (illegal response)");
}

module.exports = { getResponse };
