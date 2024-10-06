import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();


const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
});

const JSON_FORMAT =
  '{"question": "", "codeStarter": "", "expectedOutput": "", "exampleSolution": ""}';

const JSON_FORMAT_TOPIC_SUM = `{"title": "", "text_summary": "", "code_example": "", "footer_conclusion": ""}`;

async function getResponse(
  questionDifficulty,
  questionLanguage,
  randomGenerate,
  questionTopic = ""
) {
  if (questionLanguage == "javascript") {
    questionLanguage = "NodeJS"
  }
  if (randomGenerate == true) {
    questionTopic = `anything you find to be useful.`;
  }
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant who only responds in JSON.",
      },
      {
        role: "user",
        // Create a hard question
        content: `Create a ${questionDifficulty} coding question related to ${questionTopic}. Expect the implementation to be in ${questionLanguage}, and provide sample code. If the implementation is in Java, make sure that the class is Main. Include linebreaks in the starter code and backslash t's instead of tabs. Follow this format: ${JSON_FORMAT}, and return only the data in that format, nothing else. Make sure expectedOutput is what the code should return/print out. Make sure exampleSolution is an example of a code solution to the code starter.`,
      },
    ],
  });

  if (completion.choices[0].refusal == null) {
    return JSON.parse(completion.choices[0].message["content"]);
  }
  throw new Error("Refusal from ChatGPT (illegal response)");
}

async function getTopicResponse(topic, language) {
  if(language == "javascript") {
    language = "NodeJS"
  }
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant who only responds in JSON.",
      },
      {
        role: "user",
        content: `I want to learn about "${topic}" in ${language}. Detect the difficulty level and create a coding question related to that language 
        of that difficulty. Expect the implementation to be in that programming 
        language, and provide sample code. Include linebreaks in the 
        starter code and backslash t's instead of tabs. Follow this format: 
        ${JSON_FORMAT}, 
        and return only the data in that format, nothing else. Make sure 
        expectedOutput is what the code should return/print out. Make sure 
        exampleSolution is an example of a code solution to the code starter.`,
      },
    ],
  });

  if (completion.choices[0].refusal == null) {
    return JSON.parse(completion.choices[0].message["content"]);
  }
  throw new Error("Refusal from ChatGPT (illegal response)");
}

async function getTopicSummary(topic, language) {
  if(language == "javascript"){
    language = "NodeJS"
  }
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant who only responds in JSON.",
      },
      {
        role: "user",
        content: `Could you provide a consise example of ${topic} along with an example in ${language}? Follow the following format: ${JSON_FORMAT_TOPIC_SUM}, and only respond with this JSON format. Make sure to come up with a brief title. However, if the example requested has nothing to do with the language, just return a random topic about the language in the given format.`,
      },
    ],
  });

  if (completion.choices[0].refusal == null) {
    return JSON.parse(completion.choices[0].message["content"]);
  }
  throw new Error("Refusal from ChatGPT (illegal response)");
}

export default { getResponse, getTopicResponse, getTopicSummary };
