// import { Button } from "@nextui-org/react";
// import { Editor } from "../components/Editor";
// import { useRef, useState, useEffect } from "react";
// import { submitCode } from "../utils/submitUtils";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// interface EditorRef {
//   getCode: () => string;
// }

// interface Output {
//   status: string;
//   expected_out: string;
//   actual_out: string;
//   time_taken: string;
// }

// interface GPTReturn {
//   question: string;
//   codeStarter: string;
//   expectedOutput: string;
//   exampleSolution: string;
// }

// interface StateProps {
//   language: string;
//   topic: string;
// }

// const CodeEditor: React.FC = () => {
//   const editorRef = useRef<EditorRef | null>(null);
//   const [output, setOutput] = useState<Output>({
//     status: "",
//     expected_out: "",
//     actual_out: "",
//     time_taken: "",
//   });
//   const [displaySol, setDisplaySol] = useState(false);
//   const [starterCode, setStarterCode] = useState<string>("print('Hello!')");
//   const defaultQuestion: string = 'Modify the print to print out "Hello, World!" instead. 47384'
//   const [gptReturnState, setGptReturnState] = useState<GPTReturn>({
//     question: defaultQuestion,
//     codeStarter: "print('Hello!')",
//     expectedOutput: "Hello, World!",
//     exampleSolution: "print('Hello, World!')",
//   });

//   const BASE_URL = "https://api.sitdownand.study";
//   axios.defaults.baseURL = BASE_URL;

//   const location = useLocation();
//   const state: StateProps = location.state as StateProps;
//   const navigate = useNavigate();

//   const handleSubmitAndGetResult = async (
//     expected_output: string,
//   ): Promise<string> => {
//     if (editorRef.current) {
//       const code: string = editorRef.current.getCode();
//       const data = await submitCode({
//         source_code: code,
//         language_id: 71,
//         expected_output: expected_output,
//       });
//       console.log("Result returned:", data);
//       setOutput({
//         status: data.status.description,
//         expected_out: expected_output,
//         actual_out: data.stdout,
//         time_taken: data.time,
//       });
//       setDisplaySol(true);
//       return "Success";
//     }
//     return "Error";
//   };

//   useEffect(() => {
//     if(!state?.language || !state?.topic) {
//       console.log("Redirecting to landing page, error with state");
//       navigate("/");
//     }
//     if(gptReturnState.question = defaultQuestion){
//     axios.post("/getTopic", state).then((res) => {
//       console.log(res.data);
//       setGptReturnState(res.data as GPTReturn);
//       setStarterCode(gptReturnState.codeStarter);
//     }
//     );
//   }
//   }
//   , []);

//   return (
//     <>
//       <div className="w-full items-center flex flex-col relative p-8">
//         <div className="flex flex-row gap-2  w-full flex-grow p-2">
//           <div className="w-full h-96 rounded-xl bg-[#1d1d1d] p-2">
//             <Editor ref={editorRef} starterCode={gptReturnState.codeStarter.split('\n')} />
//           </div>
//           <div className="text-white rounded-lg text-3xl w-full my-auto text-center font-mono">
//             <p>Question:</p>
//             <p>{gptReturnState.question}</p>
//           </div>
//         </div>
//         <div className="flex flex-row gap-2 my-3 bg-gray-900 rounded-2xl p-2">
//           <Button onClick={() => handleSubmitAndGetResult(gptReturnState.expectedOutput)}>
//             Run Code
//           </Button>
//           <Button>Reset Editor</Button>
//           <Button>Hint</Button>
//           <Button>Do another similar question</Button>
//           <Button onClick={() => console.log('Solution:', gptReturnState.exampleSolution)}>View Solution</Button>
//         </div>
//         {displaySol && (
//           <div className="text-white text-2xl h-full rounded-2xl text-center bg-gray-900 p-6">
//             <p className="mb-1">Expected Output: <span className="font-mono bg-gray-600 p-1">{output.expected_out}</span></p>
//             <p>Actual Output: <span className="font-mono bg-gray-600 p-1">{output.actual_out}</span></p>
//             <p>
//               Status:{" "}
//               <span
//                 className={`${output.status == "Accepted" ? "text-green-500" : "text-red-500"}`}
//               >
//                 {output.status}
//               </span>
//             </p>
//             <p>Time Taken: {output.time_taken}s</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CodeEditor;
import { Button } from "@nextui-org/react";
import { Editor } from "../components/Editor";
import { useRef, useState, useEffect } from "react";
import { submitCode } from "../utils/submitUtils";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface EditorRef {
  getCode: () => string;
}

