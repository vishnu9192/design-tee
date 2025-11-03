"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import styles from "./ProductSidebar.module.css"

interface ProductSidebarProps {
  selectedProduct: string
  setSelectedProduct: (product: string) => void
  selectedColor: string
  setSelectedColor: (color: string) => void
  productColors: Array<{
    name: string
    hex: string
  }>
}

export function ProductSidebar({
  selectedProduct,
  setSelectedProduct,
  selectedColor,
  setSelectedColor,
  productColors
}: ProductSidebarProps) {
  const products = ["T-Shirt", "Hoodie", "Cap", "Mug"]

  return (
    <div className="space-y-4">
      {/* Product Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Product Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {products.map((product) => (
              <Button
                key={product}
                variant={selectedProduct === product ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedProduct(product)}
              >
                {product}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Product Color</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.colorGrid}>
            {productColors.map((color) => (
              <div
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`${styles.colorButton} ${selectedColor === color.name ? styles.colorButtonSelected : ""}`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {selectedColor === color.name && (
                  <div className={styles.checkmark}>
                    <Check className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {productColors.map((color) => (
              <p key={color.name} className="text-xs text-center text-muted-foreground">
                {color.name}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Design Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Design Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs text-muted-foreground">
          <p>• Keep text readable at various sizes</p>
          <p>• Use contrasting colors for better visibility</p>
          <p>• Avoid too many design elements</p>
          <p>• Test design on different product colors</p>
          <p>• Maximum design area: 1000x1000px</p>
        </CardContent>
      </Card>
    </div>
  )
}
