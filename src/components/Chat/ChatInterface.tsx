
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ThumbsUp, ThumbsDown, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  agent?: string;
  cost?: number;
  tokens?: number;
  rating?: 'up' | 'down';
}

interface AIProvider {
  id: string;
  name: string;
  model: string;
  cost_per_token: number;
  available_tokens: number;
  status: 'active' | 'inactive';
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('auto');
  const [multiAgentMode, setMultiAgentMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock AI providers data
  const aiProviders: AIProvider[] = [
    { id: 'openai', name: 'OpenAI GPT-4', model: 'gpt-4', cost_per_token: 0.00003, available_tokens: 50000, status: 'active' },
    { id: 'claude', name: 'Anthropic Claude', model: 'claude-3-sonnet', cost_per_token: 0.000015, available_tokens: 75000, status: 'active' },
    { id: 'gemini', name: 'Google Gemini Pro', model: 'gemini-pro', cost_per_token: 0.000005, available_tokens: 100000, status: 'active' },
    { id: 'mistral', name: 'Mistral Large', model: 'mistral-large', cost_per_token: 0.00001, available_tokens: 60000, status: 'active' },
    { id: 'perplexity', name: 'Perplexity AI', model: 'llama-3.1-sonar-large-128k-online', cost_per_token: 0.000008, available_tokens: 80000, status: 'active' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      if (multiAgentMode) {
        // Simulate multiple agent responses
        const responses = aiProviders.slice(0, 3).map((provider, index) => ({
          id: (Date.now() + index).toString(),
          content: `This is a response from ${provider.name}. I've analyzed your query and here's my perspective on the topic. The approach I'm taking considers the specific strengths of my model architecture.`,
          sender: 'assistant' as const,
          timestamp: new Date(),
          agent: provider.name,
          cost: Math.random() * 0.01,
          tokens: Math.floor(Math.random() * 1000) + 500
        }));
        setMessages(prev => [...prev, ...responses]);
      } else {
        const selectedProvider = selectedAgent === 'auto' 
          ? aiProviders[Math.floor(Math.random() * aiProviders.length)]
          : aiProviders.find(p => p.id === selectedAgent) || aiProviders[0];

        const assistantMessage: Message = {
          id: Date.now().toString(),
          content: `Hello! I'm ${selectedProvider.name}. I've processed your query and here's my comprehensive response. This answer takes into account the latest information and best practices in the field.`,
          sender: 'assistant',
          timestamp: new Date(),
          agent: selectedProvider.name,
          cost: Math.random() * 0.01,
          tokens: Math.floor(Math.random() * 1000) + 500
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
      setIsLoading(false);
    }, 2000);
  };

  const handleRating = (messageId: string, rating: 'up' | 'down') => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, rating } : msg
      )
    );
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Agent Selection Controls */}
      <div className="bg-white border-b p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">AI Agent:</label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">🤖 Auto-Select</SelectItem>
                {aiProviders.map(provider => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="multiAgent"
              checked={multiAgentMode}
              onChange={(e) => setMultiAgentMode(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="multiAgent" className="text-sm font-medium text-gray-700">
              Multi-Agent Comparison
            </label>
          </div>
        </div>

        {/* Token Usage Display */}
        <div className="flex flex-wrap gap-2">
          {aiProviders.slice(0, 4).map(provider => (
            <Badge key={provider.id} variant="outline" className="text-xs">
              {provider.name}: {provider.available_tokens.toLocaleString()} tokens
            </Badge>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to AI Router</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Start a conversation with our intelligent AI agents. Choose a specific agent or let our system automatically select the best one for your query.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <Card className={`max-w-3xl p-4 ${message.sender === 'user' ? 'bg-indigo-50 border-indigo-200' : 'bg-white'}`}>
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' ? 'bg-indigo-600' : 'bg-gray-600'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {message.sender === 'user' ? 'You' : message.agent || 'AI Assistant'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    
                    {message.sender === 'assistant' && (
                      <div className="flex items-center space-x-2">
                        {message.cost && (
                          <Badge variant="outline" className="text-xs">
                            ${message.cost.toFixed(4)}
                          </Badge>
                        )}
                        {message.tokens && (
                          <Badge variant="outline" className="text-xs">
                            {message.tokens} tokens
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-gray-800 whitespace-pre-wrap">{message.content}</div>
                  
                  {message.sender === 'assistant' && (
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRating(message.id, 'up')}
                          className={message.rating === 'up' ? 'text-green-600' : ''}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRating(message.id, 'down')}
                          className={message.rating === 'down' ? 'text-red-600' : ''}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(message.content)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <Card className="max-w-3xl p-4 bg-white">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <RefreshCw className="h-4 w-4 text-white animate-spin" />
                </div>
                <div className="text-gray-600">AI is thinking...</div>
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-white p-4">
        <div className="flex space-x-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="px-6"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
