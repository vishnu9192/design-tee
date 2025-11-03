"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Square, Circle, Triangle, Type, ImageIcon } from "lucide-react"
import Image from "next/image"
import { DesignElement, designTemplates } from "@/lib/design-helpers"
import { AIDesignGenerator } from "./AIDesignGenerator"

interface LeftSidebarProps {
  // AI States
  aiPrompt: string
  setAiPrompt: (prompt: string) => void
  isGenerating: boolean
  onGenerateAI: () => void
  
  // Text States
  textContent: string
  setTextContent: (content: string) => void
  fontSize: number[]
  setFontSize: (size: number[]) => void
  fontFamily: string
  setFontFamily: (font: string) => void
  textColor: string
  setTextColor: (color: string) => void
  onAddText: () => void
  
  // Shape States
  shapeColor: string
  setShapeColor: (color: string) => void
  shapeBorderColor: string
  setShapeBorderColor: (color: string) => void
  shapeBorderWidth: number[]
  setShapeBorderWidth: (width: number[]) => void
  onAddShape: (type: string) => void
  
  // Image States
  isUploading: boolean
  uploadedImages: Map<string, string>
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onAddImageFromTemplate: (imageId: string) => void
  
  // Design Elements
  designElements: DesignElement[]
  selectedElement: string | null
  setSelectedElement: (id: string | null) => void
  onDelete: (id: string) => void
  onDuplicate: (id: string) => void
}

