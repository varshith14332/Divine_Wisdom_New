import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, Sparkles, MessageCircle, BookOpen, User, Heart, Settings, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", path: "/", icon: Sparkles },
    { name: "Chat", path: "/chat", icon: MessageCircle },
    { name: "About", path: "/about", icon: BookOpen },
    { name: "Contact", path: "/contact", icon: Mail },
  ]

  const userItems = [
    { name: "Profile", path: "/profile", icon: User },
    { name: "Saved", path: "/saved", icon: Heart },
    { name: "Settings", path: "/settings", icon: Settings },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/30 mystical-blur backdrop-blur-xl shadow-lg">
      {/* Glassmorphism background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-wisdom-gradient rounded-full blur-3xl opacity-10" />
      <div className="absolute top-0 right-1/4 w-32 h-32 bg-cosmic-gradient rounded-full blur-3xl opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-bold text-xl bg-wisdom-gradient bg-clip-text text-transparent hover:scale-105 divine-transition"
          >
            <div className="relative">
              <Sparkles className="h-8 w-8 text-primary animate-divine-pulse" />
              <div className="absolute inset-0 h-8 w-8 text-primary/30 animate-ping" />
            </div>
            <span className="hidden sm:inline-block">Divine Wisdom</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  asChild
                  className="divine-transition hover:bg-accent/50 hover:shadow-mystical backdrop-blur-sm"
                >
                  <Link to={item.path} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              )
            })}
          </nav>

          {/* Right side - Theme toggle and user menu */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {userItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    size="sm"
                    asChild
                    className="divine-transition hover:bg-accent/50"
                  >
                    <Link to={item.path}>
                      <Icon className="h-4 w-4" />
                    </Link>
                  </Button>
                )
              })}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2 ml-4">
              <Button variant="ghost" asChild className="divine-transition hover:bg-accent/50 backdrop-blur-sm">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-wisdom-gradient hover:opacity-90 divine-transition enlighten-glow hover:shadow-divine backdrop-blur-sm">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              {/* Navigation Items */}
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    asChild
                    className="w-full justify-start divine-transition hover:bg-accent/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to={item.path} className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </Button>
                )
              })}

              {/* User Items */}
              <div className="border-t pt-2 mt-2">
                {userItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.path}
                      variant="ghost"
                      asChild
                      className="w-full justify-start divine-transition hover:bg-accent/50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link to={item.path} className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </Button>
                  )
                })}
              </div>

              {/* Auth Buttons */}
              <div className="border-t pt-2 mt-2 space-y-2">
                <Button 
                  variant="ghost" 
                  asChild 
                  className="w-full divine-transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button 
                  asChild 
                  className="w-full bg-wisdom-gradient hover:opacity-90 divine-transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
