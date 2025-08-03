import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AnalyticsChartProps {
  title: string
  description: string
  data: number[]
  labels: string[]
  color?: string
}

export default function AnalyticsChart({ title, description, data, labels, color = '#0033FF' }: AnalyticsChartProps) {
  const maxValue = Math.max(...data)
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-end space-x-2 h-32">
            {data.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full rounded-t transition-all duration-300 hover:opacity-80"
                  style={{
                    height: `${(value / maxValue) * 100}%`,
                    backgroundColor: color,
                    minHeight: '4px'
                  }}
                />
                <span className="text-xs text-gray-500 mt-2">{labels[index]}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>0</span>
            <span>{maxValue}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}