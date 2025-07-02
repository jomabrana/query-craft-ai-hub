
import React from 'react';
import { BarChart3, TrendingUp, Users, Zap, DollarSign, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AnalyticsDashboard = () => {
  // Mock data for charts
  const queryData = [
    { name: 'Mon', queries: 245, cost: 12.50 },
    { name: 'Tue', queries: 312, cost: 18.75 },
    { name: 'Wed', queries: 189, cost: 9.25 },
    { name: 'Thu', queries: 456, cost: 28.90 },
    { name: 'Fri', queries: 398, cost: 24.50 },
    { name: 'Sat', queries: 167, cost: 8.75 },
    { name: 'Sun', queries: 134, cost: 7.25 }
  ];

  const providerUsage = [
    { name: 'OpenAI', value: 35, color: '#3B82F6' },
    { name: 'Claude', value: 28, color: '#8B5CF6' },
    { name: 'Gemini', value: 22, color: '#10B981' },
    { name: 'Mistral', value: 15, color: '#F59E0B' }
  ];

  const performanceData = [
    { provider: 'Claude', accuracy: 99.1, speed: 1.2, cost: 0.015 },
    { provider: 'OpenAI', accuracy: 98.5, speed: 1.8, cost: 0.030 },
    { provider: 'Gemini', accuracy: 97.8, speed: 2.1, cost: 0.005 },
    { provider: 'Mistral', accuracy: 96.9, speed: 1.5, cost: 0.010 }
  ];

  const stats = [
    {
      title: 'Total Queries',
      value: '12,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: BarChart3
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Total Cost',
      value: '$2,489.50',
      change: '+5.7%',
      changeType: 'positive',
      icon: DollarSign
    },
    {
      title: 'Avg Response Time',
      value: '1.6s',
      change: '-12.3%',
      changeType: 'positive',
      icon: Clock
    }
  ];

  const getChangeColor = (type: string) => {
    return type === 'positive' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Monitor performance, usage, and costs across all AI providers</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${getChangeColor(stat.changeType)} flex items-center mt-1`}>
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {stat.change}
                </p>
              </div>
              <div className="p-3 bg-indigo-100 rounded-lg">
                <stat.icon className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Query Volume Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Query Volume & Cost</h3>
            <Badge variant="outline">Last 7 days</Badge>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={queryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="queries" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Provider Usage Distribution */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Provider Usage</h3>
            <Badge variant="outline">This month</Badge>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={providerUsage}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {providerUsage.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {providerUsage.map((provider, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: provider.color }}
                />
                <span className="text-sm text-gray-600">{provider.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Performance Comparison Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Provider Performance Comparison</h3>
          <Badge variant="outline">Real-time data</Badge>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Provider</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Accuracy Rate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Avg Response Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Cost per Token</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((provider, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{provider.provider}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-medium">{provider.accuracy}%</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${provider.accuracy}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{provider.speed}s</td>
                  <td className="py-3 px-4 text-gray-700">${provider.cost}</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Cost Trend Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Cost Trend</h3>
          <Badge variant="outline">Last 7 days</Badge>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={queryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="cost"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
