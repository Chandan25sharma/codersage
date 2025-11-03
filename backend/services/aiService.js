
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1/chat/completions';

// Call DeepSeek API
async function callDeepSeekAPI(messages, temperature = 0.7) {
  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: messages,
        temperature: temperature,
        max_tokens: 2000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('DeepSeek API Error:', error.response?.data || error.message);
    throw new Error('Failed to communicate with AI service');
  }
}

// Analyze code for errors and improvements
export async function analyzeCode(code, language) {
  const prompt = `You are an expert code analyst. Analyze the following ${language} code and provide:\n\n1. **Errors Found**: List any syntax errors, logical errors, or potential runtime errors\n2. **Code Quality Issues**: Identify code smells, anti-patterns, or bad practices\n3. **Security Concerns**: Point out any security vulnerabilities\n4. **Performance Issues**: Highlight performance bottlenecks\n\nFormat your response as JSON with these keys: errors, qualityIssues, securityConcerns, performanceIssues. Each should be an array of objects with "issue" and "explanation" fields.\n\nCode to analyze:\n\`\`\`${language}\n${code}\n\`\`\`\n\nRespond ONLY with valid JSON, no additional text.`;

  const messages = [
    {
      role: 'system',
      content: 'You are an expert software engineer who provides detailed code analysis in JSON format.'
    },
    {
      role: 'user',
      content: prompt
    }
  ];

  const response = await callDeepSeekAPI(messages, 0.3);
  
  try {
    // Extract JSON from response (in case there's markdown formatting)
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    const jsonResponse = jsonMatch ? jsonMatch[0] : response;
    return JSON.parse(jsonResponse);
  } catch (e) {
    // Fallback if JSON parsing fails
    return {
      errors: [],
      qualityIssues: [],
      securityConcerns: [],
      performanceIssues: [],
      rawResponse: response
    };
  }
}

// Optimize code
export async function optimizeCode(code, language) {
  const prompt = `You are an expert at code optimization. Analyze the following ${language} code and provide optimization suggestions.\n\nProvide:\n1. **Optimizations**: List of specific optimizations that can be made\n2. **Optimized Code**: The improved version of the code\n3. **Explanation**: Why these optimizations improve the code\n\nFormat as JSON with keys: optimizations (array of objects with "title" and "description"), optimizedCode (string), explanation (string).\n\nCode to optimize:\n\`\`\`${language}\n${code}\n\`\`\`\n\nRespond ONLY with valid JSON.`;

  const messages = [
    {
      role: 'system',
      content: 'You are an expert software optimization engineer who provides improvements in JSON format.'
    },
    {
      role: 'user',
      content: prompt
    }
  ];

  const response = await callDeepSeekAPI(messages, 0.5);
  
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

// Refactor code
export async function refactorCode(code, language) {
  const prompt = `You are an expert at code refactoring. Refactor the following ${language} code following best practices and modern patterns.\n\nProvide:\n1. **Refactored Code**: Clean, well-structured version of the code\n2. **Changes Made**: List of refactoring changes applied\n3. **Benefits**: How the refactored code is better\n\nFormat as JSON with keys: refactoredCode (string), changes (array of strings), benefits (array of strings).\n\nCode to refactor:\n\`\`\`${language}\n${code}\n\`\`\`\n\nApply these principles:\n- Clean code principles\n- DRY (Don't Repeat Yourself)\n- SOLID principles where applicable\n- Modern language features\n- Better naming conventions\n- Improved readability\n
Respond ONLY with valid JSON.`;

  const messages = [
    {
      role: 'system',
      content: 'You are an expert software engineer specializing in code refactoring. Provide results in JSON format.'
    },
    {
      role: 'user',
      content: prompt
    }
  ];

  const response = await callDeepSeekAPI(messages, 0.4);
  
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
