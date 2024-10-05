import { Button } from "@nextui-org/react";
import { Editor } from "../components/Editor";

const CodeEditor = () => {
  return (
    <>
      <div className="w-screen h-screen items-center flex flex-col">
        <p className="">Code learn</p>
        <Button>Click Me</Button>
        <div className="w-full h-full p-20">
        <Editor />
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