export function LeftSidebar({
  aiPrompt,
  setAiPrompt,
  isGenerating,
  onGenerateAI,
  textContent,
  setTextContent,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  textColor,
  setTextColor,
  onAddText,
  shapeColor,
  setShapeColor,
  shapeBorderColor,
  setShapeBorderColor,
  shapeBorderWidth,
  setShapeBorderWidth,
  onAddShape,
  isUploading,
  uploadedImages,
  onImageUpload,
  onAddImageFromTemplate,
  designElements,
  selectedElement,
  setSelectedElement,
  onDelete,
  onDuplicate,
}: LeftSidebarProps) {
  return (
    <div className="w-80 border-r border-border bg-card/30 overflow-y-auto">
      <Tabs defaultValue="ai" className="p-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="ai">AI</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="shapes">Shapes</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>
        
        {/* AI Tab */}
        <TabsContent value="ai" className="space-y-4">
          <AIDesignGenerator
            aiPrompt={aiPrompt}
            setAiPrompt={setAiPrompt}
            isGenerating={isGenerating}
            onGenerate={onGenerateAI}
            designElements={designElements}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
          />
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Design Templates</h3>
              <Badge variant="secondary" className="text-xs">
                {designTemplates.length} templates
              </Badge>
            </div>
            
            {/* Popular Templates */}
            <div className="mb-4">
              <Label className="text-sm text-muted-foreground mb-2 block">🔥 Popular</Label>
              <div className="grid grid-cols-2 gap-2">
                {designTemplates.filter(t => t.popular).slice(0, 4).map((template) => (
                  <Card 
                    key={template.id} 
                    className="group cursor-pointer hover:shadow-md transition-all"
                    onClick={() => onAddImageFromTemplate(template.image)}
                  >
                    <CardContent className="p-0">
                      <div className="aspect-square bg-muted/50 relative overflow-hidden">
                        <Image
                          src={template.image}
                          alt={template.name}
                          fill
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <Button size="sm" variant="secondary" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            Use Template
                          </Button>
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-medium truncate">{template.name}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {template.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Templates */}
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">All Templates</Label>
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                {designTemplates.map((template) => (
                  <Card 
                    key={template.id} 
                    className="group cursor-pointer hover:shadow-md transition-all"
                    onClick={() => onAddImageFromTemplate(template.image)}
                  >
                    <CardContent className="p-0">
                      <div className="aspect-square bg-muted/50 relative overflow-hidden">
                        <Image
                          src={template.image}
                          alt={template.name}
                          fill
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {template.popular && (
                          <Badge variant="default" className="absolute top-1 right-1 text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-medium truncate">{template.name}</p>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {template.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Text Tab */}
        <TabsContent value="text" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Type className="h-5 w-5" />
                Add Text
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="text-content">Text Content</Label>
                <Input 
                  id="text-content" 
                  placeholder="Enter your text..." 
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="font-family">Font Family</Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arial">Arial</SelectItem>
                    <SelectItem value="helvetica">Helvetica</SelectItem>
                    <SelectItem value="times">Times New Roman</SelectItem>
                    <SelectItem value="georgia">Georgia</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                    <SelectItem value="playfair">Playfair Display</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Font Size: {fontSize[0]}px</Label>
                <Slider 
                  value={fontSize} 
                  onValueChange={setFontSize}
                  max={72} 
                  min={8} 
                  step={1} 
                  className="mt-2" 
                />
              </div>

              <div>
                <Label>Text Color</Label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-12 h-8 rounded border border-border cursor-pointer"
                    title="Select text color"
                  />
                  <Input 
                    value={textColor} 
                    onChange={(e) => setTextColor(e.target.value)}
                    placeholder="#000000"
                    className="flex-1"
                    title="Enter hex color code"
                  />
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={onAddText}
                disabled={!textContent.trim()}
              >
                <Type className="h-4 w-4 mr-2" />
                Add Text
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shapes Tab */}
        <TabsContent value="shapes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Shapes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant="outline" 
                  className="aspect-square bg-transparent"
                  onClick={() => onAddShape("rectangle")}
                  title="Add Rectangle"
                >
                  <Square className="h-6 w-6" />
                </Button>
                <Button 
                  variant="outline" 
                  className="aspect-square bg-transparent"
                  onClick={() => onAddShape("circle")}
                  title="Add Circle"
                >
                  <Circle className="h-6 w-6" />
                </Button>
                <Button 
                  variant="outline" 
                  className="aspect-square bg-transparent"
                  onClick={() => onAddShape("triangle")}
                  title="Add Triangle"
                >
                  <Triangle className="h-6 w-6" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Shape Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Default Fill Color</Label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="color"
                    value={shapeColor}
                    onChange={(e) => setShapeColor(e.target.value)}
                    className="w-12 h-8 rounded border border-border cursor-pointer"
                    title="Select fill color"
                  />
                  <Input 
                    value={shapeColor} 
                    onChange={(e) => setShapeColor(e.target.value)}
                    placeholder="#FFFFFF" 
                    className="flex-1"
                    title="Enter hex color code"
                  />
                </div>
              </div>
              
              <div>
                <Label>Default Border Color</Label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="color"
                    value={shapeBorderColor}
                    onChange={(e) => setShapeBorderColor(e.target.value)}
                    className="w-12 h-8 rounded border border-border cursor-pointer"
                    title="Select border color"
                  />
                  <Input 
                    value={shapeBorderColor} 
                    onChange={(e) => setShapeBorderColor(e.target.value)}
                    placeholder="#000000" 
                    className="flex-1"
                    title="Enter hex color code"
                  />
                </div>
              </div>
              
              <div>
                <Label>Default Border Width: {shapeBorderWidth[0]}px</Label>
                <Slider 
                  value={shapeBorderWidth} 
                  onValueChange={setShapeBorderWidth}
                  max={10} 
                  min={0} 
                  step={1} 
                  className="mt-2" 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Upload Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => document.getElementById('sidebar-image-upload')?.click()}
                >
                  {isUploading ? (
                    <div className="space-y-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                      <p className="text-sm text-muted-foreground">Uploading...</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm font-medium">Click to upload an image</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                  <input
                    id="sidebar-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={onImageUpload}
                    className="hidden"
                    title="Upload image"
                  />
                </div>
                
                {uploadedImages.size > 0 && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Uploaded Images</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                      {Array.from(uploadedImages.entries()).map(([imageId, imageUrl]) => (
                        <div 
                          key={imageId}
                          className="aspect-square bg-muted/50 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                          onClick={() => onAddImageFromTemplate(imageId)}
                        >
                          <Image
                            src={imageUrl}
                            alt={`Uploaded ${imageId}`}
                            fill
                            className="w-full h-full object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
