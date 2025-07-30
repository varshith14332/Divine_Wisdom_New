import { useState } from "react"
import { Mail, MessageCircle, MapPin, Phone, Send, Sparkles, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement contact form submission
    console.log("Contact form submitted:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help with your account or technical issues",
      contact: "support@divinewisdom.ai",
      action: "Send Email"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      contact: "Available 24/7",
      action: "Start Chat"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "+1 (555) 123-4567",
      action: "Call Now"
    }
  ]

  const faqs = [
    {
      question: "How does Divine Wisdom combine ancient wisdom with modern psychology?",
      answer: "Our AI system is trained on the teachings of the Bhagavad Gita alongside evidence-based psychological principles, creating guidance that honors both spiritual wisdom and scientific understanding."
    },
    {
      question: "Is Divine Wisdom associated with any particular religion?",
      answer: "While we draw from the Bhagavad Gita, Divine Wisdom is designed to be inclusive and beneficial to people of all backgrounds and beliefs. The wisdom we share focuses on universal human experiences."
    },
    {
      question: "Can Divine Wisdom replace therapy or professional counseling?",
      answer: "No, Divine Wisdom is a complementary tool for reflection and guidance. For serious mental health concerns, we always recommend consulting with qualified mental health professionals."
    },
    {
      question: "How do you ensure the privacy of my conversations?",
      answer: "We use end-to-end encryption and follow strict data protection protocols. Your conversations remain private and are not shared with third parties."
    }
  ]

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-divine-radial" />
        <div className="absolute top-20 left-10 w-72 h-72 cosmic-gradient rounded-full blur-3xl opacity-20 animate-cosmic-float" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="outline" className="px-4 py-2">
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-wisdom-gradient bg-clip-text text-transparent">
                We're Here
              </span>
              <br />
              <span className="text-foreground">
                to Help
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have a question about Divine Wisdom? Need technical support? Want to share feedback? 
              Our team is here to assist you on your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">
              How to <span className="bg-cosmic-gradient bg-clip-text text-transparent">Reach Us</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the method that works best for you. We're committed to responding quickly and helpfully.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <Card 
                  key={index} 
                  className="border-border/50 hover:shadow-mystical divine-transition group text-center"
                >
                  <CardHeader>
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 divine-transition">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {method.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-lg font-medium">{method.contact}</p>
                    <Button variant="outline" className="w-full divine-transition hover:bg-accent/50">
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <Card className="border-border/50 shadow-cosmic">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Sparkles className="w-6 h-6 mr-2 text-primary" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="media">Media Inquiry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief description of your message"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-wisdom-gradient hover:opacity-90 divine-transition text-lg py-6 enlighten-glow"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Info & FAQs */}
              <div className="space-y-8">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-primary" />
                      Response Times
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Technical Support</span>
                      <Badge>Within 4 hours</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">General Inquiries</span>
                      <Badge>Within 24 hours</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Partnerships</span>
                      <Badge>Within 48 hours</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-primary" />
                      Community
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Join our growing community of seekers and share your journey with like-minded individuals.
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full divine-transition hover:bg-accent/50">
                        Join Discord Community
                      </Button>
                      <Button variant="outline" className="w-full divine-transition hover:bg-accent/50">
                        Follow on Twitter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-5xl font-bold">
                Frequently Asked <span className="bg-wisdom-gradient bg-clip-text text-transparent">Questions</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Find answers to common questions about Divine Wisdom.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl italic text-muted-foreground leading-relaxed">
              "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place."
            </blockquote>
            <cite className="block mt-6 text-primary font-medium text-xl">
              — Bhagavad Gita 6.19
            </cite>
          </div>
        </div>
      </section>
    </div>
  )
}
