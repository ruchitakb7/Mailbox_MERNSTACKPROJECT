import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './maileditor.css';  


export default function EditorComponent() {
    const [editorState, setEditorState] = useState(null);
  
    const handleEditorChange = (contentState) => {
      setEditorState(contentState);
    };
  
    return (
      <div className="editor-container">
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign'],
          }}
        />
      </div>
    );
  }
  