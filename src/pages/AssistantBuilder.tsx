import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Save, 
  Play, 
  Settings, 
  Brain, 
  Database, 
  Code, 
  MessageSquare,
  Sparkles,
  Plus,
  Trash2,
  Upload
} from 'lucide-react'

export default function AssistantBuilder() {
  const { id } = useParams()
  const isNew = id === 'new'
  
  const [assistantData, setAssistantData] = useState({
    name: isNew ? '' : 'Customer Support Bot',
    description: isNew ? '' : 'Handles customer inquiries and support tickets',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    systemPrompt: isNew ? '' : 'You are a helpful customer support assistant. Be friendly, professional, and provide accurate information.',
    knowledgeBase: true,
    webSearch: false,
    codeInterpreter: false,
    customTools: []
  })

  const templates = [
    {
      id: 'customer-support',
      name: 'Customer Support',
      description: 'Friendly customer service assistant',
      icon: '🎧',
      systemPrompt: 'You are a helpful customer support assistant. Be friendly, professional, and provide accurate information. Always try to resolve customer issues efficiently.',
      model: 'gpt-4',
      temperature: 0.3,
      knowledgeBase: true,
      webSearch: false
    },
    {
      id: 'content-creator',
      name: 'Content Creator',
      description: 'Creative writing and content generation',
      icon: '✍️',
      systemPrompt: 'You are a creative content writer. Help users create engaging blog posts, social media content, and marketing copy. Be creative and adapt to different writing styles.',
      model: 'gpt-4',
      temperature: 0.8,
      knowledgeBase: false,
      webSearch: true
    },
    {
      id: 'data-analyst',
      name: 'Data Analyst',
      description: 'Data analysis and insights',
      icon: '📊',
      systemPrompt: 'You are a data analyst assistant. Help users understand data, create visualizations, and provide insights. Be precise and analytical in your responses.',
      model: 'gpt-4',
      temperature: 0.2,
      knowledgeBase: true,
      codeInterpreter: true
    },
    {
      id: 'code-assistant',
      name: 'Code Assistant',
      description: 'Programming help and code review',
      icon: '💻',
      systemPrompt: 'You are a programming assistant. Help users with coding tasks, debug issues, and provide best practices. Be precise and include code examples.',
      model: 'gpt-4',
      temperature: 0.1,
      knowledgeBase: true,
      codeInterpreter: true
    }
  ]

  const [activeTab, setActiveTab] = useState(isNew ? 'templates' : 'basic')

  const models = [
    { value: 'gpt-4', label: 'GPT-4', provider: 'OpenAI' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', provider: 'OpenAI' },
    { value: 'claude-3-opus', label: 'Claude 3 Opus', provider: 'Anthropic' },
    { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet', provider: 'Anthropic' },
    { value: 'gemini-pro', label: 'Gemini Pro', provider: 'Google' }
  ]

  const tools = [
    {
      id: 'knowledge-base',
      name: 'Knowledge Base',
      description: 'Connect documents and data sources',
      icon: <Database className="h-5 w-5" />,
      enabled: assistantData.knowledgeBase
    },
    {
      id: 'web-search',
      name: 'Web Search',
      description: 'Search the internet for current information',
      icon: <Brain className="h-5 w-5" />,
      enabled: assistantData.webSearch
    },
    {
      id: 'code-interpreter',
      name: 'Code Interpreter',
      description: 'Execute Python code and analyze data',
      icon: <Code className="h-5 w-5" />,
      enabled: assistantData.codeInterpreter
    }
  ]

  const handleSave = () => {
    console.log('Saving assistant:', assistantData)
    // TODO: Implement save functionality
  }

  const handleTest = () => {
    console.log('Testing assistant:', assistantData)
    // TODO: Implement test functionality
  }

  const applyTemplate = (template: any) => {
    setAssistantData({
      ...assistantData,
      name: template.name,
      description: template.description,
      model: template.model,
      temperature: template.temperature,
      systemPrompt: template.systemPrompt,
      knowledgeBase: template.knowledgeBase || false,
      webSearch: template.webSearch || false,
      codeInterpreter: template.codeInterpreter || false
    })
    setActiveTab('basic')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {isNew ? 'Create New Assistant' : 'Edit Assistant'}
                </h1>
                <p className="text-sm text-gray-500">
                  {isNew ? 'Configure your AI assistant' : assistantData.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleTest}>
                <Play className="h-4 w-4 mr-2" />
                Test
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className={`grid w-full ${isNew ? 'grid-cols-5' : 'grid-cols-4'}`}>
              {isNew && <TabsTrigger value="templates">Templates</TabsTrigger>}
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="model">Model & Prompt</TabsTrigger>
              <TabsTrigger value="tools">Tools & Features</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            </TabsList>

            {isNew && (
              <TabsContent value="templates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Choose a Template</CardTitle>
                    <CardDescription>
                      Start with a pre-configured assistant template or build from scratch
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {templates.map((template) => (
                        <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => applyTemplate(template)}>
                          <CardHeader className="pb-3">
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl">{template.icon}</div>
                              <div>
                                <CardTitle className="text-lg">{template.name}</CardTitle>
                                <CardDescription className="text-sm">{template.description}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">{template.model}</Badge>
                              <Badge variant="outline" className="text-xs">Temp: {template.temperature}</Badge>
                              {template.knowledgeBase && <Badge variant="outline" className="text-xs">KB</Badge>}
                              {template.webSearch && <Badge variant="outline" className="text-xs">Web</Badge>}
                              {template.codeInterpreter && <Badge variant="outline" className="text-xs">Code</Badge>}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      
                      <Card className="cursor-pointer hover:shadow-md transition-shadow border-dashed" onClick={() => setActiveTab('basic')}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">⚡</div>
                            <div>
                              <CardTitle className="text-lg">Start from Scratch</CardTitle>
                              <CardDescription className="text-sm">Build a custom assistant from the ground up</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <Badge variant="outline" className="text-xs">Custom</Badge>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Configure the basic settings for your AI assistant
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Assistant Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter assistant name"
                      value={assistantData.name}
                      onChange={(e) => setAssistantData({ ...assistantData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what your assistant does"
                      value={assistantData.description}
                      onChange={(e) => setAssistantData({ ...assistantData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Assistant Icon</Label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        🤖
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Icon
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="model" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Model Configuration</CardTitle>
                  <CardDescription>
                    Choose the AI model and configure its behavior
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>AI Model</Label>
                    <Select value={assistantData.model} onValueChange={(value) => setAssistantData({ ...assistantData, model: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {models.map((model) => (
                          <SelectItem key={model.value} value={model.value}>
                            <div className="flex items-center justify-between w-full">
                              <span>{model.label}</span>
                              <Badge variant="outline" className="ml-2">{model.provider}</Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Temperature: {assistantData.temperature}</Label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={assistantData.temperature}
                        onChange={(e) => setAssistantData({ ...assistantData, temperature: parseFloat(e.target.value) })}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500">Controls randomness in responses</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxTokens">Max Tokens</Label>
                      <Input
                        id="maxTokens"
                        type="number"
                        value={assistantData.maxTokens}
                        onChange={(e) => setAssistantData({ ...assistantData, maxTokens: parseInt(e.target.value) })}
                      />
                      <p className="text-xs text-gray-500">Maximum response length</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Prompt</CardTitle>
                  <CardDescription>
                    Define how your assistant should behave and respond
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="You are a helpful assistant that..."
                    value={assistantData.systemPrompt}
                    onChange={(e) => setAssistantData({ ...assistantData, systemPrompt: e.target.value })}
                    rows={8}
                    className="font-mono text-sm"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tools" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Tools</CardTitle>
                  <CardDescription>
                    Enable tools and features for your assistant
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {tools.map((tool) => (
                    <div key={tool.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-primary">
                          {tool.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{tool.name}</h4>
                          <p className="text-sm text-gray-500">{tool.description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={tool.enabled}
                        onCheckedChange={(checked) => {
                          if (tool.id === 'knowledge-base') {
                            setAssistantData({ ...assistantData, knowledgeBase: checked })
                          } else if (tool.id === 'web-search') {
                            setAssistantData({ ...assistantData, webSearch: checked })
                          } else if (tool.id === 'code-interpreter') {
                            setAssistantData({ ...assistantData, codeInterpreter: checked })
                          }
                        }}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Custom Tools</CardTitle>
                  <CardDescription>
                    Add custom API integrations and tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No custom tools yet</h3>
                    <p className="text-gray-500 mb-4">Add custom API integrations to extend your assistant's capabilities</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Custom Tool
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="knowledge" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Knowledge Base</CardTitle>
                  <CardDescription>
                    Upload documents and data sources for your assistant to reference
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded</h3>
                    <p className="text-gray-500 mb-4">Upload PDFs, text files, or connect data sources</p>
                    <div className="flex justify-center space-x-3">
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Files
                      </Button>
                      <Button variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Connect Data Source
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}