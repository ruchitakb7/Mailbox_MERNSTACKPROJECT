// import React, { useState } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import './maileditor.css';  


// export default function EditorComponent() {
//     const [editorState, setEditorState] = useState(null);
  
//     const handleEditorChange = (contentState) => {
//       console.log(contentState)
//       setEditorState(contentState);
//     };
  
//     return (
//       <div className="editor-container">
//         <Editor
//           editorState={editorState}
//           onContentChange={handleEditorChange}
//           placeholder="Write your email content here..."
//           toolbar={{
//             options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign'],
//           }}
//         />
//       </div>
//     );
//   }


// import React, { useState } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import './maileditor.css';  

// export default function EditorComponent({ onContentChange }) {
//   const [editorState, setEditorState] = useState(null);

//   const handleEditorChange = (contentState) => {
//     setEditorState(contentState);
//     if (onContentChange) {
//       onContentChange(contentState);
//     }
//   };

//   return (
//     <div className="editor-container">
//       <Editor
//         editorState={editorState}
//         onContentChange={handleEditorChange}
//         placeholder="Write your email content here..."
//         toolbar={{
//           options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign'],
//         }}
//       />
//     </div>
//   );
// }

import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './maileditor.css';

export default function EditorComponent({ onContentChange }) {
  // Initialize editorState with an empty EditorState
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Handle editor state changes
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);

    // Convert the content to raw JSON format and pass it to parent
    const contentState = convertToRaw(newEditorState.getCurrentContent());
    if (onContentChange) {
      onContentChange(contentState);
    }
  };

  return (
    <div className="editor-container">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange} // Use onEditorStateChange for handling changes
        placeholder="Write your email content here..."
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign'],
        }}
      />
    </div>
  );
}

