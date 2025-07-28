'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  DollarSign, 
  CheckCircle,
  AlertTriangle,
  Crown,
  Zap,
  Star,
  Gift
} from 'lucide-react';

const subscriptionPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 0,
    period: 'month',
    features: [
      'Basic chart analysis',
      'Limited AI insights',
      '5 alerts per day',
      'Community access',
      'Email support'
    ],
    current: false,
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29.99,
    period: 'month',
    features: [
      'Advanced chart analysis',
      'Unlimited AI insights',
      'Unlimited alerts',
      'Priority support',
      'Advanced indicators',
      'Risk management tools'
    ],
    current: true,
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 79.99,
    period: 'month',
    features: [
      'Everything in Pro',
      'Real-time market data',
      'Custom indicators',
      'API access',
      'White-label solutions',
      'Dedicated account manager'
    ],
    current: false,
    popular: false
  }
];

const billingHistory = [
  {
    id: 1,
    date: '2023-06-01',
    description: 'Pro Plan - Monthly',
    amount: 29.99,
    status: 'paid',
    invoice: 'INV-2023-001'
  },
  {
    id: 2,
    date: '2023-05-01',
    description: 'Pro Plan - Monthly',
    amount: 29.99,
    status: 'paid',
    invoice: 'INV-2023-002'
  },
  {
    id: 3,
    date: '2023-04-01',
    description: 'Pro Plan - Monthly',
    amount: 29.99,
    status: 'paid',
    invoice: 'INV-2023-003'
  },
  {
    id: 4,
    date: '2023-03-01',
    description: 'Basic Plan - Monthly',
    amount: 0.00,
    status: 'paid',
    invoice: 'INV-2023-004'
  }
];

const paymentMethods = [
  {
    id: 1,
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true
  },
  {
    id: 2,
    type: 'card',
    last4: '5555',
    brand: 'Mastercard',
    expiryMonth: 8,
    expiryYear: 2024,
    isDefault: false
  }
];

export default function BillingSettings() {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const currentPlan = subscriptionPlans.find(plan => plan.current);
  const nextBillingDate = '2023-07-01';
  const totalSpent = billingHistory.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Billing & Subscription</h1>
        <p className="text-slate-400">Manage your subscription, payment methods, and billing history</p>
      </div>

      {/* Current Subscription */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Crown className="h-5 w-5 mr-2 text-yellow-400" />
            Current Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-white">{currentPlan?.name} Plan</h3>
                <Badge className="bg-blue-600">Active</Badge>
              </div>
              <p className="text-slate-300">${currentPlan?.price}/month</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Next billing date</p>
              <p className="text-white font-medium">{new Date(nextBillingDate).toLocaleDateString()}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-slate-600 text-slate-300">
                Change Plan
              </Button>
              <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Monthly Cost</p>
                <p className="text-2xl font-bold text-white">${currentPlan?.price}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-white">${totalSpent.toFixed(2)}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Days Until Renewal</p>
                <p className="text-2xl font-bold text-white">17</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Payment Status</p>
                <p className="text-2xl font-bold text-green-400">Active</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Plans */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Subscription Plans</CardTitle>
          <div className="flex items-center space-x-4">
            <Button
              variant={billingCycle === 'monthly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setBillingCycle('monthly')}
              className={billingCycle === 'monthly' ? 'bg-blue-600' : 'border-slate-600 text-slate-300'}
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === 'yearly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setBillingCycle('yearly')}
              className={billingCycle === 'yearly' ? 'bg-blue-600' : 'border-slate-600 text-slate-300'}
            >
              Yearly (Save 20%)
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-6 rounded-lg border transition-colors ${
                  plan.current
                    ? 'border-blue-600 bg-blue-900/20'
                    : plan.popular
                    ? 'border-purple-600 bg-purple-900/20'
                    : 'border-slate-600 bg-slate-700/30'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600">
                    Most Popular
                  </Badge>
                )}
                {plan.current && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Current Plan
                  </Badge>
                )}

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-white">
                    ${billingCycle === 'yearly' ? (plan.price * 12 * 0.8).toFixed(2) : plan.price}
                    <span className="text-sm text-slate-400">
                      /{billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.current
                      ? 'bg-slate-600 text-slate-300 cursor-not-allowed'
                      : plan.popular
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing Management */}
      <Tabs defaultValue="history" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="history">Billing History</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="usage">Usage & Limits</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Billing History</CardTitle>
              <Button variant="outline" className="border-slate-600 text-slate-300">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 text-slate-300 font-medium">Date</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Description</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Amount</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Status</th>
                      <th className="text-left py-3 text-slate-300 font-medium">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistory.map((item) => (
                      <tr key={item.id} className="border-b border-slate-700/50">
                        <td className="py-3 text-white">{new Date(item.date).toLocaleDateString()}</td>
                        <td className="py-3 text-white">{item.description}</td>
                        <td className="py-3 text-white">${item.amount.toFixed(2)}</td>
                        <td className="py-3">
                          <Badge className="bg-green-600">
                            {item.status}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <Button size="sm" variant="ghost" className="text-blue-400 hover:bg-slate-700">
                            <Download className="h-4 w-4 mr-1" />
                            {item.invoice}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Payment Methods</CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Add Payment Method
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-700/30 border border-slate-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-6 bg-slate-600 rounded flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-slate-300" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{method.brand} •••• {method.last4}</span>
                        {method.isDefault && (
                          <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-400">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-600 text-red-400">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Usage & Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-slate-700/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">AI Analysis Requests</span>
                    <span className="text-white font-medium">247 / Unlimited</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">This month</p>
                </div>

                <div className="p-4 rounded-lg bg-slate-700/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Active Alerts</span>
                    <span className="text-white font-medium">23 / Unlimited</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Current</p>
                </div>

                <div className="p-4 rounded-lg bg-slate-700/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">Chart Uploads</span>
                    <span className="text-white font-medium">156 / Unlimited</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">This month</p>
                </div>

                <div className="p-4 rounded-lg bg-slate-700/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">API Calls</span>
                    <span className="text-white font-medium">8,432 / 10,000</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">This month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}