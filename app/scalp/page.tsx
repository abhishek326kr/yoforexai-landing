'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Upload, Camera, Zap, DollarSign, Target, AlertCircle, Activity, BarChart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const currencyPairs = [
  { pair: 'EUR/USD', price: '1.0892', change: '+0.05%', positive: true },
  { pair: 'GBP/USD', price: '1.2754', change: '-0.12%', positive: false },
  { pair: 'USD/JPY', price: '138.92', change: '+0.23%', positive: true },
  { pair: 'AUD/USD', price: '0.6598', change: '+0.08%', positive: true },
  { pair: 'USD/CAD', price: '1.3465', change: '-0.03%', positive: false },
];

const chartData = [
  { time: '1', value: 1.0800 },
  { time: '7', value: 1.0820 },
  { time: '13', value: 1.0790 },
  { time: '19', value: 1.0850 },
  { time: '25', value: 1.0870 },
  { time: '31', value: 1.0840 },
  { time: '37', value: 1.0880 },
  { time: '43', value: 1.0860 },
  { time: '49', value: 1.0890 },
  { time: '55', value: 1.0910 },
];

const recentTrades = [
  { pair: 'EUR/USD', type: 'BUY', time: 'M15 • 10:45 AM', pips: '+12 pips', profit: '$30.00 profit', positive: true },
  { pair: 'GBP/USD', type: 'SELL', time: 'M5 • 11:20 AM', pips: '-8 pips', profit: '$20.00 loss', positive: false },
  { pair: 'USD/JPY', type: 'BUY', time: 'M30 • 12:05 PM', pips: '+15 pips', profit: '$37.50 profit', positive: true },
  { pair: 'AUD/USD', type: 'BUY', time: 'M15 • 1:30 PM', pips: '+7 pips', profit: '$17.50 profit', positive: true },
];

const scalpingTips = [
  'Use tight stop losses (5-15 pips) for proper risk management',
  'Trade during high liquidity sessions for tighter spreads',
  'Avoid trading during major news events',
];

const marketConditions = [
  { name: 'Volatility', level: 'Medium', color: 'yellow' },
  { name: 'Liquidity', level: 'High', color: 'green' },
  { name: 'News Impact', level: 'High', color: 'red' },
];

const upcomingEvents = [
  { event: 'USD CPI Data', time: '2:30 PM', impact: 'High' },
  { event: 'EUR ECB Speech', time: '3:15 PM', impact: 'Medium' },
];

