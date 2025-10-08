"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Wand2, Palette, Download, RefreshCw, Heart } from "lucide-react"

export default function AIDesignPage() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("")
  const [colors, setColors] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  type GeneratedDesign = {
    id: number
    prompt: string
    style: string
    colors: string
    image: string
    liked: boolean
  }

  const [generatedDesigns, setGeneratedDesigns] = useState<GeneratedDesign[]>([])

  const styleOptions = [
    "Minimalist",
    "Vintage",
    "Modern",
    "Abstract",
    "Geometric",
    "Hand-drawn",
    "Typography",
    "Nature",
    "Urban",
    "Retro",
  ]

  const colorSchemes = ["Vibrant", "Pastel", "Monochrome", "Earth Tones", "Neon", "Sunset", "Ocean", "Forest", "Custom"]

  const examplePrompts = [
    "A majestic mountain landscape with geometric shapes",
    "Vintage coffee shop logo with hand-lettered text",
    "Abstract waves in ocean colors",
    "Minimalist line art of a city skyline",
    "Retro 80s neon grid pattern",
    "Hand-drawn botanical illustrations",
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setIsGenerating(true)

    // Simulate AI generation with multiple results
    setTimeout(() => {
      const newDesigns = [
        {
          id: Date.now() + 1,
          prompt: prompt,
          style: style,
          colors: colors,
          image: "/ai-generated-design-1.png",
          liked: false,
        },
        {
          id: Date.now() + 2,
          prompt: prompt,
          style: style,
          colors: colors,
          image: "/ai-generated-design-2.jpg",
          liked: false,
        },
        {
          id: Date.now() + 3,
          prompt: prompt,
          style: style,
          colors: colors,
          image: "/ai-generated-design-3.png",
          liked: false,
        },
        {
          id: Date.now() + 4,
          prompt: prompt,
          style: style,
          colors: colors,
          image: "/ai-generated-design-4.jpg",
          liked: false,
        },
      ]
      setGeneratedDesigns(newDesigns)
      setIsGenerating(false)
    }, 4000)
  }

  const toggleLike = (id: number) => {
    setGeneratedDesigns((prev) =>
      prev.map((design) => (design.id === id ? { ...design, liked: !design.liked } : design)),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">AI Design Generator</h1>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Powered by AI
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-primary" />
                  Design Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="prompt">Design Description</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Describe your ideal t-shirt design in detail..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Be specific about elements, mood, and composition for better results.
                  </p>
                </div>

                <div>
                  <Label htmlFor="style">Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose a style" />
                    </SelectTrigger>
                    <SelectContent>
                      {styleOptions.map((option) => (
                        <SelectItem key={option} value={option.toLowerCase()}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="colors">Color Scheme</Label>
                  <Select value={colors} onValueChange={setColors}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select color palette" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorSchemes.map((scheme) => (
                        <SelectItem key={scheme} value={scheme.toLowerCase()}>
                          {scheme}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="w-full">
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                      Generating Designs...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Designs
                    </>
                  )}
                </Button>

                {/* Example Prompts */}
                <div>
                  <Label className="text-sm font-medium">Example Prompts</Label>
                  <div className="space-y-2 mt-2">
                    {examplePrompts.slice(0, 3).map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(example)}
                        className="w-full text-left p-2 text-xs bg-muted/50 hover:bg-muted rounded-md transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Results */}
          <div className="lg:col-span-2">
            {isGenerating && (
              <Card className="mb-8">
                <CardContent className="py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Creating Your Designs</h3>
                    <p className="text-muted-foreground">
                      Our AI is analyzing your prompt and generating unique designs...
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {generatedDesigns.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Generated Designs</h2>
                  <Button variant="outline" onClick={handleGenerate} className="bg-transparent">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Generate More
                  </Button>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {generatedDesigns.map((design) => (
                    <Card key={design.id} className="group hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="aspect-square bg-muted/50 relative overflow-hidden">
                          <Image
                            src={design.image || "/placeholder.svg"}
                            alt="AI Generated Design"
                            fill
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2 flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background"
                              onClick={() => toggleLike(design.id)}
                            >
                              <Heart
                                className={`h-4 w-4 ${
                                  design.liked ? "fill-red-500 text-red-500" : "text-muted-foreground"
                                }`}
                              />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background"
                            >
                              <Download className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                          <div className="absolute bottom-2 left-2">
                            <Badge className="bg-background/80 text-foreground backdrop-blur-sm">
                              {design.style || "AI Generated"}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{design.prompt}</p>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1" asChild>
                              <Link href={`/design?ai-design=${design.id}`}>Use This Design</Link>
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                              <Palette className="h-4 w-4 mr-1" />
                              Customize
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {generatedDesigns.length === 0 && !isGenerating && (
              <Card>
                <CardContent className="py-16">
                  <div className="text-center">
                    <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Ready to Create Something Amazing?</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Describe your ideal t-shirt design and let our AI bring your vision to life with multiple unique
                      variations.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                      {examplePrompts.slice(3, 5).map((example, index) => (
                        <button
                          key={index}
                          onClick={() => setPrompt(example)}
                          className="p-3 text-sm bg-muted/50 hover:bg-muted rounded-lg transition-colors text-left"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
