import chatgpt from "./index.js";

chatgpt("hard", "Javascript", false, "creating an array").then((result) =>
  console.log(result)
);

chatgpt("easy", "Java", false, "iterating through a HashMap").then((result) =>
  console.log(result)
);

chatgpt("easy", "C++", true).then((result) =>
  console.log(result)
);
