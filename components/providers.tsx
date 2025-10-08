"use client"

import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"
import { TrackingProvider } from "@/contexts/tracking-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <TrackingProvider>
          {children}
        </TrackingProvider>
      </CartProvider>
    </AuthProvider>
  )
}
