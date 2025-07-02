
# AI Router - Intelligent Multi-Agent AI Platform

A sophisticated web application that intelligently routes user queries to the best AI providers, compares responses across multiple agents, and provides comprehensive analytics and benchmarking capabilities.

## 🌟 Features

### 🧠 Intelligent AI Routing
- **Auto-detection**: Automatically detects query intent (coding, writing, analysis, reasoning, etc.)
- **Smart Selection**: Chooses the optimal AI provider based on query type, performance metrics, and cost
- **Multi-Agent Mode**: Compare responses from multiple AI providers simultaneously
- **Hybrid Workflows**: Support for cross-referencing and post-processing responses

### 🤖 AI Provider Integration
- **Multiple Providers**: Support for OpenAI, Claude, Gemini Pro, Mistral, Perplexity AI, and more
- **Flexible Authentication**: Easy API key management and validation
- **Usage Tracking**: Monitor token consumption, costs, and rate limits
- **Performance Monitoring**: Track response times, accuracy, and success rates

### 📊 Analytics & Benchmarking
- **Real-time Dashboard**: Monitor query volume, costs, and performance metrics
- **Provider Comparison**: Compare accuracy, speed, and cost-effectiveness
- **Community Polls**: User voting system for AI response quality
- **Performance Trends**: Historical data and trend analysis

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Adaptive theming for better user experience
- **Interactive Charts**: Rich data visualization using Recharts
- **Real-time Updates**: Live performance monitoring and notifications

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-router
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your AI provider API keys:
   ```env
   VITE_OPENAI_API_KEY=your_openai_key_here
   VITE_CLAUDE_API_KEY=your_claude_key_here
   VITE_GEMINI_API_KEY=your_gemini_key_here
   VITE_MISTRAL_API_KEY=your_mistral_key_here
   VITE_PERPLEXITY_API_KEY=your_perplexity_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## 🏗️ Architecture

### Frontend (React + TypeScript)
```
src/
├── components/
│   ├── Chat/                 # Chat interface components
│   ├── Admin/                # Admin panel components
│   ├── Benchmarks/           # Benchmarking dashboard
│   └── Layout/               # Shared layout components
├── pages/                    # Route pages
├── services/                 # AI service integration
├── hooks/                    # Custom React hooks
└── lib/                      # Utility functions
```

### Key Technologies
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** for component library
- **Recharts** for data visualization
- **React Router** for navigation
- **TanStack Query** for state management

## 🔧 Configuration

### Adding New AI Providers

1. **Update the AIService**
   ```typescript
   // src/services/aiService.ts
   const newProvider: AIProvider = {
     id: 'new-provider',
     name: 'New AI Provider',
     model: 'provider-model',
     apiEndpoint: 'https://api.provider.com/v1/chat',
     apiKey: process.env.VITE_NEW_PROVIDER_API_KEY || '',
     costPerToken: 0.00001,
     availableTokens: 100000,
     maxTokens: 200000,
     status: 'active',
     capabilities: ['text-generation', 'analysis']
   };
   ```

2. **Implement API Integration**
   ```typescript
   private async callNewProvider(provider: AIProvider, request: QueryRequest) {
     const response = await fetch(provider.apiEndpoint, {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${provider.apiKey}`,
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         model: provider.model,
         messages: [{ role: 'user', content: request.message }],
         max_tokens: request.maxTokens || 1000
       })
     });
     
     return await response.json();
   }
   ```

### Customizing Query Intent Detection

Update the `detectQueryIntent` method in `aiService.ts`:

```typescript
async detectQueryIntent(message: string): Promise<string> {
  const intentPatterns = {
    'coding': ['code', 'function', 'bug', 'programming'],
    'writing': ['write', 'essay', 'article', 'content'],
    'analysis': ['analyze', 'compare', 'research', 'study'],
    'translation': ['translate', 'language', 'convert']
  };
  
  // Add your custom logic here
  for (const [intent, keywords] of Object.entries(intentPatterns)) {
    if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
      return intent;
    }
  }
  
  return 'general';
}
```

## 🛠️ Development

### Project Structure
```
ai-router/
├── src/
│   ├── components/           # Reusable UI components
│   ├── pages/               # Application pages
│   ├── services/            # Business logic and API calls
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
├── docs/                    # Documentation
└── tests/                   # Test files
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 API Documentation

### AI Service Methods

#### `sendQuery(request: QueryRequest)`
Send a query to AI providers with intelligent routing.

```typescript
const response = await aiService.sendQuery({
  message: "Explain quantum computing",
  provider: "claude", // Optional: force specific provider
  multiAgent: true,   // Optional: get responses from multiple providers
  maxTokens: 1000,
  temperature: 0.7
});
```

#### `detectQueryIntent(message: string)`
Automatically detect the intent of a user query.

```typescript
const intent = await aiService.detectQueryIntent("Write a Python function");
// Returns: "coding"
```

#### `selectBestProvider(intent: string, message: string)`
Select the optimal AI provider based on query intent and current metrics.

```typescript
const provider = await aiService.selectBestProvider("coding", "Debug this function");
```

## 🔒 Security Considerations

### API Key Management
- Store API keys securely using environment variables
- Never commit API keys to version control
- Use different keys for development and production
- Implement key rotation policies

### Rate Limiting
- Implement client-side rate limiting
- Monitor API usage and costs
- Set up alerts for unusual usage patterns
- Use provider-specific rate limits

### Data Privacy
- Don't log sensitive user queries
- Implement data retention policies
- Use HTTPS for all API communications
- Follow GDPR/CCPA compliance guidelines

## 🚀 Deployment

### Environment Setup
1. Set up production environment variables
2. Configure API keys for all providers
3. Set up monitoring and logging
4. Configure CDN for static assets

### Build and Deploy
```bash
# Build for production
npm run build

# Deploy to your hosting platform
# (Vercel, Netlify, AWS, etc.)
```

### Monitoring
- Set up error tracking (Sentry, Bugsnag)
- Monitor API response times
- Track user engagement metrics
- Set up uptime monitoring

## 📊 Performance Optimization

### Frontend Optimization
- Code splitting for route-based chunks
- Lazy loading of components
- Image optimization and compression
- Bundle size analysis and optimization

### API Optimization
- Request caching and memoization
- Concurrent API calls for multi-agent mode
- Response compression
- Connection pooling

## 🐛 Troubleshooting

### Common Issues

**API Key Errors**
- Verify API keys are correctly set in environment variables
- Check provider account quotas and billing status
- Ensure keys have required permissions

**Slow Response Times**
- Check network connectivity
- Monitor provider API status
- Consider using faster models for real-time queries

**High Costs**
- Implement query caching
- Use cheaper models for simple queries
- Set up usage alerts and limits

## 📈 Roadmap

### Upcoming Features
- [ ] Advanced AI model fine-tuning
- [ ] Custom AI workflow builder
- [ ] Enterprise SSO integration
- [ ] Advanced analytics and reporting
- [ ] Mobile applications (iOS/Android)
- [ ] API rate limiting and quotas
- [ ] Multi-language support
- [ ] Voice query support

### Version History
- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added multi-agent comparison
- **v1.2.0** - Community benchmarks and voting
- **v1.3.0** - Advanced analytics dashboard

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

- 📧 Email: support@ai-router.com
- 💬 Discord: [Join our community](https://discord.gg/ai-router)
- 📖 Documentation: [Full documentation](https://docs.ai-router.com)
- 🐛 Issues: [GitHub Issues](https://github.com/ai-router/issues)

---

Built with ❤️ using modern web technologies. Empowering developers and businesses to harness the power of multiple AI providers intelligently.
