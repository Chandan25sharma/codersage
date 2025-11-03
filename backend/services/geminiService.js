// Alternative AI Service using Google Gemini API
// To use this instead of DeepSeek:
// 1. Get API key from https://makersuite.google.com/app/apikey
// 2. Update .env with GEMINI_API_KEY
// 3. Replace imports in aiService.js

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

async function callGeminiAPI(prompt, temperature = 0.7) {
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: temperature,
          maxOutputTokens: 4000, // Increased maxOutputTokens
          topP: 0.8,
          topK: 40
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Removed TEMPORARY: Log the full Gemini API response data for debugging

    // Check if candidates and content.parts exist before trying to access them
    if (response.data.candidates && response.data.candidates.length > 0 &&
        response.data.candidates[0].content && response.data.candidates[0].content.parts &&
        response.data.candidates[0].content.parts.length > 0) {
      return response.data.candidates[0].content.parts[0].text;
    } else {
      console.error('Gemini API did not return expected text content:', JSON.stringify(response.data, null, 2));
      throw new Error('Gemini API response missing expected text content.');
    }
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    throw new Error('Failed to communicate with Gemini AI service');
  }
}

export async function analyzeCodeWithGemini(code, language) {
  const prompt = `You are an expert code analyst. Analyze the following ${language} code and provide:

1. **Errors Found**: List any syntax errors, logical errors, or potential runtime errors
2. **Code Quality Issues**: Identify code smells, anti-patterns, or bad practices
3. **Security Concerns**: Point out any security vulnerabilities
4. **Performance Issues**: Highlight performance bottlenecks

Format your response as JSON with these keys: errors, qualityIssues, securityConcerns, performanceIssues. Each should be an array of objects with "issue" and "explanation" fields.

Code to analyze:
\`\`\`${language}
${code}
\`\`\`

Respond ONLY with valid JSON, no additional text.`;

  const response = await callGeminiAPI(prompt, 0.3);
  
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    const jsonResponse = jsonMatch ? jsonMatch[0] : response;
    return JSON.parse(jsonResponse);
  } catch (e) {
    return {
      errors: [],
      qualityIssues: [],
      securityConcerns: [],
      performanceIssues: [],
      rawResponse: response
    };
  }
}

export async function optimizeCodeWithGemini(code, language) {
  const prompt = `You are an expert at code optimization. Analyze the following ${language} code and provide optimization suggestions.

Provide:
1. **Optimizations**: List of specific optimizations that can be made
2. **Optimized Code**: The improved version of the code
3. **Explanation**: Why these optimizations improve the code

Format as JSON with keys: optimizations (array of objects with "title" and "description"), optimizedCode (string), explanation (string).

Code to optimize:
\`\`\`${language}
${code}
\`\`\`

Respond ONLY with valid JSON.`;

  const response = await callGeminiAPI(prompt, 0.5);
  
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    const jsonResponse = jsonMatch ? jsonMatch[0] : response;
    return JSON.parse(jsonResponse);
  } catch (e) {
    return {
      optimizations: [],
      optimizedCode: code,
      explanation: 'Could not parse optimization response',
      rawResponse: response
    };
  }
}

export async function refactorCodeWithGemini(code, language) {
  const prompt = `You are an expert at code refactoring. Refactor the following ${language} code following best practices and modern patterns.

Provide:
1. **Refactored Code**: Clean, well-structured version of the code
2. **Changes Made**: List of refactoring changes applied
3. **Benefits**: How the refactored code is better

Format as JSON with keys: refactoredCode (string), changes (array of strings), benefits (array of strings).

Code to refactor:
\`\`\`${language}
${code}
\`\`\`

Apply these principles:
- Clean code principles
- DRY (Don't Repeat Yourself)
- SOLID principles where applicable
- Modern language features
- Better naming conventions
- Improved readability

Respond ONLY with valid JSON.`;

  const response = await callGeminiAPI(prompt, 0.4);
  
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    const jsonResponse = jsonMatch ? jsonMatch[0] : response;
    return JSON.parse(jsonResponse);
  } catch (e) {
    return {
      refactoredCode: code,
      changes: [],
      benefits: [],
      rawResponse: response
    };
  }
}

// Generate commit message from git diff
export async function generateCommitMessage(gitDiff, autoPrSummary, emojiStyle) {
  let prompt = `You are an AI assistant that generates semantic commit messages based on git diffs.\n\nGenerate a concise and informative commit message for the following git diff. Focus on the core changes and their purpose.\n\nGit Diff:\n\`\`\`diff\n${gitDiff}\n\`\`\`\n\nCommit Message:`;

  if (emojiStyle) {
    prompt = `You are an AI assistant that generates semantic commit messages with emojis based on git diffs.\n\nGenerate a concise and informative commit message for the following git diff, including a relevant emoji at the start of the subject line (e.g., ✨ feat: add new feature, 🐛 fix: correct a bug). Focus on the core changes and their purpose.\n\nGit Diff:\n\`\`\`diff\n${gitDiff}\n\`\`\`\n\nCommit Message:`;
  }

  if (autoPrSummary) {
    prompt += `\n\nAdditionally, provide a brief, high-level summary suitable for a Pull Request description.`;
  }

  const response = await callGeminiAPI(prompt, 0.7);

  // Gemini often returns the prompt itself or wraps the desired content. Let's try to extract it.
  // This is a basic attempt; more robust parsing might be needed depending on Gemini's output.
  let commitMessage = response;
  let prSummary = '';

  if (autoPrSummary) {
    // If autoPrSummary is enabled, expect a commit message and then a summary
    const parts = response.split(/\n\n(Summary:|PR Summary:|Pull Request Summary:)/i);
    if (parts.length > 1) {
      commitMessage = parts[0].trim();
      prSummary = parts.slice(2).join('').trim(); // Re-join if there were multiple 'Summary:' like parts
    } else {
      // Fallback if the split pattern didn't work as expected, just use the whole response for message
      commitMessage = response.trim();
    }
  } else {
    commitMessage = response.trim();
  }

  return { commitMessage, prSummary };
}


