import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import blink from '../blink/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Bot, 
  Zap, 
  Workflow, 
  MessageSquare, 
  Brain, 
  Users, 
  ArrowRight,
  Sparkles,
  Code,
  Database,
  Globe,
  Shield
} from 'lucide-react'

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
    })
    return unsubscribe
  }, [])

  const handleSignIn = () => {
    blink.auth.login('/dashboard')
  }

  const features = [
    {
      icon: <Workflow className="h-8 w-8" />,
      title: "Visual Workflow Builder",
      description: "Create complex AI workflows with our intuitive drag-and-drop interface",
      color: "text-blue-500"
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "Multi-Model Support",
      description: "Integrate with GPT-4, Claude, Gemini, and other leading AI models",
      color: "text-purple-500"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Real-time Chat",
      description: "Test and interact with your AI assistants through streaming chat",
      color: "text-green-500"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "RAG Integration",
      description: "Connect your knowledge bases for context-aware responses",
      color: "text-orange-500"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "API Generation",
      description: "Automatically generate REST APIs for your AI assistants",
      color: "text-red-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Work together on AI projects with advanced sharing features",
      color: "text-indigo-500"
    }
  ]

  const templates = [
    {
      name: "Customer Support Bot",
      description: "Handle customer inquiries with intelligent responses",
      category: "Support",
      icon: "🎧"
    },
    {
      name: "Content Generator",
      description: "Create blog posts, articles, and marketing copy",
      category: "Content",
      icon: "✍️"
    },
    {
      name: "Data Analyst",
      description: "Analyze data and generate insights automatically",
      category: "Analytics",
      icon: "📊"
    },
    {
      name: "Code Assistant",
      description: "Help with coding tasks and code reviews",
      category: "Development",
      icon: "💻"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Dify AI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#templates" className="text-gray-600 hover:text-gray-900 transition-colors">Templates</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              {user ? (
                <>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button onClick={() => blink.auth.logout()} size="sm" variant="ghost">
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleSignIn} variant="outline" size="sm">Sign In</Button>
                  <Button onClick={handleSignIn} size="sm">Get Started</Button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Powered by Advanced AI
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Build Powerful
            <span className="text-primary block">AI Assistants</span>
            Without Code
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Create, deploy, and manage intelligent AI assistants with our visual workflow builder. 
            Connect multiple AI models, integrate your data, and build production-ready applications in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button onClick={handleSignIn} size="lg" className="text-lg px-8">
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
            <Button variant="outline" size="lg" className="text-lg px-8">
              Watch Demo
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Enterprise Security
            </div>
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Global Scale
            </div>
            <div className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              Your Data, Your Control
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Build AI
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From visual workflow design to production deployment, we provide all the tools 
              you need to create sophisticated AI applications.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`transition-all duration-300 hover:shadow-lg cursor-pointer ${
                  hoveredFeature === index ? 'scale-105 shadow-xl' : ''
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardHeader>
                  <div className={`${feature.color} mb-4`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Start with Pre-built Templates
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Jump-start your AI projects with our collection of professionally designed templates
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{template.icon}</div>
                  <Badge variant="outline" className="mb-2">{template.category}</Badge>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {template.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/dashboard">
                View All Templates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Your AI Assistant?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers and businesses already building with our platform
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link to="/dashboard">
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold">Dify AI</span>
              </div>
              <p className="text-gray-400">
                Build powerful AI assistants without code
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Dify AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}