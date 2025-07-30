import { User, Edit, Calendar, MessageCircle, Heart, Settings, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function Profile() {
  const stats = [
    { label: "Days on Journey", value: "127", icon: Calendar },
    { label: "Wisdom Sessions", value: "89", icon: MessageCircle },
    { label: "Insights Saved", value: "23", icon: Heart },
    { label: "Milestones Reached", value: "5", icon: Award }
  ]

  const achievements = [
    { title: "First Steps", description: "Completed your first wisdom session", earned: true },
    { title: "Seeker", description: "Had 10 meaningful conversations", earned: true },
    { title: "Dedicated Student", description: "Used Divine Wisdom for 30 days", earned: true },
    { title: "Wisdom Collector", description: "Saved 20 insights", earned: true },
    { title: "Deep Thinker", description: "Engaged in 50 sessions", earned: false },
    { title: "Enlightened Soul", description: "Reached 100 days of practice", earned: false }
  ]

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <div className="mb-8">
          <Card className="border-border/50 shadow-cosmic">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
                    <AvatarFallback className="text-2xl bg-wisdom-gradient text-primary-foreground">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">John Doe</h1>
                  <p className="text-muted-foreground mb-4">
                    Seeker of wisdom and truth • Member since March 2024
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge className="bg-wisdom-gradient text-primary-foreground">
                      Daily Practitioner
                    </Badge>
                    <Badge variant="outline">Bhagavad Gita Student</Badge>
                    <Badge variant="outline">Mindfulness Enthusiast</Badge>
                  </div>
                </div>

                <Button className="bg-wisdom-gradient hover:opacity-90 divine-transition">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats & Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Statistics */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Your Journey Statistics
                </CardTitle>
                <CardDescription>
                  Track your progress on the path of wisdom
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <div key={index} className="text-center p-4 rounded-lg bg-muted/50">
                        <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Weekly Wisdom Practice</CardTitle>
                <CardDescription>
                  Your engagement this week
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily Sessions</span>
                    <span>5 of 7 days</span>
                  </div>
                  <Progress value={71} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Insights Saved</span>
                    <span>3 this week</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Reflection Time</span>
                    <span>45 minutes</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest wisdom sessions and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "Today", action: "Had a wisdom session about finding purpose", type: "session" },
                    { date: "Yesterday", action: "Saved insight about detachment from outcomes", type: "save" },
                    { date: "2 days ago", action: "Completed daily reflection practice", type: "practice" },
                    { date: "3 days ago", action: "Asked about handling workplace stress", type: "session" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div className="flex-1">
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements & Goals */}
          <div className="space-y-8">
            {/* Achievements */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-primary" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Milestones on your spiritual journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border ${
                        achievement.earned 
                          ? 'bg-primary/5 border-primary/20' 
                          : 'bg-muted/30 border-border/50'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <Award className={`w-4 h-4 ${
                          achievement.earned ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                        <h4 className={`font-medium text-sm ${
                          achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {achievement.title}
                        </h4>
                      </div>
                      <p className={`text-xs ${
                        achievement.earned ? 'text-muted-foreground' : 'text-muted-foreground/70'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-wisdom-gradient hover:opacity-90 divine-transition">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Wisdom Session
                </Button>
                <Button variant="outline" className="w-full divine-transition hover:bg-accent/50">
                  <Heart className="w-4 h-4 mr-2" />
                  View Saved Insights
                </Button>
                <Button variant="outline" className="w-full divine-transition hover:bg-accent/50">
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
