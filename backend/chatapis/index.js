import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
});

var JSON_FORMAT = '{"question": "", "codeStarter": ""}';

async function getResponse(
  questionDifficulty,
  questionLanguage,
  randomGenerate,
  questionTopic = ""
) {

  if (randomGenerate == true) {
    questionTopic = `anything you find to be useful.`;
  }
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        // Create a hard question
        content: `Create a ${questionDifficulty} coding question related to ${questionTopic}. Expect the implementation to be in ${questionLanguage}, and provide sample code. Include linebreaks in the starter code. Follow this format: ${JSON_FORMAT}, and return only the data in that format, nothing else.`,
      },
    ],
  });

  if (completion.choices[0].refusal == null) {
    return JSON.parse(completion.choices[0].message["content"]);
  }
  throw new Error("Refusal from ChatGPT (illegal response)");
}


export default getResponse;