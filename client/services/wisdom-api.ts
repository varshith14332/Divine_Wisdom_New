// Real API integration for Divine Wisdom AI

interface WisdomResponse {
  content: string
  sources: Array<{
    type: 'gita' | 'psychology' | 'synthesis'
    reference?: string
    confidence: number
  }>
  suggestedActions?: string[]
  relatedConcepts?: string[]
}

interface ApiResponse {
  success: boolean
  response?: WisdomResponse
  error?: string
  fallback?: WisdomResponse
}

class WisdomAPIService {
  private baseURL: string
  private apiKey?: string

  constructor() {
    this.baseURL = process.env.VITE_API_URL || '/api'
    this.apiKey = process.env.VITE_WISDOM_API_KEY
  }

  async sendMessage(
    message: string, 
    context?: string[], 
    userId?: string
  ): Promise<WisdomResponse> {
    try {
      const response = await fetch(`${this.baseURL}/wisdom/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        },
        body: JSON.stringify({
          message,
          context,
          userId
        })
      })

      const data: ApiResponse = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to get wisdom response')
      }

      return data.response || this.getFallbackResponse()

    } catch (error) {
      console.error('Wisdom API error:', error)
      return this.getFallbackResponse()
    }
  }

  async saveInsight(
    content: string, 
    source: string, 
    tags: string[], 
    userId: string
  ): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/wisdom/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        },
        body: JSON.stringify({
          userId,
          content,
          source,
          tags
        })
      })

      const data = await response.json()
      return data.success

    } catch (error) {
      console.error('Save insight error:', error)
      return false
    }
  }

  async getDailyVerse(): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/wisdom/verses`)
      const data = await response.json()
      
      if (data.success) {
        return data.verse
      }
      
      return this.getFallbackVerse()

    } catch (error) {
      console.error('Daily verse error:', error)
      return this.getFallbackVerse()
    }
  }

  private getFallbackResponse(): WisdomResponse {
    return {
      content: "I'm here to help you find wisdom and guidance. Sometimes the greatest insights come from quiet reflection. What would you like to explore together?",
      sources: [
        {
          type: 'general',
          reference: 'Divine Wisdom Fallback',
          confidence: 1.0
        }
      ],
      suggestedActions: [
        "Take a moment for quiet reflection",
        "Consider what specific guidance you're seeking",
        "Try rephrasing your question"
      ],
      relatedConcepts: ["mindfulness", "self-reflection", "inner peace"]
    }
  }

  private getFallbackVerse() {
    return {
      chapter: 2,
      verse: 47,
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
      translation: "You have the right to perform your actions, but you are not entitled to the fruits of action.",
      theme: "Detachment and duty"
    }
  }
}

export const wisdomAPI = new WisdomAPIService()
export default WisdomAPIService
