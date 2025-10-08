"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Search, Eye, Download, Truck, CheckCircle, Clock, XCircle, Calendar, DollarSign, MapPin, Star, RefreshCw } from "lucide-react"
import Image from "next/image"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date-desc")

  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "delivered",
      total: 89.97,
      items: 3,
      trackingNumber: "TRK123456789",
      estimatedDelivery: "2024-01-18",
      actualDelivery: "2024-01-17",
      products: [
        { name: "Vintage Sunset Tee", image: "/vintage-sunset-t-shirt.jpg", quantity: 2, price: 29.99 },
        { name: "Urban Street Tank", image: "/urban-street-art-tank-top.jpg", quantity: 1, price: 29.99 }
      ],
      shippingAddress: "123 Main St, City, State 12345"
    },
    {
      id: "ORD-002", 
      date: "2024-01-10",
      status: "processing",
      total: 54.99,
      items: 2,
      trackingNumber: "TRK987654321",
      estimatedDelivery: "2024-01-20",
      products: [
        { name: "Minimalist Design Tee", image: "/stylish-t-shirt-design-.jpg", quantity: 2, price: 27.49 }
      ],
      shippingAddress: "456 Oak Ave, Town, State 67890"
    },
    {
      id: "ORD-003",
      date: "2024-01-05", 
      status: "shipped",
      total: 129.99,
      items: 4,
      trackingNumber: "TRK456789123",
      estimatedDelivery: "2024-01-15",
      products: [
        { name: "Typography Design", image: "/typography-t-shirt-design.jpg", quantity: 2, price: 32.99 },
        { name: "Nature Pattern Tee", image: "/nature-pattern-design.jpg", quantity: 2, price: 31.99 }
      ],
      shippingAddress: "789 Pine Rd, Village, State 13579"
    },
    {
      id: "ORD-004",
      date: "2024-01-01",
      status: "cancelled", 
      total: 39.99,
      items: 1,
      trackingNumber: null,
      estimatedDelivery: null,
      products: [
        { name: "Custom Design Hoodie", image: "/minimalist-hoodie.jpg", quantity: 1, price: 39.99 }
      ],
      shippingAddress: "321 Elm St, City, State 24680"
    },
    {
      id: "ORD-005",
      date: "2023-12-28",
      status: "delivered",
      total: 74.98,
      items: 2,
      trackingNumber: "TRK789123456", 
      estimatedDelivery: "2024-01-03",
      actualDelivery: "2024-01-02",
      products: [
        { name: "Black Button Shirt", image: "/black-button-shirt.jpg", quantity: 1, price: 39.99 },
        { name: "White Classic Tee", image: "/white-t-shirt.png", quantity: 1, price: 34.99 }
      ],
      shippingAddress: "654 Maple Dr, Suburb, State 97531"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "shipped":
        return <Truck className="h-4 w-4 text-blue-600" />
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "delivered":
        return "default"
      case "shipped":
        return "secondary"
      case "processing":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.products.some(product => 
                           product.name.toLowerCase().includes(searchTerm.toLowerCase())
                         )
    
    if (statusFilter === "all") return matchesSearch
    return matchesSearch && order.status === statusFilter
  })

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case "date-desc":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "date-asc":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "total-desc":
        return b.total - a.total
      case "total-asc":
        return a.total - b.total
      default:
        return 0
    }
  })

  const getOrderSummary = () => {
    const total = orders.length
    const delivered = orders.filter(o => o.status === "delivered").length
    const processing = orders.filter(o => o.status === "processing").length
    const shipped = orders.filter(o => o.status === "shipped").length
    
    return { total, delivered, processing, shipped }
  }

  const orderSummary = getOrderSummary()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
            <p className="text-muted-foreground">Track and manage your orders</p>
          </div>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Package className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-muted-foreground">Total Orders</span>
            </div>
            <p className="text-2xl font-bold">{orderSummary.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-muted-foreground">Delivered</span>
            </div>
            <p className="text-2xl font-bold">{orderSummary.delivered}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-muted-foreground">Shipped</span>
            </div>
            <p className="text-2xl font-bold">{orderSummary.shipped}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-muted-foreground">Processing</span>
            </div>
            <p className="text-2xl font-bold">{orderSummary.processing}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID, status, or product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Date (Newest)</SelectItem>
            <SelectItem value="date-asc">Date (Oldest)</SelectItem>
            <SelectItem value="total-desc">Total (High to Low)</SelectItem>
            <SelectItem value="total-asc">Total (Low to High)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {sortedOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              {/* Order Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="font-semibold text-lg">{order.id}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        ${order.total}
                      </span>
                      <span>{order.items} items</span>
                    </div>
                  </div>
                </div>
                <Badge variant={getStatusVariant(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>

              {/* Products Preview */}
              <div className="mb-4">
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex items-center gap-2 min-w-fit bg-muted/30 rounded-lg p-2">
                      <div className="h-10 w-10 bg-muted rounded-md overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-sm">
                        <p className="font-medium truncate max-w-32">{product.name}</p>
                        <p className="text-muted-foreground">Qty: {product.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Shipping Address</p>
                  <p className="font-medium text-sm flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {order.shippingAddress}
                  </p>
                </div>
                {order.trackingNumber && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Tracking Number</p>
                    <p className="font-mono text-sm font-medium">{order.trackingNumber}</p>
                  </div>
                )}
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">
                    {order.status === "delivered" ? "Delivered On" : "Expected Delivery"}
                  </p>
                  <p className="font-medium text-sm">
                    {order.actualDelivery ? 
                      new Date(order.actualDelivery).toLocaleDateString() :
                      order.estimatedDelivery ? 
                      new Date(order.estimatedDelivery).toLocaleDateString() : 
                      "N/A"
                    }
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {order.status === "delivered" && (
                  <>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                    <Button variant="outline" size="sm">
                      <Star className="h-4 w-4 mr-2" />
                      Leave Review
                    </Button>
                  </>
                )}
                {order.trackingNumber && order.status !== "delivered" && (
                  <Button variant="outline" size="sm">
                    <Truck className="h-4 w-4 mr-2" />
                    Track Package
                  </Button>
                )}
                {order.status === "processing" && (
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel Order
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No orders found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== "all" ? 
              "Try adjusting your search terms or filters" : 
              "You haven't placed any orders yet"
            }
          </p>
          <Button asChild>
            <Link href="/dashboard/shop">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
