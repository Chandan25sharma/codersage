# API Integration Guide

CodeSage supports multiple AI providers. This guide shows you how to use different APIs.

## Supported AI Providers

1. **DeepSeek** (Default) - Cost-effective, powerful
2. **Google Gemini** - Google's latest AI model
3. **OpenAI GPT** - Industry standard (can be added)
4. **Anthropic Claude** - High-quality responses (can be added)

---

## 1. DeepSeek API (Default)

### Getting Started

1. **Sign up**: Visit [https://platform.deepseek.com/](https://platform.deepseek.com/)
2. **Get API Key**: Navigate to API Keys section
3. **Pricing**: Very affordable, ~$0.14 per 1M tokens

### Configuration

Edit `backend/.env`:
```env
DEEPSEEK_API_KEY=sk-your-key-here
DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions
```

### Features
- Fast response times
- Excellent code understanding
- Cost-effective for high volume
- Good at debugging and optimization

---

## 2. Google Gemini API

### Getting Started

1. **Sign up**: Visit [https://makersuite.google.com/](https://makersuite.google.com/)
2. **Get API Key**: Go to "Get API Key" section
3. **Pricing**: Free tier available, then pay-as-you-go

### Configuration

**Option A: Switch to Gemini completely**

Edit `backend/routes/analyze.js`:
```javascript
// Replace this line:
import { analyzeCode, optimizeCode, refactorCode } from '../services/aiService.js';

// With:
import { 
  analyzeCodeWithGemini as analyzeCode,
  optimizeCodeWithGemini as optimizeCode,
  refactorCodeWithGemini as refactorCode 
} from '../services/geminiService.js';
```

Edit `backend/.env`:
```env
GEMINI_API_KEY=your-gemini-key-here
```

**Option B: Use both (fallback system)**

Create `backend/services/unifiedService.js`:
```javascript
import * as deepseek from './aiService.js';
import * as gemini from './geminiService.js';

export async function analyzeCode(code, language) {
  try {
    return await deepseek.analyzeCode(code, language);
  } catch (error) {
    console.log('DeepSeek failed, trying Gemini...');
    return await gemini.analyzeCodeWithGemini(code, language);
  }
}
// ... similar for other functions
```

### Features
- Free tier available
- Excellent reasoning
- Good for complex analysis
- Multimodal capabilities (future expansion)

---

## 3. OpenAI GPT (To Add)

### Setup

1. Get API key from [https://platform.openai.com/](https://platform.openai.com/)
2. Create `backend/services/openaiService.js`:

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeCode(code, language) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: "You are an expert code analyst..." },
      { role: "user", content: `Analyze this ${language} code: ${code}` }
    ],
    response_format: { type: "json_object" }
  });
  
  return JSON.parse(completion.choices[0].message.content);
}
```

3. Install dependency: `npm install openai`

---

## API Comparison

| Provider | Cost | Speed | Quality | Free Tier |
|----------|------|-------|---------|-----------|
| DeepSeek | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Limited |
| Gemini | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Yes |
| GPT-4 | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | No |
| Claude | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Limited |

---

## Switching Between APIs

### Method 1: Environment Variable

```javascript
// backend/services/aiService.js
const AI_PROVIDER = process.env.AI_PROVIDER || 'deepseek';

export async function analyzeCode(code, language) {
  switch(AI_PROVIDER) {
    case 'gemini':
      return analyzeWithGemini(code, language);
    case 'openai':
      return analyzeWithOpenAI(code, language);
    default:
      return analyzeWithDeepSeek(code, language);
  }
}
```

### Method 2: UI Selection

Add to frontend to let users choose:
```jsx
<select value={aiProvider} onChange={(e) => setAiProvider(e.target.value)}>
  <option value="deepseek">DeepSeek</option>
  <option value="gemini">Gemini</option>
  <option value="openai">GPT-4</option>
</select>
```

---

## Rate Limiting & Error Handling

Add to your service:

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## Best Practices

1. **Always use environment variables** for API keys
2. **Implement retry logic** with exponential backoff
3. **Cache responses** for identical code snippets
4. **Monitor usage** to avoid unexpected costs
5. **Set token limits** to prevent excessive API calls
6. **Validate input** before sending to AI
7. **Handle errors gracefully** with user-friendly messages

---

## Cost Optimization Tips

1. **Cache results**: Store analysis for commonly analyzed code
2. **Truncate large files**: Only send relevant portions
3. **Use cheaper models for simple tasks**: Don't use GPT-4 for syntax checks
4. **Batch requests**: Analyze multiple files in one call when possible
5. **Set max_tokens**: Limit response length to save costs

---

## Testing API Integration

```bash
# Test DeepSeek
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"code": "console.log(\"test\")", "language": "javascript"}'

# Check health
curl http://localhost:3001/health
```

---

## Troubleshooting

### "API key invalid"
- Verify key is correct in `.env`
- Check if key has necessary permissions
- Ensure no extra spaces in the key

### "Rate limit exceeded"
- Implement caching
- Add delays between requests
- Upgrade to higher tier

### "Timeout errors"
- Increase timeout in axios config
- Reduce code size being analyzed
- Try a different AI provider

---

## Future Enhancements

- [ ] Multi-provider fallback system
- [ ] Response caching with Redis
- [ ] User-specific API key management
- [ ] Cost tracking dashboard
- [ ] A/B testing different models
- [ ] Custom fine-tuned models

---

For more help, open an issue on GitHub or check the main README.md
