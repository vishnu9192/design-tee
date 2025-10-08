"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  ShoppingBag,
  Palette,
  User,
  Heart,
  Settings,
  Package,
  LogOut,
  Home,
  Sparkles,
  HelpCircle,
  Shirt,
  ShoppingCart,
  Star,
  Plus,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
}

interface MenuItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  description?: string
  badge?: string
  highlight?: boolean
}

// Organized sidebar menu structure
const mainMenuItems: MenuItem[] = [
  { 
    href: "/dashboard", 
    label: "Dashboard", 
    icon: LayoutDashboard,
    description: "Overview & insights"
  },
  { 
    href: "/dashboard/orders", 
    label: "My Orders", 
    icon: Package,
    description: "Track your orders",
    badge: "3" // Example badge
  },
  { 
    href: "/dashboard/favorites", 
    label: "Favorites", 
    icon: Heart,
    description: "Saved items"
  },
]

const createMenuItems: MenuItem[] = [
  { 
    href: "/dashboard/design", 
    label: "Design Studio", 
    icon: Palette,
    description: "Create custom designs",
    highlight: true
  },
  { 
    href: "/dashboard/design/ai", 
    label: "AI Designer", 
    icon: Sparkles,
    description: "AI-powered designs",
    badge: "New"
  },
]

const shopMenuItems: MenuItem[] = [
  { 
    href: "/dashboard/shop", 
    label: "Browse Shop", 
    icon: ShoppingBag,
    description: "Discover products"
  },
  { 
    href: "/dashboard/shop/tshirts", 
    label: "T-Shirts", 
    icon: Shirt,
    description: "Custom t-shirts"
  },
  { 
    href: "/dashboard/cart", 
    label: "Shopping Cart", 
    icon: ShoppingCart,
    description: "Review items"
  },
]

const accountMenuItems: MenuItem[] = [
  { 
    href: "/dashboard/profile", 
    label: "Profile", 
    icon: User,
    description: "Personal info"
  },
  { 
    href: "/dashboard/settings", 
    label: "Settings", 
    icon: Settings,
    description: "Preferences"
  },
]

