import { Link } from "react-router-dom"
import { Sparkles, Heart, Mail, MessageCircle, BookOpen, Github, Twitter, Instagram } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Home", path: "/" },
        { name: "Chat", path: "/chat" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
      ]
    },
    {
      title: "Account",
      links: [
        { name: "Profile", path: "/profile" },
        { name: "Saved Wisdom", path: "/saved" },
        { name: "Settings", path: "/settings" },
        { name: "Support", path: "/contact" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Bhagavad Gita", path: "/about" },
        { name: "Psychology Insights", path: "/about" },
        { name: "Daily Wisdom", path: "/chat" },
        { name: "Community", path: "/about" },
      ]
    }
  ]

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "GitHub", icon: Github, href: "#" },
  ]

  return (
    <footer className="border-t bg-card/50 mystical-blur">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 font-bold text-xl bg-wisdom-gradient bg-clip-text text-transparent hover:scale-105 divine-transition"
            >
              <div className="relative">
                <Sparkles className="h-8 w-8 text-primary animate-divine-pulse" />
                <div className="absolute inset-0 h-8 w-8 text-primary/30 animate-ping" />
              </div>
              <span>Divine Wisdom</span>
            </Link>
            
            <p className="text-muted-foreground text-sm leading-relaxed">
              Discover timeless wisdom from the Bhagavad Gita and modern psychology. 
              Find guidance, peace, and answers to life's deepest questions through AI-powered insights.
            </p>

            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary divine-transition"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-foreground">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary divine-transition text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© {currentYear} Divine Wisdom. Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-divine-pulse" />
              <span>for seekers of truth.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary divine-transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary divine-transition">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-primary divine-transition">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Inspirational Quote */}
          <div className="mt-8 text-center">
            <blockquote className="text-sm italic text-muted-foreground max-w-2xl mx-auto">
              "You have the right to perform your actions, but you are not entitled to the fruits of action. 
              Never consider yourself the cause of the results of your activities, 
              and never be attached to not doing your duty."
              <cite className="block mt-2 text-primary font-medium">— Bhagavad Gita 2.47</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </footer>
  )
}
