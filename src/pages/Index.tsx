
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, BarChart3, Zap, Users, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: 'Intelligent AI Routing',
      description: 'Automatically select the best AI model for your specific query type and requirements.',
      color: 'text-indigo-600'
    },
    {
      icon: Zap,
      title: 'Multi-Agent Comparison',
      description: 'Compare responses from multiple AI providers side-by-side to get the best answer.',
      color: 'text-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Track usage, costs, and performance metrics across all your AI providers.',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Community Benchmarks',
      description: 'See real user ratings and contribute to the community-driven AI rankings.',
      color: 'text-orange-600'
    }
  ];

  const providers = [
    'OpenAI GPT-4', 'Anthropic Claude', 'Google Gemini Pro', 'Mistral Large', 
    'Perplexity AI', 'Cohere', 'HuggingFace', 'Groq'
  ];

  const stats = [
    { value: '12+', label: 'AI Providers' },
    { value: '50K+', label: 'Queries Processed' },
    { value: '99.5%', label: 'Uptime' },
    { value: '1.2s', label: 'Avg Response Time' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">AI Router</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-6">
                <Link to="/chat" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Chat
                </Link>
                <Link to="/benchmarks" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  Benchmarks
                </Link>
              </nav>
              <Button variant="outline" size="sm">
                Login
              </Button>
              <Button size="sm" asChild>
                <Link to="/chat">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                🚀 Now supporting 12+ AI providers
              </Badge>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              The Ultimate
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                AI Router
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Intelligently route your queries to the best AI models. Compare responses, 
              track performance, and get the most accurate answers every time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3" asChild>
                <Link to="/chat">
                  Start Chatting
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3" asChild>
                <Link to="/benchmarks">
                  View Benchmarks
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-100 rounded-full blur-xl opacity-70 animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-100 rounded-full blur-xl opacity-70 animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-green-100 rounded-full blur-xl opacity-70 animate-pulse delay-2000" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to harness the power of multiple AI providers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow bg-white/70 backdrop-blur-sm">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gray-100 ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Providers Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Supported AI Providers
            </h2>
            <p className="text-xl text-gray-600">
              Connect with leading AI platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {providers.map((provider, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-3">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-medium text-gray-900">{provider}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Experience Intelligent AI Routing?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust AI Router to get the best AI responses every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link to="/chat">
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-indigo-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-indigo-400" />
              <span className="text-lg font-semibold">AI Router</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/chat" className="text-gray-400 hover:text-white transition-colors">
                Chat
              </Link>
              <Link to="/benchmarks" className="text-gray-400 hover:text-white transition-colors">
                Benchmarks
              </Link>
              <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
                Admin
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Router. Built with modern web technologies.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
