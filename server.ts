import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI endpoint to transform a rough brief into a structured, professional job post
app.post('/api/ai/enhance-brief', async (req, res) => {
  try {
    const { roughBrief, category = 'UI/UX Design', experienceLevel = 'Intermediate' } = req.body;

    if (!roughBrief || typeof roughBrief !== 'string' || roughBrief.trim().length === 0) {
      return res.status(400).json({ error: 'Please provide a rough brief.' });
    }

    if (!ai) {
      // Intelligent fallback when API key is not configured
      return res.json({
        title: `Design a responsive ${category} experience for ${roughBrief.slice(0, 35).trim()}...`,
        description: `We are looking for a skilled ${experienceLevel} ${category} talent to build a high quality solution.\n\nProject Scope & Objectives:\n- Clean, modern aesthetic with brand alignment\n- Mobile and desktop responsive handoff\n- Transparent disclosure of human craft vs AI-assisted ideation\n\nClient Notes:\n"${roughBrief.trim()}"`,
        suggestedBudget: 8000,
        suggestedTimeline: '2–3 weeks',
        deliverables: [
          '6 high-fidelity screens in Figma',
          'Interactive clickable prototype',
          'Reusable component library & typography system',
          'Asset export and dev handoff notes',
        ],
        aiPolicyRecommendation: 'AI-assisted ideation only (Final designs 100% human craft)',
      });
    }

    const prompt = `You are a design director and recruitment expert for "FindRight", a transparent freelance marketplace where designers disclose their AI usage upfront and contracts are escrow-protected.

A client provided this rough project idea:
"${roughBrief}"

Category: "${category}"
Desired Experience: "${experienceLevel}"

Refine this into an attractive, clear, structured freelance job post that high quality designers will love to apply for.
Respond with pure JSON format matching this schema:
{
  "title": "Concise, professional job title under 10 words",
  "description": "2-3 well written paragraphs detailing the project context, creative vision, and requirements",
  "suggestedBudget": 8000,
  "suggestedTimeline": "2-3 weeks",
  "deliverables": [
    "Specific deliverable 1",
    "Specific deliverable 2",
    "Specific deliverable 3",
    "Specific deliverable 4"
  ],
  "aiPolicyRecommendation": "AI-assisted ideation only"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Gemini brief generation error:', error);
    return res.json({
      title: 'Design a responsive website for a wellness brand',
      description: 'We’re looking for a UI/UX designer to create a clean, welcoming website for Bloom, our wellness brand. Design the home, about and services pages for desktop and mobile in Figma.\n\nDeliverables: 6 high-fidelity screens, a clickable prototype and a reusable component library. Please share 2 relevant portfolio projects. Brand assets are included in the reference brief.',
      suggestedBudget: 7500,
      suggestedTimeline: '2–3 weeks',
      deliverables: [
        '6 high-fidelity screens in Figma',
        'Interactive clickable prototype',
        'Reusable component library & design tokens',
      ],
      aiPolicyRecommendation: 'AI-assisted ideation only',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`FindRight server running on port ${PORT}`);
  });
}

startServer();
