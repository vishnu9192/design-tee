"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Settings,
  ShoppingBag,
  Heart,
  Palette,
  Edit3,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shirt,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Passionate designer who loves creating unique t-shirt designs. Always exploring new styles and trends.",
    joinDate: "March 2024",
  })

  const recentOrders = [
    { id: "ORD-001", date: "2024-01-15", status: "Delivered", total: 89.97, items: 3 },
    { id: "ORD-002", date: "2024-01-10", status: "Processing", total: 54.99, items: 2 },
    { id: "ORD-003", date: "2024-01-05", status: "Delivered", total: 29.99, items: 1 },
  ]

  const favoriteProducts = [
    { id: 1, name: "Classic White Tee", price: 24.99, image: "/white-t-shirt.png" },
    { id: 2, name: "Vintage Blue Tee", price: 27.99, image: "/blue-t-shirt.png" },
    { id: 3, name: "Forest Green Shirt", price: 42.99, image: "/forest-green-button-shirt.jpg" },
  ]

  const myDesigns = [
    { id: 1, name: "Sunset Vibes", created: "2024-01-12", image: "/sunset-design.png" },
    { id: 2, name: "Urban Street", created: "2024-01-08", image: "/urban-street-art.png" },
    { id: 3, name: "Nature Flow", created: "2024-01-03", image: "/nature-pattern-design.jpg" },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Save profile logic here
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <User className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground">My Profile</h1>
            </div>
          </div>
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="bg-transparent">
            <Edit3 className="h-4 w-4 mr-2" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/diverse-user-avatars.png" />
                    <AvatarFallback className="text-2xl">
                      {profile.firstName[0]}
                      {profile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <CardTitle className="text-xl">
                  {profile.firstName} {profile.lastName}
                </CardTitle>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Joined {profile.joinDate}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <Button onClick={handleSave} className="w-full">
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground">{profile.bio}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{myDesigns.length}</div>
                    <div className="text-sm text-muted-foreground">Designs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{recentOrders.length}</div>
                    <div className="text-sm text-muted-foreground">Orders</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{favoriteProducts.length}</div>
                    <div className="text-sm text-muted-foreground">Favorites</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">4.8</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="orders" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="designs" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  My Designs
                </TabsTrigger>
                <TabsTrigger value="favorites" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg"
                        >
                          <div>
                            <div className="font-semibold">{order.id}</div>
                            <div className="text-sm text-muted-foreground">{order.date}</div>
                          </div>
                          <div className="text-center">
                            <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                              {order.status}
                            </Badge>
                            <div className="text-sm text-muted-foreground mt-1">{order.items} items</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">${order.total}</div>
                            <Button variant="outline" size="sm" className="mt-1 bg-transparent">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* My Designs Tab */}
              <TabsContent value="designs">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>My Designs</CardTitle>
                    <Button asChild>
                      <Link href="/design">
                        <Palette className="h-4 w-4 mr-2" />
                        Create New
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {myDesigns.map((design) => (
                        <Card key={design.id} className="group hover:shadow-lg transition-shadow">
                          <CardContent className="p-0">
                            <div className="aspect-square bg-muted/50 relative overflow-hidden">
                              <Image
                                src={design.image || "/placeholder.svg"}
                                alt={design.name}
                                fill
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="font-semibold text-sm">{design.name}</h4>
                              <p className="text-xs text-muted-foreground">{design.created}</p>
                              <div className="flex gap-2 mt-2">
                                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                  Edit
                                </Button>
                                <Button size="sm" className="flex-1">
                                  Use Design
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Favorites Tab */}
              <TabsContent value="favorites">
                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {favoriteProducts.map((product) => (
                        <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                          <CardContent className="p-0">
                            <div className="aspect-square bg-muted/50 relative overflow-hidden">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="font-semibold text-sm">{product.name}</h4>
                              <p className="text-sm font-bold">${product.price}</p>
                              <div className="flex gap-2 mt-2">
                                <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                                  <Link href={`/design?product=${product.id}`}>Design</Link>
                                </Button>
                                <Button size="sm" className="flex-1">
                                  <Shirt className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">Receive updates about your orders and designs</p>
                        </div>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Configure
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Privacy Settings</h4>
                          <p className="text-sm text-muted-foreground">Control who can see your designs and profile</p>
                        </div>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Manage
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Design Preferences</h4>
                          <p className="text-sm text-muted-foreground">Set default colors, fonts, and design tools</p>
                        </div>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Customize
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-destructive">Delete Account</h4>
                          <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                        </div>
                        <Button variant="destructive" size="sm">
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
