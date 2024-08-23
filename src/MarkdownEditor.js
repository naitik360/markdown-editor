import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import { FiRefreshCcw, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import './MarkdownEditor.css';

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState('');
  const [lineNumbers, setLineNumbers] = useState('');
  const editorRef = useRef(null); // Ref for the textarea
  const previewRef = useRef(null); // Ref for the preview div

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
    // Update line numbers on input change
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

  return (
    <div className="markdown-editor-container">
      <div className="editor-controls">
        <button className="refresh-button" onClick={handleRefresh}>
          Refresh
          <FiRefreshCcw className="refresh-icon" />
        </button>
      </div>
      <div className="editor-preview-wrapper">
        <div className="editor-wrapper">
          <div className="line-numbers">
            <pre>{lineNumbers}</pre>
          </div>
          <textarea
            id="editor"
            ref={editorRef}
            placeholder="Type your markdown here..."
            value={markdown}
            onChange={handleChange}
          />
        </div>
        <div
          id="preview"
          ref={previewRef}
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        />
      </div>
      <div className="scroll-buttons">
        <button className="scroll-button" onClick={scrollToTop}>
          <FiArrowUp />
        </button>
        <button className="scroll-button" onClick={scrollToBottom}>
          <FiArrowDown />
        </button>
      </div>
    </div>
  );
};

export default MarkdownEditor;
