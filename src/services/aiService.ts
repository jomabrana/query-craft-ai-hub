
export interface AIProvider {
  id: string;
  name: string;
  model: string;
  apiEndpoint: string;
  apiKey: string;
  costPerToken: number;
  availableTokens: number;
  maxTokens: number;
  status: 'active' | 'inactive';
  capabilities: string[];
}

export interface QueryRequest {
  message: string;
  provider?: string;
  multiAgent?: boolean;
  maxTokens?: number;
  temperature?: number;
}

export interface QueryResponse {
  id: string;
  content: string;
  provider: string;
  model: string;
  tokensUsed: number;
  cost: number;
  responseTime: number;
  timestamp: Date;
}

export class AIService {
  private providers: AIProvider[] = [];

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    // Initialize with mock providers - in real app, this would come from database
    this.providers = [
      {
        id: 'openai',
        name: 'OpenAI',
        model: 'gpt-4',
        apiEndpoint: 'https://api.openai.com/v1/chat/completions',
        apiKey: process.env.VITE_OPENAI_API_KEY || '',
        costPerToken: 0.00003,
        availableTokens: 50000,
        maxTokens: 100000,
        status: 'active',
        capabilities: ['text-generation', 'code', 'analysis']
      },
      {
        id: 'claude',
        name: 'Anthropic Claude',
        model: 'claude-3-sonnet-20240229',
        apiEndpoint: 'https://api.anthropic.com/v1/messages',
        apiKey: process.env.VITE_CLAUDE_API_KEY || '',
        costPerToken: 0.000015,
        availableTokens: 75000,
        maxTokens: 150000,
        status: 'active',
        capabilities: ['text-generation', 'analysis', 'reasoning']
      },
      {
        id: 'gemini',
        name: 'Google Gemini Pro',
        model: 'gemini-pro',
        apiEndpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
        apiKey: process.env.VITE_GEMINI_API_KEY || '',
        costPerToken: 0.000005,
        availableTokens: 100000,
        maxTokens: 200000,
        status: 'active',
        capabilities: ['text-generation', 'multimodal', 'search']
      }
    ];
  }

  async detectQueryIntent(message: string): Promise<string> {
    // Simple intent detection - in real app, this would use ML model
    const codeKeywords = ['code', 'function', 'bug', 'debug', 'programming', 'javascript', 'python'];
    const writingKeywords = ['write', 'essay', 'article', 'story', 'blog', 'content'];
    const analysisKeywords = ['analyze', 'compare', 'research', 'study', 'evaluate'];
    const reasoningKeywords = ['explain', 'why', 'how', 'logic', 'reasoning', 'think'];

    const lowerMessage = message.toLowerCase();

    if (codeKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'coding';
    }
    if (writingKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'writing';
    }
    if (analysisKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'analysis';
    }
    if (reasoningKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return 'reasoning';
    }

    return 'general';
  }

  async selectBestProvider(intent: string, message: string): Promise<AIProvider> {
    // Provider selection logic based on intent and current status
    const activeProviders = this.providers.filter(p => p.status === 'active' && p.availableTokens > 1000);

    if (activeProviders.length === 0) {
      throw new Error('No active providers available');
    }

    // Simple selection based on intent
    switch (intent) {
      case 'coding':
        return activeProviders.find(p => p.id === 'openai') || activeProviders[0];
      case 'reasoning':
      case 'analysis':
        return activeProviders.find(p => p.id === 'claude') || activeProviders[0];
      case 'writing':
        return activeProviders.find(p => p.id === 'gemini') || activeProviders[0];
      default:
        // Return most cost-effective provider
        return activeProviders.sort((a, b) => a.costPerToken - b.costPerToken)[0];
    }
  }

  async sendQuery(request: QueryRequest): Promise<QueryResponse | QueryResponse[]> {
    const intent = await this.detectQueryIntent(request.message);

    if (request.multiAgent) {
      // Send to multiple providers
      const providers = this.providers
        .filter(p => p.status === 'active' && p.availableTokens > 1000)
        .slice(0, 3); // Limit to top 3 providers

      const responses = await Promise.all(
        providers.map(provider => this.callProvider(provider, request))
      );

      return responses;
    } else {
      // Send to single provider
      const provider = request.provider 
        ? this.providers.find(p => p.id === request.provider)
        : await this.selectBestProvider(intent, request.message);

      if (!provider) {
        throw new Error('Provider not found or inactive');
      }

      return await this.callProvider(provider, request);
    }
  }

  private async callProvider(provider: AIProvider, request: QueryRequest): Promise<QueryResponse> {
    const startTime = Date.now();
    
    try {
      // In a real application, you would make actual API calls here
      // For demo purposes, we'll simulate responses
      const response = await this.simulateProviderCall(provider, request);
      
      const endTime = Date.now();
      const responseTime = (endTime - startTime) / 1000;
      
      // Update provider token count
      provider.availableTokens -= response.tokensUsed;
      
      return {
        id: Date.now().toString(),
        content: response.content,
        provider: provider.name,
        model: provider.model,
        tokensUsed: response.tokensUsed,
        cost: response.tokensUsed * provider.costPerToken,
        responseTime,
        timestamp: new Date()
      };
    } catch (error) {
      console.error(`Error calling ${provider.name}:`, error);
      throw new Error(`Failed to get response from ${provider.name}`);
    }
  }

  private async simulateProviderCall(provider: AIProvider, request: QueryRequest): Promise<{content: string, tokensUsed: number}> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500));

    const responses = {
      'OpenAI': `Hello! I'm ${provider.name} using ${provider.model}. I've analyzed your query: "${request.message}". Based on my training, I can provide you with a comprehensive response that addresses your specific needs. My response incorporates the latest best practices and considers multiple perspectives on the topic.`,
      'Anthropic Claude': `Hi there! As ${provider.name}, I'm designed to be helpful, harmless, and honest. Regarding your query: "${request.message}", I'll provide a thoughtful analysis. I aim to give you accurate information while being transparent about any limitations or uncertainties in my response.`,
      'Google Gemini Pro': `Greetings! I'm ${provider.name}, and I've processed your request: "${request.message}". I can leverage my multimodal capabilities and access to recent information to provide you with a well-rounded answer that considers various aspects of your question.`
    };

    const content = responses[provider.name as keyof typeof responses] || 
      `This is a response from ${provider.name}. I've processed your query and here's my analysis of "${request.message}". I'm providing this response based on my training and capabilities.`;

    return {
      content,
      tokensUsed: Math.floor(Math.random() * 800) + 200
    };
  }

  getProviders(): AIProvider[] {
    return this.providers;
  }

  getProvider(id: string): AIProvider | undefined {
    return this.providers.find(p => p.id === id);
  }

  updateProvider(id: string, updates: Partial<AIProvider>): void {
    const providerIndex = this.providers.findIndex(p => p.id === id);
    if (providerIndex !== -1) {
      this.providers[providerIndex] = { ...this.providers[providerIndex], ...updates };
    }
  }

  addProvider(provider: AIProvider): void {
    this.providers.push(provider);
  }

  removeProvider(id: string): void {
    this.providers = this.providers.filter(p => p.id !== id);
  }
}

// Create singleton instance
export const aiService = new AIService();
