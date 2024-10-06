# Sit Down and Study

Practice programming with AI-generated, LeetCode-style questions and run your code online.
## Overview

Sit Down and Study is a platform designed to help you improve your programming skills through LeetCode-style questions. You can write and run your code directly on the platform, using an integrated code execution engine, and receive instant feedback. The platform also provides on-demand hints and reading materials to help you learn as you go.

Whether you’re preparing for technical interviews or honing your coding skills, Sit Down and Study offers a flexible and interactive learning experience.
Features

* AI-Generated LeetCode-Style Questions: Practice problems are generated using OpenAI’s API, covering a variety of programming topics and languages.
* Run Code Online: The platform directly interacts with Judge0 to allow you to write and execute your code in the browser, just like on LeetCode, and get instant feedback.
* Instant Feedback: Submit your code and know right away if your solution is correct.
* On-Demand Hints and Reading Material: If you get stuck, access hints or read topic-related materials to help you solve the problem.
* View Solutions: After attempting a problem, you can view a detailed solution to understand the best approach.
* Continue or Stop: After solving a problem, choose to move on to the next or take a break, making learning at your own pace easy.
* Lecture Slides (Coming Soon): We’re planning to add lecture slides for a deeper understanding of key concepts.

## Tech Stack

* Frontend:
  * React
  * Vite
  * Tailwind CSS
  * NextUI
* Backend:
  * Express.js: Handles OpenAI API requests for generating questions and stores the history of questions and user progress.
  * Judge0: The frontend directly communicates with Judge0 (running in a Docker container) to execute code.
  * MongoDB: Stores user data, including the history of questions and progress.
  * Reverse Proxy: Caddy server
  * DNS: Cloudflare
  * Languages: JavaScript/TypeScript (JS/TS)

Active Domain
* Web App: https://sitdownand.study

Goals
- [x] Generate coding questions using GPT tailored to any programming language.
- [x] Allow users to run their code directly in the browser through Judge0, with instant results.
- [x] Provide hints and educational resources to guide users in problem-solving.
- [x] Offer solutions and allow users to continue practicing or stop after each problem.
- [ ] *(Coming Soon)* Add lecture slides for more comprehensive learning.

