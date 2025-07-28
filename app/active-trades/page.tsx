'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Target,
  AlertTriangle,
  Edit,
  X,
  BarChart3,
  RefreshCw
} from 'lucide-react';

const activeTrades = [
  {
    id: 1,
    pair: 'EUR/USD',
    type: 'BUY',
    entryPrice: 1.0892,
    currentPrice: 1.0915,
    lotSize: 0.5,
    pnl: 115.00,
    pnlPips: 23,
    stopLoss: 1.0850,
    takeProfit: 1.0950,
    openTime: '2023-06-14 09:30:00',
    status: 'running',
    timeframe: 'H4'
  },
  {
    id: 2,
    pair: 'GBP/USD',
    type: 'SELL',
    entryPrice: 1.2754,
    currentPrice: 1.2738,
    lotSize: 0.3,
    pnl: 48.00,
    pnlPips: 16,
    stopLoss: 1.2790,
    takeProfit: 1.2700,
    openTime: '2023-06-14 11:15:00',
    status: 'running',
    timeframe: 'H1'
  },
  {
    id: 3,
    pair: 'USD/JPY',
    type: 'BUY',
    entryPrice: 138.92,
    currentPrice: 138.75,
    lotSize: 0.2,
    pnl: -34.00,
    pnlPips: -17,
    stopLoss: 138.50,
    takeProfit: 139.50,
    openTime: '2023-06-14 13:45:00',
    status: 'running',
    timeframe: 'M30'
  },
];

const pendingOrders = [
  {
    id: 4,
    pair: 'AUD/USD',
    type: 'BUY LIMIT',
    orderPrice: 0.6580,
    currentPrice: 0.6598,
    lotSize: 0.4,
    stopLoss: 0.6540,
    takeProfit: 0.6650,
    expiry: '2023-06-15 09:00:00',
    status: 'pending'
  },
  {
    id: 5,
    pair: 'USD/CAD',
    type: 'SELL STOP',
    orderPrice: 1.3500,
    currentPrice: 1.3465,
    lotSize: 0.3,
    stopLoss: 1.3540,
    takeProfit: 1.3420,
    expiry: '2023-06-16 15:00:00',
    status: 'pending'
  },
];

export default function ActiveTrades() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const totalPnL = activeTrades.reduce((sum, trade) => sum + trade.pnl, 0);
  const totalPips = activeTrades.reduce((sum, trade) => sum + trade.pnlPips, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Active Trades Monitor</h1>
          <p className="text-slate-400">Monitor and manage your open positions in real-time</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="border-slate-600 text-slate-300"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Activity className="h-4 w-4 mr-2" />
            New Trade
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Trades</p>
                <p className="text-2xl font-bold text-white">{activeTrades.length}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total P&L</p>
                <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${totalPnL.toFixed(2)}
                </p>
              </div>
              <DollarSign className={`h-8 w-8 ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Pips</p>
                <p className={`text-2xl font-bold ${totalPips >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalPips > 0 ? '+' : ''}{totalPips}
                </p>
              </div>
              <Target className={`h-8 w-8 ${totalPips >= 0 ? 'text-green-400' : 'text-red-400'}`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Pending Orders</p>
                <p className="text-2xl font-bold text-white">{pendingOrders.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trades Table */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="active">Active Trades</TabsTrigger>
          <TabsTrigger value="pending">Pending Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Active Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 text-slate-300 font-medium">Pair</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Type</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Size</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Entry</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Current</th>
                      <th className="text-left py-3 text-slate-300 font-medium">P&L</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Pips</th>
                      <th className="text-left py-3 text-slate-300 font-medium">SL/TP</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeTrades.map((trade) => (
                      <tr key={trade.id} className="border-b border-slate-700/50">
                        <td className="py-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-white">{trade.pair}</span>
                            <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                              {trade.timeframe}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-3">
                          <Badge className={trade.type === 'BUY' ? 'bg-green-600' : 'bg-red-600'}>
                            {trade.type}
                          </Badge>
                        </td>
                        <td className="py-3 text-white">{trade.lotSize}</td>
                        <td className="py-3 text-white">{trade.entryPrice}</td>
                        <td className="py-3 text-white">{trade.currentPrice}</td>
                        <td className="py-3">
                          <span className={`font-medium ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            ${trade.pnl.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`font-medium ${trade.pnlPips >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {trade.pnlPips > 0 ? '+' : ''}{trade.pnlPips}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="text-xs text-slate-400">
                            <div>SL: {trade.stopLoss}</div>
                            <div>TP: {trade.takeProfit}</div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-slate-700">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-400 hover:bg-slate-700">
                              <X className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:bg-slate-700">
                              <BarChart3 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 text-slate-300 font-medium">Pair</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Type</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Size</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Order Price</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Current</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Distance</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Expiry</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingOrders.map((order) => (
                      <tr key={order.id} className="border-b border-slate-700/50">
                        <td className="py-3 font-medium text-white">{order.pair}</td>
                        <td className="py-3">
                          <Badge className={order.type.includes('BUY') ? 'bg-green-600' : 'bg-red-600'}>
                            {order.type}
                          </Badge>
                        </td>
                        <td className="py-3 text-white">{order.lotSize}</td>
                        <td className="py-3 text-white">{order.orderPrice}</td>
                        <td className="py-3 text-white">{order.currentPrice}</td>
                        <td className="py-3 text-slate-400">
                          {Math.abs(order.currentPrice - order.orderPrice).toFixed(4)}
                        </td>
                        <td className="py-3 text-slate-400 text-sm">
                          {new Date(order.expiry).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <div className="flex space-x-1">
                            <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-slate-700">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-400 hover:bg-slate-700">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}