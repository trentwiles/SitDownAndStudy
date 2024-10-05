import { Button } from "@nextui-org/react";
import { Editor } from "../components/Editor";
import { useRef } from "react";

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

  return (
    <>
      <div className="w-screen h-screen items-center flex flex-col">
        <p className="">Code learn</p>
        <Button onClick={handleGetCode}>Click Me</Button>
        <div className="w-full h-96 p-20">
          <Editor ref={editorRef} />
        </div>
      </div>
    </>
  );
};

export default CodeEditor;