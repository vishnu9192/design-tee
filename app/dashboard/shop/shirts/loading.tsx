"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ShirtsLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-9 w-[120px]" />
              <Skeleton className="h-8 w-[100px]" />
            </div>
            <Skeleton className="h-10 w-[200px]" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-6 w-[300px]" />
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <Card key={i} className="group">
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted/50 relative">
                    <Skeleton className="h-full w-full absolute" />
                  </div>
                  <div className="p-4">
                    <Skeleton className="h-5 w-[150px] mb-1" />
                    <Skeleton className="h-4 w-[120px] mb-3" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-6 w-[60px]" />
                      <div className="flex gap-2">
                        <Skeleton className="h-9 w-[80px]" />
                        <Skeleton className="h-9 w-9" />
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