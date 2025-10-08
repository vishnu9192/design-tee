"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useTracking } from "@/contexts/tracking-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react"
import { PersonalizedRecommendations, TrendingProducts } from "@/components/recommendations"
import Image from "next/image"

const tshirts = [
  { id: 1, name: "Classic White Tee", price: 24.99, color: "White", image: "/white-t-shirt.png" },
  { id: 2, name: "Essential Black Tee", price: 24.99, color: "Black", image: "/black-t-shirt.png" },
  { id: 3, name: "Vintage Blue Tee", price: 27.99, color: "Blue", image: "/blue-t-shirt.png" },
  { id: 4, name: "Forest Green Tee", price: 27.99, color: "Green", image: "/green-t-shirt.png" },
  { id: 5, name: "Sunset Red Tee", price: 26.99, color: "Red", image: "/red-t-shirt.png" },
  { id: 6, name: "Bright Yellow Tee", price: 26.99, color: "Yellow", image: "/yellow-t-shirt.jpg" },
  { id: 7, name: "Ocean Teal Tee", price: 28.99, color: "Teal", image: "/teal-t-shirt.jpg" },
  { id: 8, name: "Lavender Purple Tee", price: 28.99, color: "Purple", image: "/purple-t-shirt.png" },
  { id: 9, name: "Olive Green Tee", price: 27.99, color: "Olive", image: "/olive-green-t-shirt.png" },
  { id: 10, name: "Dusty Pink Tee", price: 26.99, color: "Pink", image: "/dusty-pink-t-shirt.jpg" },
  { id: 11, name: "Navy Blue Tee", price: 25.99, color: "Navy", image: "/navy-blue-t-shirt.png" },
  { id: 12, name: "Cream Tee", price: 25.99, color: "Cream", image: "/cream-colored-t-shirt.jpg" },
]

export default function TShirtsPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [favorites, setFavorites] = useState<number[]>([])
  const { addItem } = useCart()
  const { trackView, trackLike, trackAddToCart } = useTracking()

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
    trackLike(id.toString())
  }

  const handleAddToCart = (tshirt: typeof tshirts[0]) => {
    addItem({
      id: tshirt.id.toString(),
      name: tshirt.name,
      image: tshirt.image,
      price: tshirt.price,
      size: "M", // Default size
      color: tshirt.color,
      productType: "tshirt"
    })
    trackAddToCart(tshirt.id.toString())
  }

  const handleProductView = (id: number) => {
    trackView(id.toString())
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/shop">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Shop
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-foreground">T-Shirts</h1>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{tshirts.length} products</Badge>
            <span className="text-sm text-muted-foreground">Premium cotton blend, perfect for custom designs</span>
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tshirts.map((tshirt) => (
              <Card 
                key={tshirt.id} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleProductView(tshirt.id)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted/50 relative overflow-hidden">
                    <Image
                      src={tshirt.image || "/placeholder.svg"}
                      alt={tshirt.name}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(tshirt.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(tshirt.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                    <Badge className="absolute bottom-2 left-2 bg-background/80 text-foreground backdrop-blur-sm">
                      {tshirt.color}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 text-sm">{tshirt.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">100% Premium Cotton</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">${tshirt.price}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-transparent" asChild>
                          <Link href={`/dashboard/design/ai?product=tshirt&id=${tshirt.id}`}>Design</Link>
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAddToCart(tshirt)
                          }}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto space-y-12">
          <PersonalizedRecommendations category="tshirt" limit={5} />
          <TrendingProducts category="tshirt" limit={5} />
        </div>
      </section>
    </div>
  )
}
