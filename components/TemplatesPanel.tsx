"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Zap } from "lucide-react"

type Template = {
  id: number
  name: string
  category: string
  image: string
  popular?: boolean
}

interface TemplatesPanelProps {
  templates: Template[]
  onSelectTemplate: (template: Template) => void
}

export function TemplatesPanel({ templates, onSelectTemplate }: TemplatesPanelProps) {
  return (
    <div className="space-y-4">
      {/* Popular Designs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Popular Designs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {templates.slice(0, 6).map((template) => (
              <div
                key={template.id}
                onClick={() => onSelectTemplate(template)}
                className="relative group cursor-pointer rounded-lg overflow-hidden border border-border hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="relative w-full h-24 bg-muted">
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Apply
                  </span>
                </div>
                <p className="text-xs p-1 text-center truncate">{template.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">All Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {templates.map((template) => (
              <div
                key={template.id}
                className="p-2 rounded-lg border border-border hover:border-primary hover:bg-accent cursor-pointer transition-all"
                onClick={() => onSelectTemplate(template)}
              >
                <p className="font-medium text-xs">{template.name}</p>
                <p className="text-xs text-muted-foreground">{template.category}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Template Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs text-muted-foreground">
          <p>• Click any template to apply it</p>
          <p>• Customize after applying</p>
          <p>• Mix and match elements</p>
        </CardContent>
      </Card>
    </div>
  )
}
