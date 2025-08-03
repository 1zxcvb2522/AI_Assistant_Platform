import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Play, 
  Brain, 
  Code, 
  Zap, 
  MessageSquare, 
  Workflow,
  Trash2,
  Settings
} from 'lucide-react'

interface WorkflowNodeProps {
  id: string
  type: 'start' | 'llm' | 'tool' | 'condition' | 'end'
  title: string
  description: string
  position: { x: number; y: number }
  data: any
  isSelected: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

export default function WorkflowNode({ 
  id, 
  type, 
  title, 
  description, 
  data, 
  isSelected, 
  onSelect, 
  onDelete 
}: WorkflowNodeProps) {
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

  return (
    <div className="relative group">
      <Card 
        className={`w-48 cursor-pointer transition-all duration-200 hover:shadow-md ${
          isSelected ? 'ring-2 ring-primary shadow-lg' : ''
        }`}
        onClick={() => onSelect(id)}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded flex items-center justify-center text-white ${getNodeColor(type)}`}>
                {getNodeIcon(type)}
              </div>
              <CardTitle className="text-sm">{title}</CardTitle>
            </div>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  // TODO: Open settings
                }}
              >
                <Settings className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(id)
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-xs mb-2">
            {description}
          </CardDescription>
          {type === 'llm' && data.model && (
            <Badge variant="outline" className="text-xs">
              {data.model}
            </Badge>
          )}
          {type === 'condition' && (
            <Badge variant="outline" className="text-xs">
              If/Then
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* Connection Points */}
      {type !== 'start' && (
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full hover:border-primary transition-colors"></div>
      )}
      {type !== 'end' && (
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-gray-300 rounded-full hover:border-primary transition-colors"></div>
      )}
    </div>
  )
}