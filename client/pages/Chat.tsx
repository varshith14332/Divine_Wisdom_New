import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { Send, Sparkles, BookOpen, Heart, Copy, Download, RotateCcw, User, Bot, Home, ArrowLeft, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  source?: "gita" | "psychology" | "general"
}

// Navigation menu component for mobile
function ChatNavigationMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: BookOpen },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Saved", path: "/saved", icon: Heart },
  ]

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="divine-transition hover:bg-primary/10 hover:shadow-divine rounded-full"
      >
        {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-card/95 mystical-blur backdrop-blur-xl border border-border/30 rounded-xl shadow-cosmic overflow-hidden z-50">
          <div className="p-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  asChild
                  className="w-full justify-start divine-transition hover:bg-accent/50"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to={item.path} className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Welcome to Divine Wisdom! I'm here to guide you with insights from the Bhagavad Gita and psychology. What's on your mind today?",
      timestamp: new Date(),
      source: "general"
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses = [
        {
          content: "As Krishna teaches in the Bhagavad Gita: 'You have the right to perform your actions, but you are not entitled to the fruits of action.' This reminds us to focus on our efforts rather than being attached to outcomes. In psychology, this aligns with the concept of 'process goals' versus 'outcome goals' - focusing on what we can control leads to better mental health and performance.",
          source: "gita" as const
        },
        {
          content: "From a psychological perspective, what you're experiencing is quite normal. Cognitive behavioral therapy suggests that our thoughts influence our emotions and behaviors. The Gita also speaks to this in Chapter 6, where Krishna explains how a disciplined mind leads to peace. Try observing your thoughts without judgment - this mindfulness practice is both ancient wisdom and modern therapy.",
          source: "psychology" as const
        },
        {
          content: "The path of self-discovery requires both ancient wisdom and modern understanding. The Bhagavad Gita's teaching of 'Svadharma' - following your true nature - aligns beautifully with positive psychology's emphasis on character strengths and authentic living. What matters most is finding balance between acceptance and growth.",
          source: "general" as const
        }
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: randomResponse.content,
        timestamp: new Date(),
        source: randomResponse.source
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    // TODO: Add toast notification
  }

  const getSourceBadge = (source?: string) => {
    switch (source) {
      case "gita":
        return (
          <Badge variant="outline" className="text-xs bg-wisdom-gradient text-primary-foreground border-primary/30">
            <BookOpen className="w-3 h-3 mr-1" />
            Bhagavad Gita
          </Badge>
        )
      case "psychology":
        return (
          <Badge variant="outline" className="text-xs bg-cosmic-gradient text-primary-foreground border-primary/30">
            <Sparkles className="w-3 h-3 mr-1" />
            Psychology
          </Badge>
        )
      default:
        return null
    }
  }

  const quickQuestions = [
    "How can I find my life purpose?",
    "I'm feeling anxious about the future",
    "How to handle difficult relationships?",
    "Finding balance between work and life",
    "Dealing with fear and uncertainty",
    "Building confidence and self-worth"
  ]

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/30 mystical-blur backdrop-blur-xl shadow-lg px-6 py-4 relative">
        {/* Glassmorphism background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-wisdom-gradient rounded-full blur-3xl opacity-10" />
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-cosmic-gradient rounded-full blur-3xl opacity-10" />

        <div className="flex items-center justify-between relative z-10">
          {/* Left side - Navigation and Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="divine-transition hover:bg-primary/10 hover:shadow-divine rounded-full"
              >
                <Link to="/">
                  <Home className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                className="divine-transition hover:bg-primary/10 hover:shadow-divine rounded-full"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </div>

            <div className="h-6 w-px bg-border/50" />

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-primary animate-divine-pulse drop-shadow-lg" />
                <div className="absolute inset-0 h-8 w-8 text-primary/30 animate-ping" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-wisdom-gradient bg-clip-text text-transparent drop-shadow-sm">
                  Divine Wisdom Chat
                </h1>
                <p className="text-sm text-muted-foreground">
                  AI-powered guidance from ancient wisdom & modern psychology
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="divine-transition hover:bg-accent/50 backdrop-blur-sm bg-card/30 border-border/30 hover:shadow-mystical"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="divine-transition hover:bg-accent/50 backdrop-blur-sm bg-card/30 border-border/30 hover:shadow-mystical"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Chat
            </Button>

            {/* Navigation Menu for Mobile */}
            <div className="md:hidden">
              <ChatNavigationMenu />
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start space-x-3",
                    message.type === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.type === "assistant" && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-wisdom-gradient flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[80%] space-y-2",
                      message.type === "user" ? "order-2" : ""
                    )}
                  >
                    <Card
                      className={cn(
                        "divine-transition hover:shadow-mystical",
                        message.type === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-card border-border/50"
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          {message.source && getSourceBadge(message.source)}
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div
                      className={cn(
                        "flex items-center space-x-2 text-xs text-muted-foreground",
                        message.type === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                      {message.type === "assistant" && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-accent/50"
                            onClick={() => copyMessage(message.content)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-accent/50"
                          >
                            <Heart className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {message.type === "user" && (
                    <div className="flex-shrink-0 order-3">
                      <div className="w-8 h-8 rounded-full bg-cosmic-gradient flex items-center justify-center">
                        <User className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-wisdom-gradient flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                  <Card className="bg-card border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <span className="text-sm text-muted-foreground">Seeking wisdom...</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-6 py-4 border-t">
              <div className="max-w-4xl mx-auto">
                <p className="text-sm text-muted-foreground mb-3">Quick questions to get started:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start text-left h-auto p-3 divine-transition hover:bg-accent/50"
                      onClick={() => setInputValue(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t bg-card/50 mystical-blur px-6 py-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end space-x-3">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask for wisdom and guidance..."
                    className="pr-12 py-3 divine-transition focus:ring-primary/30"
                    disabled={isLoading}
                  />
                  <Button
                    size="sm"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="absolute right-1 top-1 h-8 w-8 p-0 bg-wisdom-gradient hover:opacity-90 divine-transition"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Divine Wisdom combines insights from the Bhagavad Gita and modern psychology
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
