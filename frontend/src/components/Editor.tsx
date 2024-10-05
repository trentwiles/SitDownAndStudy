import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

interface EditorProps {}

export interface EditorHandle {
  getCode: () => string;
}

export const Editor = forwardRef<EditorHandle, EditorProps>((_, ref) => {
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (monacoEl.current) {
      setEditor((editor) => {
        if (editor) return editor;

        return monaco.editor.create(monacoEl.current!, {
          value: [
            "print('Hello!')",
          ].join("\n"),
          language: "python",
          theme: "vs-dark",
        });
      });
    }

    return () => editor?.dispose();
  }, [monacoEl.current]);

  useImperativeHandle(ref, () => ({
    getCode: () => {
      return editor?.getValue() || "";
    },
  }));

  return <div className="w-full h-full" ref={monacoEl}></div>;
});
