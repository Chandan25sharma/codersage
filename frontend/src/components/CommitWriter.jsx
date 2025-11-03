import Editor from '@monaco-editor/react';
import { useState } from 'react';
import { FaClipboard, FaGithub, FaMagic, FaTasks } from 'react-icons/fa';
import { generateCommitMessage } from '../services/api';

function CommitWriter() {
  const [gitDiff, setGitDiff] = useState('');
  const [commitMessage, setCommitMessage] = useState(''); // This should always be a string
  const [loading, setLoading] = useState(false);
  const [autoPrSummary, setAutoPrSummary] = useState(false);
  const [emojiStyle, setEmojiStyle] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Function to handle copying to clipboard
  const copyToClipboard = () => {
    if (!commitMessage) return;
    navigator.clipboard.writeText(commitMessage)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        alert('Could not copy to clipboard');
      });
  };

  const handleGenerateCommit = async () => {
    if (!gitDiff.trim()) {
      alert('Please paste a git diff to generate a commit message.');
      return;
    }

    setLoading(true);
    setCommitMessage(''); // Clear previous message
    try {
      const result = await generateCommitMessage(gitDiff, autoPrSummary, emojiStyle);
      // console.log('Frontend received from backend:', JSON.stringify(result, null, 2)); // Removed debug log

      // Explicitly check for result.commitMessage and set the state with the string
      if (result && typeof result === 'object' && result.commitMessage) {
        setCommitMessage(String(result.commitMessage));
      } else if (typeof result === 'string') {
        setCommitMessage(result); // Fallback if backend unexpectedly sends a raw string
      } else {
        console.warn('Unexpected response format from backend:', result);
        setCommitMessage('⚠️ Unexpected response format from backend.');
      }
    } catch (error) {
      console.error('Error generating commit message:', error);
      alert('Failed to generate commit message. Check console for details.');
      setCommitMessage('Error: Could not generate commit message.'); // Display error to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Panel - Git Diff Input */}
      <div className="bg-surface rounded-xl shadow-2xl border border-border overflow-hidden">
        <div className="p-4 bg-card border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold text-text flex items-center gap-2">
            <FaGithub className="text-xl" />
            Git Diff Input
          </h2>
        </div>

        <div className="h-[400px] font-mono">
          <Editor
            height="100%"
            language="diff"
            value={gitDiff}
            onChange={(value) => setGitDiff(value || '')}
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
            }}
          />
        </div>

        <div className="p-4 bg-card border-t border-border flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center text-textMuted cursor-pointer">
              <input
                type="checkbox"
                checked={autoPrSummary}
                onChange={(e) => setAutoPrSummary(e.target.checked)}
                className="form-checkbox h-5 w-5 text-primary rounded border-border bg-surface focus:ring-primary"
              />
              <span className="ml-2 text-text">Auto PR Summary</span>
            </label>
            <label className="flex items-center text-textMuted cursor-pointer">
              <input
                type="checkbox"
                checked={emojiStyle}
                onChange={(e) => setEmojiStyle(e.target.checked)}
                className="form-checkbox h-5 w-5 text-secondary rounded border-border bg-surface focus:ring-secondary"
              />
              <span className="ml-2 text-text">Emoji Style</span>
            </label>
          </div>
          <button
            onClick={handleGenerateCommit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FaMagic /> {loading ? 'Generating...' : 'Generate Commit Message'}
          </button>
        </div>
      </div>

      {/* Right Panel - Generated Commit Message */}
      <div className="bg-surface rounded-xl shadow-2xl border border-border overflow-hidden">
        <div className="p-4 bg-card border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold text-text flex items-center gap-2">
            <FaTasks className="text-xl" />
            Generated Commit Message
          </h2>
          {commitMessage && (
            <button
              onClick={copyToClipboard}
              className="bg-card text-textMuted hover:text-text px-3 py-1 rounded-md transition-colors duration-200 flex items-center gap-2 border border-border"
            >
              {copySuccess ? 'Copied!' : 'Copy'} <FaClipboard />
            </button>
          )}
        </div>

        <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
          {commitMessage ? (
            <pre className="bg-codeBg p-4 rounded-lg text-text font-mono overflow-x-auto text-sm">
              {String(commitMessage)} {/* Ensure it's rendered as a string */}
            </pre>
          ) : (
            <div className="text-textMuted text-center py-12">
              {loading ? (
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary mb-4"></div>
              ) : (
                <FaMagic className="text-6xl text-textMuted opacity-30 mb-4 mx-auto" />
              )}
              <p className="text-lg font-semibold">Your AI-generated commit message will appear here.</p>
              <p className="text-sm mt-2">Paste a git diff on the left and click 'Generate'.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommitWriter;
