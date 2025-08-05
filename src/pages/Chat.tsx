import { useState } from 'react';
import { MessageCircle, Send, Bot, User, Sparkles } from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI real estate investment assistant. I can help you analyze properties, understand market trends, and make better investment decisions. What would you like to know?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const aiCapabilities = [
    'Property Analysis & Scoring',
    'Market Trend Insights',
    'NOI & Cap Rate Calculations',
    'Risk Assessment',
    'Zoning & Upzoning Opportunities',
    'Rent Growth Predictions',
    'Investment Recommendations'
  ];

  const quickQuestions = [
    'What are the best investment opportunities in my portfolio?',
    'Analyze the ROI for properties in Austin, TX',
    'Show me properties with high AI scores',
    'What market trends should I watch?',
    'Calculate NOI for my top properties'
  ];

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('analyze') || input.includes('roi')) {
      return 'Based on your portfolio analysis, I\'ve identified 3 high-performing properties with ROI above 12%. The Austin property at Oak Street shows exceptional growth potential with a predicted 15% appreciation and strong rental demand. Would you like a detailed breakdown of the investment metrics?';
    }
    
    if (input.includes('score') || input.includes('ai score')) {
      return 'Your top-scoring properties based on AI analysis are:\n\n1. Oak Street, Austin (Score: 92) - High growth area, excellent schools\n2. Pine Avenue, Denver (Score: 87) - Strong job growth, low crime\n3. Maple Drive, Nashville (Score: 84) - Emerging neighborhood, good cash flow\n\nThese scores consider profitability, market quality, and risk factors.';
    }
    
    if (input.includes('market') || input.includes('trend')) {
      return 'Current market trends show:\n\n📈 Austin & Nashville leading in appreciation\n🏢 Multi-family properties outperforming singles\n💼 Tech hubs seeing 8-12% job growth\n🏠 Suburban markets gaining momentum\n\nI recommend focusing on emerging tech corridors for maximum growth potential.';
    }
    
    if (input.includes('noi') || input.includes('calculate')) {
      return 'Here are NOI calculations for your top properties:\n\n🏡 Oak Street: $25,100 NOI (7.2% Cap Rate)\n🏢 Pine Avenue: $19,800 NOI (6.8% Cap Rate)\n🏠 Maple Drive: $18,600 NOI (7.5% Cap Rate)\n\nThese calculations include all operating expenses, taxes, and maintenance costs.';
    }
    
    return 'I\'m analyzing your request and cross-referencing market data, property metrics, and investment trends. Based on current data, I recommend focusing on cash-flowing properties in growing markets. Would you like me to run a specific analysis on any particular property or market segment?';
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <h1 className="font-heading font-semibold text-xl text-foreground flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            AI Investment Assistant
          </h1>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="w-3 h-3" />
            AI Powered
          </Badge>
        </header>

        <div className="flex h-[calc(100vh-4rem)]">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div className={`max-w-md p-4 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-foreground'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about property analysis, market trends, ROI calculations..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} className="px-4">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-border p-4 space-y-4">
            {/* AI Capabilities */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">AI Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {aiCapabilities.map((capability, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{capability}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Questions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Quick Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left h-auto p-3 text-xs"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Market Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Market Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Market Trend</span>
                  <Badge variant="default" className="text-xs">Bullish</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Interest Rates</span>
                  <span className="font-medium">6.8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Update</span>
                  <span className="font-medium">Real-time</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;