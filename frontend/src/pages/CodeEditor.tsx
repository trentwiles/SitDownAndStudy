import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Editor } from "../components/Editor";
import { useRef, useState, useEffect } from "react";
import { submitCode } from "../utils/submitUtils";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { RotateSpinner } from "react-spinners-kit";
import { CopyBlock, atomOneDark } from 'react-code-blocks';

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModalOpenChange = () => setIsModalOpen(!isModalOpen);
  

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
      <Modal size="5xl" className="dark" isOpen={isModalOpen} onOpenChange={onModalOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                <CopyBlock
                  theme={atomOneDark}
                  text={gptData.exampleSolution}
                  language={state.language}
                  showLineNumbers={true}
                />
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="w-full items-center flex flex-col relative">
        {loading ? (
          <div className="h-screen flex items-center justify-center">
          <RotateSpinner 
            size={50} 
            loading={loading} 
            color="#0000FF"
          />
        </div>
        ) : (
          <>
            <div className="flex flex-row gap-4  w-full flex-grow px-8 pt-8 py-4">
              <div className="w-full h-96 rounded-xl bg-[#1d1d1d] p-8">
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
              <Button onClick={() => navigate('/home', {state: {language: state.language}})}>Learn Something Else</Button>
              <Button onClick={() => generateQuestionFromGPT()}>Do another question</Button>
              <Button onClick={() => setIsModalOpen(true)}>View Solution</Button>
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
