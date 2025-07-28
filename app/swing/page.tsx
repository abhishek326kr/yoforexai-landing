'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, Camera, History, Calculator, TrendingUp, CheckCircle, ExternalLink, AlertCircle, DollarSign, Target } from 'lucide-react';

const chartRequirements = [
  { id: 1, title: 'Timeframe', description: 'Use H4, D1, or W1 for swing trading analysis', completed: true },
  { id: 2, title: 'Indicators', description: 'Include key indicators (MA, RSI, MACD) if used', completed: true },
  { id: 3, title: 'Price History', description: 'Show at least 50-100 candles for context', completed: true },
  { id: 4, title: 'Clear View', description: 'Ensure chart is clearly visible with good contrast', completed: true },
];

const recentUploads = [
  { pair: 'EUR/USD D1', time: 'Today, 10:32 AM', status: 'analyzed' },
  { pair: 'GBP/JPY H4', time: 'Yesterday, 3:15 PM', status: 'analyzed' },
  { pair: 'USD/CAD W1', time: 'Jun 10, 2023', status: 'analyzed' },
];

const analysisGuides = [
  {
    icon: TrendingUp,
    title: 'Market Structure',
    description: 'Identify key support/resistance levels and market structure for potential trade setups.',
  },
  {
    icon: TrendingUp,
    title: 'Trend Analysis',
    description: 'Determine the current trend direction using multiple timeframe analysis.',
  },
  {
    icon: TrendingUp,
    title: 'Entry & Exit Points',
    description: 'Define precise entry triggers, stop loss and take profit levels for optimal risk/reward.',
  },
];

