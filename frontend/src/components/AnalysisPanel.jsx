import Editor from '@monaco-editor/react';
import { FaCheckCircle, FaCode, FaExclamationTriangle, FaLightbulb, FaShieldAlt, FaTachometerAlt } from 'react-icons/fa';

function AnalysisPanel({ analysis, loading, language }) {
  if (loading) {
    return (
      <div className="bg-surface rounded-xl shadow-2xl border border-border p-8 flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
          <p className="text-text text-xl font-semibold">Analyzing your code with AI...</p>
          <p className="text-textMuted mt-2">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-surface rounded-xl shadow-2xl border border-border p-8 flex items-center justify-center min-h-[600px]">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🧙‍♂️</div>
          <h3 className="text-2xl font-bold text-text mb-3">Ready to Help!</h3>
          <p className="text-textMuted mb-6">
            Paste your code in the editor and click one of the action buttons to get AI-powered insights.
          </p>
          <div className="space-y-2 text-left bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3 text-sm">
              <span className="text-danger">🐛</span>
              <span className="text-textMuted"><strong>Analyze:</strong> Find errors and issues</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-info">🚀</span>
              <span className="text-textMuted"><strong>Optimize:</strong> Improve performance</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-primary">🔧</span>
              <span className="text-textMuted"><strong>Refactor:</strong> Clean up code</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { type, data } = analysis;

  return (
    <div className="bg-surface rounded-xl shadow-2xl border border-border overflow-hidden">
      <div className="p-4 bg-card border-b border-border">
        <h2 className="text-xl font-bold text-text flex items-center gap-2">
          <span className="text-2xl">
            {type === 'analyze' && '🔍'}
            {type === 'optimize' && '⚡'}
            {type === 'refactor' && '✨'}
          </span>
          {type === 'analyze' && 'Analysis Results'}
          {type === 'optimize' && 'Optimization Results'}
          {type === 'refactor' && 'Refactoring Results'}
        </h2>
      </div>
      
      <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto space-y-6">
        {type === 'analyze' && <AnalyzeView data={data} />}
        {type === 'optimize' && <OptimizeView data={data} language={language} />}
        {type === 'refactor' && <RefactorView data={data} language={language} />}
      </div>
    </div>
  );
}

function AnalyzeView({ data }) {
  const Section = ({ title, items, icon: Icon, color }) => {
    if (!items || items.length === 0) {
      return (
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Icon className={`text-${color}`} />
            <h3 className="font-semibold text-text">{title}</h3>
          </div>
          <p className="text-success text-sm flex items-center gap-2">
            <FaCheckCircle /> No issues found!
          </p>
        </div>
      );
    }

    return (
      <div className="bg-card rounded-lg p-4 border border-border">
        <div className="flex items-center gap-2 mb-3">
          <Icon className={`text-${color}`} />
          <h3 className="font-semibold text-text">{title}</h3>
          <span className="ml-auto bg-surface px-2 py-1 rounded text-xs text-textMuted">{items.length}</span>
        </div>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="bg-surface p-3 rounded border-l-4 border-${color}">
              <p className="font-medium text-text text-sm">{item.issue || item.title || 'Issue'}</p>
              <p className="text-textMuted text-xs mt-1">{item.explanation || item.description || ''}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Section title="Errors" items={data.errors} icon={FaExclamationTriangle} color="danger" />
      <Section title="Code Quality Issues" items={data.qualityIssues} icon={FaLightbulb} color="warning" />
      <Section title="Security Concerns" items={data.securityConcerns} icon={FaShieldAlt} color="warning" />
      <Section title="Performance Issues" items={data.performanceIssues} icon={FaTachometerAlt} color="info" />
      
      {data.rawResponse && (
        <details className="bg-card rounded-lg p-4 border border-border">
          <summary className="cursor-pointer text-textMuted text-sm">View Raw Response</summary>
          <pre className="mt-2 text-xs text-textMuted overflow-x-auto font-mono">{JSON.stringify(data.rawResponse, null, 2)}</pre>
        </details>
      )}
    </>
  );
}

function OptimizeView({ data, language }) {
  return (
    <>
      {data.optimizations && data.optimizations.length > 0 && (
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <FaLightbulb className="text-warning" />
            <h3 className="font-semibold text-text">Optimization Suggestions</h3>
          </div>
          <div className="space-y-3">
            {data.optimizations.map((opt, index) => (
              <div key={index} className="bg-surface p-3 rounded border-l-4 border-info">
                <p className="font-medium text-text text-sm">{opt.title}</p>
                <p className="text-textMuted text-xs mt-1">{opt.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.optimizedCode && (
        <div className="bg-card rounded-lg overflow-hidden border border-border">
          <div className="flex items-center gap-2 p-3 bg-card">
            <FaCode className="text-success" />
            <h3 className="font-semibold text-text">Optimized Code</h3>
          </div>
          <div className="h-[300px] font-mono">
            <Editor
              height="100%"
              language={language}
              value={data.optimizedCode}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 13,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                fontFamily: 'Fira Code',
                tokenColors: [
                  { scope: 'comment', settings: { foreground: '#607289' } },
                  { scope: 'keyword', settings: { foreground: '#C084FC' } },
                  { scope: 'string', settings: { foreground: '#10B981' } },
                  { scope: 'number', settings: { foreground: '#F59E0B' } },
                  { scope: 'variable', settings: { foreground: '#E2E8F0' } },
                  { scope: 'function', settings: { foreground: '#3B82F6' } },
                  { scope: 'type', settings: { foreground: '#EC4899' } },
                ],
              }}
            />
          </div>
        </div>
      )}

      {data.explanation && (
        <div className="bg-card rounded-lg p-4 border border-border">
          <h3 className="font-semibold text-text mb-2">Explanation</h3>
          <p className="text-textMuted text-sm">{data.explanation}</p>
        </div>
      )}
    </>
  );
}

function RefactorView({ data, language }) {
  return (
    <>
      {data.refactoredCode && (
        <div className="bg-card rounded-lg overflow-hidden border border-border">
          <div className="flex items-center gap-2 p-3 bg-card">
            <FaCode className="text-primary" />
            <h3 className="font-semibold text-text">Refactored Code</h3>
          </div>
          <div className="h-[300px] font-mono">
            <Editor
              height="100%"
              language={language}
              value={data.refactoredCode}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 13,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                fontFamily: 'Fira Code',
                tokenColors: [
                  { scope: 'comment', settings: { foreground: '#607289' } },
                  { scope: 'keyword', settings: { foreground: '#C084FC' } },
                  { scope: 'string', settings: { foreground: '#10B981' } },
                  { scope: 'number', settings: { foreground: '#F59E0B' } },
                  { scope: 'variable', settings: { foreground: '#E2E8F0' } },
                  { scope: 'function', settings: { foreground: '#3B82F6' } },
                  { scope: 'type', settings: { foreground: '#EC4899' } },
                ],
              }}
            />
          </div>
        </div>
      )}

      {data.changes && data.changes.length > 0 && (
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <FaLightbulb className="text-warning" />
            <h3 className="font-semibold text-text">Changes Made</h3>
          </div>
          <ul className="space-y-2">
            {data.changes.map((change, index) => (
              <li key={index} className="flex items-start gap-2 text-textMuted text-sm">
                <span className="text-success mt-1">✓</span>
                <span>{change}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.benefits && data.benefits.length > 0 && (
        <div className="bg-card rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <FaCheckCircle className="text-success" />
            <h3 className="font-semibold text-text">Benefits</h3>
          </div>
          <ul className="space-y-2">
            {data.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-textMuted text-sm">
                <span className="text-info mt-1">→</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default AnalysisPanel;
