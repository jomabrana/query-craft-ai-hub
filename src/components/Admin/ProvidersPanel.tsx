
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Key, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface AIProvider {
  id: string;
  name: string;
  model: string;
  api_endpoint: string;
  api_key: string;
  cost_per_token: number;
  available_tokens: number;
  max_tokens: number;
  status: 'active' | 'inactive';
  capabilities: string[];
  description: string;
  last_used: Date;
  total_queries: number;
  success_rate: number;
}

const ProvidersPanel = () => {
  const [providers, setProviders] = useState<AIProvider[]>([
    {
      id: 'openai',
      name: 'OpenAI',
      model: 'gpt-4',
      api_endpoint: 'https://api.openai.com/v1/chat/completions',
      api_key: 'sk-*********************',
      cost_per_token: 0.00003,
      available_tokens: 50000,
      max_tokens: 100000,
      status: 'active',
      capabilities: ['text-generation', 'code', 'analysis'],
      description: 'Advanced language model for general-purpose tasks',
      last_used: new Date(),
      total_queries: 1247,
      success_rate: 98.5
    },
    {
      id: 'claude',
      name: 'Anthropic Claude',
      model: 'claude-3-sonnet-20240229',
      api_endpoint: 'https://api.anthropic.com/v1/messages',
      api_key: 'sk-ant-*********************',
      cost_per_token: 0.000015,
      available_tokens: 75000,
      max_tokens: 150000,
      status: 'active',
      capabilities: ['text-generation', 'analysis', 'reasoning'],
      description: 'Constitutional AI focused on helpful, harmless, and honest responses',
      last_used: new Date(),
      total_queries: 892,
      success_rate: 99.1
    },
    {
      id: 'gemini',
      name: 'Google Gemini Pro',
      model: 'gemini-pro',
      api_endpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
      api_key: 'AIza*********************',
      cost_per_token: 0.000005,
      available_tokens: 100000,
      max_tokens: 200000,
      status: 'active',
      capabilities: ['text-generation', 'multimodal', 'search'],
      description: 'Multimodal AI model with strong reasoning capabilities',
      last_used: new Date(),
      total_queries: 634,
      success_rate: 97.8
    }
  ]);

  const [selectedProvider, setSelectedProvider] = useState<AIProvider | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});

  const toggleApiKeyVisibility = (providerId: string) => {
    setShowApiKey(prev => ({
      ...prev,
      [providerId]: !prev[providerId]
    }));
  };

  const handleAddProvider = () => {
    setSelectedProvider({
      id: '',
      name: '',
      model: '',
      api_endpoint: '',
      api_key: '',
      cost_per_token: 0,
      available_tokens: 0,
      max_tokens: 0,
      status: 'inactive',
      capabilities: [],
      description: '',
      last_used: new Date(),
      total_queries: 0,
      success_rate: 0
    });
    setIsEditing(true);
  };

  const handleEditProvider = (provider: AIProvider) => {
    setSelectedProvider(provider);
    setIsEditing(true);
  };

  const handleDeleteProvider = (providerId: string) => {
    setProviders(prev => prev.filter(p => p.id !== providerId));
  };

  const toggleProviderStatus = (providerId: string) => {
    setProviders(prev =>
      prev.map(p =>
        p.id === providerId
          ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
          : p
      )
    );
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 98) return 'text-green-600';
    if (rate >= 95) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Providers</h1>
          <p className="text-gray-600">Manage your AI service providers and API configurations</p>
        </div>
        <Button onClick={handleAddProvider}>
          <Plus className="h-4 w-4 mr-2" />
          Add Provider
        </Button>
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <Card key={provider.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                  <p className="text-sm text-gray-600">{provider.model}</p>
                </div>
              </div>
              <Badge className={getStatusColor(provider.status)}>
                {provider.status}
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Available Tokens:</span>
                <span className="font-medium">{provider.available_tokens.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Cost per Token:</span>
                <span className="font-medium">${provider.cost_per_token.toFixed(6)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Success Rate:</span>
                <span className={`font-medium ${getSuccessRateColor(provider.success_rate)}`}>
                  {provider.success_rate}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Queries:</span>
                <span className="font-medium">{provider.total_queries.toLocaleString()}</span>
              </div>
            </div>

            {/* API Key Display */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Key:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleApiKeyVisibility(provider.id)}
                >
                  {showApiKey[provider.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <div className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">
                {showApiKey[provider.id] ? provider.api_key : '••••••••••••••••••••'}
              </div>
            </div>

            {/* Capabilities */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {provider.capabilities.map((capability) => (
                  <Badge key={capability} variant="outline" className="text-xs">
                    {capability}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={provider.status === 'active'}
                  onCheckedChange={() => toggleProviderStatus(provider.id)}
                />
                <span className="text-sm text-gray-600">Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditProvider(provider)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteProvider(provider.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Provider Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProvider?.id ? 'Edit Provider' : 'Add New Provider'}
            </DialogTitle>
          </DialogHeader>
          
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Provider Name</Label>
                <Input
                  id="name"
                  value={selectedProvider?.name || ''}
                  placeholder="e.g., OpenAI"
                />
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={selectedProvider?.model || ''}
                  placeholder="e.g., gpt-4"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="endpoint">API Endpoint</Label>
              <Input
                id="endpoint"
                value={selectedProvider?.api_endpoint || ''}
                placeholder="https://api.example.com/v1/completions"
              />
            </div>

            <div>
              <Label htmlFor="apikey">API Key</Label>
              <div className="flex space-x-2">
                <Input
                  id="apikey"
                  type="password"
                  value={selectedProvider?.api_key || ''}
                  placeholder="Enter your API key"
                  className="flex-1"
                />
                <Button type="button" variant="outline">
                  <Key className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cost">Cost per Token</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.000001"
                  value={selectedProvider?.cost_per_token || ''}
                  placeholder="0.00003"
                />
              </div>
              <div>
                <Label htmlFor="tokens">Max Tokens</Label>
                <Input
                  id="tokens"
                  type="number"
                  value={selectedProvider?.max_tokens || ''}
                  placeholder="100000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={selectedProvider?.description || ''}
                placeholder="Brief description of the AI provider..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedProvider?.id ? 'Update Provider' : 'Add Provider'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProvidersPanel;
