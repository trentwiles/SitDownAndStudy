import { Button } from "@nextui-org/react";
import { Editor } from "../components/Editor";
import { useRef, useState } from "react";
import { submitCode } from "../utils/submitUtils";
interface EditorRef {
  getCode: () => string;
}

interface Output {
  status: string;
  expected_out: string;
  actual_out: string;
  time_taken: string;
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
  const [starterCode, setStarterCode] = useState<string>("print('Hello!')");

  const exp_output = "Hello, World!";

  // const handleGetCode = (): void => {
  //   if (editorRef.current) {
  //     const code: string = editorRef.current.getCode();
  //     console.log(code);
  //   }
  // };

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

  return (
    <>
      <div className="w-full items-center flex flex-col relative p-8">
        <div className="flex flex-row gap-2  w-full flex-grow p-2">
          <div className="w-full h-96 rounded-xl bg-[#1d1d1d] p-2">
            <Editor ref={editorRef} starterCode={starterCode} />
          </div>
          <div className="text-white rounded-lg text-3xl w-full my-auto text-center font-mono">
            <p>Question:</p>
            <p>Modify the print to print out "Hello, World!" instead.</p>
          </div>
        </div>
        <div className="flex flex-row gap-2 my-3 bg-gray-900 rounded-2xl p-2">
          <Button onClick={() => handleSubmitAndGetResult(exp_output)}>
            Run Code
          </Button>
          <Button>Reset Editor</Button>
          <Button>Hint</Button>
          <Button>Do another similar question</Button>
          <Button>View Solution</Button>
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
      </div>
    </>
  );
};

export default CodeEditor;
