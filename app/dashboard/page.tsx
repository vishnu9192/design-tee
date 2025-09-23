"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Palette, Heart, TrendingUp, Shirt, Sparkles, Plus, ArrowRight, Star, Clock } from "lucide-react"

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
    { id: "ORD-001", status: "Delivered", total: 89.97, date: "Jan 15" },
    { id: "ORD-002", status: "Processing", total: 54.99, date: "Jan 10" },
  ]

  const recentDesigns = [
    { id: 1, name: "Sunset Vibes", image: "/sunset-design.png", created: "2 days ago" },
    { id: 2, name: "Urban Street", image: "/urban-street-art.png", created: "5 days ago" },
  ]

  const quickStats = [
    { label: "Total Orders", value: "12", icon: ShoppingBag, color: "text-blue-600" },
    { label: "My Designs", value: "8", icon: Palette, color: "text-purple-600" },
    { label: "Favorites", value: "24", icon: Heart, color: "text-red-600" },
    { label: "This Month", value: "$234", icon: TrendingUp, color: "text-green-600" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.firstName}!</h1>
        <p className="text-muted-foreground">Ready to create something amazing today?</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
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
              <div className="grid sm:grid-cols-2 gap-4">
                <Button asChild className="h-20 flex-col gap-2">
                  <Link href="/dashboard/design">
                    <Palette className="h-6 w-6" />
                    <span>Start Designing</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Link href="/dashboard/design/ai">
                    <Sparkles className="h-6 w-6" />
                    <span>AI Design Studio</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Link href="/dashboard/shop">
                    <ShoppingBag className="h-6 w-6" />
                    <span>Browse Products</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                  <Link href="/dashboard/profile">
                    <Star className="h-6 w-6" />
                    <span>View Profile</span>
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
                  <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Shirt className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{order.id}</div>
                        <div className="text-sm text-muted-foreground">{order.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>{order.status}</Badge>
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
                  <div key={design.id} className="flex items-center gap-3">
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
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {design.created}
                      </p>
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
                <div className="flex items-center justify-between">
                  <span className="text-sm">Vintage Designs</span>
                  <Badge variant="secondary">Hot</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Minimalist Tees</span>
                  <Badge variant="secondary">Popular</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Custom Typography</span>
                  <Badge variant="secondary">New</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent" asChild>
                <Link href="/dashboard/shop">Explore Trends</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
