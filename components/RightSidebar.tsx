"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Shirt, Copy, Trash2, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { DesignElement } from "@/lib/design-helpers"

interface RightSidebarProps {
  selectedColor: string
  setSelectedColor: (color: string) => void
  selectedElement: string | null
  designElements: DesignElement[]
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
  onMoveToFront: (id: string) => void
  onMoveToBack: (id: string) => void
  productColors: Array<{ name: string; value: string; hex: string }>
}

export function RightSidebar({
  selectedColor,
  setSelectedColor,
  selectedElement,
  designElements,
  onDuplicate,
  onDelete,
  onMoveToFront,
  onMoveToBack,
  productColors,
}: RightSidebarProps) {
  const selectedElementData = designElements.find((el) => el.id === selectedElement)

  return (
    <div className="w-80 border-l border-border bg-card/30 overflow-y-auto p-4 space-y-4 h-full">
      {/* Color Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Shirt className="h-4 w-4" />
            T-Shirt Color
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="color-select" className="text-sm mb-2 block">
            Select Color
          </Label>
          <Select value={selectedColor} onValueChange={setSelectedColor}>
            <SelectTrigger id="color-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {productColors.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full border border-border"
                      style={{ backgroundColor: color.hex }}
                    />
                    {color.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Layers/Elements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Layers</CardTitle>
        </CardHeader>
        <CardContent>
          {designElements.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No design elements yet. Add some to get started.
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {designElements.map((element, index) => (
                <div
                  key={element.id}
                  onClick={() => {
                    // Select element (handled by parent)
                  }}
                  className={cn(
                    "p-2 rounded-lg border-2 cursor-pointer transition-all",
                    selectedElement === element.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium capitalize truncate">
                        {element.type === "text"
                          ? `Text: "${element.content.substring(0, 15)}..."`
                          : `${element.type}: ${element.content}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Layer {designElements.length - index}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onMoveToFront(element.id)}
                        title="Move to front"
                        className="h-7 w-7 p-0"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Element Properties */}
      {selectedElementData && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">Element Type</p>
              <p className="text-sm text-muted-foreground capitalize">
                {selectedElementData.type}
              </p>
            </div>

            {selectedElementData.type === "text" && (
              <>
                <div>
                  <p className="text-sm font-medium mb-2">Text</p>
                  <p className="text-sm text-muted-foreground truncate">
                    &quot;{selectedElementData.content}&quot;
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Font Size</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedElementData.fontSize || 16}px
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Font Family</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedElementData.fontFamily || "Arial"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Text Color</p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded border border-border"
                      style={{ backgroundColor: selectedElementData.color || "#000000" }}
                    />
                    <p className="text-sm text-muted-foreground">
                      {selectedElementData.color || "#000000"}
                    </p>
                  </div>
                </div>
              </>
            )}

            {selectedElementData.type === "shape" && (
              <>
                <div>
                  <p className="text-sm font-medium mb-2">Shape Type</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {selectedElementData.content}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Fill Color</p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded border border-border"
                      style={{ backgroundColor: selectedElementData.backgroundColor || "#FFFFFF" }}
                    />
                    <p className="text-sm text-muted-foreground">
                      {selectedElementData.backgroundColor || "#FFFFFF"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Border Color</p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded border border-border"
                      style={{ backgroundColor: selectedElementData.color || "#000000" }}
                    />
                    <p className="text-sm text-muted-foreground">
                      {selectedElementData.color || "#000000"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Border Width</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedElementData.borderWidth || 2}px
                  </p>
                </div>
              </>
            )}

            <div className="pt-2 space-y-2">
              <p className="text-sm font-medium">Position & Size</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">X: {selectedElementData.x}px</p>
                  <p className="text-muted-foreground">Y: {selectedElementData.y}px</p>
                </div>
                <div>
                  <p className="text-muted-foreground">W: {selectedElementData.width}px</p>
                  <p className="text-muted-foreground">H: {selectedElementData.height}px</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 space-y-2 border-t border-border">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => selectedElement && onDuplicate(selectedElement)}
                  className="flex-1"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Duplicate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => selectedElement && onDelete(selectedElement)}
                  className="flex-1 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>

              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => selectedElement && onMoveToFront(selectedElement)}
                  className="flex-1"
                  title="Move to front"
                >
                  ↑
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => selectedElement && onMoveToBack(selectedElement)}
                  className="flex-1"
                  title="Move to back"
                >
                  ↓
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Export */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Export</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button className="w-full" size="sm">
            Download PNG
          </Button>
          <Button className="w-full" size="sm" variant="outline">
            Download SVG
          </Button>
          <Button className="w-full" size="sm" variant="outline">
            Share Design
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
