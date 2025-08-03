import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Save, 
  Play, 
  Plus, 
  Workflow, 
  MessageSquare, 
  Brain, 
  Database, 
  Code, 
  Globe,
  Zap,
  Settings,
  Trash2,
  Copy,
  Move
} from 'lucide-react'

interface WorkflowNode {
  id: string
  type: 'start' | 'llm' | 'tool' | 'condition' | 'end'
  title: string
  description: string
  position: { x: number; y: number }
  data: any
}

interface WorkflowConnection {
  id: string
  source: string
  target: string
}

export default function WorkflowEditor() {
  const { id } = useParams()
  
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: '1',
      type: 'start',
      title: 'Start',
      description: 'User input trigger',
      position: { x: 100, y: 100 },
      data: {}
    },
    {
      id: '2',
      type: 'llm',
      title: 'LLM Response',
      description: 'Generate AI response',
      position: { x: 300, y: 100 },
      data: { model: 'gpt-4', temperature: 0.7 }
    },
    {
      id: '3',
      type: 'end',
      title: 'End',
      description: 'Return response to user',
      position: { x: 500, y: 100 },
      data: {}
    }
  ])

  const [connections, setConnections] = useState<WorkflowConnection[]>([
    { id: 'c1', source: '1', target: '2' },
    { id: 'c2', source: '2', target: '3' }
  ])

  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const nodeTypes = [
    {
      type: 'llm',
      title: 'LLM',
      description: 'AI model processing',
      icon: <Brain className="h-5 w-5" />,
      color: 'bg-blue-500'
    },
    {
      type: 'tool',
      title: 'Tool',
      description: 'External tool call',
      icon: <Code className="h-5 w-5" />,
      color: 'bg-green-500'
    },
    {
      type: 'condition',
      title: 'Condition',
      description: 'Conditional logic',
      icon: <Zap className="h-5 w-5" />,
      color: 'bg-yellow-500'
    },
    {
      type: 'tool',
      title: 'Web Search',
      description: 'Search the internet',
      icon: <Globe className="h-5 w-5" />,
      color: 'bg-purple-500'
    },
    {
      type: 'tool',
      title: 'Database',
      description: 'Query database',
      icon: <Database className="h-5 w-5" />,
      color: 'bg-red-500'
    }
  ]

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'start':
        return <Play className="h-4 w-4" />
      case 'llm':
        return <Brain className="h-4 w-4" />
      case 'tool':
        return <Code className="h-4 w-4" />
      case 'condition':
        return <Zap className="h-4 w-4" />
      case 'end':
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Workflow className="h-4 w-4" />
    }
  }

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'start':
        return 'bg-green-500'
      case 'llm':
        return 'bg-blue-500'
      case 'tool':
        return 'bg-purple-500'
      case 'condition':
        return 'bg-yellow-500'
      case 'end':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const handleSave = () => {
    console.log('Saving workflow:', { nodes, connections })
    // TODO: Implement save functionality
  }

  const handleTest = () => {
    console.log('Testing workflow')
    // TODO: Implement test functionality
  }

  const addNode = (type: string) => {
    const newNode: WorkflowNode = {
      id: Date.now().toString(),
      type: type as any,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      description: `New ${type} node`,
      position: { x: 200 + Math.random() * 200, y: 200 + Math.random() * 200 },
      data: {}
    }
    setNodes([...nodes, newNode])
  }

  const deleteNode = (nodeId: string) => {
    setNodes(nodes.filter(node => node.id !== nodeId))
    setConnections(connections.filter(conn => conn.source !== nodeId && conn.target !== nodeId))
    if (selectedNode === nodeId) {
      setSelectedNode(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleTest}>
                <Play className="h-4 w-4 mr-2" />
                Test
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Workflow Editor</h1>
            <p className="text-sm text-gray-500">Customer Support Bot</p>
          </div>
        </div>

        {/* Node Library */}
        <div className="p-4 border-b">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Add Nodes</h3>
          <div className="space-y-2">
            {nodeTypes.map((nodeType, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => addNode(nodeType.type)}
              >
                <div className={`w-4 h-4 rounded mr-3 flex items-center justify-center text-white ${nodeType.color}`}>
                  {nodeType.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium">{nodeType.title}</div>
                  <div className="text-xs text-gray-500">{nodeType.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Node Properties */}
        <div className="flex-1 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Properties</h3>
          {selectedNode ? (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Node Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      className="w-full mt-1 px-2 py-1 text-sm border rounded"
                      defaultValue={nodes.find(n => n.id === selectedNode)?.title}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Description</label>
                    <textarea
                      className="w-full mt-1 px-2 py-1 text-sm border rounded"
                      rows={2}
                      defaultValue={nodes.find(n => n.id === selectedNode)?.description}
                    />
                  </div>
                  {nodes.find(n => n.id === selectedNode)?.type === 'llm' && (
                    <>
                      <div>
                        <label className="text-xs font-medium text-gray-700">Model</label>
                        <select className="w-full mt-1 px-2 py-1 text-sm border rounded">
                          <option>GPT-4</option>
                          <option>GPT-3.5 Turbo</option>
                          <option>Claude-3</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-700">Temperature</label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          className="w-full mt-1"
                          defaultValue="0.7"
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-8">
              <Workflow className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Select a node to edit properties</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Canvas Header */}
        <div className="bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                <Workflow className="h-3 w-3 mr-1" />
                {nodes.length} nodes
              </Badge>
              <Badge variant="outline">
                <Zap className="h-3 w-3 mr-1" />
                {connections.length} connections
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative bg-gray-50 overflow-hidden">
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Workflow Nodes */}
          <div className="absolute inset-0 p-8">
            {nodes.map((node) => (
              <div
                key={node.id}
                className={`absolute cursor-pointer transition-all duration-200 ${
                  selectedNode === node.id ? 'scale-105 shadow-lg' : 'hover:shadow-md'
                }`}
                style={{
                  left: node.position.x,
                  top: node.position.y,
                  transform: selectedNode === node.id ? 'scale(1.05)' : 'scale(1)'
                }}
                onClick={() => setSelectedNode(node.id)}
              >
                <Card className={`w-48 ${selectedNode === node.id ? 'ring-2 ring-primary' : ''}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-6 h-6 rounded flex items-center justify-center text-white ${getNodeColor(node.type)}`}>
                          {getNodeIcon(node.type)}
                        </div>
                        <CardTitle className="text-sm">{node.title}</CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNode(node.id)
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-xs">
                      {node.description}
                    </CardDescription>
                    {node.type === 'llm' && (
                      <Badge variant="outline" className="mt-2 text-xs">
                        {node.data.model || 'GPT-4'}
                      </Badge>
                    )}
                  </CardContent>
                </Card>

                {/* Connection Points */}
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
              </div>
            ))}

            {/* Connection Lines */}
            <svg className="absolute inset-0 pointer-events-none">
              {connections.map((connection) => {
                const sourceNode = nodes.find(n => n.id === connection.source)
                const targetNode = nodes.find(n => n.id === connection.target)
                
                if (!sourceNode || !targetNode) return null

                const startX = sourceNode.position.x + 192 // Card width
                const startY = sourceNode.position.y + 60  // Card height / 2
                const endX = targetNode.position.x
                const endY = targetNode.position.y + 60

                return (
                  <line
                    key={connection.id}
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke="#6366f1"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                )
              })}
              
              {/* Arrow marker */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="#6366f1"
                  />
                </marker>
              </defs>
            </svg>
          </div>

          {/* Empty State */}
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Workflow className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building Your Workflow</h3>
                <p className="text-gray-500 mb-4">Add nodes from the sidebar to create your AI workflow</p>
                <Button onClick={() => addNode('llm')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Node
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}