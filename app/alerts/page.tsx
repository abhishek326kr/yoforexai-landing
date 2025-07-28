'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  Plus, 
  Edit, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Volume2,
  Mail,
  Smartphone
} from 'lucide-react';

const activeAlerts = [
  {
    id: 1,
    pair: 'EUR/USD',
    type: 'Price Alert',
    condition: 'Above',
    value: 1.0950,
    currentPrice: 1.0892,
    status: 'active',
    created: '2023-06-14 09:30:00',
    triggered: false,
    notifications: ['email', 'push']
  },
  {
    id: 2,
    pair: 'GBP/USD',
    type: 'Technical Alert',
    condition: 'RSI Oversold',
    value: 30,
    currentValue: 45,
    status: 'active',
    created: '2023-06-14 10:15:00',
    triggered: false,
    notifications: ['push', 'sound']
  },
  {
    id: 3,
    pair: 'USD/JPY',
    type: 'Pattern Alert',
    condition: 'Double Top',
    value: 'Pattern Detected',
    status: 'triggered',
    created: '2023-06-14 11:00:00',
    triggered: true,
    triggeredAt: '2023-06-14 13:45:00',
    notifications: ['email', 'push', 'sound']
  },
];

const alertHistory = [
  {
    id: 4,
    pair: 'AUD/USD',
    type: 'Price Alert',
    condition: 'Below 0.6600',
    triggeredAt: '2023-06-13 15:30:00',
    action: 'Executed Trade'
  },
  {
    id: 5,
    pair: 'USD/CAD',
    type: 'Volume Alert',
    condition: 'High Volume',
    triggeredAt: '2023-06-13 12:15:00',
    action: 'Notification Sent'
  },
];

export default function CustomAlerts() {
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [selectedPair, setSelectedPair] = useState('');
  const [alertType, setAlertType] = useState('');
  const [condition, setCondition] = useState('');
  const [value, setValue] = useState('');

  const handleCreateAlert = () => {
    // Handle alert creation
    setShowCreateAlert(false);
    // Reset form
    setSelectedPair('');
    setAlertType('');
    setCondition('');
    setValue('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Custom Trade Alerts</h1>
          <p className="text-slate-400">Set up intelligent alerts to never miss trading opportunities</p>
        </div>
        <Button 
          onClick={() => setShowCreateAlert(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Alert
        </Button>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Alerts</p>
                <p className="text-2xl font-bold text-white">
                  {activeAlerts.filter(alert => alert.status === 'active').length}
                </p>
              </div>
              <Bell className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Triggered Today</p>
                <p className="text-2xl font-bold text-green-400">
                  {activeAlerts.filter(alert => alert.triggered).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Success Rate</p>
                <p className="text-2xl font-bold text-white">87%</p>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Avg Response</p>
                <p className="text-2xl font-bold text-white">2.3s</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Alert Modal */}
      {showCreateAlert && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Create New Alert</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowCreateAlert(false)}
              className="text-slate-400"
            >
              ×
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300">Currency Pair</Label>
                <Select value={selectedPair} onValueChange={setSelectedPair}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select pair" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="EUR/USD">EUR/USD</SelectItem>
                    <SelectItem value="GBP/USD">GBP/USD</SelectItem>
                    <SelectItem value="USD/JPY">USD/JPY</SelectItem>
                    <SelectItem value="AUD/USD">AUD/USD</SelectItem>
                    <SelectItem value="USD/CAD">USD/CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-slate-300">Alert Type</Label>
                <Select value={alertType} onValueChange={setAlertType}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="price">Price Alert</SelectItem>
                    <SelectItem value="technical">Technical Indicator</SelectItem>
                    <SelectItem value="pattern">Pattern Recognition</SelectItem>
                    <SelectItem value="volume">Volume Alert</SelectItem>
                    <SelectItem value="news">News Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-slate-300">Condition</Label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="above">Above</SelectItem>
                    <SelectItem value="below">Below</SelectItem>
                    <SelectItem value="crosses_up">Crosses Up</SelectItem>
                    <SelectItem value="crosses_down">Crosses Down</SelectItem>
                    <SelectItem value="equals">Equals</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-slate-300">Value</Label>
                <Input 
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter value"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-slate-300 mb-3 block">Notification Methods</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-slate-700/30">
                  <Switch id="email" />
                  <Mail className="h-4 w-4 text-slate-400" />
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-slate-700/30">
                  <Switch id="push" defaultChecked />
                  <Smartphone className="h-4 w-4 text-slate-400" />
                  <Label htmlFor="push" className="text-slate-300">Push</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-slate-700/30">
                  <Switch id="sound" />
                  <Volume2 className="h-4 w-4 text-slate-400" />
                  <Label htmlFor="sound" className="text-slate-300">Sound</Label>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button onClick={handleCreateAlert} className="bg-blue-600 hover:bg-blue-700">
                Create Alert
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCreateAlert(false)}
                className="border-slate-600 text-slate-300"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alerts Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="active">Active Alerts</TabsTrigger>
          <TabsTrigger value="history">Alert History</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={
                          alert.status === 'active' ? 'bg-green-600' : 
                          alert.status === 'triggered' ? 'bg-blue-600' : 'bg-gray-600'
                        }>
                          {alert.status}
                        </Badge>
                        <div>
                          <h4 className="font-medium text-white">{alert.pair} • {alert.type}</h4>
                          <p className="text-sm text-slate-400">
                            {alert.condition} {alert.value}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-slate-700">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:bg-slate-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Current Value:</span>
                        <div className="text-white font-medium">
                          {alert.currentPrice || alert.currentValue || 'N/A'}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">Created:</span>
                        <div className="text-white font-medium">
                          {new Date(alert.created).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">Notifications:</span>
                        <div className="flex space-x-1 mt-1">
                          {alert.notifications.map((method, index) => (
                            <Badge key={index} variant="outline" className="border-slate-600 text-slate-400 text-xs">
                              {method}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {alert.triggered && (
                      <div className="mt-3 p-2 rounded bg-blue-900/30 border border-blue-800">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-400" />
                          <span className="text-blue-400 text-sm">
                            Triggered at {new Date(alert.triggeredAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Alert History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertHistory.map((alert) => (
                  <div key={alert.id} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{alert.pair} • {alert.type}</h4>
                        <p className="text-sm text-slate-400">{alert.condition}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-400">
                          {new Date(alert.triggeredAt).toLocaleString()}
                        </div>
                        <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs mt-1">
                          {alert.action}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}