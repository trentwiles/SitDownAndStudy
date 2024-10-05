import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
});

JSON_FORMAT = `{"question": "", "codeStarter": ""}`;

async function getResponse(
  questionDifficulty,
  questionLanguage,
  randomGenerate,
  questionTopic = ""
) {
  if (message == null) {
    throw new Error("Message cannot be null");
  }
  if (randomGenerate == true) {
    questionTopic = "Write a random question.";
  }
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        // Create a hard question
        content: `Create a ${questionDifficulty} question related to ${questionTopic}. Expect the implementation to be in ${questionLanguage}, and provide sample code. Follow this format: ${JSON_FORMAT}, and return only the data in that format, nothing else.`,
      },
    ],
  });

  if (completion.choices[0].refusal == null) {
    return completion.choices[0].message["content"];
  }
  throw new Error("Refusal from ChatGPT (illegal response)");
}

module.exports = { getResponse };
