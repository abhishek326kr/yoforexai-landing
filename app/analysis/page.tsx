'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Upload, 
  Camera, 
  BarChart3, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';

const aiAnalysisData = [
  { time: '9:00', confidence: 85, signal: 'BUY' },
  { time: '10:00', confidence: 78, signal: 'HOLD' },
  { time: '11:00', confidence: 92, signal: 'BUY' },
  { time: '12:00', confidence: 67, signal: 'SELL' },
  { time: '13:00', confidence: 88, signal: 'BUY' },
  { time: '14:00', confidence: 95, signal: 'BUY' },
];

const recentAnalyses = [
  {
    pair: 'EUR/USD',
    timeframe: 'H4',
    signal: 'BUY',
    confidence: 87,
    timestamp: '2 minutes ago',
    status: 'active'
  },
  {
    pair: 'GBP/JPY',
    timeframe: 'D1',
    signal: 'SELL',
    confidence: 73,
    timestamp: '15 minutes ago',
    status: 'completed'
  },
  {
    pair: 'USD/CAD',
    timeframe: 'H4',
    signal: 'HOLD',
    confidence: 65,
    timestamp: '1 hour ago',
    status: 'pending'
  },
];

const marketInsights = [
  {
    title: 'Strong USD Momentum',
    description: 'USD showing consistent strength across major pairs with 89% confidence',
    impact: 'High',
    pairs: ['EUR/USD', 'GBP/USD', 'AUD/USD']
  },
  {
    title: 'EUR Weakness Pattern',
    description: 'Technical indicators suggest continued EUR weakness in the short term',
    impact: 'Medium',
    pairs: ['EUR/USD', 'EUR/GBP', 'EUR/JPY']
  },
  {
    title: 'JPY Volatility Alert',
    description: 'Increased volatility expected in JPY pairs due to upcoming economic data',
    impact: 'High',
    pairs: ['USD/JPY', 'GBP/JPY', 'EUR/JPY']
  },
];

export default function AIAnalysis() {
  const [selectedPair, setSelectedPair] = useState('EUR/USD');
  const [selectedTimeframe, setSelectedTimeframe] = useState('H4');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Analysis Dashboard</h1>
          <p className="text-slate-400">Advanced AI-powered trading analysis and insights</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Upload className="h-4 w-4 mr-2" />
            Upload Chart
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Brain className="h-4 w-4 mr-2" />
            New Analysis
          </Button>
        </div>
      </div>

      {/* AI Analysis Controls */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-400" />
            AI Analysis Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <Label className="text-slate-300">Currency Pair</Label>
              <Select value={selectedPair} onValueChange={setSelectedPair}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
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
              <Label className="text-slate-300">Timeframe</Label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="M15">M15</SelectItem>
                  <SelectItem value="M30">M30</SelectItem>
                  <SelectItem value="H1">H1</SelectItem>
                  <SelectItem value="H4">H4</SelectItem>
                  <SelectItem value="D1">D1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-slate-300">Analysis Type</Label>
              <Select defaultValue="comprehensive">
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="comprehensive">Comprehensive</SelectItem>
                  <SelectItem value="technical">Technical Only</SelectItem>
                  <SelectItem value="sentiment">Sentiment Only</SelectItem>
                  <SelectItem value="pattern">Pattern Recognition</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isAnalyzing ? (
                  <>
                    <Activity className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Confidence Chart */}
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">AI Confidence Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={aiAnalysisData}>
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Area 
                    type="monotone" 
                    dataKey="confidence" 
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Current Analysis Status */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Current Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-800">
              <div className="text-3xl font-bold text-white mb-2">87%</div>
              <div className="text-purple-400 text-sm">AI Confidence</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Signal</span>
                <Badge className="bg-green-600">BUY</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Entry Point</span>
                <span className="text-white font-medium">1.0892</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Stop Loss</span>
                <span className="text-red-400 font-medium">1.0850</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Take Profit</span>
                <span className="text-green-400 font-medium">1.0950</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Risk/Reward</span>
                <span className="text-white font-medium">1:1.38</span>
              </div>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700">
              Execute Trade
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Analyses and Market Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Analyses */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Recent Analyses</CardTitle>
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAnalyses.map((analysis, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30">
                <div className="flex items-center space-x-3">
                  <Badge className={
                    analysis.signal === 'BUY' ? 'bg-green-600' :
                    analysis.signal === 'SELL' ? 'bg-red-600' : 'bg-yellow-600'
                  }>
                    {analysis.signal}
                  </Badge>
                  <div>
                    <div className="font-medium text-white text-sm">
                      {analysis.pair} • {analysis.timeframe}
                    </div>
                    <div className="text-xs text-slate-400">{analysis.timestamp}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-white">{analysis.confidence}%</div>
                  <div className={`text-xs ${
                    analysis.status === 'active' ? 'text-green-400' :
                    analysis.status === 'completed' ? 'text-blue-400' : 'text-yellow-400'
                  }`}>
                    {analysis.status}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Market Insights */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Market Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {marketInsights.map((insight, index) => (
              <div key={index} className="p-3 rounded-lg bg-slate-700/30 border border-slate-600">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-white text-sm">{insight.title}</h4>
                  <Badge className={
                    insight.impact === 'High' ? 'bg-red-600' : 'bg-yellow-600'
                  }>
                    {insight.impact}
                  </Badge>
                </div>
                <p className="text-xs text-slate-300 mb-2">{insight.description}</p>
                <div className="flex flex-wrap gap-1">
                  {insight.pairs.map((pair, pairIndex) => (
                    <Badge key={pairIndex} variant="outline" className="border-slate-600 text-slate-400 text-xs">
                      {pair}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}