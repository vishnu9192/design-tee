"use client"

import { useState, useEffect, useLayoutEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Palette,
  Type,
  Sparkles,
  Download,
  Save,
  Undo,
  Redo,
  RotateCcw,
  Square,
  Circle,
  Triangle,
  Shirt,
  Zap,
  Image as ImageIcon,
  Layers,
  Eye,
  Trash2,
  Copy,
  Grid,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Heart,
  Share,
  Lightbulb
} from "lucide-react"

type DesignElement = {
  id: number
  type: string
  content: string
  x: number
  y: number
  width: number
  height: number
  rotation?: number
  fontSize?: number
  fontFamily?: string
  fontWeight?: string
  fontStyle?: string
  textAlign?: string
  color?: string
  backgroundColor?: string
  borderWidth?: number
}

export default function DesignStudioPage() {
  const [selectedProduct, setSelectedProduct] = useState("tshirt")
  const [selectedColor, setSelectedColor] = useState("white")
  const [designElements, setDesignElements] = useState<DesignElement[]>([])
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedElement, setSelectedElement] = useState<number | null>(null)
  const [zoom, setZoom] = useState(100)
  const [showGrid, setShowGrid] = useState(false)
  const [history, setHistory] = useState<DesignElement[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [aiDesignImage, setAiDesignImage] = useState<string | null>(null)
  
  // Text tool states
  const [textContent, setTextContent] = useState("")
  const [fontSize, setFontSize] = useState([24])
  const [fontFamily, setFontFamily] = useState("arial")
  const [fontWeight, setFontWeight] = useState("normal")
  const [fontStyle, setFontStyle] = useState("normal")
  const [textAlign, setTextAlign] = useState("center")
  const [textColor, setTextColor] = useState("#000000")
  const [textUnderline, setTextUnderline] = useState(false)
  
  // Image upload states
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  
  // Shape tool states
  const [shapeColor, setShapeColor] = useState("#FFFFFF")
  const [shapeBorderColor, setShapeBorderColor] = useState("#000000")
  const [shapeBorderWidth, setShapeBorderWidth] = useState([2])
  
  // Drag and drop states
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Load AI design image from localStorage if available
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const storedImage = localStorage.getItem('pendingAIDesignImage')
      const storedPrompt = localStorage.getItem('pendingAIDesignPrompt')
      
      if (storedImage) {
        console.log('Loading AI design image:', storedImage)
        setAiDesignImage(storedImage)
        // Clear localStorage after loading
        localStorage.removeItem('pendingAIDesignImage')
        localStorage.removeItem('pendingAIDesignPrompt')
      }
    }
  }, [])

  const productColors = [
    { name: "White", value: "white", hex: "#FFFFFF" },
    { name: "Black", value: "black", hex: "#000000" },
    { name: "Navy", value: "navy", hex: "#1E3A8A" },
    { name: "Red", value: "red", hex: "#DC2626" },
    { name: "Green", value: "green", hex: "#16A34A" },
    { name: "Yellow", value: "yellow", hex: "#EAB308" },
    { name: "Purple", value: "purple", hex: "#9333EA" },
    { name: "Pink", value: "pink", hex: "#EC4899" },
    { name: "Orange", value: "orange", hex: "#EA580C" },
    { name: "Gray", value: "gray", hex: "#6B7280" },
  ]

  const designTemplates = [
    { id: 1, name: "Minimalist Text", category: "text", image: "/minimalist-text-design.png", popular: true },
    { id: 2, name: "Geometric Pattern", category: "pattern", image: "/geometric-pattern-design.jpg", popular: false },
    { id: 3, name: "Nature Inspired", category: "nature", image: "/nature-pattern-design.jpg", popular: true },
    { id: 4, name: "Urban Street", category: "street", image: "/urban-street-art.png", popular: false },
    { id: 5, name: "Abstract Art", category: "abstract", image: "/abstract-art-design.png", popular: false },
    { id: 6, name: "Vintage Logo", category: "vintage", image: "/vintage-logo-design.jpg", popular: true },
    { id: 7, name: "Sunset Design", category: "nature", image: "/sunset-design.png", popular: true },
    { id: 8, name: "Typography", category: "text", image: "/typography-t-shirt-design.jpg", popular: false },
  ]

  const aiPromptSuggestions = [
    "A minimalist sunset over mountains with geometric shapes",
    "Urban street art with graffiti style typography",
    "Vintage-inspired logo with retro colors",
    "Abstract geometric pattern in pastel colors",
    "Nature-inspired mandala design",
    "Bold typography with motivational quote",
    "Cyberpunk-style neon design",
    "Hand-drawn botanical illustration"
  ]

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) return
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      // Add generated design to elements
      const newElement: DesignElement = {
        id: Date.now(),
        type: "ai-generated",
        content: aiPrompt,
        x: 50,
        y: 50,
        width: 200,
        height: 200,
        rotation: 0,
        color: "#000000"
      }
      setDesignElements([...designElements, newElement])
      addToHistory([...designElements, newElement])
    }, 3000)
  }

  const handleAddText = () => {
    if (!textContent.trim()) return
    
    const newElement: DesignElement = {
      id: Date.now(),
      type: "text",
      content: textContent,
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      rotation: 0,
      fontSize: fontSize[0],
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      fontStyle: fontStyle,
      textAlign: textAlign,
      color: textColor
    }
    
    setDesignElements([...designElements, newElement])
    addToHistory([...designElements, newElement])
    setTextContent("")
  }

  const handleAddShape = (shapeType: string) => {
    const newElement: DesignElement = {
      id: Date.now(),
      type: "shape",
      content: shapeType,
      x: 120,
      y: 120,
      width: 100,
      height: 100,
      rotation: 0,
      color: shapeBorderColor,
      backgroundColor: shapeColor
    }
    
    setDesignElements([...designElements, newElement])
    addToHistory([...designElements, newElement])
  }

  const addToHistory = (elements: DesignElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(elements)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setDesignElements(history[historyIndex - 1] || [])
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setDesignElements(history[historyIndex + 1])
    }
  }

  const handleReset = () => {
    setDesignElements([])
    setHistory([[]])
    setHistoryIndex(0)
  }

  const deleteElement = (elementId: number) => {
    const newElements = designElements.filter(el => el.id !== elementId)
    setDesignElements(newElements)
    addToHistory(newElements)
    if (selectedElement === elementId) {
      setSelectedElement(null)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    setIsUploading(true)
    // Create a file reader to convert the image to base64
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      setUploadedImages([...uploadedImages, imageUrl])
      
      // Add image element to design
      const newElement: DesignElement = {
        id: Date.now(),
        type: "image",
        content: imageUrl,
        x: 50,
        y: 50,
        width: 150,
        height: 150,
        rotation: 0
      }
      
      setDesignElements([...designElements, newElement])
      addToHistory([...designElements, newElement])
    }
    
    reader.readAsDataURL(file)
  }

  const addImageFromTemplate = (imageUrl: string) => {
    const newElement: DesignElement = {
      id: Date.now(),
      type: "template",
      content: imageUrl,
      x: 30,
      y: 30,
      width: 180,
      height: 180,
      rotation: 0
    }
    
    setDesignElements([...designElements, newElement])
    addToHistory([...designElements, newElement])
  }

  const handleElementMouseDown = (e: React.MouseEvent, elementId: number) => {
    e.preventDefault()
    setSelectedElement(elementId)
    setIsDragging(true)
    const element = designElements.find(el => el.id === elementId)
    if (element) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  // Mouse move handler for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedElement !== null) {
      const canvasRect = e.currentTarget.getBoundingClientRect()
      const newX = e.clientX - canvasRect.left - dragOffset.x
      const newY = e.clientY - canvasRect.top - dragOffset.y
      
      const updatedElements = designElements.map(el =>
        el.id === selectedElement ? { ...el, x: Math.max(0, newX), y: Math.max(0, newY) } : el
      )
      setDesignElements(updatedElements)
    }
  }

  // Mouse up handler to stop dragging
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      addToHistory(designElements)
    }
  }

  const duplicateElement = (elementId: number) => {
    const element = designElements.find(el => el.id === elementId)
    if (element) {
      const newElement = {
        ...element,
        id: Date.now(),
        x: element.x + 20,
        y: element.y + 20
      }
      setDesignElements([...designElements, newElement])
      addToHistory([...designElements, newElement])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Design Tools Header */}
      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left - Main Tools */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
              <Button variant="ghost" size="icon" className="size-8" title="AI Generator">
                <Sparkles className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="size-8" title="Text Tool">
                <Type className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="size-8" title="Shapes">
                <Square className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="size-8 relative" 
                title="Upload Image"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <ImageIcon className="h-4 w-4" />
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </Button>
            </div>
            
            {/* Edit Tools */}
            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="size-8" 
                title="Undo"
                onClick={handleUndo}
                disabled={historyIndex <= 0}
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="size-8" 
                title="Redo"
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
              >
                <Redo className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="size-8" 
                title="Reset"
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Alignment Tools */}
            <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
              <Button variant="ghost" size="icon" className="size-8" title="Align Left">
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="size-8" title="Align Center">
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="size-8" title="Align Right">
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>
            
            {/* View Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant={showGrid ? "default" : "ghost"}
                size="sm"
                onClick={() => setShowGrid(!showGrid)}
                title="Toggle Grid"
              >
                <Grid className="h-4 w-4 mr-1" />
                Grid
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Zoom:</span>
                <Select value={zoom.toString()} onValueChange={(value) => setZoom(Number(value))}>
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50%</SelectItem>
                    <SelectItem value="75">75%</SelectItem>
                    <SelectItem value="100">100%</SelectItem>
                    <SelectItem value="125">125%</SelectItem>
                    <SelectItem value="150">150%</SelectItem>
                    <SelectItem value="200">200%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Right - Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Save to Favorites
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="default" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar - Tools */}
        <div className="w-80 border-r border-border bg-card/30 overflow-y-auto">
          <Tabs defaultValue="ai" className="p-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="ai">AI</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="shapes">Shapes</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>
            
            {/* AI Generator Tab */}
            <TabsContent value="ai" className="space-y-4">
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
                    />
                  </div>

                  {/* Quick Suggestions */}
                  <div>
                    <Label className="text-sm flex items-center gap-1">
                      <Lightbulb className="h-3 w-3" />
                      Quick Ideas
                    </Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {aiPromptSuggestions.slice(0, 4).map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-6 bg-transparent"
                          onClick={() => setAiPrompt(suggestion)}
                        >
                          {suggestion.split(' ').slice(0, 3).join(' ')}...
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleGenerateAI} disabled={isGenerating || !aiPrompt.trim()} className="w-full">
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
                            {element.type === "text" && <Type className="h-3 w-3 text-blue-500" />}
                            {element.type === "shape" && <Square className="h-3 w-3 text-green-500" />}
                            {(element.type === "image" || element.type === "template") && <ImageIcon className="h-3 w-3 text-orange-500" />}
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
                                duplicateElement(element.id)
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
                                deleteElement(element.id)
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
                        onClick={() => addImageFromTemplate(template.image)}
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
                        onClick={() => addImageFromTemplate(template.image)}
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
                  <CardTitle className="text-lg">Add Text</CardTitle>
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
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>8px</span>
                      <span>72px</span>
                    </div>
                  </div>

                  {/* Text Style Options */}
                  <div>
                    <Label>Text Style</Label>
                    <div className="flex gap-1 mt-2">
                      <Button 
                        variant={fontWeight === "bold" ? "default" : "outline"} 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setFontWeight(fontWeight === "bold" ? "normal" : "bold")}
                      >
                        <Bold className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant={fontStyle === "italic" ? "default" : "outline"} 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setFontStyle(fontStyle === "italic" ? "normal" : "italic")}
                      >
                        <Italic className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant={textUnderline ? "default" : "outline"} 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setTextUnderline(!textUnderline)}
                      >
                        <Underline className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Text Alignment */}
                  <div>
                    <Label>Text Alignment</Label>
                    <div className="flex gap-1 mt-2">
                      <Button 
                        variant={textAlign === "left" ? "default" : "outline"} 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setTextAlign("left")}
                      >
                        <AlignLeft className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant={textAlign === "center" ? "default" : "outline"} 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setTextAlign("center")}
                      >
                        <AlignCenter className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant={textAlign === "right" ? "default" : "outline"} 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setTextAlign("right")}
                      >
                        <AlignRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Text Color */}
                  <div>
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex gap-2 mt-2">
                      <input
                        type="color"
                        id="text-color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-12 h-8 rounded border border-border cursor-pointer"
                      />
                      <Input 
                        value={textColor} 
                        onChange={(e) => setTextColor(e.target.value)}
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={handleAddText}
                    disabled={!textContent.trim()}
                  >
                    <Type className="h-4 w-4 mr-2" />
                    Add Text
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Text Presets */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Presets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { name: "Heading", style: "font-bold text-2xl" },
                      { name: "Subheading", style: "font-semibold text-lg" },
                      { name: "Body Text", style: "text-base" },
                      { name: "Caption", style: "text-sm text-muted-foreground" }
                    ].map((preset) => (
                      <Button key={preset.name} variant="outline" size="sm" className="w-full bg-transparent text-left justify-start">
                        <span className={preset.style}>{preset.name}</span>
                      </Button>
                    ))}
                  </div>
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
                      onClick={() => handleAddShape("rectangle")}
                      title="Add Rectangle"
                    >
                      <Square className="h-6 w-6" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="aspect-square bg-transparent"
                      onClick={() => handleAddShape("circle")}
                      title="Add Circle"
                    >
                      <Circle className="h-6 w-6" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="aspect-square bg-transparent"
                      onClick={() => handleAddShape("triangle")}
                      title="Add Triangle"
                    >
                      <Triangle className="h-6 w-6" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Global Shape Properties */}
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
                      />
                      <Input 
                        value={shapeColor} 
                        onChange={(e) => setShapeColor(e.target.value)}
                        placeholder="#FFFFFF" 
                        className="flex-1" 
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
                      />
                      <Input 
                        value={shapeBorderColor} 
                        onChange={(e) => setShapeBorderColor(e.target.value)}
                        placeholder="#000000" 
                        className="flex-1" 
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

              {/* Selected Shape Properties */}
              {selectedElement && designElements.find(el => el.id === selectedElement)?.type === "shape" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Selected Shape</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Fill Color</Label>
                      <div className="flex gap-2 mt-2">
                        <input
                          type="color"
                          className="w-12 h-8 rounded border border-border cursor-pointer"
                          defaultValue={designElements.find(el => el.id === selectedElement)?.backgroundColor || "#FFFFFF"}
                          onChange={(e) => {
                            const element = designElements.find(el => el.id === selectedElement)
                            if (element) {
                              const updatedElements = designElements.map(el =>
                                el.id === selectedElement ? { ...el, backgroundColor: e.target.value } : el
                              )
                              setDesignElements(updatedElements)
                            }
                          }}
                        />
                        <Input 
                          defaultValue={designElements.find(el => el.id === selectedElement)?.backgroundColor || "#FFFFFF"}
                          className="flex-1" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Border Color</Label>
                      <div className="flex gap-2 mt-2">
                        <input
                          type="color"
                          className="w-12 h-8 rounded border border-border cursor-pointer"
                          defaultValue={designElements.find(el => el.id === selectedElement)?.color || "#000000"}
                          onChange={(e) => {
                            const element = designElements.find(el => el.id === selectedElement)
                            if (element) {
                              const updatedElements = designElements.map(el =>
                                el.id === selectedElement ? { ...el, color: e.target.value } : el
                              )
                              setDesignElements(updatedElements)
                            }
                          }}
                        />
                        <Input 
                          defaultValue={designElements.find(el => el.id === selectedElement)?.color || "#000000"}
                          className="flex-1" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Border Width</Label>
                      <Slider 
                        defaultValue={[2]} 
                        max={10} 
                        min={0} 
                        step={1} 
                        className="mt-2"
                        onValueChange={(value) => {
                          const element = designElements.find(el => el.id === selectedElement)
                          if (element) {
                            const updatedElements = designElements.map(el =>
                              el.id === selectedElement ? { ...el, borderWidth: value[0] } : el
                            )
                            setDesignElements(updatedElements)
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
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
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    
                    {uploadedImages.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Uploaded Images</Label>
                        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                          {uploadedImages.map((imageUrl, index) => (
                            <div 
                              key={index}
                              className="aspect-square bg-muted/50 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                              onClick={() => addImageFromTemplate(imageUrl)}
                            >
                              <Image
                                src={imageUrl}
                                alt={`Uploaded ${index + 1}`}
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

              {/* Stock Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Stock Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "/nature-pattern-design.jpg",
                      "/urban-street-art.png",
                      "/sunset-design.png",
                      "/geometric-pattern-design.jpg"
                    ].map((imageUrl, index) => (
                      <div 
                        key={index}
                        className="aspect-square bg-muted/50 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all group"
                        onClick={() => addImageFromTemplate(imageUrl)}
                      >
                        <Image
                          src={imageUrl}
                          alt={`Stock ${index + 1}`}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Canvas Toolbar */}
          <div className="border-b border-border bg-card/30 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Redo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Zoom:</span>
                <Button variant="outline" size="sm" className="bg-transparent">
                  100%
                </Button>
              </div>
            </div>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 bg-muted/20 flex items-center justify-center p-8 relative">
            {/* Grid Background */}
            {showGrid && (
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />
            )}
            
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden" style={{ transform: `scale(${zoom / 100})` }}>
              {/* Product Preview */}
              <div className="w-96 h-96 relative">
                {aiDesignImage ? (
                  // Show AI Design Image
                  <Image
                    src={aiDesignImage}
                    alt="AI Design"
                    width={384}
                    height={384}
                    className="w-full h-full object-contain"
                    sizes="384px"
                    priority
                  />
                ) : (
                  // Show regular product selection
                  <Image
                    src={
                      selectedProduct === "tshirt"
                        ? selectedColor === "white"
                          ? "/white-t-shirt.png"
                          : selectedColor === "black"
                            ? "/black-t-shirt.png"
                            : selectedColor === "blue"
                              ? "/blue-t-shirt.png"
                              : selectedColor === "navy"
                                ? "/navy-blue-t-shirt.png"
                                : selectedColor === "red"
                                  ? "/red-t-shirt.png"
                                  : selectedColor === "green"
                                    ? "/green-t-shirt.png"
                                    : "/white-t-shirt.png"
                        : "/white-button-shirt.png"
                    }
                    alt="Product preview"
                    width={384}
                    height={384}
                    className="w-full h-full object-contain"
                    sizes="384px"
                    priority
                  />
                )}
                {/* Design Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-48 h-48 border-2 border-dashed border-primary/30 flex items-center justify-center bg-background/10 backdrop-blur-sm rounded-lg transition-all hover:border-primary/50 relative"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                  >
                    {designElements.length === 0 ? (
                      <div className="text-center text-muted-foreground">
                        <Palette className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Your design will appear here</p>
                        <p className="text-xs text-muted-foreground">Use the tools on the left to get started</p>
                      </div>
                    ) : (
                      <>
                        {/* Render Design Elements */}
                        {designElements.map((element) => (
                          <div
                            key={element.id}
                            className={cn(
                              "absolute cursor-pointer transition-all border-2 border-transparent hover:border-primary/50",
                              selectedElement === element.id && "border-primary ring-2 ring-primary/20",
                              isDragging && selectedElement === element.id && "cursor-grabbing"
                            )}
                            style={{
                              left: `${element.x}px`,
                              top: `${element.y}px`,
                              width: `${element.width}px`,
                              height: `${element.height}px`,
                              transform: `rotate(${element.rotation || 0}deg)`,
                            }}
                            onClick={() => setSelectedElement(selectedElement === element.id ? null : element.id)}
                            onMouseDown={(e) => handleElementMouseDown(e, element.id)}
                          >
                            {element.type === "text" && (
                              <div
                                className="w-full h-full flex items-center justify-center break-words"
                                style={{
                                  fontSize: `${element.fontSize || 16}px`,
                                  fontFamily: element.fontFamily || "arial",
                                  fontWeight: element.fontWeight || "normal",
                                  fontStyle: element.fontStyle || "normal",
                                  textAlign: (element.textAlign as "left" | "center" | "right") || "center",
                                  color: element.color || "#000000",
                                  textDecoration: textUnderline ? "underline" : "none"
                                }}
                              >
                                {element.content}
                              </div>
                            )}
                            
                            {element.type === "shape" && (
                              <div className="w-full h-full flex items-center justify-center">
                                {element.content === "rectangle" && (
                                  <div 
                                    className="w-full h-full" 
                                    style={{ 
                                      backgroundColor: element.backgroundColor || "#FFFFFF",
                                      border: `${element.borderWidth || 2}px solid ${element.color || "#000000"}`
                                    }}
                                  />
                                )}
                                {element.content === "circle" && (
                                  <div 
                                    className="w-full h-full rounded-full" 
                                    style={{ 
                                      backgroundColor: element.backgroundColor || "#FFFFFF",
                                      border: `${element.borderWidth || 2}px solid ${element.color || "#000000"}`
                                    }}
                                  />
                                )}
                                {element.content === "triangle" && (
                                  <div 
                                    className="w-0 h-0"
                                    style={{
                                      borderLeft: `${element.width / 2}px solid transparent`,
                                      borderRight: `${element.width / 2}px solid transparent`,
                                      borderBottom: `${element.height}px solid ${element.backgroundColor || "#FFFFFF"}`,
                                    }}
                                  />
                                )}
                              </div>
                            )}
                            
                            {element.type === "ai-generated" && (
                              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg flex items-center justify-center border border-purple-200 dark:border-purple-700">
                                <div className="text-center">
                                  <Sparkles className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                                  <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">AI Design</p>
                                  <p className="text-xs text-purple-600 dark:text-purple-400 opacity-75 line-clamp-2 max-w-[140px]">
                                    {element.content}
                                  </p>
                                </div>
                              </div>
                            )}
                            
                            {(element.type === "image" || element.type === "template") && (
                              <div className="w-full h-full rounded-lg overflow-hidden border border-border relative">
                                <Image
                                  src={element.content}
                                  alt="Design element"
                                  fill
                                  className="object-cover"
                                  sizes="200px"
                                />
                              </div>
                            )}
                            
                            {/* Selection Handles */}
                            {selectedElement === element.id && (
                              <>
                                <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary rounded-full"></div>
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
                                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full"></div>
                                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
                              </>
                            )}
                          </div>
                        ))}
                        
                        {/* Layer counter */}
                        <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          {designElements.length} elements
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Canvas Info */}
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {selectedProduct.charAt(0).toUpperCase() + selectedProduct.slice(1)} • {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
                </div>
                
                {/* Zoom Info */}
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {zoom}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 border-l border-border bg-card/30 overflow-y-auto">
          <div className="p-4 space-y-4">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Product</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Product Type</Label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tshirt">T-Shirt</SelectItem>
                      <SelectItem value="shirt">Shirt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Color</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {productColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={cn(
                          "w-full h-12 rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-all hover:scale-105",
                          selectedColor === color.value
                            ? "border-primary ring-2 ring-primary/20 shadow-lg"
                            : "border-border hover:border-primary/50"
                        )}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        <span className={color.value === "white" || color.value === "yellow" ? "text-black" : "text-white"}>
                          {color.name}
                        </span>
                        {selectedColor === color.value && (
                          <div className="absolute inset-0 border-2 border-primary rounded-lg"></div>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Selected: {productColors.find(c => c.value === selectedColor)?.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <h2 className="text-lg font-semibold">Design Properties</h2>
              
              <div className="space-y-4">
                <div>
                  <Label>Position</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <Label htmlFor="pos-x" className="text-xs">X</Label>
                      <Input id="pos-x" type="number" defaultValue="0" />
                    </div>
                    <div>
                      <Label htmlFor="pos-y" className="text-xs">Y</Label>
                      <Input id="pos-y" type="number" defaultValue="0" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Size</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <Label htmlFor="width" className="text-xs">Width</Label>
                      <Input id="width" type="number" defaultValue="200" />
                    </div>
                    <div>
                      <Label htmlFor="height" className="text-xs">Height</Label>
                      <Input id="height" type="number" defaultValue="200" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Rotation</Label>
                  <Slider defaultValue={[0]} max={360} min={0} step={1} className="mt-2" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/cart">
                    <Shirt className="h-4 w-4 mr-2" />
                    Add to Cart - $29.99
                  </Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Save className="h-4 w-4 mr-2" />
                  Save Design
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download PNG
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}