export default function ScalpTrading() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('M15');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Scalp Trading</h1>
          <p className="text-slate-400">M5, M15, M30 Timeframes</p>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Zap className="h-4 w-4 mr-2" />
            New Trade
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Upload className="h-4 w-4 mr-2" />
            Upload Chart
          </Button>
        </div>
      </div>

      {/* Currency Pairs */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {currencyPairs.map((currency) => (
          <Card key={currency.pair} className="flex-shrink-0 bg-slate-800/50 border-slate-700 min-w-[140px]">
            <CardContent className="p-3">
              <div className="font-medium text-white text-sm">{currency.pair}</div>
              <div className="text-lg font-bold text-white">{currency.price}</div>
              <div className={`text-xs flex items-center ${
                currency.positive ? 'text-green-400' : 'text-red-400'
              }`}>
                {currency.positive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {currency.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Analysis */}
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Chart Analysis</CardTitle>
            <div className="flex space-x-2">
              <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <TabsList className="bg-slate-700">
                  <TabsTrigger value="M5" className="text-xs">M5</TabsTrigger>
                  <TabsTrigger value="M15" className="text-xs">M15</TabsTrigger>
                  <TabsTrigger value="M30" className="text-xs">M30</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                <BarChart className="h-4 w-4 mr-1" />
                Fullscreen
              </Button>
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                <Camera className="h-4 w-4 mr-1" />
                Screenshot
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis 
                    dataKey="time" 
                    stroke="#64748b" 
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                    domain={['dataMin - 0.001', 'dataMax + 0.001']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 4, fill: '#3b82f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                <Upload className="h-4 w-4 mr-2" />
                Upload Chart
              </Button>
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                <Camera className="h-4 w-4 mr-2" />
                Screenshot
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Activity className="h-4 w-4 mr-2" />
                Analyze
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Scalping Analysis Guide */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Scalping Analysis Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-blue-900/30 border border-blue-800">
              <h4 className="font-medium text-white mb-2 flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                M5 Timeframe
              </h4>
              <p className="text-sm text-slate-300">
                Best for ultra-short term trades with 5-10 pip targets. Focus on immediate support/resistance levels and momentum indicators.
              </p>
            </div>
            
            <div className="p-3 rounded-lg bg-purple-900/30 border border-purple-800">
              <h4 className="font-medium text-white mb-2 flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                M15 Timeframe
              </h4>
              <p className="text-sm text-slate-300">
                Balanced scalping approach with 10-20 pip targets. Look for price action patterns and RSI divergences.
              </p>
            </div>
            
            <div className="p-3 rounded-lg bg-pink-900/30 border border-pink-800">
              <h4 className="font-medium text-white mb-2 flex items-center">
                <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                M30 Timeframe
              </h4>
              <p className="text-sm text-slate-300">
                Extended scalping with 15-30 pip targets. Identify trend direction from higher timeframes and enter on pullbacks.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-700/50">
              <h4 className="font-medium text-white mb-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-blue-400" />
                Scalping Tips
              </h4>
              <ul className="space-y-1 text-sm text-slate-300">
                {scalpingTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pre-Trade Calculator and Recent Trades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pre-Trade Calculator */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Pre-Trade Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300">Currency Pair</Label>
                <Select defaultValue="EURUSD">
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="EURUSD">EUR/USD</SelectItem>
                    <SelectItem value="GBPUSD">GBP/USD</SelectItem>
                    <SelectItem value="USDJPY">USD/JPY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-300">Trade Type</Label>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">Buy</Button>
                  <Button size="sm" variant="outline" className="flex-1 border-slate-600 text-slate-300">Sell</Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300">Entry Price</Label>
                <Input 
                  defaultValue="1.0892" 
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label className="text-slate-300">Stop Loss (pips)</Label>
                <Input 
                  defaultValue="10" 
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300">Take Profit (pips)</Label>
                <Input 
                  defaultValue="15" 
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label className="text-slate-300">Risk Amount ($)</Label>
                <Input 
                  defaultValue="25.00" 
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
              <div className="text-center">
                <div className="text-slate-400 text-sm">Position Size</div>
                <div className="text-lg font-bold text-white">0.25 lots</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 text-sm">Risk/Reward</div>
                <div className="text-lg font-bold text-white">1:1.5</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 text-sm">Potential Profit</div>
                <div className="text-lg font-bold text-green-400">$37.50</div>
              </div>
            </div>
            
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Save Trade Setup
            </Button>
          </CardContent>
        </Card>

        {/* Recent Scalp Trades and Market Conditions */}
        <div className="space-y-6">
          {/* Recent Scalp Trades */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Recent Scalp Trades</CardTitle>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTrades.map((trade, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-slate-700/30">
                  <div className="flex items-center space-x-3">
                    <Badge className={trade.type === 'BUY' ? 'bg-green-600' : 'bg-red-600'}>
                      {trade.type}
                    </Badge>
                    <div>
                      <div className="font-medium text-white text-sm">{trade.pair}</div>
                      <div className="text-xs text-slate-400">{trade.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${trade.positive ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.pips}
                    </div>
                    <div className="text-xs text-slate-400">{trade.profit}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Current Market Conditions */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Current Market Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketConditions.map((condition, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-slate-300">{condition.name}</span>
                  <Badge className={`${
                    condition.color === 'green' ? 'bg-green-600' :
                    condition.color === 'yellow' ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    {condition.level}
                  </Badge>
                </div>
              ))}
              
              <div className="pt-3 border-t border-slate-700">
                <h4 className="font-medium text-white mb-2">Upcoming Events (Next 2 Hours)</h4>
                <div className="space-y-2">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{event.event}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400">{event.time}</span>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {event.impact}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}