import { useState } from "react"
import { 
  Heart, 
  Search, 
  Filter, 
  BookOpen, 
  Sparkles, 
  Calendar, 
  Copy, 
  Share2, 
  Trash2,
  Download,
  Tag,
  SortDesc
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SavedInsight {
  id: string
  content: string
  source: "gita" | "psychology" | "general"
  tags: string[]
  date: Date
  category: string
  verse?: string
}

export default function Saved() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBy, setFilterBy] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  // Mock data - replace with actual saved insights
  const savedInsights: SavedInsight[] = [
    {
      id: "1",
      content: "You have the right to perform your actions, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
      source: "gita",
      tags: ["detachment", "duty", "action"],
      date: new Date("2024-01-15"),
      category: "Action & Duty",
      verse: "Bhagavad Gita 2.47"
    },
    {
      id: "2",
      content: "Mindfulness-based stress reduction helps us observe our thoughts without judgment, creating space between stimulus and response. This aligns with the Gita's teaching of witnessing consciousness.",
      source: "psychology",
      tags: ["mindfulness", "stress", "awareness"],
      date: new Date("2024-01-14"),
      category: "Mental Health"
    },
    {
      id: "3",
      content: "Set your heart upon your work, but never on its reward. Work not for a reward; but never cease to do your work.",
      source: "gita",
      tags: ["work", "reward", "dedication"],
      date: new Date("2024-01-12"),
      category: "Work & Purpose",
      verse: "Bhagavad Gita 2.47"
    },
    {
      id: "4",
      content: "Cognitive reframing helps us challenge negative thought patterns. The Gita teaches similar principles - seeing challenges as opportunities for growth rather than obstacles.",
      source: "psychology",
      tags: ["cognitive-therapy", "reframing", "growth"],
      date: new Date("2024-01-10"),
      category: "Mental Health"
    },
    {
      id: "5",
      content: "The mind is restless and difficult to restrain, but it is subdued by practice and by detachment.",
      source: "gita",
      tags: ["mind", "practice", "detachment"],
      date: new Date("2024-01-08"),
      category: "Mind & Meditation",
      verse: "Bhagavad Gita 6.35"
    }
  ]

  const getSourceBadge = (source: string) => {
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
        return (
          <Badge variant="outline" className="text-xs">
            General
          </Badge>
        )
    }
  }

  const filteredInsights = savedInsights.filter(insight => {
    const matchesSearch = insight.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         insight.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         insight.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filterBy === "all" || insight.source === filterBy
    
    return matchesSearch && matchesFilter
  })

  const sortedInsights = [...filteredInsights].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return b.date.getTime() - a.date.getTime()
      case "category":
        return a.category.localeCompare(b.category)
      case "source":
        return a.source.localeCompare(b.source)
      default:
        return 0
    }
  })

  const categories = Array.from(new Set(savedInsights.map(insight => insight.category)))
  const allTags = Array.from(new Set(savedInsights.flatMap(insight => insight.tags)))

  const handleCopyInsight = (content: string) => {
    navigator.clipboard.writeText(content)
    // TODO: Show toast notification
  }

  const handleDeleteInsight = (id: string) => {
    // TODO: Implement delete functionality
    console.log("Delete insight:", id)
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Heart className="w-8 h-8 mr-3 text-primary" />
            Saved Wisdom
          </h1>
          <p className="text-muted-foreground">
            Your collection of meaningful insights and guidance from your Divine Wisdom journey.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search insights, tags, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="gita">Bhagavad Gita</SelectItem>
                  <SelectItem value="psychology">Psychology</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="category">Sort by Category</SelectItem>
                  <SelectItem value="source">Sort by Source</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="divine-transition hover:bg-accent/50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground mr-2">Quick filters:</span>
            {categories.slice(0, 4).map(category => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="h-7 text-xs divine-transition hover:bg-accent/50"
                onClick={() => setSearchQuery(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{savedInsights.length}</div>
              <div className="text-sm text-muted-foreground">Total Insights</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{allTags.length}</div>
              <div className="text-sm text-muted-foreground">Unique Tags</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {savedInsights.filter(i => i.source === "gita").length}
              </div>
              <div className="text-sm text-muted-foreground">Gita Verses</div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Grid */}
        <div className="space-y-6">
          {sortedInsights.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="p-12 text-center">
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No insights found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || filterBy !== "all" 
                    ? "Try adjusting your search or filters." 
                    : "Start saving insights from your wisdom sessions to build your collection."}
                </p>
                <Button className="bg-wisdom-gradient hover:opacity-90 divine-transition">
                  Start a Wisdom Session
                </Button>
              </CardContent>
            </Card>
          ) : (
            sortedInsights.map((insight) => (
              <Card key={insight.id} className="border-border/50 hover:shadow-mystical divine-transition">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        {getSourceBadge(insight.source)}
                        <Badge variant="secondary" className="text-xs">
                          {insight.category}
                        </Badge>
                      </div>
                      {insight.verse && (
                        <p className="text-sm text-muted-foreground font-medium">
                          {insight.verse}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-accent/50"
                        onClick={() => handleCopyInsight(insight.content)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-accent/50"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-destructive/20 text-destructive"
                        onClick={() => handleDeleteInsight(insight.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <blockquote className="text-foreground leading-relaxed mb-4 border-l-4 border-primary/30 pl-4 italic">
                    "{insight.content}"
                  </blockquote>
                  
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {insight.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="text-xs cursor-pointer hover:bg-accent/50 divine-transition"
                          onClick={() => setSearchQuery(tag)}
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      {insight.date.toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Load More or Pagination could go here */}
        {sortedInsights.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Showing {sortedInsights.length} of {savedInsights.length} insights
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
