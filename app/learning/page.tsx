'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  BookOpen, 
  Video, 
  FileText, 
  Award, 
  Clock,
  Star,
  Play,
  Lock,
  CheckCircle,
  Search,
  Filter,
  TrendingUp
} from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Forex Trading Fundamentals',
    description: 'Master the basics of forex trading, market analysis, and risk management',
    level: 'Beginner',
    duration: '4 hours',
    lessons: 12,
    progress: 75,
    rating: 4.8,
    students: 2847,
    price: 'Free',
    instructor: 'Sarah Johnson',
    thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    isPremium: false,
    completed: false
  },
  {
    id: 2,
    title: 'Advanced Technical Analysis',
    description: 'Deep dive into advanced chart patterns, indicators, and trading strategies',
    level: 'Advanced',
    duration: '8 hours',
    lessons: 24,
    progress: 30,
    rating: 4.9,
    students: 1523,
    price: '$49.99',
    instructor: 'Michael Chen',
    thumbnail: 'https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    isPremium: true,
    completed: false
  },
  {
    id: 3,
    title: 'Risk Management Mastery',
    description: 'Learn professional risk management techniques used by institutional traders',
    level: 'Intermediate',
    duration: '6 hours',
    lessons: 18,
    progress: 100,
    rating: 4.7,
    students: 3241,
    price: '$29.99',
    instructor: 'David Rodriguez',
    thumbnail: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    isPremium: true,
    completed: true
  },
  {
    id: 4,
    title: 'Psychology of Trading',
    description: 'Understand the mental aspects of trading and develop a winning mindset',
    level: 'Intermediate',
    duration: '5 hours',
    lessons: 15,
    progress: 0,
    rating: 4.6,
    students: 1876,
    price: 'Free',
    instructor: 'Emma Wilson',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    isPremium: false,
    completed: false
  },
];

const articles = [
  {
    id: 1,
    title: 'Understanding Market Structure in Forex',
    excerpt: 'Learn how to identify key support and resistance levels that drive market movements',
    readTime: '8 min read',
    category: 'Technical Analysis',
    author: 'Trading Expert',
    publishDate: '2023-06-14',
    isPremium: false
  },
  {
    id: 2,
    title: 'The Complete Guide to Fibonacci Retracements',
    excerpt: 'Master one of the most powerful tools in technical analysis for finding entry and exit points',
    readTime: '12 min read',
    category: 'Technical Analysis',
    author: 'Market Analyst',
    publishDate: '2023-06-13',
    isPremium: true
  },
  {
    id: 3,
    title: 'Building a Profitable Trading Plan',
    excerpt: 'Step-by-step guide to creating a comprehensive trading plan that works',
    readTime: '15 min read',
    category: 'Strategy',
    author: 'Professional Trader',
    publishDate: '2023-06-12',
    isPremium: false
  },
];

const webinars = [
  {
    id: 1,
    title: 'Live Market Analysis Session',
    description: 'Join our expert analysts for real-time market analysis and trade setups',
    date: '2023-06-16',
    time: '15:00 UTC',
    duration: '1 hour',
    host: 'Trading Team',
    isLive: false,
    isUpcoming: true,
    attendees: 245
  },
  {
    id: 2,
    title: 'Advanced Scalping Strategies',
    description: 'Learn professional scalping techniques from a former institutional trader',
    date: '2023-06-18',
    time: '18:00 UTC',
    duration: '90 minutes',
    host: 'Alex Thompson',
    isLive: false,
    isUpcoming: true,
    attendees: 189
  },
];

export default function LearningCenter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Learning Center</h1>
          <p className="text-slate-400">Enhance your trading skills with our comprehensive educational resources</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Award className="h-4 w-4 mr-2" />
            My Certificates
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <GraduationCap className="h-4 w-4 mr-2" />
            Upgrade to Premium
          </Button>
        </div>
      </div>

      {/* Learning Progress */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Your Learning Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">3</div>
              <div className="text-slate-400 text-sm">Courses Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">1</div>
              <div className="text-slate-400 text-sm">Courses Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">24</div>
              <div className="text-slate-400 text-sm">Hours Learned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">2</div>
              <div className="text-slate-400 text-sm">Certificates Earned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-2 rounded-md bg-slate-700 border border-slate-600 text-white"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 rounded-md bg-slate-700 border border-slate-600 text-white"
              >
                <option value="all">All Categories</option>
                <option value="fundamentals">Fundamentals</option>
                <option value="technical">Technical Analysis</option>
                <option value="strategy">Strategy</option>
                <option value="psychology">Psychology</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Content Tabs */}
      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
          <TabsTrigger value="tools">Trading Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {course.isPremium && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-blue-600">
                      Premium
                    </Badge>
                  )}
                  {course.completed && (
                    <div className="absolute top-2 left-2 bg-green-600 rounded-full p-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-slate-600 text-slate-400">
                      {course.level}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-slate-400 text-sm">{course.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-white mb-2">{course.title}</h3>
                  <p className="text-slate-400 text-sm mb-3">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>

                  {course.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-white">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">{course.price}</div>
                      <div className="text-xs text-slate-400">{course.students} students</div>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      {course.progress > 0 ? 'Continue' : 'Start Course'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles">
          <div className="space-y-4">
            {articles.map((article) => (
              <Card key={article.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="border-slate-600 text-slate-400">
                          {article.category}
                        </Badge>
                        {article.isPremium && (
                          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{article.title}</h3>
                      <p className="text-slate-400 mb-3">{article.excerpt}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <span>{article.author}</span>
                        <span>{article.readTime}</span>
                        <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="border-slate-600 text-slate-300 ml-4">
                      <FileText className="h-4 w-4 mr-2" />
                      Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="webinars">
          <div className="space-y-4">
            {webinars.map((webinar) => (
              <Card key={webinar.id} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {webinar.isUpcoming && (
                          <Badge className="bg-blue-600">Upcoming</Badge>
                        )}
                        <div className="flex items-center space-x-1 text-slate-400 text-sm">
                          <Clock className="h-4 w-4" />
                          <span>{webinar.duration}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{webinar.title}</h3>
                      <p className="text-slate-400 mb-3">{webinar.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <span>Host: {webinar.host}</span>
                        <span>{new Date(webinar.date).toLocaleDateString()} at {webinar.time}</span>
                        <span>{webinar.attendees} registered</span>
                      </div>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700 ml-4">
                      <Video className="h-4 w-4 mr-2" />
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Economic Calendar</h3>
                <p className="text-slate-400 text-sm mb-4">Stay updated with important economic events and their market impact</p>
                <Button variant="outline" className="border-slate-600 text-slate-300">
                  Open Tool
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Trading Glossary</h3>
                <p className="text-slate-400 text-sm mb-4">Comprehensive dictionary of trading terms and concepts</p>
                <Button variant="outline" className="border-slate-600 text-slate-300">
                  Browse Terms
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Trading Simulator</h3>
                <p className="text-slate-400 text-sm mb-4">Practice trading with virtual money in real market conditions</p>
                <Button variant="outline" className="border-slate-600 text-slate-300">
                  Start Trading
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}