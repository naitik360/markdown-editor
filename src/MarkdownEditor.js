import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import { FiRefreshCcw, FiArrowUp, FiArrowDown, FiCopy } from 'react-icons/fi';
import './MarkdownEditor.css';

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState('');
  const [lineNumbers, setLineNumbers] = useState('');
  const [isNightMode, setIsNightMode] = useState(false);
  const editorRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    const updateLineNumbers = () => {
      if (editorRef.current) {
        const lines = editorRef.current.value.split('\n').length;
        let numbers = '';
        for (let i = 1; i <= lines; i++) {
          numbers += i + '\n';
        }
        setLineNumbers(numbers);
      }
    };

    updateLineNumbers();

    const handleInput = () => {
      updateLineNumbers();
    };

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener('input', handleInput);
    }

    return () => {
      if (editor) {
        editor.removeEventListener('input', handleInput);
      }
    };
  }, [markdown]);

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  const handleRefresh = () => {
    setMarkdown('');
  };

  const scrollToTop = () => {
    if (previewRef.current) {
      previewRef.current.scrollTo(0, 0);
    }
  };

  const scrollToBottom = () => {
    if (previewRef.current) {
      previewRef.current.scrollTo(0, previewRef.current.scrollHeight);
    }
  };

  const copyToClipboard = () => {
    if (editorRef.current) {
      navigator.clipboard.writeText(editorRef.current.value)
        .then(() => alert('Text copied to clipboard!'))
        .catch(err => console.error('Failed to copy text: ', err));
    }
  };

  const toggleNightMode = () => {
    setIsNightMode(prevMode => !prevMode);
  };

  const editorStyles = {
    backgroundColor: isNightMode ? 'black' : 'white',
    color: isNightMode ? 'white' : 'black',
  };

  const previewStyles = {
    backgroundColor: isNightMode ? 'white' : 'white',
    color: isNightMode ? 'white' : 'black',
  };

  return (
    <div className="markdown-editor-container">
      <div className="editor-controls">
        <button className="refresh-button" onClick={handleRefresh}>
          Refresh
          <FiRefreshCcw className="refresh-icon" />
        </button>
        <button className="copy-button" onClick={copyToClipboard}>
          Copy
          <FiCopy className="copy-icon" />
        </button>
        <button className="toggle-mode-button" onClick={toggleNightMode}>
          {isNightMode ? 'Day Mode' : 'Night Mode'}
        </button>
      </div>
      <div className="editor-preview-wrapper">
        <div className="editor-wrapper">
          <div className="line-numbers">
            <pre style={{ paddingBottom: '20px' }}>{lineNumbers}</pre>
          </div>
          <textarea
            id="editor"
            ref={editorRef}
            style={editorStyles}
            placeholder="Type your markdown here..."
            value={markdown}
            onChange={handleChange}
          />
        </div>
        <div
          id="preview"
          ref={previewRef}
          style={previewStyles}
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        />
      </div>
      <div className="scroll-buttons">
        <button className="scroll-button" onClick={scrollToTop}>
          <FiArrowUp size={20} />
        </button>
        <button className="scroll-button" onClick={scrollToBottom}>
          <FiArrowDown size={20} />
        </button>
      </div>
    </div>
  );
};

export default MarkdownEditor;
