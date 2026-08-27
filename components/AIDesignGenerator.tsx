"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Zap, Lightbulb, Layers, Eye, Copy, Trash2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { DesignElement } from "@/lib/design-helpers"
import { aiPromptSuggestions } from "@/utils/designConstants"

interface AIDesignGeneratorProps {
  aiPrompt: string
  setAiPrompt: (prompt: string) => void
  isGenerating: boolean
  onGenerate: () => void
  designElements: DesignElement[]
  selectedElement: string | null
  setSelectedElement: (id: string | null) => void
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
}

export function AIDesignGenerator({
  aiPrompt,
  setAiPrompt,
  isGenerating,
  onGenerate,
  designElements,
  selectedElement,
  setSelectedElement,
  onDelete,
  onDuplicate,
}: AIDesignGeneratorProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            AI Design Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ai-prompt">Describe your design</Label>
            <Textarea
              id="ai-prompt"
              placeholder="e.g., A sunset over mountains with geometric shapes, vibrant colors, modern style..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Quick Suggestions */}
          <div>
            <Label className="text-sm flex items-center gap-1">
              <Lightbulb className="h-3 w-3" />
              Quick Ideas (Click to Generate)
            </Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {aiPromptSuggestions.slice(0, 4).map((suggestion, index) => (
                <button
                  key={`suggestion-${index}`}
                  type="button"
                  className="text-xs px-3 py-1.5 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors duration-150 cursor-pointer font-medium active:scale-95"
                  onClick={() => {
                    setAiPrompt(suggestion)
                    // Trigger generation immediately
                    setTimeout(() => onGenerate(), 0)
                  }}
                  disabled={isGenerating}
                >
                  {suggestion.split(' ').slice(0, 3).join(' ')}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={onGenerate} disabled={isGenerating || !aiPrompt.trim()} className="w-full">
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Design
              </>
            )}
          </Button>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <p>💡 <strong>Pro tip:</strong> Be specific about colors, style, and elements for better results.</p>
            <p>✨ Try: &ldquo;minimalist&rdquo;, &ldquo;vintage&rdquo;, &ldquo;bold&rdquo;, &ldquo;pastel colors&rdquo;, &ldquo;geometric shapes&rdquo;</p>
          </div>
        </CardContent>
      </Card>

      {/* Recent AI Generations */}
      {designElements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Design Elements ({designElements.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {designElements.map((element, index) => (
                <div
                  key={element.id}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md transition-colors cursor-pointer",
                    selectedElement === element.id 
                      ? "bg-primary/10 border border-primary/20" 
                      : "bg-muted/30 hover:bg-muted/50"
                  )}
                  onClick={() => setSelectedElement(selectedElement === element.id ? null : element.id)}
                >
                  <div className="flex items-center gap-2">
                    {element.type === "ai-generated" && <Sparkles className="h-3 w-3 text-primary" />}
                    <div>
                      <span className="text-xs font-medium">
                        {element.type === "text" ? element.content : 
                         element.type === "shape" ? `${element.content} Shape` :
                         (element.type === "image" || element.type === "template") ? "Image" :
                         `AI Element ${index + 1}`}
                      </span>
                      <div className="text-xs text-muted-foreground">
                        {element.type === "text" && `${element.fontSize}px ${element.fontFamily}`}
                        {element.type === "shape" && `${element.width}x${element.height}`}
                        {element.type === "ai-generated" && "AI Generated"}
                        {(element.type === "image" || element.type === "template") && `${element.width}x${element.height}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedElement(element.id)
                      }}
                      title="Select"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDuplicate(element.id)
                      }}
                      title="Duplicate"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(element.id)
                      }}
                      title="Delete"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
