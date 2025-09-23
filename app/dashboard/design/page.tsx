"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
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
  ArrowLeft,
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
} from "lucide-react"

export default function DesignStudioPage() {
  const [selectedProduct, setSelectedProduct] = useState("tshirt")
  const [selectedColor, setSelectedColor] = useState("white")
  type DesignElement = {
    id: number
    type: string
    content: string
    x: number
    y: number
    width: number
    height: number
  }
  const [designElements, setDesignElements] = useState<DesignElement[]>([])
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const productColors = [
    { name: "White", value: "white", hex: "#FFFFFF" },
    { name: "Black", value: "black", hex: "#000000" },
    { name: "Navy", value: "navy", hex: "#1E3A8A" },
    { name: "Red", value: "red", hex: "#DC2626" },
    { name: "Green", value: "green", hex: "#16A34A" },
    { name: "Yellow", value: "yellow", hex: "#EAB308" },
  ]

  const designTemplates = [
    { id: 1, name: "Minimalist Text", category: "text", image: "/minimalist-text-design.png" },
    { id: 2, name: "Geometric Pattern", category: "pattern", image: "/geometric-pattern-design.jpg" },
    { id: 3, name: "Nature Inspired", category: "nature", image: "/nature-pattern-design.jpg" },
    { id: 4, name: "Urban Street", category: "street", image: "/urban-street-art.png" },
    { id: 5, name: "Abstract Art", category: "abstract", image: "/abstract-art-design.png" },
    { id: 6, name: "Vintage Logo", category: "vintage", image: "/vintage-logo-design.jpg" },
  ]

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) return
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      // Add generated design to elements
      setDesignElements([
        ...designElements,
        {
          id: Date.now(),
          type: "ai-generated",
          content: aiPrompt,
          x: 50,
          y: 50,
          width: 200,
          height: 200,
        },
      ])
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/shop">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Shop
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Palette className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">Design Studio</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar - Tools */}
        <div className="w-80 border-r border-border bg-card/30 overflow-y-auto">
          <Tabs defaultValue="ai" className="p-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ai" className="text-xs">
                <Sparkles className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="templates" className="text-xs">
                <Square className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="text" className="text-xs">
                <Type className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="shapes" className="text-xs">
                <Circle className="h-4 w-4" />
              </TabsTrigger>
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
                  <div className="text-xs text-muted-foreground">
                    <p>Pro tip: Be specific about colors, style, and elements for better results.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="templates" className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Design Templates</h3>
                <div className="grid grid-cols-2 gap-3">
                  {designTemplates.map((template) => (
                    <Card key={template.id} className="group cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="aspect-square bg-muted/50 relative overflow-hidden">
                          <Image
                            src={template.image || "/placeholder.svg"}
                            alt={template.name}
                            fill
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-2">
                          <p className="text-xs font-medium">{template.name}</p>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {template.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
                    <Input id="text-content" placeholder="Enter your text..." />
                  </div>
                  <div>
                    <Label htmlFor="font-family">Font Family</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arial">Arial</SelectItem>
                        <SelectItem value="helvetica">Helvetica</SelectItem>
                        <SelectItem value="times">Times New Roman</SelectItem>
                        <SelectItem value="georgia">Georgia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Font Size</Label>
                    <Slider defaultValue={[24]} max={72} min={8} step={1} className="mt-2" />
                  </div>
                  <Button className="w-full">
                    <Type className="h-4 w-4 mr-2" />
                    Add Text
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Shapes Tab */}
            <TabsContent value="shapes" className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Basic Shapes</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="aspect-square bg-transparent">
                    <Square className="h-6 w-6" />
                  </Button>
                  <Button variant="outline" className="aspect-square bg-transparent">
                    <Circle className="h-6 w-6" />
                  </Button>
                  <Button variant="outline" className="aspect-square bg-transparent">
                    <Triangle className="h-6 w-6" />
                  </Button>
                </div>
              </div>
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
          <div className="flex-1 bg-muted/20 flex items-center justify-center p-8">
            <div className="relative">
              {/* Product Preview */}
              <div className="w-96 h-96 relative">
                <Image
                  src={
                    selectedProduct === "tshirt"
                      ? selectedColor === "white"
                        ? "/white-t-shirt.png"
                        : selectedColor === "black"
                          ? "/black-t-shirt.png"
                          : "/blue-t-shirt.png"
                      : "/white-button-shirt.png"
                  }
                  alt="Product"
                  width={384}
                  height={384}
                  className="w-full h-full object-contain"
                />
                {/* Design Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-dashed border-primary/30 flex items-center justify-center bg-background/10 backdrop-blur-sm rounded-lg">
                    {designElements.length === 0 ? (
                      <div className="text-center text-muted-foreground">
                        <Palette className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Your design will appear here</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                          <Sparkles className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-xs mt-2 text-foreground">AI Generated Design</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 border-l border-border bg-card/30 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Product Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Product Type</Label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger>
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
                        className={`w-full h-10 rounded-md border-2 flex items-center justify-center text-xs font-medium transition-all ${
                          selectedColor === color.value
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-border hover:border-primary/50"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        <span className={color.value === "white" ? "text-black" : "text-white"}>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Design Properties */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Design Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Position</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <Label htmlFor="pos-x" className="text-xs">
                        X
                      </Label>
                      <Input id="pos-x" type="number" defaultValue="0" />
                    </div>
                    <div>
                      <Label htmlFor="pos-y" className="text-xs">
                        Y
                      </Label>
                      <Input id="pos-y" type="number" defaultValue="0" />
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Size</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <Label htmlFor="width" className="text-xs">
                        Width
                      </Label>
                      <Input id="width" type="number" defaultValue="200" />
                    </div>
                    <div>
                      <Label htmlFor="height" className="text-xs">
                        Height
                      </Label>
                      <Input id="height" type="number" defaultValue="200" />
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Rotation</Label>
                  <Slider defaultValue={[0]} max={360} min={0} step={1} className="mt-2" />
                </div>
              </CardContent>
            </Card>

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
