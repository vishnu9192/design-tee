"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Palette, Heart, TrendingUp, Sparkles, Plus, ArrowRight, Star, Clock, Zap, Target, Award, Users, Calendar, Activity } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  const recentOrders = [
    { id: "ORD-001", status: "Delivered", total: 89.97, date: "Jan 15", items: 3, image: "/stylish-t-shirt-design-.jpg" },
    { id: "ORD-002", status: "Processing", total: 54.99, date: "Jan 10", items: 2, image: "/vintage-sunset-t-shirt.jpg" },
    { id: "ORD-003", status: "Shipped", total: 124.97, date: "Jan 8", items: 4, image: "/urban-street-art-tank-top.jpg" },
  ]

  const recentDesigns = [
    { id: 1, name: "Sunset Vibes", image: "/sunset-design.png", created: "2 days ago", category: "Nature", likes: 24 },
    { id: 2, name: "Urban Street", image: "/urban-street-art.png", created: "5 days ago", category: "Street Art", likes: 18 },
    { id: 3, name: "Minimal Typography", image: "/typography-t-shirt-design.jpg", created: "1 week ago", category: "Typography", likes: 32 },
  ]

  const quickStats = [
    { label: "Total Orders", value: "15", icon: ShoppingBag, color: "text-blue-600", bgColor: "bg-blue-50", change: "+3 this week" },
    { label: "My Designs", value: "12", icon: Palette, color: "text-purple-600", bgColor: "bg-purple-50", change: "+2 new" },
    { label: "Favorites", value: "28", icon: Heart, color: "text-red-600", bgColor: "bg-red-50", change: "+4 added" },
    { label: "This Month", value: "$324", icon: TrendingUp, color: "text-green-600", bgColor: "bg-green-50", change: "+$90 vs last" },
  ]

  const achievementStats = [
    { label: "Design Streak", value: "7 days", icon: Zap, color: "text-yellow-600" },
    { label: "Total Sales", value: "$1,247", icon: Target, color: "text-indigo-600" },
    { label: "Customer Rating", value: "4.9/5", icon: Award, color: "text-amber-600" },
    { label: "Community Rank", value: "#42", icon: Users, color: "text-cyan-600" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.firstName}!</h1>
            <p className="text-muted-foreground">Ready to create something amazing today?</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Activity className="h-3 w-3 mr-1" />
              Active Designer
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <Badge variant="secondary" className="text-xs">{stat.change}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievement Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {achievementStats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-background to-muted/20">
            <CardContent className="p-4 text-center">
              <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button asChild className="h-24 flex-col gap-2 bg-gradient-to-br from-primary to-primary/80">
                  <Link href="/dashboard/design">
                    <Palette className="h-7 w-7" />
                    <span className="font-semibold">Design Studio</span>
                    <span className="text-xs opacity-90">Create custom designs</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-24 flex-col gap-2 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:from-purple-100 hover:to-pink-100">
                  <Link href="/dashboard/design/ai">
                    <Sparkles className="h-7 w-7 text-purple-600" />
                    <span className="font-semibold text-purple-700">AI Designer</span>
                    <span className="text-xs text-purple-600">Generate with AI</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-24 flex-col gap-2 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:from-blue-100 hover:to-cyan-100">
                  <Link href="/dashboard/shop">
                    <ShoppingBag className="h-7 w-7 text-blue-600" />
                    <span className="font-semibold text-blue-700">Browse Shop</span>
                    <span className="text-xs text-blue-600">Explore products</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-24 flex-col gap-2 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:from-green-100 hover:to-emerald-100">
                  <Link href="/dashboard/favorites">
                    <Heart className="h-7 w-7 text-green-600" />
                    <span className="font-semibold text-green-700">Favorites</span>
                    <span className="text-xs text-green-600">Your liked items</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-24 flex-col gap-2 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:from-amber-100 hover:to-orange-100">
                  <Link href="/dashboard/orders">
                    <Star className="h-7 w-7 text-amber-600" />
                    <span className="font-semibold text-amber-700">My Orders</span>
                    <span className="text-xs text-amber-600">Track purchases</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-24 flex-col gap-2 bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 hover:from-gray-100 hover:to-slate-100">
                  <Link href="/dashboard/profile">
                    <Calendar className="h-7 w-7 text-gray-600" />
                    <span className="font-semibold text-gray-700">Profile</span>
                    <span className="text-xs text-gray-600">Account settings</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/orders">
                  View All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={order.image || "/placeholder.svg"}
                          alt={`Order ${order.id}`}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold">{order.id}</div>
                        <div className="text-sm text-muted-foreground">{order.date} • {order.items} items</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={order.status === "Delivered" ? "default" : order.status === "Shipped" ? "secondary" : "outline"}>
                        {order.status}
                      </Badge>
                      <div className="text-sm font-semibold mt-1">${order.total}</div>
                    </div>
                  </div>
                ))}
                {recentOrders.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No orders yet</p>
                    <Button asChild className="mt-4">
                      <Link href="/dashboard/shop">Start Shopping</Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Designs */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">My Designs</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/design">
                  <Plus className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDesigns.map((design) => (
                  <div key={design.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="h-12 w-12 bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={design.image || "/placeholder.svg"}
                        alt={design.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{design.name}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {design.created}
                        </p>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3 text-red-500" />
                          <span className="text-xs">{design.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent" asChild>
                  <Link href="/dashboard/design">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Design
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Trending */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Trending Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30">
                  <span className="text-sm font-medium">Vintage Designs</span>
                  <Badge variant="secondary" className="bg-red-100 text-red-700">Hot</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30">
                  <span className="text-sm font-medium">Minimalist Tees</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">Popular</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30">
                  <span className="text-sm font-medium">Custom Typography</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">New</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30">
                  <span className="text-sm font-medium">AI Generated</span>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">Trending</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent" asChild>
                <Link href="/dashboard/shop">Explore Trends</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Designer Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium text-primary mb-1">🎨 Pro Tip</p>
                <p className="text-muted-foreground">Use the AI Designer to get instant inspiration for your next creation!</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-primary mb-1">💡 Did you know?</p>
                <p className="text-muted-foreground">You can save designs to favorites and customize them later.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
