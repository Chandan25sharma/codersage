import { FaGithub, FaMagic } from 'react-icons/fa';

function Header() {
  return (
    <header className="bg-surface/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-xl shadow-lg shadow-primary/30">
              <FaMagic className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CodeSage
              </h1>
              <p className="text-textMuted text-sm">AI-Powered Developer Tools</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-textMuted hover:text-text transition-colors duration-200"
            >
              <FaGithub className="text-2xl" />
            </a>
            <div className="hidden sm:flex items-center gap-2 bg-card px-4 py-2 rounded-lg border border-border">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-textMuted text-sm">AI Ready</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
