import Editor from '@monaco-editor/react';

function CodeEditor({ code, setCode, language }) {
  const languageMap = {
    javascript: 'javascript',
    typescript: 'typescript',
    python: 'python',
    java: 'java',
    cpp: 'cpp',
    go: 'go',
    rust: 'rust',
    php: 'php',
    ruby: 'ruby',
    csharp: 'csharp'
  };

  return (
    <div className="h-[500px] font-mono">
      <Editor
        height="100%"
        language={languageMap[language] || 'javascript'}
        value={code}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 16, bottom: 16 },
          fontFamily: 'Fira Code',
          tokenColors: [
            { scope: 'comment', settings: { foreground: '#607289' } },
            { scope: 'keyword', settings: { foreground: '#C084FC' } }, // Primary purple
            { scope: 'string', settings: { foreground: '#10B981' } }, // Success green
            { scope: 'number', settings: { foreground: '#F59E0B' } }, // Warning amber
            { scope: 'variable', settings: { foreground: '#E2E8F0' } },
            { scope: 'function', settings: { foreground: '#3B82F6' } }, // Info blue
            { scope: 'type', settings: { foreground: '#EC4899' } }, // Secondary pink
          ]
        }}
      />
    </div>
  );
}

export default CodeEditor;
