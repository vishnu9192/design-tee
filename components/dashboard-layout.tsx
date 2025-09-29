"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
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
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const sidebarItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/orders", label: "Orders", icon: Package },
  { href: "/dashboard/favorites", label: "Favorites", icon: Heart },
  { href: "/dashboard/design", label: "Design Studio", icon: Palette },
  { href: "/dashboard/shop", label: "Shop", icon: ShoppingBag },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

const mobileNavItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/settings", label: "Profile", icon: User },
  { href: "/dashboard/orders", label: "Orders", icon: Package },
  { href: "/dashboard/favorites", label: "Favorites", icon: Heart },
  { href: "/dashboard/design", label: "Design", icon: Palette },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const isMobile = useIsMobile()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon" className="border-r">
          {/* User Section */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size="lg" asChild>
                    <div className="flex items-center gap-2 p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {user?.firstName?.[0]}
                          {user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user?.firstName} {user?.lastName}
                        </span>
                        <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* Main Menu */}
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={
                          pathname === item.href ||
                          (item.href !== "/dashboard" && pathname.startsWith(item.href))
                        }
                        tooltip={item.label}
                      >
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* Footer */}
          <SidebarFooter>
            <SidebarSeparator />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} tooltip="Sign Out">
                  <LogOut />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>

          <SidebarRail />
        </Sidebar>

        {/* Main content */}
        <SidebarInset>
          <DashboardHeader />
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </SidebarInset>
      </div>

      {/* Mobile bottom nav */}
      {isMobile && (
        <>
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
            <nav className="flex items-center justify-around py-2 px-4">
              {mobileNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-0",
                    pathname === item.href ||
                      (item.href !== "/dashboard" && pathname.startsWith(item.href))
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-xs font-medium truncate">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="h-20" />
        </>
      )}
    </SidebarProvider>
  )
}