export default function SwingTrading() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [error, setError] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);

  // Calculator state
  const [calculatorData, setCalculatorData] = useState({
    accountBalance: 10000,
    riskPercentage: 2,
    currencyPair: 'EUR/USD',
    entryPrice: 1.0892,
    stopLoss: 1.0850,
    takeProfit: 1.0950,
    tradeType: 'BUY'
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPG, PNG, or GIF)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    setError(null);
    analyzeChart(file);
  };

  const analyzeChart = async (file) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://127.0.0.1:8000/analyze-chart/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const results = await response.json();
      setAnalysisResults(results);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze chart. Please check your connection and try again.');
      
      // Mock results for demonstration
      setAnalysisResults({
        signal: 'BUY',
        confidence: 87,
        entry_point: 1.0892,
        stop_loss: 1.0850,
        take_profit: 1.0950,
        risk_reward_ratio: 1.38,
        technical_indicators: {
          rsi: 45.2,
          macd: 'Bullish',
          moving_average: 'Above 50 EMA'
        },
        market_structure: 'Uptrend confirmed',
        recommendation: 'Strong buy signal with good risk/reward ratio'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const calculatePositionSize = () => {
    const riskAmount = (calculatorData.accountBalance * calculatorData.riskPercentage) / 100;
    const pipValue = 10; // Simplified pip value for EUR/USD
    const stopLossPips = Math.abs(calculatorData.entryPrice - calculatorData.stopLoss) * 10000;
    const positionSize = riskAmount / (stopLossPips * pipValue);
    
    const takeProfitPips = Math.abs(calculatorData.takeProfit - calculatorData.entryPrice) * 10000;
    const riskReward = takeProfitPips / stopLossPips;
    const potentialProfit = riskAmount * riskReward;

    return {
      positionSize: positionSize.toFixed(2),
      riskAmount: riskAmount.toFixed(2),
      riskReward: riskReward.toFixed(2),
      potentialProfit: potentialProfit.toFixed(2),
      stopLossPips: stopLossPips.toFixed(0),
      takeProfitPips: takeProfitPips.toFixed(0)
    };
  };

  const calculationResults = calculatePositionSize();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Swing Trading</h1>
          <p className="text-slate-400">H4, D1, W1 Timeframes</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
          <Dialog open={showCalculator} onOpenChange={setShowCalculator}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-slate-600 text-slate-300">
                <Calculator className="h-4 w-4 mr-2" />
                Calculator
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">Pre-Trade Calculator</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Account Balance ($)</Label>
                    <Input
                      type="number"
                      value={calculatorData.accountBalance}
                      onChange={(e) => setCalculatorData({...calculatorData, accountBalance: parseFloat(e.target.value)})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Risk Percentage (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={calculatorData.riskPercentage}
                      onChange={(e) => setCalculatorData({...calculatorData, riskPercentage: parseFloat(e.target.value)})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Currency Pair</Label>
                    <Select value={calculatorData.currencyPair} onValueChange={(value) => setCalculatorData({...calculatorData, currencyPair: value})}>
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
                    <Label className="text-slate-300">Trade Type</Label>
                    <Select value={calculatorData.tradeType} onValueChange={(value) => setCalculatorData({...calculatorData, tradeType: value})}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="BUY">BUY</SelectItem>
                        <SelectItem value="SELL">SELL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-slate-300">Entry Price</Label>
                    <Input
                      type="number"
                      step="0.0001"
                      value={calculatorData.entryPrice}
                      onChange={(e) => setCalculatorData({...calculatorData, entryPrice: parseFloat(e.target.value)})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Stop Loss</Label>
                    <Input
                      type="number"
                      step="0.0001"
                      value={calculatorData.stopLoss}
                      onChange={(e) => setCalculatorData({...calculatorData, stopLoss: parseFloat(e.target.value)})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Take Profit</Label>
                    <Input
                      type="number"
                      step="0.0001"
                      value={calculatorData.takeProfit}
                      onChange={(e) => setCalculatorData({...calculatorData, takeProfit: parseFloat(e.target.value)})}
                      className="bg-slate-700 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-700">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Position Size:</span>
                      <span className="text-white font-medium">{calculationResults.positionSize} lots</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Risk Amount:</span>
                      <span className="text-red-400 font-medium">${calculationResults.riskAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Stop Loss Pips:</span>
                      <span className="text-white font-medium">{calculationResults.stopLossPips}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Risk/Reward:</span>
                      <span className="text-white font-medium">1:{calculationResults.riskReward}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Potential Profit:</span>
                      <span className="text-green-400 font-medium">${calculationResults.potentialProfit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Take Profit Pips:</span>
                      <span className="text-white font-medium">{calculationResults.takeProfitPips}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Save Trade Setup
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-300" onClick={() => setShowCalculator(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <TrendingUp className="h-4 w-4 mr-2" />
            New Trade
          </Button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="upload">Chart Upload</TabsTrigger>
          <TabsTrigger value="guide">Analysis Guide</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Upload Area */}
            <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Upload Chart for Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-800 flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <span className="text-red-400 text-sm">{error}</span>
                  </div>
                )}

                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    {selectedFile ? selectedFile.name : 'Drag & Drop Your Chart Here'}
                  </h3>
                  <p className="text-slate-400 mb-4">
                    Upload your trading chart in JPG, PNG or GIF format. For best results, ensure all indicators are clearly visible.
                  </p>
                  <div className="flex justify-center space-x-3">
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => document.getElementById('file-input').click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      Browse Files
                    </Button>
                    <Button variant="outline" className="border-slate-600 text-slate-300">
                      <Camera className="h-4 w-4 mr-2" />
                      Take Screenshot
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-3">
                    Supported formats: PNG, JPG, GIF (Max 5MB)
                  </p>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {isAnalyzing && (
                  <div className="mt-4 p-4 rounded-lg bg-blue-900/30 border border-blue-800">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                      <span className="text-blue-400">Analyzing your chart...</span>
                    </div>
                  </div>
                )}

                {analysisResults && (
                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-medium text-white">Analysis Results</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-slate-700/50 border-slate-600">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-400">Signal</span>
                            <Badge className={analysisResults.signal === 'BUY' ? 'bg-green-600' : 'bg-red-600'}>
                              {analysisResults.signal}
                            </Badge>
                          </div>
                          <div className="text-2xl font-bold text-white">{analysisResults.confidence}%</div>
                          <div className="text-sm text-slate-400">Confidence</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-slate-700/50 border-slate-600">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Entry:</span>
                              <span className="text-white">{analysisResults.entry_point}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Stop Loss:</span>
                              <span className="text-red-400">{analysisResults.stop_loss}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Take Profit:</span>
                              <span className="text-green-400">{analysisResults.take_profit}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">R/R:</span>
                              <span className="text-white">1:{analysisResults.risk_reward_ratio}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="bg-slate-700/50 border-slate-600">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-white mb-2">Technical Analysis</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-400">RSI:</span>
                            <span className="text-white">{analysisResults.technical_indicators?.rsi}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">MACD:</span>
                            <span className="text-white">{analysisResults.technical_indicators?.macd}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Moving Average:</span>
                            <span className="text-white">{analysisResults.technical_indicators?.moving_average}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-700/50 border-slate-600">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-white mb-2">Recommendation</h4>
                        <p className="text-slate-300 text-sm">{analysisResults.recommendation}</p>
                      </CardContent>
                    </Card>

                    <div className="flex space-x-3">
                      <Button className="bg-green-600 hover:bg-green-700">
                        Execute Trade
                      </Button>
                      <Button variant="outline" className="border-slate-600 text-slate-300">
                        Save Analysis
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Chart Requirements & Recent Uploads */}
            <div className="space-y-6">
              {/* Chart Requirements */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Chart Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {chartRequirements.map((req) => (
                    <div key={req.id} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-white text-sm">{req.title}</div>
                        <div className="text-xs text-slate-400">{req.description}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Uploads */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Uploads</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentUploads.map((upload, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded bg-slate-700/30">
                      <div>
                        <div className="font-medium text-white text-sm">{upload.pair}</div>
                        <div className="text-xs text-slate-400">{upload.time}</div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-slate-700">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          {/* Analysis Guide */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white">Swing Trading Analysis Guide</CardTitle>
                <p className="text-slate-400 text-sm">Learn the key components of effective swing trading analysis</p>
              </div>
              <Button variant="outline" size="sm" className="border-slate-600 text-blue-400">
                View Full Guide
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {analysisGuides.map((guide, index) => (
                  <div key={index} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 rounded-lg bg-blue-600/20">
                        <guide.icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <h3 className="font-medium text-white">{guide.title}</h3>
                    </div>
                    <p className="text-sm text-slate-300">{guide.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Analysis History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <History className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-400">Your analysis history will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}