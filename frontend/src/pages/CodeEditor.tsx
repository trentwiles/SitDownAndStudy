import { Button } from "@nextui-org/react";
import { Editor } from "../components/Editor";
import { useRef } from "react";
import { submitCode, getResult } from "../utils/submitUtils";
interface EditorRef {
  getCode: () => string;
}

const CodeEditor: React.FC = () => {
  const editorRef = useRef<EditorRef | null>(null);

  const handleGetCode = (): void => {
    if (editorRef.current) {
      const code: string = editorRef.current.getCode();
      console.log(code);
    }
  };

  const handleSubmitAndGetResult = async (expected_output: string): Promise<string> => {
    if (editorRef.current) {
      const code: string = editorRef.current.getCode();
      const data = await submitCode({
        source_code: code,
        language_id: 71,
        expected_output: expected_output,
      });
      console.log("Result returned:", data);
      return data;
    }
    return "Error";
  }

  return (
    <>
      <div className="w-screen h-screen items-center flex flex-col">
        <p className="">Code learn</p>
        <Button onClick={handleGetCode}>Click Me</Button>
        <Button onClick={() => handleSubmitAndGetResult("Hello")}>Get result of submission</Button>
        <div className="w-full h-96 p-20">
          <Editor ref={editorRef} />
        </div>
      </div>
    </>
  );
};

export default CodeEditor;