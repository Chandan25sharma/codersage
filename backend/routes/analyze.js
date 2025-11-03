import express from 'express';
import {
  analyzeCodeWithGemini as analyzeCode,
  optimizeCodeWithGemini as optimizeCode,
  refactorCodeWithGemini as refactorCode
} from '../services/geminiService.js';
const router = express.Router();

// Analyze code for errors and improvements
router.post('/analyze', async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const analysis = await analyzeCode(code, language || 'javascript');
    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing code:', error);
    res.status(500).json({
      error: 'Failed to analyze code',
      message: error.message
    });
  }
});

// Optimize code
router.post('/optimize', async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const optimization = await optimizeCode(code, language || 'javascript');
    res.json(optimization);
  } catch (error) {
    console.error('Error optimizing code:', error);
    res.status(500).json({
      error: 'Failed to optimize code',
      message: error.message
    });
  }
});

// Refactor code
router.post('/refactor', async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const refactored = await refactorCode(code, language || 'javascript');
    res.json(refactored);
  } catch (error) {
    console.error('Error refactoring code:', error);
    res.status(500).json({
      error: 'Failed to refactor code',
      message: error.message
    });
  }
});

export default router;

