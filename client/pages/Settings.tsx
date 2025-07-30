import { useState } from "react"
import { 
  User, 
  Bell, 
  Shield, 
  Moon, 
  Sun, 
  Globe, 
  Save, 
  Trash2, 
  Download,
  Eye,
  EyeOff,
  Smartphone,
  Mail
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/components/theme-provider"

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  
  const [settings, setSettings] = useState({
    // Profile
    name: "John Doe",
    email: "john@example.com",
    
    // Notifications
    emailNotifications: true,
    wisdomReminders: true,
    weeklyInsights: true,
    marketingEmails: false,
    
    // Privacy
    publicProfile: false,
    shareInsights: true,
    dataCollection: true,
    
    // Preferences
    language: "en",
    timezone: "America/New_York",
    wisdomStyle: "balanced", // balanced, traditional, modern
    
    // Security
    twoFactorAuth: false,
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSaveSettings = () => {
    // TODO: Implement settings save
    console.log("Saving settings:", settings)
  }

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion with confirmation
    console.log("Delete account requested")
  }

  const handleExportData = () => {
    // TODO: Implement data export
    console.log("Export data requested")
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and customize your Divine Wisdom experience.
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Settings */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-primary" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and profile details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => handleSettingChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange("email", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                {theme === "dark" ? (
                  <Moon className="w-5 h-5 mr-2 text-primary" />
                ) : (
                  <Sun className="w-5 h-5 mr-2 text-primary" />
                )}
                Appearance
              </CardTitle>
              <CardDescription>
                Customize the look and feel of Divine Wisdom.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Wisdom Style</Label>
                <Select 
                  value={settings.wisdomStyle} 
                  onValueChange={(value) => handleSettingChange("wisdomStyle", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="traditional">Traditional (Classical Sanskrit concepts)</SelectItem>
                    <SelectItem value="balanced">Balanced (Mix of traditional and modern)</SelectItem>
                    <SelectItem value="modern">Modern (Contemporary language)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-primary" />
                Notifications
              </CardTitle>
              <CardDescription>
                Choose what notifications you'd like to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important updates via email
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Daily Wisdom Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get gentle reminders for daily practice
                  </p>
                </div>
                <Switch
                  checked={settings.wisdomReminders}
                  onCheckedChange={(checked) => handleSettingChange("wisdomReminders", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Insights</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive curated weekly wisdom
                  </p>
                </div>
                <Switch
                  checked={settings.weeklyInsights}
                  onCheckedChange={(checked) => handleSettingChange("weeklyInsights", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Communications</Label>
                  <p className="text-sm text-muted-foreground">
                    Updates about new features and offerings
                  </p>
                </div>
                <Switch
                  checked={settings.marketingEmails}
                  onCheckedChange={(checked) => handleSettingChange("marketingEmails", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Control your privacy settings and account security.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Profile</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow others to see your public profile
                  </p>
                </div>
                <Switch
                  checked={settings.publicProfile}
                  onCheckedChange={(checked) => handleSettingChange("publicProfile", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Share Anonymous Insights</Label>
                  <p className="text-sm text-muted-foreground">
                    Help improve AI by sharing anonymized data
                  </p>
                </div>
                <Switch
                  checked={settings.shareInsights}
                  onCheckedChange={(checked) => handleSettingChange("shareInsights", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Change Password</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showCurrentPassword ? "text" : "password"}
                        value={settings.currentPassword}
                        onChange={(e) => handleSettingChange("currentPassword", e.target.value)}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          value={settings.newPassword}
                          onChange={(e) => handleSettingChange("newPassword", e.target.value)}
                          placeholder="Enter new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={settings.confirmPassword}
                        onChange={(e) => handleSettingChange("confirmPassword", e.target.value)}
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-primary" />
                Preferences
              </CardTitle>
              <CardDescription>
                Set your language, timezone, and other preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select 
                    value={settings.language} 
                    onValueChange={(value) => handleSettingChange("language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="sa">Sanskrit</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select 
                    value={settings.timezone} 
                    onValueChange={(value) => handleSettingChange("timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="Asia/Kolkata">India Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data & Account Management */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Data & Account Management</CardTitle>
              <CardDescription>
                Download your data or delete your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  onClick={handleExportData}
                  className="divine-transition hover:bg-accent/50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export My Data
                </Button>
                
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                  className="divine-transition"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Deleting your account will permanently remove all your data and cannot be undone.
              </p>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveSettings}
              className="bg-wisdom-gradient hover:opacity-90 divine-transition px-8"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
