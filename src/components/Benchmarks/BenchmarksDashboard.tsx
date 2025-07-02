
import React, { useState } from 'react';
import { Trophy, Star, TrendingUp, Clock, DollarSign, Brain } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BenchmarkResult {
  id: string;
  provider: string;
  model: string;
  category: string;
  score: number;
  accuracy: number;
  speed: number;
  cost: number;
  votes: number;
  lastUpdated: Date;
}

interface UserVote {
  queryId: string;
  provider: string;
  rating: number;
  feedback: string;
  timestamp: Date;
}

const BenchmarksDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('score');

  const benchmarkResults: BenchmarkResult[] = [
    {
      id: '1',
      provider: 'Anthropic Claude',
      model: 'claude-3-sonnet',
      category: 'reasoning',
      score: 94.2,
      accuracy: 99.1,
      speed: 1.2,
      cost: 0.015,
      votes: 1247,
      lastUpdated: new Date()
    },
    {
      id: '2',
      provider: 'OpenAI',
      model: 'gpt-4',
      category: 'coding',
      score: 92.8,
      accuracy: 98.5,
      speed: 1.8,
      cost: 0.030,
      votes: 1583,
      lastUpdated: new Date()
    },
    {
      id: '3',
      provider: 'Google Gemini Pro',
      model: 'gemini-pro',
      category: 'multimodal',
      score: 91.5,
      accuracy: 97.8,
      speed: 2.1,
      cost: 0.005,
      votes: 892,
      lastUpdated: new Date()
    },
    {
      id: '4',
      provider: 'Mistral',
      model: 'mistral-large',
      category: 'writing',
      score: 89.7,
      accuracy: 96.9,
      speed: 1.5,
      cost: 0.010,
      votes: 634,
      lastUpdated: new Date()
    }
  ];

  const userVotes: UserVote[] = [
    {
      queryId: '1',
      provider: 'Claude',
      rating: 5,
      feedback: 'Excellent reasoning capabilities, very thorough response',
      timestamp: new Date()
    },
    {
      queryId: '2',
      provider: 'OpenAI',
      rating: 4,
      feedback: 'Good code generation but could be more optimized',
      timestamp: new Date()
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'reasoning', label: 'Reasoning' },
    { value: 'coding', label: 'Coding' },
    { value: 'writing', label: 'Writing' },
    { value: 'multimodal', label: 'Multimodal' },
    { value: 'analysis', label: 'Analysis' }
  ];

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (index === 1) return <Trophy className="h-5 w-5 text-gray-400" />;
    if (index === 2) return <Trophy className="h-5 w-5 text-amber-600" />;
    return <span className="text-lg font-bold text-gray-500">#{index + 1}</span>;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const filteredResults = benchmarkResults
    .filter(result => selectedCategory === 'all' || result.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'accuracy': return b.accuracy - a.accuracy;
        case 'speed': return a.speed - b.speed;
        case 'cost': return a.cost - b.cost;
        case 'votes': return b.votes - a.votes;
        default: return b.score - a.score;
      }
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Benchmarks & Community Polls</h1>
        <p className="text-gray-600">Compare AI provider performance and see community ratings</p>
      </div>

      <Tabs defaultValue="leaderboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="community">Community Votes</TabsTrigger>
          <TabsTrigger value="analysis">Performance Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Category:</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Overall Score</SelectItem>
                  <SelectItem value="accuracy">Accuracy</SelectItem>
                  <SelectItem value="speed">Speed</SelectItem>
                  <SelectItem value="cost">Cost Efficiency</SelectItem>
                  <SelectItem value="votes">Community Votes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="space-y-4">
            {filteredResults.map((result, index) => (
              <Card key={result.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100">
                      {getRankIcon(index)}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{result.provider}</h3>
                      <p className="text-sm text-gray-600">{result.model}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {result.category}
                        </Badge>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Star className="h-3 w-3" />
                          <span>{result.votes} votes</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                        {result.score}
                      </div>
                      <div className="text-xs text-gray-500">Overall Score</div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{result.accuracy}%</div>
                        <div className="text-xs text-gray-500">Accuracy</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{result.speed}s</div>
                        <div className="text-xs text-gray-500">Speed</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">${result.cost}</div>
                        <div className="text-xs text-gray-500">Cost/1K tokens</div>
                      </div>
                    </div>

                    <Badge className={getScoreBadgeColor(result.score)}>
                      Rank #{index + 1}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Polls */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Community Polls</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Best for Code Generation</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">OpenAI GPT-4</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }} />
                        </div>
                        <span className="text-sm text-gray-600">65%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Claude Sonnet</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '35%' }} />
                        </div>
                        <span className="text-sm text-gray-600">35%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Most Cost-Effective</span>
                    <Badge variant="outline">24h left</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Gemini Pro</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }} />
                        </div>
                        <span className="text-sm text-gray-600">78%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Mistral Large</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-600 h-2 rounded-full" style={{ width: '22%' }} />
                        </div>
                        <span className="text-sm text-gray-600">22%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* User Feedback */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent User Feedback</h3>
              <div className="space-y-4">
                {userVotes.map((vote, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{vote.provider}</span>
                        <div className="flex items-center">
                          {Array.from({ length: vote.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {vote.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{vote.feedback}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="h-8 w-8 text-indigo-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Accuracy Leader</h3>
                  <p className="text-sm text-gray-600">Highest accuracy rate</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-indigo-600">Claude Sonnet</div>
              <div className="text-sm text-gray-600">99.1% accuracy</div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Speed Champion</h3>
                  <p className="text-sm text-gray-600">Fastest response time</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600">Claude Sonnet</div>
              <div className="text-sm text-gray-600">1.2s average</div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <DollarSign className="h-8 w-8 text-orange-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Cost Efficient</h3>
                  <p className="text-sm text-gray-600">Best value for money</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-orange-600">Gemini Pro</div>
              <div className="text-sm text-gray-600">$0.005/1K tokens</div>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Analysis</h3>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Based on extensive benchmarking across multiple categories and community feedback, 
                here are the key insights from our AI provider analysis:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Claude Sonnet</strong> consistently ranks highest in accuracy and reasoning tasks, 
                  with exceptional performance in complex analysis and ethical considerations.
                </li>
                <li>
                  <strong>OpenAI GPT-4</strong> excels in creative writing and code generation, 
                  with strong community preference for programming tasks.
                </li>
                <li>
                  <strong>Gemini Pro</strong> offers the best cost-effectiveness while maintaining 
                  competitive performance across most categories.
                </li>
                <li>
                  <strong>Mistral Large</strong> provides a balanced approach with good performance 
                  in European languages and technical documentation.
                </li>
              </ul>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BenchmarksDashboard;
