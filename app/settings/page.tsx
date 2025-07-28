'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  User, 
  CreditCard, 
  Shield, 
  Bell, 
  Palette, 
  Globe,
  Download,
  Trash2,
  AlertTriangle,
  Save
} from 'lucide-react';

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    theme: 'dark',
    language: 'en',
    timezone: 'America/New_York',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    autoSave: true,
    soundEffects: true,
    animations: true,
    compactMode: false,
    showTooltips: true,
    autoRefresh: true,
    refreshInterval: 30
  });

  const [tradingSettings, setTradingSettings] = useState({
    defaultLotSize: 0.1,
    defaultStopLoss: 50,
    defaultTakeProfit: 100,
    riskPerTrade: 2,
    maxOpenTrades: 5,
    autoCloseOnProfit: false,
    autoCloseOnLoss: true,
    confirmTrades: true,
    oneClickTrading: false
  });

  const handleSaveSettings = () => {
    // Handle settings save
    console.log('Saving settings:', settings);
  };

  const handleSaveTradingSettings = () => {
    // Handle trading settings save
    console.log('Saving trading settings:', tradingSettings);
  };

  const handleExportData = () => {
    // Handle data export
    console.log('Exporting user data...');
  };

  const handleDeleteAccount = () => {
    // Handle account deletion
    console.log('Account deletion requested...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">General Settings</h1>
        <p className="text-slate-400">Customize your trading platform experience</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center">
            <User className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-white mb-1">Profile Settings</h3>
            <p className="text-sm text-slate-400">Manage your personal information</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center">
            <CreditCard className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-white mb-1">Billing & Plans</h3>
            <p className="text-sm text-slate-400">Manage subscription and payments</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-white mb-1">Security</h3>
            <p className="text-sm text-slate-400">Password and security settings</p>
          </CardContent>
        </Card>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="data">Data & Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">General Preferences</CardTitle>
              <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Appearance */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Appearance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => setSettings({...settings, theme: value})}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-slate-300">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Compact Mode</Label>
                      <p className="text-sm text-slate-400">Reduce spacing and padding</p>
                    </div>
                    <Switch
                      checked={settings.compactMode}
                      onCheckedChange={(checked) => setSettings({...settings, compactMode: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Animations</Label>
                      <p className="text-sm text-slate-400">Enable smooth transitions</p>
                    </div>
                    <Switch
                      checked={settings.animations}
                      onCheckedChange={(checked) => setSettings({...settings, animations: checked})}
                    />
                  </div>
                </div>
              </div>

              {/* Localization */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Localization</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-slate-300">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
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

                  <div>
                    <Label className="text-slate-300">Currency</Label>
                    <Select value={settings.currency} onValueChange={(value) => setSettings({...settings, currency: value})}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                        <SelectItem value="CAD">CAD (C$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-slate-300">Date Format</Label>
                    <Select value={settings.dateFormat} onValueChange={(value) => setSettings({...settings, dateFormat: value})}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Interface */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Interface</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Auto-save</Label>
                      <p className="text-sm text-slate-400">Automatically save your work</p>
                    </div>
                    <Switch
                      checked={settings.autoSave}
                      onCheckedChange={(checked) => setSettings({...settings, autoSave: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Sound Effects</Label>
                      <p className="text-sm text-slate-400">Play sounds for notifications and actions</p>
                    </div>
                    <Switch
                      checked={settings.soundEffects}
                      onCheckedChange={(checked) => setSettings({...settings, soundEffects: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Show Tooltips</Label>
                      <p className="text-sm text-slate-400">Display helpful tooltips on hover</p>
                    </div>
                    <Switch
                      checked={settings.showTooltips}
                      onCheckedChange={(checked) => setSettings({...settings, showTooltips: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Auto Refresh</Label>
                      <p className="text-sm text-slate-400">Automatically refresh market data</p>
                    </div>
                    <Switch
                      checked={settings.autoRefresh}
                      onCheckedChange={(checked) => setSettings({...settings, autoRefresh: checked})}
                    />
                  </div>

                  {settings.autoRefresh && (
                    <div>
                      <Label className="text-slate-300">Refresh Interval (seconds)</Label>
                      <Input
                        type="number"
                        value={settings.refreshInterval}
                        onChange={(e) => setSettings({...settings, refreshInterval: parseInt(e.target.value)})}
                        className="bg-slate-700 border-slate-600 text-white mt-1"
                        min="5"
                        max="300"
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trading">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Trading Preferences</CardTitle>
              <Button onClick={handleSaveTradingSettings} className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Default Trade Settings */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Default Trade Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-slate-300">Default Lot Size</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={tradingSettings.defaultLotSize}
                      onChange={(e) => setTradingSettings({...tradingSettings, defaultLotSize: parseFloat(e.target.value)})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300">Default Stop Loss (pips)</Label>
                    <Input
                      type="number"
                      value={tradingSettings.defaultStopLoss}
                      onChange={(e) => setTradingSettings({...tradingSettings, defaultStopLoss: parseInt(e.target.value)})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300">Default Take Profit (pips)</Label>
                    <Input
                      type="number"
                      value={tradingSettings.defaultTakeProfit}
                      onChange={(e) => setTradingSettings({...tradingSettings, defaultTakeProfit: parseInt(e.target.value)})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Risk Management */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Risk Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Risk Per Trade (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={tradingSettings.riskPerTrade}
                      onChange={(e) => setTradingSettings({...tradingSettings, riskPerTrade: parseFloat(e.target.value)})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300">Max Open Trades</Label>
                    <Input
                      type="number"
                      value={tradingSettings.maxOpenTrades}
                      onChange={(e) => setTradingSettings({...tradingSettings, maxOpenTrades: parseInt(e.target.value)})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Trading Behavior */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Trading Behavior</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Auto-close on Profit Target</Label>
                      <p className="text-sm text-slate-400">Automatically close trades when profit target is reached</p>
                    </div>
                    <Switch
                      checked={tradingSettings.autoCloseOnProfit}
                      onCheckedChange={(checked) => setTradingSettings({...tradingSettings, autoCloseOnProfit: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Auto-close on Stop Loss</Label>
                      <p className="text-sm text-slate-400">Automatically close trades when stop loss is hit</p>
                    </div>
                    <Switch
                      checked={tradingSettings.autoCloseOnLoss}
                      onCheckedChange={(checked) => setTradingSettings({...tradingSettings, autoCloseOnLoss: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Confirm Trades</Label>
                      <p className="text-sm text-slate-400">Show confirmation dialog before executing trades</p>
                    </div>
                    <Switch
                      checked={tradingSettings.confirmTrades}
                      onCheckedChange={(checked) => setTradingSettings({...tradingSettings, confirmTrades: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">One-click Trading</Label>
                      <p className="text-sm text-slate-400">Enable one-click trade execution (Advanced users only)</p>
                    </div>
                    <Switch
                      checked={tradingSettings.oneClickTrading}
                      onCheckedChange={(checked) => setTradingSettings({...tradingSettings, oneClickTrading: checked})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-400">Notification settings are managed in your Profile Settings</p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                  Go to Profile Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Data & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Data Export */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Data Export</h3>
                <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white mb-2">Export Your Data</h4>
                      <p className="text-sm text-slate-400 mb-4">
                        Download a copy of all your trading data, including trade history, settings, and preferences.
                      </p>
                    </div>
                    <Button onClick={handleExportData} variant="outline" className="border-slate-600 text-slate-300">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </div>

              {/* Account Deletion */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Account Deletion</h3>
                <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-white mb-2">Delete Your Account</h4>
                      <p className="text-sm text-slate-400 mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button onClick={handleDeleteAccount} variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Analytics & Performance</Label>
                      <p className="text-sm text-slate-400">Help us improve by sharing anonymous usage data</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Marketing Communications</Label>
                      <p className="text-sm text-slate-400">Receive updates about new features and trading insights</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Third-party Integrations</Label>
                      <p className="text-sm text-slate-400">Allow third-party services to access your data</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}