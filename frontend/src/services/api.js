import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function analyzeCode(code, language) {
  try {
    const response = await api.post('/analyze', { code, language });
    return response.data;
  } catch (error) {
    console.error('Error analyzing code:', error);
    throw error;
  }
}

export async function optimizeCode(code, language) {
  try {
    const response = await api.post('/optimize', { code, language });
    return response.data;
  } catch (error) {
    console.error('Error optimizing code:', error);
    throw error;
  }
}

export async function refactorCode(code, language) {
  try {
    const response = await api.post('/refactor', { code, language });
    return response.data;
  } catch (error) {
    console.error('Error refactoring code:', error);
    throw error;
  }
}

export async function generateCommitMessage(gitDiff, autoPrSummary, emojiStyle) {
  try {
    const response = await api.post('/commit', { gitDiff, autoPrSummary, emojiStyle });
    return response.data;
  } catch (error) {
    console.error('Error generating commit message:', error);
    throw error;
  }
}

export default api;
