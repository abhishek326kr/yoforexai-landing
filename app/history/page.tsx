'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  History, 
  Filter, 
  Download, 
  Search, 
  Calendar as CalendarIcon,
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';

const tradeHistory = [
  {
    id: 1,
    pair: 'EUR/USD',
    type: 'BUY',
    entryPrice: 1.0850,
    exitPrice: 1.0920,
    lotSize: 0.5,
    pnl: 350.00,
    pips: 70,
    openTime: '2023-06-12 09:30:00',
    closeTime: '2023-06-12 15:45:00',
    duration: '6h 15m',
    strategy: 'Swing Trading',
    result: 'Win',
    commission: 5.00,
    swap: 0.50
  },
  {
    id: 2,
    pair: 'GBP/USD',
    type: 'SELL',
    entryPrice: 1.2780,
    exitPrice: 1.2820,
    lotSize: 0.3,
    pnl: -120.00,
    pips: -40,
    openTime: '2023-06-11 14:20:00',
    closeTime: '2023-06-11 16:30:00',
    duration: '2h 10m',
    strategy: 'Scalp Trading',
    result: 'Loss',
    commission: 3.00,
    swap: 0.00
  },
  {
    id: 3,
    pair: 'USD/JPY',
    type: 'BUY',
    entryPrice: 138.50,
    exitPrice: 139.20,
    lotSize: 0.4,
    pnl: 280.00,
    pips: 70,
    openTime: '2023-06-10 11:00:00',
    closeTime: '2023-06-10 17:30:00',
    duration: '6h 30m',
    strategy: 'Swing Trading',
    result: 'Win',
    commission: 4.00,
    swap: 1.20
  },
  {
    id: 4,
    pair: 'AUD/USD',
    type: 'BUY',
    entryPrice: 0.6580,
    exitPrice: 0.6620,
    lotSize: 0.6,
    pnl: 240.00,
    pips: 40,
    openTime: '2023-06-09 08:15:00',
    closeTime: '2023-06-09 12:45:00',
    duration: '4h 30m',
    strategy: 'Scalp Trading',
    result: 'Win',
    commission: 6.00,
    swap: 0.30
  },
  {
    id: 5,
    pair: 'USD/CAD',
    type: 'SELL',
    entryPrice: 1.3480,
    exitPrice: 1.3520,
    lotSize: 0.2,
    pnl: -80.00,
    pips: -40,
    openTime: '2023-06-08 13:30:00',
    closeTime: '2023-06-08 14:15:00',
    duration: '45m',
    strategy: 'Scalp Trading',
    result: 'Loss',
    commission: 2.00,
    swap: 0.00
  },
];

const performanceData = [
  { date: '06-08', pnl: -80 },
  { date: '06-09', pnl: 240 },
  { date: '06-10', pnl: 280 },
  { date: '06-11', pnl: -120 },
  { date: '06-12', pnl: 350 },
];

const monthlyStats = [
  { month: 'Jan', trades: 45, profit: 1250 },
  { month: 'Feb', trades: 52, profit: 1680 },
  { month: 'Mar', trades: 38, profit: 890 },
  { month: 'Apr', trades: 61, profit: 2140 },
  { month: 'May', trades: 47, profit: 1520 },
  { month: 'Jun', trades: 23, profit: 670 },
];

