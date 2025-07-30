import { BookOpen, Heart, Users, Sparkles, Target, Eye, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function About() {
  const values = [
    {
      icon: BookOpen,
      title: "Ancient Wisdom",
      description: "Drawing from the timeless teachings of the Bhagavad Gita, bringing 5000-year-old wisdom to modern challenges."
    },
    {
      icon: Lightbulb,
      title: "Modern Psychology",
      description: "Integrating evidence-based psychological approaches with spiritual insights for holistic growth."
    },
    {
      icon: Heart,
      title: "Compassionate Guidance",
      description: "Providing empathetic, non-judgmental support for every seeker's unique journey."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a global community of truth seekers supporting each other's spiritual evolution."
    }
  ]

  const team = [
    {
      name: "Dr. Sarah Krishna",
      role: "Spiritual Guidance Expert",
      bio: "PhD in Comparative Religion with 15 years studying Vedantic philosophy"
    },
    {
      name: "Dr. Michael Chen",
      role: "Psychology Integration",
      bio: "Licensed therapist specializing in mindfulness-based cognitive therapy"
    },
    {
      name: "Aisha Patel",
      role: "AI Ethics & Development",
      bio: "Leading AI researcher focused on beneficial and aligned AI systems"
    }
  ]

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-divine-radial" />
        <div className="absolute top-20 right-10 w-72 h-72 cosmic-gradient rounded-full blur-3xl opacity-20 animate-cosmic-float" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge variant="outline" className="px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Our Story
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-wisdom-gradient bg-clip-text text-transparent">
                Bridging Ancient Wisdom
              </span>
              <br />
              <span className="text-foreground">
                with Modern Understanding
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Divine Wisdom was born from a simple yet profound belief: that the timeless teachings of the 
              Bhagavad Gita, combined with modern psychological insights, can provide practical guidance 
              for navigating today's complex world.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="border-border/50 hover:shadow-cosmic divine-transition">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed text-base">
                  To make timeless wisdom accessible to modern seekers through AI-powered guidance that 
                  combines the profound teachings of the Bhagavad Gita with evidence-based psychological 
                  principles. We believe everyone deserves access to wisdom that can transform their life, 
                  regardless of their background or beliefs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-mystical divine-transition">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed text-base">
                  A world where ancient wisdom and modern knowledge work together to help people find 
                  clarity, peace, and purpose. We envision a global community of seekers who support 
                  each other's growth while honoring both spiritual traditions and scientific understanding.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="px-4 py-2">
              <Heart className="w-4 h-4 mr-2" />
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold">
              What <span className="bg-cosmic-gradient bg-clip-text text-transparent">Guides Us</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These principles shape every aspect of Divine Wisdom, from our AI development to our community guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card 
                  key={index} 
                  className="border-border/50 hover:shadow-mystical divine-transition group"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 divine-transition">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-5xl font-bold">
                Our <span className="bg-wisdom-gradient bg-clip-text text-transparent">Philosophy</span>
              </h2>
            </div>

            <div className="space-y-8">
              <Card className="border-border/50">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">The Bhagavad Gita: Eternal Wisdom</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The Bhagavad Gita, often called the "Song of God," is a 700-verse dialogue between 
                    Prince Arjuna and Lord Krishna. Set on a battlefield, it addresses the deepest 
                    questions of human existence: duty, righteousness, the nature of reality, and the 
                    path to liberation.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    These teachings aren't confined to any single religion or culture. They speak to 
                    universal human experiences: facing difficult decisions, finding purpose, managing 
                    stress, understanding relationships, and seeking inner peace.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Modern Psychology: Evidence-Based Growth</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Contemporary psychology offers scientifically-validated approaches to mental health, 
                    personal development, and human flourishing. From cognitive-behavioral therapy to 
                    positive psychology, these methods provide practical tools for transformation.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    By integrating these evidence-based approaches with ancient wisdom, we create a 
                    comprehensive framework that honors both spiritual insight and scientific rigor.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">AI as a Bridge, Not a Replacement</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Our AI serves as a bridge between ancient wisdom and modern life, helping you 
                    discover relevant insights for your unique circumstances. It's not meant to replace 
                    human connection, spiritual practice, or professional therapy.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Instead, it's a tool for exploration, reflection, and learning—a digital companion 
                    on your journey of self-discovery and growth.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Quote */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl italic text-muted-foreground leading-relaxed">
              "Yoga is a light, which once lit will never dim. The better your practice, 
              the brighter your flame."
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