interface Output {
  status: string;
  expected_out: string;
  actual_out: string;
  time_taken: string;
}

interface GPTReturn {
  question: string;
  codeStarter: string;
  expectedOutput: string;
  exampleSolution: string;
}

interface StateProps {
  language: string;
  topic: string;
}

const CodeEditor: React.FC = () => {
  const editorRef = useRef<EditorRef | null>(null);
  
  const [output, setOutput] = useState<Output>({
    status: "",
    expected_out: "",
    actual_out: "",
    time_taken: "",
  });
  const [displaySol, setDisplaySol] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gptData, setgptData] = useState<GPTReturn>({
    question: 'Modify the print to print out "Hello, World!" instead. 47384',
    codeStarter: "print('Hello!')",
    expectedOutput: "Hello, World!",
    exampleSolution: "print('Hello, World!')",
  });
  const [currentQuestion, setCurrentQuestion] = useState<string>('Modify the print to print out "Hello, World!" instead. 47384');

  const BASE_URL = "https://api.sitdownand.study";
  axios.defaults.baseURL = BASE_URL;

  const location = useLocation();
  const navigate = useNavigate();
  const state: StateProps = location.state as StateProps;

  const handleSubmitAndGetResult = async (
    expected_output: string,
  ): Promise<string> => {
    if (editorRef.current) {
      const code: string = editorRef.current.getCode();
      const data = await submitCode({
        source_code: code,
        language_id: 71,
        expected_output: expected_output,
      });
      console.log("Result returned:", data);
      setOutput({
        status: data.status.description,
        expected_out: expected_output,
        actual_out: data.stdout,
        time_taken: data.time,
      });
      setDisplaySol(true);
      return "Success";
    }
    return "Error";
  };

  const generateQuestionFromGPT = async () => {
    if (!state?.language || !state?.topic) {
      console.log("Redirecting to landing page, error with state");
      navigate("/");
    } 
    if(gptData.question == currentQuestion){
      setLoading(true);
      axios.post("/getTopic", state).then((res) => {
        console.log('Data received from gpt');
        console.log(res.data);
        setgptData(res.data as GPTReturn);
        setCurrentQuestion(res.data.question);
        setLoading(false);
      });
    }
    console.log('end of useEffect');
  }

  useEffect(() => {
    generateQuestionFromGPT();
  }, []);

  return (
    <>
      <div className="w-full items-center flex flex-col relative p-8">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="flex flex-row gap-2  w-full flex-grow p-2">
              <div className="w-full h-96 rounded-xl bg-[#1d1d1d] p-2">
                <Editor ref={editorRef} starterCode={gptData.codeStarter.split('\n')} />
              </div>
              <div className="text-white rounded-lg text-3xl w-full my-auto text-center font-mono">
                <p>Question:</p>
                <p>{gptData.question}</p>
              </div>
            </div>
            <div className="flex flex-row gap-2 my-3 bg-gray-900 rounded-2xl p-2">
              <Button onClick={() => handleSubmitAndGetResult(gptData.expectedOutput)}>
                Run Code
              </Button>
              <Button>Reset Editor</Button>
              <Button>Hint</Button>
              <Button onClick={() => generateQuestionFromGPT()}>Do another similar question</Button>
              <Button onClick={() => console.log('Solution:', gptData.exampleSolution)}>View Solution</Button>
            </div>
            {displaySol && (
              <div className="text-white text-2xl h-full rounded-2xl text-center bg-gray-900 p-6">
                <p className="mb-1">Expected Output: <span className="font-mono bg-gray-600 p-1">{output.expected_out}</span></p>
                <p>Actual Output: <span className="font-mono bg-gray-600 p-1">{output.actual_out}</span></p>
                <p>
                  Status:{" "}
                  <span
                    className={`${output.status == "Accepted" ? "text-green-500" : "text-red-500"}`}
                  >
                    {output.status}
                  </span>
                </p>
                <p>Time Taken: {output.time_taken}s</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CodeEditor;
