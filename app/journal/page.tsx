'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Plus, Filter, Search, Edit, Trash2, TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from 'lucide-react';

const journalEntries = [
  {
    id: 1,
    pair: 'EUR/USD Breakout Trade',
    date: 'June 12, 2023',
    tradeType: 'Swing Trade',
    result: 'Win',
    profit: '+1.3% Profit',
    timeframe: 'H4 Timeframe',
    description: 'The EUR/USD breakout from the descending triangle pattern worked perfectly. I entered after confirmation with the AI analysis showing 87% confidence. The trade hit my first target at 1.0920, and I trailed my stop to secure profits. Key lesson: patience pays off when waiting for proper confirmation.',
    positive: true
  },
  {
    id: 2,
    pair: 'GBP/JPY Reversal',
    date: 'June 10, 2023',
    tradeType: 'Scalp Trade',
    result: 'Loss',
    profit: '-0.7% Loss',
    timeframe: 'M15 Timeframe',
    description: 'Tried to catch the reversal too early. The AI suggested waiting for confirmation at the 162.50 level, but I jumped in at 163.20. Need to be more patient and trust the system. The reversal did happen, but not at my entry point.',
    positive: false
  },
  {
    id: 3,
    pair: 'USD/CAD Double Bottom',
    date: 'June 8, 2023',
    tradeType: 'Swing Trade',
    result: 'Win',
    profit: '+2.1% Profit',
    timeframe: 'D1 Timeframe',
    description: 'The double bottom pattern on USD/CAD played out nicely. I entered after the neckline break at 1.3420 with a tight stop below the second bottom. The trade ran for a week, and I took profits at the 1.3580 resistance level.',
    positive: true
  },
  {
    id: 4,
    pair: 'AUD/USD Range Trade',
    date: 'June 5, 2023',
    tradeType: 'Scalp Trade',
    result: 'Win',
    profit: '+0.8% Profit',
    timeframe: 'M30 Timeframe',
    description: 'Caught a nice range trade on AUD/USD between 0.6550 and 0.6580. The pair has been range-bound for a week, and I took advantage of the clear support and resistance levels. Entered long at support and exited at resistance.',
    positive: true
  },
];

export default function TradeJournal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalEntries = journalEntries.length;

  const filteredEntries = journalEntries.filter(entry =>
    entry.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Trade Journal</h1>
          <p className="text-slate-400">Document your trades and insights to improve your strategy</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Entry
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-slate-400" />
              <span className="text-slate-300 font-medium">Your Journal Entries</span>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                {totalEntries} Total
              </Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              />
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                Export Journal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Journal Entries */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-white">{entry.pair}</h3>
                  <Badge className={entry.result === 'Win' ? 'bg-green-600' : 'bg-red-600'}>
                    {entry.result}
                  </Badge>
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {entry.tradeType}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <span className="text-slate-400 text-sm">Date</span>
                  <div className="text-white font-medium">{entry.date}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Timeframe</span>
                  <div className="text-white font-medium">{entry.timeframe}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Result</span>
                  <div className={`font-medium flex items-center ${
                    entry.positive ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {entry.positive ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {entry.profit}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                    View Details
                  </Button>
                </div>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-4">
                <p className="text-slate-300 text-sm leading-relaxed">{entry.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">
              Showing {Math.min(4, filteredEntries.length)} of {totalEntries} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="border-slate-600 text-slate-300"
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant={currentPage === 1 ? "default" : "outline"}
                  className={currentPage === 1 ? "bg-blue-600" : "border-slate-600 text-slate-300"}
                >
                  1
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-300"
                >
                  2
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-600 text-slate-300"
                >
                  3
                </Button>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="border-slate-600 text-slate-300"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}