import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Bot, 
  MessageSquare, 
  Settings, 
  Workflow,
  Sparkles,
  Clock,
  Users,
  TrendingUp,
  Zap
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import AnalyticsChart from '@/components/AnalyticsChart'

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')

  const assistants = [
    {
      id: '1',
      name: 'Customer Support Bot',
      description: 'Handles customer inquiries and support tickets',
      status: 'active',
      model: 'GPT-4',
      conversations: 1247,
      lastUsed: '2 hours ago',
      category: 'Support',
      icon: '🎧'
    },
    {
      id: '2',
      name: 'Content Generator',
      description: 'Creates blog posts and marketing content',
      status: 'active',
      model: 'Claude-3',
      conversations: 856,
      lastUsed: '1 day ago',
      category: 'Content',
      icon: '✍️'
    },
    {
      id: '3',
      name: 'Data Analyst',
      description: 'Analyzes data and generates insights',
      status: 'draft',
      model: 'GPT-4',
      conversations: 0,
      lastUsed: 'Never',
      category: 'Analytics',
      icon: '📊'
    },
    {
      id: '4',
      name: 'Code Assistant',
      description: 'Helps with coding tasks and reviews',
      status: 'active',
      model: 'GPT-4',
      conversations: 432,
      lastUsed: '5 minutes ago',
      category: 'Development',
      icon: '💻'
    }
  ]

  const templates = [
    {
      name: 'Chatbot Template',
      description: 'Basic conversational AI template',
      category: 'General',
      icon: '🤖'
    },
    {
      name: 'RAG Assistant',
      description: 'Knowledge-based Q&A assistant',
      category: 'Knowledge',
      icon: '📚'
    },
    {
      name: 'API Assistant',
      description: 'Tool-calling and API integration',
      category: 'Integration',
      icon: '🔌'
    },
    {
      name: 'Workflow Bot',
      description: 'Multi-step process automation',
      category: 'Automation',
      icon: '⚡'
    }
  ]

  const stats = [
    {
      title: 'Total Assistants',
      value: '12',
      change: '+2 this week',
      icon: <Bot className="h-5 w-5" />
    },
    {
      title: 'Conversations',
      value: '2,535',
      change: '+18% from last month',
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      title: 'Active Users',
      value: '847',
      change: '+12% from last month',
      icon: <Users className="h-5 w-5" />
    },
    {
      title: 'Success Rate',
      value: '94.2%',
      change: '+2.1% from last month',
      icon: <TrendingUp className="h-5 w-5" />
    }
  ]

  const filteredAssistants = assistants.filter(assistant =>
    assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assistant.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const conversationData = [45, 52, 38, 67, 73, 82, 95]
  const conversationLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  
  const usageData = [120, 150, 180, 140, 200, 170, 190]
  const usageLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Dify AI</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6 ml-8">
                <Link to="/dashboard" className="text-primary font-medium">Dashboard</Link>
                <Link to="/templates" className="text-gray-600 hover:text-gray-900">Templates</Link>
                <Link to="/settings" className="text-gray-600 hover:text-gray-900">Settings</Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your AI assistants and monitor their performance</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className="text-gray-400">
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="assistants" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="assistants">My Assistants</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>
              <Button asChild>
                <Link to="/assistant/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Assistant
                </Link>
              </Button>
            </div>

            <TabsContent value="assistants" className="space-y-6">
              {/* Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <AnalyticsChart
                  title="Daily Conversations"
                  description="Conversations over the past week"
                  data={conversationData}
                  labels={conversationLabels}
                  color="#0033FF"
                />
                <AnalyticsChart
                  title="Weekly Usage"
                  description="Total interactions over the past 7 weeks"
                  data={usageData}
                  labels={usageLabels}
                  color="#6366F1"
                />
              </div>

              {/* Search and Filter */}
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search assistants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              {/* Assistants Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssistants.map((assistant) => (
                  <Card key={assistant.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{assistant.icon}</div>
                          <div>
                            <CardTitle className="text-lg">{assistant.name}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge 
                                variant={assistant.status === 'active' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {assistant.status}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {assistant.model}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/assistant/${assistant.id}`}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/chat/${assistant.id}`}>Test Chat</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/workflow/${assistant.id}`}>Edit Workflow</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        {assistant.description}
                      </CardDescription>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {assistant.conversations}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {assistant.lastUsed}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-4">
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <Link to={`/chat/${assistant.id}`}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Chat
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="flex-1">
                          <Link to={`/workflow/${assistant.id}`}>
                            <Workflow className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.map((template, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-4">{template.icon}</div>
                      <Badge variant="outline" className="mb-2">{template.category}</Badge>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center mb-4">
                        {template.description}
                      </CardDescription>
                      <Button className="w-full" size="sm">
                        <Zap className="h-4 w-4 mr-2" />
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}