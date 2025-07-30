import { RequestHandler } from "express";
import { z } from "zod";
import DivineWisdomAI from "../services/wisdom-ai";

// Validation schemas
const WisdomRequestSchema = z.object({
  message: z.string().min(1).max(1000),
  context: z.array(z.string()).optional(),
  userId: z.string().optional()
});

const wisdomAI = new DivineWisdomAI();

// POST /api/wisdom/chat - Get AI wisdom response
export const handleWisdomChat: RequestHandler = async (req, res) => {
  try {
    const { message, context, userId } = WisdomRequestSchema.parse(req.body);
    
    // Generate AI response
    const response = await wisdomAI.generateWisdomResponse(message, context);
    
    // Log for analytics (optional)
    if (userId) {
      await logWisdomInteraction(userId, message, response);
    }
    
    res.json({
      success: true,
      response: response,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Wisdom chat error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request format',
        details: error.errors
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to generate wisdom response',
      fallback: {
        content: "I'm experiencing some technical difficulties. Please try again in a moment, or consider taking this time for quiet reflection.",
        sources: [],
        suggestedActions: ["Take a few deep breaths", "Reflect on your question"],
        relatedConcepts: ["patience", "mindfulness"]
      }
    });
  }
};

// GET /api/wisdom/verses - Get random Gita verse for inspiration
export const handleDailyVerse: RequestHandler = async (req, res) => {
  try {
    const verse = await wisdomAI.getDailyVerse();
    res.json({
      success: true,
      verse
    });
  } catch (error) {
    console.error('Daily verse error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch daily verse'
    });
  }
};

// POST /api/wisdom/save - Save wisdom insight
export const handleSaveInsight: RequestHandler = async (req, res) => {
  try {
    const { userId, content, source, tags } = req.body;
    
    // Save to database
    const savedInsight = await saveUserInsight({
      userId,
      content,
      source,
      tags,
      timestamp: new Date()
    });
    
    res.json({
      success: true,
      insight: savedInsight
    });
    
  } catch (error) {
    console.error('Save insight error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save insight'
    });
  }
};

// Helper functions
async function logWisdomInteraction(userId: string, message: string, response: any) {
  // Log interaction for analytics and improvement
  console.log(`User ${userId} asked: ${message}`);
  console.log(`AI responded with sources: ${response.sources.map((s: any) => s.type).join(', ')}`);
}

async function saveUserInsight(insight: any) {
  // Save to database - implement with your DB choice
  return insight;
}
