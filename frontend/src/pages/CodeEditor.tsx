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
        <div className="flex flex-row gap-2 w-full bg-blue-500 flex-grow p-2">
          <div className="w-full h-96 rounded-xl bg-[#1d1d1d] p-2">
            <Editor ref={editorRef} />
          </div>
          <div className="text-gray-800 rounded-lg text-3xl w-full h-full bg-white text-center my-auto font-mono">
            <p>Question:</p>
            <p>Modify the print to print out "Hello, World!" instead.</p>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Button onClick={() => handleSubmitAndGetResult(exp_output)}>
            Run Code
          </Button>
          <Button>Reset</Button>
          <Button>More Hints</Button>
          <Button>View Solution</Button>
        </div>
        {displaySol && (
          <div className="text-white ">
            <p>Expected Output: {output.expected_out}</p>
            <p>Actual Output: {output.actual_out}</p>
            <p>Status: {output.status}</p>
            <p>Time Taken: {output.time_taken}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CodeEditor;
