const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/ask-ai', async (req, res) => {
  const { carbonData } = req.body;

  const prompt = `
  Given the following carbon usage data:
  ${JSON.stringify(carbonData, null, 2)}
  
  1. Provide a concise insight summary highlighting the user's carbon footprint compared to the average in their country and Europe overall.
  2. Suggest 2 tips and suggestions to based on the carbon usage data.
  3. Provide 2 personalized actionable steps tailored to the user's data, prioritizing practical and impactful changes.
  
  Format your response as JSON:
  {
    "insights": "...",             // summary with comparisons
    "suggestions": ["...", "...", "..."],    // general tips
    "actionPlan": ["...", "...", "..."],     // personalized steps
  }
  `;
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).json({ error: 'Please try after sometime' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`OpenAI proxy server running on http://localhost:${PORT}`);
});
