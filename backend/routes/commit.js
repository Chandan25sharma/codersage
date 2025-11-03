import express from 'express';
import { generateCommitMessage } from '../services/geminiService.js'; // Using Gemini for commit messages

const router = express.Router();

// Generate commit message from git diff
router.post('/commit', async (req, res) => {
  try {
    const { gitDiff, autoPrSummary, emojiStyle } = req.body;

    if (!gitDiff) {
      return res.status(400).json({ error: 'Git diff is required' });
    }

    const { commitMessage, prSummary } = await generateCommitMessage(gitDiff, autoPrSummary, emojiStyle);
    const responsePayload = { commitMessage, prSummary };
    console.log('Backend sending to frontend (commit route):', JSON.stringify(responsePayload, null, 2)); // TEMP LOG
    res.json(responsePayload);
  } catch (error) {
    console.error('Error generating commit message:', error);
    res.status(500).json({
      error: 'Failed to generate commit message',
      message: error.message
    });
  }
});

export default router;
