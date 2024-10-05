import chatgpt from "./index.js";

chatgpt("hard", "Javascript", false, "creating an array")
  .then(result => console.log(result))
  