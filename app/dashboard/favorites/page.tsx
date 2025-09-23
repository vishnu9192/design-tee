"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Search, ShoppingCart, Eye, Filter, Grid3X3, List, Star } from "lucide-react"
import Image from "next/image"

export default function FavoritesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const favorites = [
    {
      id: 1,
      name: "Vintage Sunset Tee",
      price: 29.99,
      originalPrice: 39.99,
      image: "/vintage-sunset-t-shirt.jpg",
      category: "T-Shirts",
      rating: 4.8,
      reviews: 124,
      inStock: true,
      colors: ["Orange", "Pink", "Purple"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 2,
      name: "Minimalist Logo Hoodie",
      price: 59.99,
      originalPrice: null,
      image: "/minimalist-hoodie.jpg",
      category: "Hoodies",
      rating: 4.9,
      reviews: 89,
      inStock: true,
      colors: ["Black", "White", "Gray"],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 3,
      name: "Urban Street Art Tank",
      price: 24.99,
      originalPrice: 34.99,
      image: "/urban-street-art-tank-top.jpg",
      category: "Tank Tops",
      rating: 4.6,
      reviews: 67,
      inStock: false,
      colors: ["Black", "White"],
      sizes: ["S", "M", "L"],
    },
    {
      id: 4,
      name: "Custom Typography Tee",
      price: 32.99,
      originalPrice: null,
      image: "/typography-t-shirt-design.jpg",
      category: "T-Shirts",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      colors: ["Navy", "Charcoal", "White"],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
  ]

  const filteredFavorites = favorites.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const removeFavorite = (id: number) => {
    // Handle removing from favorites
    console.log("Remove favorite:", id)
  }

  const addToCart = (id: number) => {
    // Handle adding to cart
    console.log("Add to cart:", id)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Favorites</h1>
        <p className="text-muted-foreground">Your saved items and wishlist</p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search favorites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <div className="flex border rounded-md">
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
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Favorites Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Items ({filteredFavorites.length})</TabsTrigger>
          <TabsTrigger value="tshirts">T-Shirts</TabsTrigger>
          <TabsTrigger value="hoodies">Hoodies</TabsTrigger>
          <TabsTrigger value="tanks">Tank Tops</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFavorites.map((item) => (
                <Card key={item.id} className="group overflow-hidden">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={256}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => removeFavorite(item.id)}
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                    {!item.inStock && (
                      <Badge variant="secondary" className="absolute top-2 left-2">
                        Out of Stock
                      </Badge>
                    )}
                    {item.originalPrice && (
                      <Badge variant="destructive" className="absolute bottom-2 left-2">
                        Sale
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{item.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">${item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          disabled={!item.inStock}
                          onClick={() => addToCart(item.id)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {item.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFavorites.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{item.rating}</span>
                              <span className="text-muted-foreground">({item.reviews} reviews)</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeFavorite(item.id)}>
                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">${item.price}</span>
                            {item.originalPrice && (
                              <span className="text-muted-foreground line-through">${item.originalPrice}</span>
                            )}
                            {!item.inStock && <Badge variant="secondary">Out of Stock</Badge>}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                            <Button size="sm" disabled={!item.inStock} onClick={() => addToCart(item.id)}>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Other tab contents would filter by category */}
        <TabsContent value="tshirts">{/* T-Shirts only */}</TabsContent>
        <TabsContent value="hoodies">{/* Hoodies only */}</TabsContent>
        <TabsContent value="tanks">{/* Tank Tops only */}</TabsContent>
      </Tabs>

      {filteredFavorites.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No favorites found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Start adding items to your favorites"}
          </p>
          <Button asChild>
            <a href="/dashboard/shop">Browse Products</a>
          </Button>
        </div>
      )}
    </div>
  )
}
