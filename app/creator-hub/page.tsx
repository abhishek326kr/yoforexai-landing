'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Plus, 
  TrendingUp, 
  Eye,
  ThumbsUp,
  MoreHorizontal,
  Camera,
  Video,
  FileText,
  Award,
  Star
} from 'lucide-react';

const communityPosts = [
  {
    id: 1,
    author: {
      name: 'Michael Rodriguez',
      username: '@mrodriguez',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      verified: true,
      level: 'Pro Trader'
    },
    content: 'Just closed a fantastic EUR/USD swing trade with +2.3% profit! The key was waiting for the perfect confluence of support level and RSI divergence. Patience really pays off in swing trading. 📈',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&dpr=2',
    timestamp: '2 hours ago',
    likes: 47,
    comments: 12,
    shares: 8,
    tags: ['EUR/USD', 'SwingTrading', 'TechnicalAnalysis']
  },
  {
    id: 2,
    author: {
      name: 'Sarah Kim',
      username: '@sarahk',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      verified: false,
      level: 'Advanced'
    },
    content: 'New video tutorial is live! "Mastering Fibonacci Retracements for Better Entry Points" - This technique has improved my win rate by 15% over the past 3 months. Link in bio! 🎯',
    timestamp: '5 hours ago',
    likes: 89,
    comments: 23,
    shares: 15,
    tags: ['Tutorial', 'Fibonacci', 'Education']
  },
  {
    id: 3,
    author: {
      name: 'David Chen',
      username: '@dchen',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
      verified: true,
      level: 'Expert'
    },
    content: 'Market analysis for the week: USD strength continues, but watch for potential reversal signals around key resistance levels. GBP/USD looking particularly interesting for swing setups.',
    timestamp: '1 day ago',
    likes: 156,
    comments: 34,
    shares: 28,
    tags: ['MarketAnalysis', 'USD', 'GBP/USD']
  },
];

const topCreators = [
  {
    id: 1,
    name: 'Alex Thompson',
    username: '@alexthompson',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    followers: 12500,
    posts: 234,
    winRate: 78.5,
    specialty: 'Scalping Expert',
    verified: true
  },
  {
    id: 2,
    name: 'Emma Wilson',
    username: '@emmaw',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    followers: 8900,
    posts: 189,
    winRate: 82.1,
    specialty: 'Risk Management',
    verified: true
  },
  {
    id: 3,
    name: 'James Park',
    username: '@jamespark',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2',
    followers: 6750,
    posts: 156,
    winRate: 75.3,
    specialty: 'Technical Analysis',
    verified: false
  },
];

const trendingTopics = [
  { tag: '#EUR/USD', posts: 1247 },
  { tag: '#SwingTrading', posts: 892 },
  { tag: '#TechnicalAnalysis', posts: 756 },
  { tag: '#RiskManagement', posts: 634 },
  { tag: '#MarketAnalysis', posts: 523 },
];

export default function CreatorHub() {
  const [newPost, setNewPost] = useState('');
  const [selectedTab, setSelectedTab] = useState('feed');

  const handleCreatePost = () => {
    if (newPost.trim()) {
      // Handle post creation
      setNewPost('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Creator Hub</h1>
          <p className="text-slate-400">Connect with the trading community and share your insights</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Award className="h-4 w-4 mr-2" />
            Creator Program
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Content
          </Button>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Members</p>
                <p className="text-2xl font-bold text-white">24,567</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Posts Today</p>
                <p className="text-2xl font-bold text-white">1,234</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Your Followers</p>
                <p className="text-2xl font-bold text-white">2,847</p>
              </div>
              <Heart className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Engagement Rate</p>
                <p className="text-2xl font-bold text-white">8.4%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Create Post */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share your trading insights, analysis, or ask questions..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 resize-none"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:bg-slate-700">
                        <Camera className="h-4 w-4 mr-1" />
                        Photo
                      </Button>
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:bg-slate-700">
                        <Video className="h-4 w-4 mr-1" />
                        Video
                      </Button>
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:bg-slate-700">
                        <FileText className="h-4 w-4 mr-1" />
                        Article
                      </Button>
                    </div>
                    <Button 
                      onClick={handleCreatePost}
                      disabled={!newPost.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Feed */}
          <div className="space-y-4">
            {communityPosts.map((post) => (
              <Card key={post.id} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">{post.author.name}</span>
                          {post.author.verified && (
                            <Badge className="bg-blue-600 text-xs">Verified</Badge>
                          )}
                          <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                            {post.author.level}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-400">
                          <span>{post.author.username}</span>
                          <span>•</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="text-slate-400">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-white mb-3">{post.content}</p>
                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post content"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    )}
                  </div>

                  {/* Post Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-slate-600 text-blue-400 text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                    <div className="flex space-x-6">
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-blue-400">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {post.comments}
                      </Button>
                      <Button size="sm" variant="ghost" className="text-slate-400 hover:text-green-400">
                        <Share2 className="h-4 w-4 mr-1" />
                        {post.shares}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Creators */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Top Creators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topCreators.map((creator) => (
                <div key={creator.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={creator.avatar} />
                      <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-white text-sm">{creator.name}</span>
                        {creator.verified && (
                          <Badge className="bg-blue-600 text-xs">✓</Badge>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">{creator.specialty}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 text-xs">
                    Follow
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Trending Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-blue-400 font-medium">{topic.tag}</span>
                  <span className="text-slate-400 text-sm">{topic.posts} posts</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Creator Program */}
          <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-800">
            <CardContent className="p-4">
              <div className="text-center">
                <Award className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <h3 className="font-medium text-white mb-2">Join Creator Program</h3>
                <p className="text-sm text-slate-300 mb-3">
                  Monetize your trading expertise and build your following
                </p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}