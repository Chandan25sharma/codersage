# CodeSage Setup Guide 🚀

## Quick Start

### Step 1: Get Your DeepSeek API Key

1. Visit [DeepSeek Platform](https://platform.deepseek.com/)
2. Sign up for an account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (you'll need it in Step 3)

**Alternative**: You can also use Gemini API by modifying the backend service.

### Step 2: Install Dependencies

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd codesage/backend
npm install
```

**Terminal 2 - Frontend:**
```bash
cd codesage/frontend
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the `backend` folder:

```bash
cd backend
copy .env.example .env
```

Edit `.env` and add your API key:
```
DEEPSEEK_API_KEY=sk-your-actual-api-key-here
DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions
PORT=3001
NODE_ENV=development
```

### Step 4: Start the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
🚀 CodeSage backend running on port 3001
📡 API endpoint: http://localhost:3001/api
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### Step 5: Open in Browser

Visit: **http://localhost:5173**

## Testing the Application

1. **Paste some code** with intentional errors, for example:

```javascript
function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

const result = calculateSum([1, 2, 3, 4, 5]);
console.log(result);
```

2. **Click "Analyze"** to see AI-detected issues
3. **Click "Optimize"** to get performance improvements
4. **Click "Refactor"** to see cleaner code

## Troubleshooting

### Backend won't start
- Make sure you have Node.js 16+ installed
- Verify your API key is correct in `.env`
- Check if port 3001 is available

### Frontend won't connect to backend
- Ensure backend is running on port 3001
- Check browser console for CORS errors
- Verify `VITE_API_URL` in frontend/.env (optional)

### API requests failing
- Verify your DeepSeek API key is valid
- Check your API quota/credits
- Look at backend logs for detailed errors

## Using Gemini API Instead

To use Google's Gemini API instead of DeepSeek:

1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

2. Modify `backend/services/aiService.js`:
   - Update the API endpoint
   - Change the request format to match Gemini's API
   
3. Update your `.env`:
```
GEMINI_API_KEY=your-gemini-api-key
```

## Production Deployment

### Backend
- Deploy to services like Render, Railway, or Heroku
- Set environment variables in your hosting platform
- Use production-grade settings (CORS, rate limiting)

### Frontend
- Build: `npm run build`
- Deploy to Vercel, Netlify, or Cloudflare Pages
- Update `VITE_API_URL` to point to your backend URL

## Project Structure

```
codesage/
├── backend/
│   ├── routes/         # API route handlers
│   ├── services/       # AI service integration
│   ├── .env           # Environment variables (create this)
│   ├── server.js      # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── services/   # API client
│   │   ├── App.jsx    # Main app component
│   │   └── main.jsx   # Entry point
│   ├── index.html
│   └── package.json
└── README.md
```

## Features

✅ Real-time code analysis with AI
✅ Error detection and explanations
✅ Performance optimization suggestions
✅ Code refactoring with best practices
✅ Support for 10+ programming languages
✅ Beautiful Monaco editor (VSCode engine)
✅ Responsive design
✅ Dark mode UI

## Next Steps

Consider adding:
- User authentication
- Code snippet saving/sharing
- Git integration
- Custom AI prompts
- Multi-file analysis
- Unit test generation
- Documentation generation

Enjoy using CodeSage! 🧙‍♂️
