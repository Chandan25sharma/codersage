# CodeSage - AI Debug Assistant 🧙‍♂️

A powerful browser-based playground where you can paste code and get instant AI-powered debugging, optimization suggestions, and refactored code.

## Features

- 🐛 **Intelligent Error Detection**: Paste your code and get detailed explanations of errors
- ⚡ **Code Optimization**: Get suggestions to improve performance and readability
- 🔄 **Smart Refactoring**: Receive refactored code with best practices
- 🎨 **Syntax Highlighting**: Beautiful code editor with multiple language support
- 🤖 **Powered by DeepSeek AI**: Fast, accurate, and cost-effective LLM API

## Tech Stack

**Frontend:**
- React + Vite
- Monaco Editor (VSCode's editor)
- Tailwind CSS
- Axios

**Backend:**
- Node.js + Express
- DeepSeek API
- CORS enabled

## Getting Started

### Prerequisites
- Node.js 16+ installed
- DeepSeek API key (get one at https://platform.deepseek.com/)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:

Create `backend/.env`:
```
DEEPSEEK_API_KEY=your_api_key_here
PORT=3001
```

4. Run the application:

```bash
# Terminal 1 - Start backend
cd backend
npm run dev

# Terminal 2 - Start frontend
cd frontend
npm run dev
```

5. Open http://localhost:5173 in your browser

## Usage

1. Select your programming language
2. Paste your code in the editor
3. Click "Analyze Code" to get AI-powered insights
4. View error explanations, optimization suggestions, and refactored code

## API Endpoints

- `POST /api/analyze` - Analyze code for errors and improvements
- `POST /api/optimize` - Get optimization suggestions
- `POST /api/refactor` - Get refactored code with best practices

## License

MIT License
