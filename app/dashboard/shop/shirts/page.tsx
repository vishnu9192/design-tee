"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"

const shirts = [
  { id: 1, name: "Classic White Shirt", price: 39.99, color: "White", image: "/white-button-shirt.png" },
  { id: 2, name: "Midnight Black Shirt", price: 39.99, color: "Black", image: "/black-button-shirt.jpg" },
  { id: 3, name: "Sky Blue Shirt", price: 42.99, color: "Blue", image: "/light-blue-button-shirt.jpg" },
  { id: 4, name: "Forest Green Shirt", price: 42.99, color: "Green", image: "/forest-green-button-shirt.jpg" },
  { id: 5, name: "Burgundy Shirt", price: 44.99, color: "Burgundy", image: "/burgundy-button-shirt.jpg" },
  { id: 6, name: "Dusty Pink Shirt", price: 41.99, color: "Pink", image: "/dusty-pink-button-shirt.jpg" },
  { id: 7, name: "Sage Green Shirt", price: 43.99, color: "Sage", image: "/sage-green-button-shirt.jpg" },
  { id: 8, name: "Navy Blue Shirt", price: 40.99, color: "Navy", image: "/navy-blue-button-shirt.jpg" },
  { id: 9, name: "Charcoal Gray Shirt", price: 41.99, color: "Gray", image: "/charcoal-gray-button-shirt.jpg" },
  { id: 10, name: "Cream Shirt", price: 38.99, color: "Cream", image: "/placeholder.svg?height=300&width=300" },
  { id: 11, name: "Olive Shirt", price: 43.99, color: "Olive", image: "/placeholder.svg?height=300&width=300" },
  {
    id: 12,
    name: "Steel Blue Shirt",
    price: 42.99,
    color: "Steel Blue",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function ShirtsPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/shop">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Shop
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Shirts</h1>
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
            <Badge variant="secondary">{shirts.length} products</Badge>
            <span className="text-sm text-muted-foreground">Premium casual shirts, perfect for custom embroidery</span>
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shirts.map((shirt) => (
              <Card key={shirt.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted/50 relative overflow-hidden">
                    <Image
                      src={shirt.image || "/placeholder.svg"}
                      alt={shirt.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background"
                      onClick={() => toggleFavorite(shirt.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(shirt.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                    <Badge className="absolute bottom-2 left-2 bg-background/80 text-foreground backdrop-blur-sm">
                      {shirt.color}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 text-sm">{shirt.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">Premium Cotton Blend</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">${shirt.price}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-transparent" asChild>
                          <Link href={`/design?product=shirt&id=${shirt.id}`}>Design</Link>
                        </Button>
                        <Button size="sm">
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
    </div>
  )
}
