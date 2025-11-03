import { useState } from 'react';
import { FaBug, FaCodeBranch, FaMagic, FaRocket, FaWrench } from 'react-icons/fa';
import AnalysisPanel from './components/AnalysisPanel';
import CodeEditor from './components/CodeEditor';
import CommitWriter from './components/CommitWriter'; // New import
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import { analyzeCode, optimizeCode, refactorCode } from './services/api';

function App() {
  const [code, setCode] = useState('// Paste your code here and let AI help you debug and optimize it!\n\nfunction example() {\n  console.log(\"Hello from CodeSage!\");\n}\n');
  const [language, setLanguage] = useState('javascript');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTool, setActiveTool] = useState('codesage'); // 'codesage' or 'commitwriter'
  const [activeCodesageTab, setActiveCodesageTab] = useState('analyze'); // For CodeSage internal tabs

  const handleAnalyze = async () => {
    if (!code.trim()) {
      alert('Please enter some code to analyze');
      return;
    }

    setLoading(true);
    setActiveCodesageTab('analyze');
    try {
      const result = await analyzeCode(code, language);
      setAnalysis({ type: 'analyze', data: result });
    } catch (error) {
      console.error('Error analyzing code:', error);
      alert('Failed to analyze code. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptimize = async () => {
    if (!code.trim()) {
      alert('Please enter some code to optimize');
      return;
    }

    setLoading(true);
    setActiveCodesageTab('optimize');
    try {
      const result = await optimizeCode(code, language);
      setAnalysis({ type: 'optimize', data: result });
    } catch (error) {
      console.error('Error optimizing code:', error);
      alert('Failed to optimize code. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefactor = async () => {
    if (!code.trim()) {
      alert('Please enter some code to refactor');
      return;
    }

    setLoading(true);
    setActiveCodesageTab('refactor');
    try {
      const result = await refactorCode(code, language);
      setAnalysis({ type: 'refactor', data: result });
    } catch (error) {
      console.error('Error refactoring code:', error);
      alert('Failed to refactor code. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-text">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Main Tool Navigation */}
        <div className="mb-8 flex justify-center space-x-4">
          <button
            onClick={() => setActiveTool('codesage')}
            className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 
              ${activeTool === 'codesage' 
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 transform scale-105' 
                : 'bg-surface text-textMuted hover:bg-card'}
            `}
          >
            <FaMagic className="inline-block mr-2" /> CodeSage
          </button>
          <button
            onClick={() => setActiveTool('commitwriter')}
            className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 
              ${activeTool === 'commitwriter' 
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/30 transform scale-105' 
                : 'bg-surface text-textMuted hover:bg-card'}
            `}
          >
            <FaCodeBranch className="inline-block mr-2" /> AI Commit Writer
          </button>
        </div>

        {activeTool === 'codesage' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Code Editor */}
            <div className="bg-surface rounded-xl shadow-2xl border border-border overflow-hidden">
              <div className="p-4 bg-card border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-bold text-text flex items-center gap-2">
                  <span className="text-2xl">📝</span>
                  Code Input
                </h2>
                <LanguageSelector language={language} setLanguage={setLanguage} />
              </div>
              
              <CodeEditor code={code} setCode={setCode} language={language} />
              
              <div className="p-4 bg-card border-t border-border flex gap-3 flex-wrap">
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="flex-1 min-w-[140px] bg-gradient-to-r from-danger to-secondary hover:from-danger/80 hover:to-secondary/80 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaBug /> {loading && activeCodesageTab === 'analyze' ? 'Analyzing...' : 'Analyze'}
                </button>
                
                <button
                  onClick={handleOptimize}
                  disabled={loading}
                  className="flex-1 min-w-[140px] bg-gradient-to-r from-info to-cyan-500 hover:from-info/80 hover:to-cyan-500/80 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaRocket /> {loading && activeCodesageTab === 'optimize' ? 'Optimizing...' : 'Optimize'}
                </button>
                
                <button
                  onClick={handleRefactor}
                  disabled={loading}
                  className="flex-1 min-w-[140px] bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/80 hover:to-indigo-500/80 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaWrench /> {loading && activeCodesageTab === 'refactor' ? 'Refactoring...' : 'Refactor'}
                </button>
              </div>
            </div>

            {/* Right Panel - Analysis Results */}
            <AnalysisPanel analysis={analysis} loading={loading} language={language} />
          </div>
        )}

        {activeTool === 'commitwriter' && (
          <CommitWriter />
        )}
      </div>
    </div>
  );
}

export default App;
