import React, { useRef, useState , useEffect} from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import './MarkdownEditor.css';

function App() {
  const [value, setValue] = useState('');
  const previewRef = useRef(null);

  const handleChange = (val) => {
    setValue(val);
  };

  return (
    <div className="container">
      <div className="editor">
        <MarkdownEditor
          value={value}
          onChange={handleChange}
          enablePreview={true}
          style={{ height: '100vh' }}
        />
      </div>
      <div className="preview" ref={previewRef}>
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </div>
    </div>
  );
}

export default App;
