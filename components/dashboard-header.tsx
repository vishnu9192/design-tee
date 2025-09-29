"use client"

import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarCart } from "@/components/sidebar-cart"

export function DashboardHeader() {
  const pathname = usePathname()
  const pageTitle = getPageTitle(pathname)

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger className="-ml-2" />
      <div className="flex flex-1 items-center justify-between gap-4">
        <h1 className="text-lg font-semibold">{pageTitle}</h1>
        <SidebarCart />
      </div>
    </header>
  )
}

function getPageTitle(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean)
  if (parts.length === 1) return "Dashboard"
  return parts[parts.length - 1].split("-").map(capitalize).join(" ")
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}