import { Link } from "react-router-dom"
import { 
  MessageCircle, 
  BookOpen, 
  Heart, 
  Sparkles, 
  Users, 
  Lightbulb, 
  Shield, 
  Clock, 
  ArrowRight,
  Star,
  Infinity,
  Compass
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Index() {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Wisdom Chat",
      description: "Get personalized guidance combining ancient wisdom with modern psychology",
      gradient: "cosmic-gradient"
    },
    {
      icon: BookOpen,
      title: "Bhagavad Gita Insights",
      description: "Explore timeless teachings adapted to your modern life challenges",
      gradient: "wisdom-gradient"
    },
    {
      icon: Lightbulb,
      title: "Psychology-Based Solutions",
      description: "Evidence-based approaches merged with spiritual wisdom for holistic growth",
      gradient: "cosmic-gradient"
    },
    {
      icon: Heart,
      title: "Save Your Journey",
      description: "Keep track of meaningful conversations and insights for future reflection",
      gradient: "wisdom-gradient"
    },
    {
      icon: Shield,
      title: "Private & Secure",
      description: "Your spiritual journey remains confidential with end-to-end encryption",
      gradient: "cosmic-gradient"
    },
    {
      icon: Clock,
      title: "24/7 Guidance",
      description: "Access wisdom and support whenever you need it, day or night",
      gradient: "wisdom-gradient"
    }
  ]

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Divine Wisdom helped me find clarity during a difficult career transition. The guidance felt deeply personal and actionable.",
      rating: 5
    },
    {
      name: "Alex K.",
      text: "The combination of ancient wisdom and modern psychology is brilliant. It's like having a wise mentor available 24/7.",
      rating: 5
    },
    {
      name: "Maya P.",
      text: "I've been studying the Gita for years, but this platform helped me apply its teachings to real-life situations.",
      rating: 5
    }
  ]

  const stats = [
    { number: "10K+", label: "Seekers Guided", icon: Users },
    { number: "50K+", label: "Wisdom Sessions", icon: MessageCircle },
    { number: "95%", label: "Satisfaction Rate", icon: Star },
    { number: "24/7", label: "Always Available", icon: Infinity }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-divine-radial" />
        <div className="absolute top-20 left-10 w-72 h-72 cosmic-gradient rounded-full blur-3xl opacity-20 animate-cosmic-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 wisdom-gradient rounded-full blur-3xl opacity-20 animate-cosmic-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <Badge variant="outline" className="px-4 py-2 text-sm border-primary/30 bg-primary/5">
              <Sparkles className="w-4 h-4 mr-2" />
              Ancient Wisdom meets Modern AI
            </Badge>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-wisdom-gradient bg-clip-text text-transparent">
                Divine Wisdom
              </span>
              <br />
              <span className="text-foreground">
                for Modern Life
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover personalized guidance from the <strong className="text-primary">Bhagavad Gita</strong> and 
              <strong className="text-primary"> psychology</strong>, powered by AI. 
              Find answers to life's deepest questions and navigate challenges with ancient wisdom.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                size="lg" 
                asChild
                className="bg-wisdom-gradient hover:opacity-90 divine-transition text-lg px-8 py-6 enlighten-glow group"
              >
                <Link to="/chat" className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 divine-transition" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="text-lg px-8 py-6 divine-transition hover:bg-accent/50"
              >
                <Link to="/about" className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Learn More</span>
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-12">
              <p className="text-sm text-muted-foreground mb-6">Trusted by thousands of seekers worldwide</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-foreground">{stat.number}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="px-4 py-2">
              <Compass className="w-4 h-4 mr-2" />
              Features
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              Your Path to <span className="bg-cosmic-gradient bg-clip-text text-transparent">Enlightenment</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Combining timeless spiritual wisdom with cutting-edge AI technology to guide your personal growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="relative overflow-hidden border-border/50 hover:border-primary/30 divine-transition group hover:shadow-cosmic bg-card/30 mystical-blur backdrop-blur-xl"
                >
                  <div className={`absolute inset-0 bg-${feature.gradient} opacity-5 group-hover:opacity-10 divine-transition`} />
                  <CardHeader className="relative">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="px-4 py-2">
              <Heart className="w-4 h-4 mr-2" />
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="bg-wisdom-gradient bg-clip-text text-transparent">Transforming Lives</span> Daily
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how Divine Wisdom has helped thousands find clarity, peace, and purpose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-mystical divine-transition">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <cite className="font-semibold text-foreground">
                    — {testimonial.name}
                  </cite>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 cosmic-gradient opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Begin Your <br />
              <span className="bg-wisdom-gradient bg-clip-text text-transparent">Spiritual Journey?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of seekers who have found clarity, peace, and purpose through Divine Wisdom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                asChild
                className="bg-wisdom-gradient hover:opacity-90 divine-transition text-lg px-8 py-6 enlighten-glow group"
              >
                <Link to="/signup" className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Start Free Today</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 divine-transition" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="text-lg px-8 py-6 divine-transition hover:bg-accent/50"
              >
                <Link to="/chat" className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Try Demo Chat</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