interface MobileNavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const mobileNavItems: MobileNavItem[] = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/shop", label: "Shop", icon: ShoppingBag },
  { href: "/dashboard/design", label: "Design", icon: Palette },
  { href: "/dashboard/orders", label: "Orders", icon: Package },
  { href: "/dashboard/profile", label: "Profile", icon: User },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { items } = useCart()
  const isMobile = useIsMobile()

  const cartItemCount = items.length

  const isActive = (href: string) => {
    return pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
  }

  const renderMenuItem = (item: MenuItem) => (
    <SidebarMenuItem key={item.href}>
      <SidebarMenuButton
        asChild
        isActive={isActive(item.href)}
        tooltip={item.label}
        className={cn(
          "group h-9 px-3 py-2 hover:bg-amber-50 rounded-lg transition-all duration-200",
          isActive(item.href) && "bg-amber-100 border border-amber-200",
          item.highlight && "bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200"
        )}
      >
        <Link href={item.href} className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <item.icon className={cn(
              "shrink-0 h-4 w-4",
              isActive(item.href) ? "text-amber-600" : "text-muted-foreground",
              item.highlight && "text-amber-600"
            )} />
            <span className={cn(
              "font-medium text-sm group-data-[state=collapsed]:hidden",
              isActive(item.href) ? "text-amber-900" : "text-foreground",
              item.highlight && "text-amber-900"
            )}>
              {item.label}
            </span>
          </div>
          {item.badge && (
            <Badge 
              variant={item.badge === "New" ? "default" : "secondary"}
              className={cn(
                "ml-auto text-xs px-1.5 py-0.5 group-data-[state=collapsed]:hidden",
                item.badge === "New" && "bg-green-100 text-green-700",
                item.href === "/dashboard/cart" && cartItemCount > 0 && "bg-amber-100 text-amber-700"
              )}
            >
              {item.href === "/dashboard/cart" && cartItemCount > 0 ? cartItemCount : item.badge}
            </Badge>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon" className="border-r flex flex-col">
          {/* Brand Header - Compact */}
          <SidebarHeader className="border-b p-3 bg-gradient-to-r from-amber-50 to-orange-50 shrink-0">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold text-sm">
                DT
              </div>
              <div className="flex flex-col group-data-[state=collapsed]:hidden">
                <span className="font-bold text-lg text-foreground">
                  DesignTee
                </span>
                <span className="text-xs text-muted-foreground">Design Studio</span>
              </div>
            </Link>
          </SidebarHeader>

          {/* User Section - Compact */}
          <SidebarGroup className="p-3 bg-gradient-to-b from-amber-50/30 to-transparent shrink-0">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size="lg" asChild className="h-auto p-2 hover:bg-amber-50">
                    <Link href="/dashboard/profile" className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-amber-200">
                        <AvatarImage src={user?.avatar || "/placeholder-user.jpg"} />
                        <AvatarFallback className="bg-amber-100 text-amber-700 font-semibold text-sm">
                          {user?.firstName?.[0]}
                          {user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left leading-tight group-data-[state=collapsed]:hidden">
                        <span className="truncate font-medium text-foreground text-sm">
                          {user?.firstName} {user?.lastName}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs text-amber-600">Premium</span>
                        </div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="my-2" />

          {/* Quick Actions - Compact */}
          <SidebarGroup className="px-3 shrink-0">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="h-10">
                    <Link 
                      href="/dashboard/design/ai" 
                      className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200 rounded-lg p-2 transition-all duration-200"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        <Plus className="h-3 w-3" />
                      </div>
                      <span className="font-medium text-purple-900 text-sm group-data-[state=collapsed]:hidden">Create Design</span>
                      <Badge className="bg-purple-100 text-purple-700 text-xs ml-auto group-data-[state=collapsed]:hidden">
                        AI
                      </Badge>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator className="my-2" />

          {/* Main Menu - Scrollable content */}
          <SidebarContent className="px-3 flex-1 overflow-y-auto">
            {/* Overview Section */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2 group-data-[state=collapsed]:hidden">
                <LayoutDashboard className="h-3 w-3" />
                Overview
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-0.5">
                  {mainMenuItems.map((item) => renderMenuItem(item))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Create Section */}
            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2 group-data-[state=collapsed]:hidden">
                <Palette className="h-3 w-3" />
                Create & Design
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-0.5">
                  {createMenuItems.map((item) => renderMenuItem(item))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Shop Section */}
            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2 group-data-[state=collapsed]:hidden">
                <ShoppingBag className="h-3 w-3" />
                Shopping
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-0.5">
                  {shopMenuItems.map((item) => renderMenuItem(item))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Account Section */}
            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2 group-data-[state=collapsed]:hidden">
                <User className="h-3 w-3" />
                Account
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-0.5">
                  {accountMenuItems.map((item) => renderMenuItem(item))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* Footer - Compact */}
          <SidebarFooter className="p-3 border-t bg-gradient-to-t from-amber-50/20 to-transparent shrink-0">
            <SidebarMenu className="space-y-1">
              {/* Help & Support */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Help & Support" className="h-8 hover:bg-amber-50">
                  <Link href="/help" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <HelpCircle className="h-3 w-3" />
                    <span className="text-xs group-data-[state=collapsed]:hidden">Help & Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Sign Out */}
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={logout} 
                  tooltip="Sign Out"
                  className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="h-3 w-3" />
                  <span className="text-xs group-data-[state=collapsed]:hidden">Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            {/* App Version & Status */}
            <div className="px-2 py-1 mt-2 group-data-[state=collapsed]:hidden">
              <div className="flex items-center justify-between text-xs text-muted-foreground bg-white/30 rounded p-1">
                <span className="text-xs">v2.1</span>
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                  <span className="text-xs text-green-600">Online</span>
                </div>
              </div>
            </div>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        {/* Main content */}
        <SidebarInset>
          <DashboardHeader />
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </SidebarInset>
      </div>

      {/* Enhanced Mobile bottom nav */}
      {isMobile && (
        <>
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
            <nav className="flex items-center justify-around py-2 px-2">
              {mobileNavItems.map((item) => {
                const isItemActive = isActive(item.href)
                const showBadge = item.href === "/dashboard/orders" && cartItemCount > 0
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 min-w-0 relative",
                      isItemActive
                        ? "text-amber-600 bg-amber-50 shadow-sm scale-105"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )}
                  >
                    <div className="relative">
                      <item.icon className={cn(
                        "h-5 w-5 transition-transform",
                        isItemActive && "scale-110"
                      )} />
                      {showBadge && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                          {cartItemCount}
                        </Badge>
                      )}
                    </div>
                    <span className={cn(
                      "text-xs font-medium truncate transition-all",
                      isItemActive ? "font-semibold" : "font-normal"
                    )}>
                      {item.label}
                    </span>
                    {isItemActive && (
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"></div>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="h-20" />
        </>
      )}
    </SidebarProvider>
  )
}
