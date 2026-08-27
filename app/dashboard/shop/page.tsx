"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  Grid3X3, 
  List, 
  Search, 
  Heart,
  ShoppingCart,
  Star,
  TrendingUp,
  Zap,
  Palette,
  Sparkles,
  Eye,
  SlidersHorizontal,
  ArrowUpDown,
  X
} from "lucide-react"
import Image from "next/image"

// TODO: Replace with real categories from database
interface Category {
  id: string
  name: string
  description: string
  image: string
  count: number
  featured: boolean
  colors: string[]
}
const categories: Category[] = []

// TODO: Replace with real featured products from database
interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number | null
  rating: number
  reviews: number
  image: string
  isNew: boolean
  isBestseller: boolean
  colors: number
  category: string
}
const featuredProducts: Product[] = []

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")

  const filteredProducts = featuredProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header with Search and Filters */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search designs, products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-transparent"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {showFilters && <X className="h-4 w-4 ml-2" />}
              </Button>
              
              <div className="flex border border-border rounded-md">
                <Button 
                  variant={viewMode === "grid" ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "ghost"} 
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none border-l"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="T-Shirts">T-Shirts</SelectItem>
                      <SelectItem value="Button Shirts">Button Shirts</SelectItem>
                      <SelectItem value="Hoodies">Hoodies</SelectItem>
                      <SelectItem value="Tank Tops">Tank Tops</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="0-25">$0 - $25</SelectItem>
                      <SelectItem value="25-35">$25 - $35</SelectItem>
                      <SelectItem value="35-50">$35 - $50</SelectItem>
                      <SelectItem value="50+">$50+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedCategory("all")
                      setPriceRange("all")
                      setSearchQuery("")
                    }}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-blue-950/20">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Express Your
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Style</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
              Discover our premium collection of customizable apparel. From classic tees to statement pieces, 
              find the perfect canvas for your creativity.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Designed
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <Palette className="h-4 w-4 mr-2" />
                Fully Customizable
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <Zap className="h-4 w-4 mr-2" />
                Premium Quality
              </Badge>
            </div>
            
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Eye className="h-5 w-5 mr-2" />
              Explore Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our wide range of apparel types, each perfect for custom designs and personal expression.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="featured">Featured Only</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                    <CardContent className="p-0">
                      <div className="aspect-square bg-muted/50 relative overflow-hidden">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          fill
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-background/90 text-foreground backdrop-blur-sm">
                            {category.count} items
                          </Badge>
                        </div>
                        <div className="absolute bottom-3 left-3 flex gap-1">
                          {category.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h3 className="text-lg font-bold flex items-center gap-2">
                            {category.name}
                            {category.featured && (
                              <Badge variant="secondary" className="text-xs">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Hot
                              </Badge>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                        <Button asChild className="w-full">
                          <Link href={`/dashboard/shop/${category.id}`}>
                            Browse {category.name}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="featured">
              <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {categories.filter(cat => cat.featured).map((category) => (
                  <Card key={category.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                    <CardContent className="p-0">
                      <div className="aspect-square bg-muted/50 relative overflow-hidden">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          fill
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          Featured
                        </Badge>
                      </div>
                      <div className="p-6 space-y-3">
                        <h3 className="text-xl font-bold">{category.name}</h3>
                        <p className="text-muted-foreground">{category.description}</p>
                        <Button asChild className="w-full">
                          <Link href={`/dashboard/shop/${category.id}`}>
                            Browse {category.name}
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Trending Designs</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular designs, loved by our community of creators and fashion enthusiasts.
            </p>
          </div>
          
          <div className={`grid gap-6 ${viewMode === "grid" 
            ? "sm:grid-cols-2 lg:grid-cols-4" 
            : "grid-cols-1 max-w-4xl mx-auto"
          }`}>
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className={`group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <CardContent className={`p-0 ${viewMode === "list" ? "flex w-full" : ""}`}>
                  <div className={`bg-muted/50 relative overflow-hidden ${
                    viewMode === "list" 
                      ? "w-48 h-48 shrink-0" 
                      : "aspect-square"
                  }`}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <Badge className="bg-green-500 text-white">
                          <Sparkles className="h-3 w-3 mr-1" />
                          New
                        </Badge>
                      )}
                      {product.isBestseller && (
                        <Badge className="bg-orange-500 text-white">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Bestseller
                        </Badge>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-background/90 backdrop-blur-sm hover:bg-background shadow-sm">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-background/90 backdrop-blur-sm hover:bg-background shadow-sm">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                    
                    {/* Color Indicator */}
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="outline" className="bg-background/90 backdrop-blur-sm text-xs">
                        <Palette className="h-3 w-3 mr-1" />
                        {product.colors} colors
                      </Badge>
                    </div>
                  </div>
                  
                  <div className={`p-4 space-y-3 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-lg line-clamp-1">{product.name}</h4>
                        {viewMode === "list" && (
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                              <span className="font-bold text-xl">${product.price}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                        <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                      </div>
                    </div>
                    
                    {viewMode === "grid" && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                          <span className="font-bold text-lg">${product.price}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className={`flex gap-2 ${viewMode === "list" ? "mt-4" : ""}`}>
                      <Button size="sm" className="flex-1">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
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
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild className="bg-transparent">
              <Link href="/dashboard/shop/all">
                View All Products
                <Eye className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
