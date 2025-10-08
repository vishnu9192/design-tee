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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { 
  Sparkles, 
  Wand2, 
  Palette, 
  Download, 
  RefreshCw, 
  Heart, 
  Copy, 
  Edit3, 
  Settings,
  Zap,
  Lightbulb,
  ImageIcon,
  Layers,
  Eye,
  Star,
  Clock,
  TrendingUp
} from "lucide-react"

export default function AIDesignPage() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("")
  const [colors, setColors] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [creativity, setCreativity] = useState([0.7])
  const [variations, setVariations] = useState([4])
  const [highQuality, setHighQuality] = useState(true)
  const [activeTab, setActiveTab] = useState("prompts")
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  type GeneratedDesign = {
    id: number
    prompt: string
    style: string
    colors: string
    image: string
    liked: boolean
    rating?: number
    generatedAt: string
  }

  const [generatedDesigns, setGeneratedDesigns] = useState<GeneratedDesign[]>([])
  const [designHistory, setDesignHistory] = useState<GeneratedDesign[]>([])

  const styleOptions = [
    { value: "minimalist", label: "Minimalist", description: "Clean, simple designs with minimal elements" },
    { value: "vintage", label: "Vintage", description: "Retro-inspired designs with aged aesthetics" },
    { value: "modern", label: "Modern", description: "Contemporary designs with bold elements" },
    { value: "abstract", label: "Abstract", description: "Non-representational artistic designs" },
    { value: "geometric", label: "Geometric", description: "Pattern-based designs with shapes" },
    { value: "hand-drawn", label: "Hand-drawn", description: "Sketchy, artistic hand-crafted look" },
    { value: "typography", label: "Typography", description: "Text-focused design elements" },
    { value: "nature", label: "Nature", description: "Organic, botanical, and natural themes" },
    { value: "urban", label: "Urban", description: "Street art and city-inspired designs" },
    { value: "retro", label: "Retro", description: "80s and 90s nostalgic styles" },
    { value: "cyberpunk", label: "Cyberpunk", description: "Futuristic sci-fi aesthetic" },
    { value: "watercolor", label: "Watercolor", description: "Soft, flowing paint effects" }
  ]

  const colorSchemes = [
    { value: "vibrant", label: "Vibrant", colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"] },
    { value: "pastel", label: "Pastel", colors: ["#FFB3BA", "#BAFFC9", "#BAE1FF", "#FFFFBA"] },
    { value: "monochrome", label: "Monochrome", colors: ["#000000", "#404040", "#808080", "#FFFFFF"] },
    { value: "earth", label: "Earth Tones", colors: ["#8B4513", "#A0522D", "#CD853F", "#DEB887"] },
    { value: "neon", label: "Neon", colors: ["#FF073A", "#39FF14", "#00FFFF", "#FF1493"] },
    { value: "sunset", label: "Sunset", colors: ["#FF6B35", "#F7931E", "#FFD23F", "#FF1744"] },
    { value: "ocean", label: "Ocean", colors: ["#006994", "#0085A1", "#00A8CC", "#7FDBFF"] },
    { value: "forest", label: "Forest", colors: ["#228B22", "#32CD32", "#90EE90", "#ADFF2F"] }
  ]

  const promptCategories = [
    {
      name: "Animals & Nature",
      prompts: [
        "Majestic wolf silhouette howling at a crescent moon",
        "Geometric hummingbird with watercolor splashes",
        "Mountain landscape with minimalist line art",
        "Ocean waves in Japanese art style",
        "Forest animals in vintage illustration style"
      ]
    },
    {
      name: "Abstract & Geometric",
      prompts: [
        "Sacred geometry patterns with golden ratio",
        "Abstract waves flowing in neon colors",
        "Crystalline structures with gradient effects",
        "Mandala design with modern twist",
        "Fragmented reality in cubist style"
      ]
    },
    {
      name: "Typography & Quotes",
      prompts: [
        "Adventure awaits in bold adventure typography",
        "Coffee lover quote with vintage coffee elements",
        "Motivational quote with geometric background",
        "Retro gaming slogan with pixel art elements",
        "Music lyrics with sound wave visualization"
      ]
    },
    {
      name: "Pop Culture & Gaming",
      prompts: [
        "Retro gaming controller with 8-bit elements",
        "Space exploration with vintage sci-fi aesthetics",
        "Superhero emblem in minimalist style",
        "Anime-inspired character silhouette",
        "Cyberpunk cityscape with neon accents"
      ]
    },
    {
      name: "Lifestyle & Hobbies",
      prompts: [
        "Yoga pose silhouette with mandala background",
        "Bicycle wheel with nature elements inside",
        "Camera lens revealing beautiful landscape",
        "Musical instruments in watercolor style",
        "Cooking utensils with hand-lettered recipe"
      ]
    }
  ]

  const examplePrompts = promptCategories.flatMap(category => category.prompts).slice(0, 6)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setIsGenerating(true)

    // Simulate AI generation with multiple results
    setTimeout(() => {
      const newDesigns = Array.from({ length: variations[0] }, (_, index) => ({
        id: Date.now() + index + 1,
        prompt: prompt,
        style: style,
        colors: colors,
        image: `/ai-generated-design-${index + 1}.${index % 2 === 0 ? 'png' : 'jpg'}`,
        liked: false,
        rating: Math.floor(Math.random() * 5) + 1,
        generatedAt: new Date().toISOString(),
      }))
      setGeneratedDesigns(newDesigns)
      setDesignHistory(prev => [...newDesigns, ...prev])
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
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AI Design Generator</h1>
              <p className="text-sm text-muted-foreground">Create unique designs with artificial intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
              <Zap className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1" />
              {designHistory.length} designs created
            </Badge>
          </div>
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
                  <Label htmlFor="style" className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Art Style
                  </Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose an art style" />
                    </SelectTrigger>
                    <SelectContent>
                      {styleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex flex-col gap-1">
                            <span className="font-medium">{option.label}</span>
                            <span className="text-xs text-muted-foreground">{option.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="colors" className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Color Palette
                  </Label>
                  <Select value={colors} onValueChange={setColors}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select color scheme" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorSchemes.map((scheme) => (
                        <SelectItem key={scheme.value} value={scheme.value}>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {scheme.colors.slice(0, 3).map((color, index) => (
                                <div
                                  key={index}
                                  className="w-3 h-3 rounded-full border border-border"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <span>{scheme.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Advanced Settings */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Settings className="h-4 w-4" />
                    Advanced Settings
                  </Label>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-sm">Creativity Level</Label>
                      <span className="text-xs text-muted-foreground">{Math.round(creativity[0] * 100)}%</span>
                    </div>
                    <Slider
                      value={creativity}
                      onValueChange={setCreativity}
                      max={1}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Higher values create more unique and abstract designs
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-sm">Number of Variations</Label>
                      <span className="text-xs text-muted-foreground">{variations[0]}</span>
                    </div>
                    <Slider
                      value={variations}
                      onValueChange={setVariations}
                      max={8}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm">High Quality Mode</Label>
                      <p className="text-xs text-muted-foreground">Better quality, slower generation</p>
                    </div>
                    <Switch checked={highQuality} onCheckedChange={setHighQuality} />
                  </div>
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

                {/* Prompt Inspiration */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Lightbulb className="h-4 w-4" />
                    Prompt Inspiration
                  </Label>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="prompts" className="text-xs">Quick Ideas</TabsTrigger>
                      <TabsTrigger value="categories" className="text-xs">Categories</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="prompts" className="mt-3 space-y-2">
                      {examplePrompts.slice(0, 4).map((example, index) => (
                        <button
                          key={index}
                          onClick={() => setPrompt(example)}
                          className="w-full text-left p-3 text-xs bg-muted/50 hover:bg-muted rounded-lg transition-all hover:scale-[1.02] border border-transparent hover:border-primary/20"
                        >
                          <div className="flex items-start gap-2">
                            <Sparkles className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                            <span className="line-clamp-2">{example}</span>
                          </div>
                        </button>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="categories" className="mt-3">
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="text-xs">
                          <SelectValue placeholder="Choose category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {promptCategories.map((category) => (
                            <SelectItem key={category.name} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
                        {(selectedCategory === "all" 
                          ? promptCategories.flatMap(cat => cat.prompts)
                          : promptCategories.find(cat => cat.name === selectedCategory)?.prompts || []
                        ).slice(0, 6).map((example, index) => (
                          <button
                            key={index}
                            onClick={() => setPrompt(example)}
                            className="w-full text-left p-2 text-xs bg-muted/30 hover:bg-muted rounded-md transition-all"
                          >
                            {example}
                          </button>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
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
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <ImageIcon className="h-6 w-6 text-primary" />
                      Generated Designs
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      {generatedDesigns.length} variations based on your prompt
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleGenerate} className="bg-transparent">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Generate More
                    </Button>
                    <Button variant="outline" className="bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview All
                    </Button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {generatedDesigns.map((design) => (
                    <Card key={design.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                      <CardContent className="p-0">
                        <div className="aspect-square bg-muted/50 relative overflow-hidden">
                          <Image
                            src={design.image || "/placeholder.svg"}
                            alt="AI Generated Design"
                            fill
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3 flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 bg-background/90 backdrop-blur-sm hover:bg-background shadow-sm"
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
                              className="h-8 w-8 p-0 bg-background/90 backdrop-blur-sm hover:bg-background shadow-sm"
                            >
                              <Copy className="h-4 w-4 text-muted-foreground" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 bg-background/90 backdrop-blur-sm hover:bg-background shadow-sm"
                            >
                              <Download className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </div>
                          <div className="absolute bottom-3 left-3 flex gap-2">
                            <Badge className="bg-background/90 text-foreground backdrop-blur-sm border">
                              {styleOptions.find(s => s.value === design.style)?.label || "AI Generated"}
                            </Badge>
                            {design.rating && (
                              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-700 border-yellow-200">
                                <Star className="h-3 w-3 mr-1 fill-current" />
                                {design.rating}
                              </Badge>
                            )}
                          </div>
                          <div className="absolute top-3 left-3">
                            <Badge variant="outline" className="bg-background/90 backdrop-blur-sm text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(design.generatedAt).toLocaleDateString()}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {design.prompt}
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" asChild>
                              <Link href={`/dashboard/design?ai-design=${design.id}`}>
                                <Edit3 className="h-4 w-4 mr-1" />
                                Use Design
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                              <Layers className="h-4 w-4 mr-1" />
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
              <Card className="border-2 border-dashed border-muted-foreground/25">
                <CardContent className="py-16">
                  <div className="text-center max-w-2xl mx-auto">
                    <div className="mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Ready to Create Something Amazing?</h3>
                      <p className="text-muted-foreground mb-8 text-lg">
                        Describe your ideal t-shirt design and let our AI bring your vision to life with multiple unique variations.
                      </p>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {examplePrompts.slice(3, 6).map((example, index) => (
                        <button
                          key={index}
                          onClick={() => setPrompt(example)}
                          className="p-4 text-sm bg-gradient-to-br from-muted/50 to-muted/30 hover:from-muted to-muted/70 rounded-xl transition-all hover:scale-105 text-left group border border-border hover:border-primary/30"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                              <Lightbulb className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="line-clamp-3 group-hover:text-primary transition-colors">
                                {example}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      <Badge variant="outline" className="px-4 py-2">
                        <Zap className="h-4 w-4 mr-2" />
                        Instant Generation
                      </Badge>
                      <Badge variant="outline" className="px-4 py-2">
                        <Star className="h-4 w-4 mr-2" />
                        Multiple Variations
                      </Badge>
                      <Badge variant="outline" className="px-4 py-2">
                        <Layers className="h-4 w-4 mr-2" />
                        Fully Customizable
                      </Badge>
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