export default function TradeHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPair, setFilterPair] = useState('all');
  const [filterStrategy, setFilterStrategy] = useState('all');
  const [filterResult, setFilterResult] = useState('all');
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 10;
  const totalTrades = tradeHistory.length;
  const totalPages = Math.ceil(totalTrades / itemsPerPage);

  const filteredTrades = tradeHistory.filter(trade => {
    const matchesSearch = trade.pair.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPair = filterPair === 'all' || trade.pair === filterPair;
    const matchesStrategy = filterStrategy === 'all' || trade.strategy === filterStrategy;
    const matchesResult = filterResult === 'all' || trade.result === filterResult;
    
    return matchesSearch && matchesPair && matchesStrategy && matchesResult;
  });

  const totalPnL = tradeHistory.reduce((sum, trade) => sum + trade.pnl, 0);
  const totalPips = tradeHistory.reduce((sum, trade) => sum + trade.pips, 0);
  const winRate = (tradeHistory.filter(trade => trade.result === 'Win').length / tradeHistory.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Trade History</h1>
          <p className="text-slate-400">Analyze your trading performance and learn from past trades</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="border-slate-600 text-slate-300"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Trades</p>
                <p className="text-2xl font-bold text-white">{totalTrades}</p>
              </div>
              <History className="h-8 w-8 text-blue-400" />
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
              <BarChart3 className={`h-8 w-8 ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Win Rate</p>
                <p className="text-2xl font-bold text-white">{winRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
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
              <TrendingUp className={`h-8 w-8 ${totalPips >= 0 ? 'text-green-400' : 'text-red-400'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label className="text-slate-300">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search trades..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Currency Pair</Label>
                <Select value={filterPair} onValueChange={setFilterPair}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All Pairs</SelectItem>
                    <SelectItem value="EUR/USD">EUR/USD</SelectItem>
                    <SelectItem value="GBP/USD">GBP/USD</SelectItem>
                    <SelectItem value="USD/JPY">USD/JPY</SelectItem>
                    <SelectItem value="AUD/USD">AUD/USD</SelectItem>
                    <SelectItem value="USD/CAD">USD/CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-slate-300">Strategy</Label>
                <Select value={filterStrategy} onValueChange={setFilterStrategy}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All Strategies</SelectItem>
                    <SelectItem value="Swing Trading">Swing Trading</SelectItem>
                    <SelectItem value="Scalp Trading">Scalp Trading</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-slate-300">Result</Label>
                <Select value={filterResult} onValueChange={setFilterResult}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All Results</SelectItem>
                    <SelectItem value="Win">Wins Only</SelectItem>
                    <SelectItem value="Loss">Losses Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-slate-300">Date Range</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full border-slate-600 text-slate-300 justify-start">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Select dates
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      className="rounded-md border-0"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Daily P&L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis dataKey="date" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Bar dataKey="pnl" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyStats}>
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trade History Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Trade History</CardTitle>
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
                  <th className="text-left py-3 text-slate-300 font-medium">Exit</th>
                  <th className="text-left py-3 text-slate-300 font-medium">P&L</th>
                  <th className="text-left py-3 text-slate-300 font-medium">Pips</th>
                  <th className="text-left py-3 text-slate-300 font-medium">Duration</th>
                  <th className="text-left py-3 text-slate-300 font-medium">Strategy</th>
                  <th className="text-left py-3 text-slate-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrades.map((trade) => (
                  <tr key={trade.id} className="border-b border-slate-700/50">
                    <td className="py-3 font-medium text-white">{trade.pair}</td>
                    <td className="py-3">
                      <Badge className={trade.type === 'BUY' ? 'bg-green-600' : 'bg-red-600'}>
                        {trade.type}
                      </Badge>
                    </td>
                    <td className="py-3 text-white">{trade.lotSize}</td>
                    <td className="py-3 text-white">{trade.entryPrice}</td>
                    <td className="py-3 text-white">{trade.exitPrice}</td>
                    <td className="py-3">
                      <span className={`font-medium ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${trade.pnl.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`font-medium ${trade.pips >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {trade.pips > 0 ? '+' : ''}{trade.pips}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400 text-sm">{trade.duration}</td>
                    <td className="py-3">
                      <Badge variant="outline" className="border-slate-600 text-slate-400">
                        {trade.strategy}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-slate-700">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-slate-400">
              Showing {Math.min(itemsPerPage, filteredTrades.length)} of {filteredTrades.length} trades
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="border-slate-600 text-slate-300"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex space-x-1">
                {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                  <Button
                    key={i}
                    size="sm"
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    className={currentPage === i + 1 ? "bg-blue-600" : "border-slate-600 text-slate-300"}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-600 text-slate-300"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}