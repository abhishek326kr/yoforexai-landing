'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  HelpCircle, 
  Upload, 
  Clock, 
  ChevronRight, 
  Mail, 
  MessageCircle, 
  Video,
  ThumbsUp,
  ArrowUp,
  Star,
  CheckCircle,
  AlertCircle,
  Eye
} from 'lucide-react';

const supportInfo = [
  {
    title: 'Response Time',
    description: 'We typically respond within 24 hours on business days. Premium subscribers receive priority support.',
    icon: Clock,
  },
];

const faqs = [
  { question: 'How do I connect my broker?', icon: ChevronRight },
  { question: 'What timeframes does the AI support?', icon: ChevronRight },
  { question: 'How do I cancel my subscription?', icon: ChevronRight },
  { question: 'View all FAQs', icon: ChevronRight },
];

const contactMethods = [
  { method: 'support@yoforexai.com', icon: Mail, color: 'purple' },
  { method: 'Join our Discord community', icon: MessageCircle, color: 'blue' },
  { method: 'Schedule a video call (Premium)', icon: Video, color: 'pink' },
];

const featureIdeas = [
  {
    title: 'Multi-currency correlation analysis',
    description: 'Add the ability to analyze how different currency pairs correlate in real-time.',
    author: 'Sarah K.',
    status: 'In Progress',
    votes: 253,
    tag: 'Top Voted',
    color: 'blue'
  },
  {
    title: 'Custom alert notifications',
    description: 'Allow users to customize sound and notification style for different alert types.',
    author: 'Michael R.',
    status: 'Under Review',
    votes: 187,
    tag: 'Popular',
    color: 'purple'
  },
  {
    title: 'Mobile app with push notifications',
    description: 'Create a native mobile app to receive trade alerts and monitor positions on the go.',
    author: 'David W.',
    status: 'Planned',
    votes: 64,
    tag: 'New',
    color: 'green'
  },
];

const recentRequests = [
  {
    id: '#8294',
    subject: 'AI Analysis not loading charts',
    date: 'Jun 10, 2023',
    status: 'Resolved',
    action: 'View'
  },
  {
    id: '#7865',
    subject: 'Feature request: Risk calculator',
    date: 'May 28, 2023',
    status: 'In Progress',
    action: 'View'
  },
  {
    id: '#7612',
    subject: 'Billing cycle question',
    date: 'May 15, 2023',
    status: 'Resolved',
    action: 'View'
  },
];

export default function Support() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Support & Feedback</h1>
        <p className="text-slate-400">Get help or share your thoughts to help us improve</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submit Request Form */}
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Submit a Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-slate-300">Reason for contact</Label>
              <Select>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="technical">Technical Issue</SelectItem>
                  <SelectItem value="billing">Billing Question</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="feedback">General Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-slate-300">Subject</Label>
              <Input 
                placeholder="Briefly describe your issue"
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              />
            </div>

            <div>
              <Label className="text-slate-300">Description</Label>
              <Textarea 
                placeholder="Please provide as much detail as possible..."
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 min-h-[120px]"
              />
            </div>

            <div>
              <Label className="text-slate-300">Email for responses</Label>
              <Input 
                defaultValue="alex.chen@example.com"
                className="bg-slate-700 border-slate-600 text-white"
              />
              <p className="text-xs text-slate-400 mt-1">We'll use this email to follow up on your request</p>
            </div>

            <div>
              <Label className="text-slate-300">Attachments (optional)</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mt-2 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-600 hover:border-slate-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-400 text-sm mb-2">Drag and drop files here, or click to browse</p>
                <p className="text-xs text-slate-500">Maximum 5 files, 10MB each (.jpg, .png, .pdf)</p>
                <Button variant="outline" size="sm" className="mt-3 border-slate-600 text-slate-300">
                  Browse Files
                </Button>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Submit Request
            </Button>
          </CardContent>
        </Card>

        {/* Support Information */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Support Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Response Time */}
            <div className="p-3 rounded-lg bg-blue-900/30 border border-blue-800">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="font-medium text-white">Response Time</span>
              </div>
              <p className="text-sm text-slate-300">
                We typically respond within 24 hours on business days. Premium subscribers receive priority support.
              </p>
            </div>

            {/* Frequently Asked Questions */}
            <div>
              <h3 className="font-medium text-white mb-3">Frequently Asked Questions</h3>
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-between text-slate-300 hover:bg-slate-700 h-auto p-3"
                  >
                    <span className="text-sm">{faq.question}</span>
                    <faq.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Alternative Contact Methods */}
            <div>
              <h3 className="font-medium text-white mb-3">Alternative Contact Methods</h3>
              <div className="space-y-2">
                {contactMethods.map((contact, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-slate-300 hover:bg-slate-700 h-auto p-3"
                  >
                    <div className={`p-1.5 rounded mr-3 ${
                      contact.color === 'purple' ? 'bg-purple-600/20' :
                      contact.color === 'blue' ? 'bg-blue-600/20' : 'bg-pink-600/20'
                    }`}>
                      <contact.icon className={`h-4 w-4 ${
                        contact.color === 'purple' ? 'text-purple-400' :
                        contact.color === 'blue' ? 'text-blue-400' : 'text-pink-400'
                      }`} />
                    </div>
                    <span className="text-sm">{contact.method}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Feedback */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">Community Feedback</CardTitle>
            <p className="text-slate-400 text-sm">Help shape the future of YoForex AI with your ideas</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Submit Feature Idea
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featureIdeas.map((idea, index) => (
              <div key={index} className="p-4 rounded-lg bg-slate-700/30 border border-slate-600">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={`${
                    idea.color === 'blue' ? 'bg-blue-600' :
                    idea.color === 'purple' ? 'bg-purple-600' : 'bg-green-600'
                  }`}>
                    {idea.tag}
                  </Badge>
                  <div className="flex items-center space-x-1 text-slate-400">
                    <ArrowUp className="h-4 w-4" />
                    <span className="text-sm font-medium">{idea.votes}</span>
                  </div>
                </div>
                
                <h3 className="font-medium text-white mb-2">{idea.title}</h3>
                <p className="text-sm text-slate-300 mb-3">{idea.description}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Submitted by {idea.author}</span>
                  <Badge variant="outline" className={`border-slate-600 text-slate-300 ${
                    idea.status === 'In Progress' ? 'border-yellow-600 text-yellow-400' :
                    idea.status === 'Under Review' ? 'border-blue-600 text-blue-400' : 'border-green-600 text-green-400'
                  }`}>
                    {idea.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Your Recent Requests */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Your Recent Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 text-slate-300 font-medium">ID</th>
                  <th className="text-left py-2 text-slate-300 font-medium">Subject</th>
                  <th className="text-left py-2 text-slate-300 font-medium">Date</th>
                  <th className="text-left py-2 text-slate-300 font-medium">Status</th>
                  <th className="text-left py-2 text-slate-300 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((request, index) => (
                  <tr key={index} className="border-b border-slate-700/50">
                    <td className="py-3 text-slate-300">{request.id}</td>
                    <td className="py-3 text-white">{request.subject}</td>
                    <td className="py-3 text-slate-400">{request.date}</td>
                    <td className="py-3">
                      <Badge className={
                        request.status === 'Resolved' ? 'bg-green-600' : 'bg-yellow-600'
                      }>
                        {request.status}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Button size="sm" variant="outline" className="border-slate-600 text-blue-400">
                        {request.action}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}