import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, MessageCircle, User, Heart, Settings, Sparkles, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Chat", path: "/chat", icon: MessageCircle },
    { name: "Profile", path: "/profile", icon: User },
    { name: "Saved", path: "/saved", icon: Heart },
    { name: "Settings", path: "/settings", icon: Settings },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't show on chat page since it has its own navigation
  if (location.pathname === "/chat") {
    return null
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      )}
    >
      <div className="relative">
        {/* Expanded Navigation Menu */}
        <div
          className={cn(
            "absolute bottom-16 right-0 transition-all duration-300 origin-bottom-right",
            isExpanded 
              ? "scale-100 opacity-100 translate-y-0" 
              : "scale-75 opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          <div className="bg-card/95 mystical-blur backdrop-blur-xl border border-border/30 rounded-2xl shadow-cosmic overflow-hidden">
            <div className="p-3 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    size="sm"
                    asChild
                    className={cn(
                      "w-full justify-start divine-transition rounded-xl",
                      isActive 
                        ? "bg-wisdom-gradient text-primary-foreground shadow-divine" 
                        : "hover:bg-accent/50 hover:shadow-mystical"
                    )}
                    onClick={() => setIsExpanded(false)}
                  >
                    <Link to={item.path} className="flex items-center space-x-3 px-3 py-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Floating Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "w-14 h-14 rounded-full bg-wisdom-gradient hover:opacity-90 divine-transition enlighten-glow group relative",
            "shadow-lg hover:shadow-divine backdrop-blur-sm"
          )}
        >
          <div className="relative">
            <Sparkles 
              className={cn(
                "w-6 h-6 transition-all duration-300",
                isExpanded ? "rotate-90 scale-110" : "rotate-0 scale-100"
              )} 
            />
            <div className="absolute inset-0 w-6 h-6 text-primary-foreground/30 animate-ping" />
          </div>
          
          {/* Floating indicator */}
          <div 
            className={cn(
              "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cosmic transition-all duration-300",
              isExpanded ? "scale-0" : "scale-100 animate-divine-pulse"
            )}
          />
        </Button>
      </div>

      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/10 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  )
}
