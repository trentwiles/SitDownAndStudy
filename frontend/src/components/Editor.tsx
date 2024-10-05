import { useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export const Editor = () => {
	const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
	const monacoEl = useRef(null);

	useEffect(() => {
		if (monacoEl) {
			setEditor((editor) => {
				if (editor) return editor;
        
				return monaco.editor.create(monacoEl.current!, {
					value: ['public class Main {\n', 
            '\tpublic static void main(String[] args) {\n', 
            '\t\tSystem.out.println("Hello, World");\n', 
            '\t}', 
            '}'].join('\n'),
					language: 'java',
          theme: 'vs-dark',
				});
			});
		}

		return () => editor?.dispose();
	}, [monacoEl.current]);

	return <div className={"w-full h-full"} ref={monacoEl}></div>;
};