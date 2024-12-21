

import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './maileditor.css';

export default function EditorComponent({ onContentChange }) {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());


  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);

   
    const contentState = convertToRaw(newEditorState.getCurrentContent());
    if (onContentChange) {
      onContentChange(contentState);
    }
  };

  return (
    <div className="editor-container">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange} 
        placeholder="Write your email content here..."
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign'],
        }}
      />
    </div>
  )}

