'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Camera, 
  Save, 
  Shield, 
  Globe, 
  Bell,
  Eye,
  EyeOff,
  Upload
} from 'lucide-react';

export default function ProfileSettings() {
  const [profileData, setProfileData] = useState({
    firstName: 'Alex',
    lastName: 'Chen',
    username: 'alexchen',
    email: 'alex.chen@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Professional forex trader with 5+ years of experience. Specializing in swing trading and technical analysis.',
    location: 'New York, USA',
    timezone: 'America/New_York',
    website: 'https://alexchen.trading',
    tradingExperience: '3-5 years',
    preferredPairs: ['EUR/USD', 'GBP/USD', 'USD/JPY'],
    riskTolerance: 'moderate'
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showTradingStats: true,
    showFollowers: true,
    allowMessages: true,
    showOnlineStatus: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    tradeAlerts: true,
    marketNews: false,
    socialUpdates: true
  });

  const handleSaveProfile = () => {
    // Handle profile save
    console.log('Saving profile:', profileData);
  };

  const handleSavePrivacy = () => {
    // Handle privacy settings save
    console.log('Saving privacy settings:', privacySettings);
  };

  const handleSaveNotifications = () => {
    // Handle notification settings save
    console.log('Saving notification settings:', notificationSettings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
        <p className="text-slate-400">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Profile Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="relative inline-block">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=2" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="font-semibold text-white mt-3">{profileData.firstName} {profileData.lastName}</h3>
              <p className="text-slate-400">@{profileData.username}</p>
              <div className="flex justify-center space-x-2 mt-2">
                <Badge className="bg-blue-600">Pro Trader</Badge>
                <Badge variant="outline" className="border-slate-600 text-slate-400">Verified</Badge>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-700">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Followers</span>
                <span className="text-white font-medium">2,847</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Following</span>
                <span className="text-white font-medium">156</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Win Rate</span>
                <span className="text-green-400 font-medium">73.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total Trades</span>
                <span className="text-white font-medium">1,234</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Personal Information</CardTitle>
              <Button onClick={handleSaveProfile} className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">First Name</Label>
                  <Input
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Last Name</Label>
                  <Input
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Username</Label>
                <Input
                  value={profileData.username}
                  onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label className="text-slate-300">Email</Label>
                <Input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label className="text-slate-300">Phone</Label>
                <Input
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label className="text-slate-300">Bio</Label>
                <Textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Location</Label>
                  <Input
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Timezone</Label>
                  <Select value={profileData.timezone} onValueChange={(value) => setProfileData({...profileData, timezone: value})}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Website</Label>
                <Input
                  value={profileData.website}
                  onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="https://your-website.com"
                />
              </div>
            </CardContent>
          </Card>

          {/* Trading Preferences */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Trading Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-300">Trading Experience</Label>
                <Select value={profileData.tradingExperience} onValueChange={(value) => setProfileData({...profileData, tradingExperience: value})}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="beginner">Beginner (< 1 year)</SelectItem>
                    <SelectItem value="1-3 years">Intermediate (1-3 years)</SelectItem>
                    <SelectItem value="3-5 years">Advanced (3-5 years)</SelectItem>
                    <SelectItem value="5+ years">Expert (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-slate-300">Risk Tolerance</Label>
                <Select value={profileData.riskTolerance} onValueChange={(value) => setProfileData({...profileData, riskTolerance: value})}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-slate-300">Preferred Currency Pairs</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD', 'EUR/GBP'].map((pair) => (
                    <Badge
                      key={pair}
                      variant={profileData.preferredPairs.includes(pair) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        profileData.preferredPairs.includes(pair) 
                          ? 'bg-blue-600' 
                          : 'border-slate-600 text-slate-400 hover:bg-slate-700'
                      }`}
                      onClick={() => {
                        const newPairs = profileData.preferredPairs.includes(pair)
                          ? profileData.preferredPairs.filter(p => p !== pair)
                          : [...profileData.preferredPairs, pair];
                        setProfileData({...profileData, preferredPairs: newPairs});
                      }}
                    >
                      {pair}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Privacy Settings
              </CardTitle>
              <Button onClick={handleSavePrivacy} variant="outline" className="border-slate-600 text-slate-300">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-300">Profile Visibility</Label>
                <Select value={privacySettings.profileVisibility} onValueChange={(value) => setPrivacySettings({...privacySettings, profileVisibility: value})}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="followers">Followers Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Show Trading Statistics</Label>
                    <p className="text-sm text-slate-400">Display your win rate and performance metrics</p>
                  </div>
                  <Switch
                    checked={privacySettings.showTradingStats}
                    onCheckedChange={(checked) => setPrivacySettings({...privacySettings, showTradingStats: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Show Followers Count</Label>
                    <p className="text-sm text-slate-400">Display your follower and following counts</p>
                  </div>
                  <Switch
                    checked={privacySettings.showFollowers}
                    onCheckedChange={(checked) => setPrivacySettings({...privacySettings, showFollowers: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Allow Direct Messages</Label>
                    <p className="text-sm text-slate-400">Let other users send you private messages</p>
                  </div>
                  <Switch
                    checked={privacySettings.allowMessages}
                    onCheckedChange={(checked) => setPrivacySettings({...privacySettings, allowMessages: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Show Online Status</Label>
                    <p className="text-sm text-slate-400">Let others see when you're online</p>
                  </div>
                  <Switch
                    checked={privacySettings.showOnlineStatus}
                    onCheckedChange={(checked) => setPrivacySettings({...privacySettings, showOnlineStatus: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Settings
              </CardTitle>
              <Button onClick={handleSaveNotifications} variant="outline" className="border-slate-600 text-slate-300">
                <Save className="h-4  w-4 mr-2" />
                Save
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Email Notifications</Label>
                    <p className="text-sm text-slate-400">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Push Notifications</Label>
                    <p className="text-sm text-slate-400">Receive push notifications on your device</p>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Trade Alerts</Label>
                    <p className="text-sm text-slate-400">Get notified about trade opportunities and signals</p>
                  </div>
                  <Switch
                    checked={notificationSettings.tradeAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, tradeAlerts: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Market News</Label>
                    <p className="text-sm text-slate-400">Receive important market news and updates</p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketNews}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketNews: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300">Social Updates</Label>
                    <p className="text-sm text-slate-400">Get notified about likes, comments, and follows</p>
                  </div>
                  <Switch
                    checked={notificationSettings.socialUpdates}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, socialUpdates: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}