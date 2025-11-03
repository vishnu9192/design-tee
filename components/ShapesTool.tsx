"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Circle, Square, Triangle } from "lucide-react"
import styles from "./ShapesTool.module.css"

interface ShapesToolProps {
  shapeType: string
  setShapeType: (type: string) => void
  shapeColor: string
  setShapeColor: (color: string) => void
  shapeBorderColor: string
  setShapeBorderColor: (color: string) => void
  shapeBorderWidth: number[]
  setShapeBorderWidth: (width: number[]) => void
  onAddShape: () => void
}

export function ShapesTool({
  shapeType,
  setShapeType,
  shapeColor,
  setShapeColor,
  shapeBorderColor,
  setShapeBorderColor,
  shapeBorderWidth,
  setShapeBorderWidth,
  onAddShape
}: ShapesToolProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Shape</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Shape Selection */}
          <div>
            <Label>Shape Type</Label>
            <div className="flex gap-2 mt-2">
              <Button 
                variant={shapeType === "rectangle" ? "default" : "outline"} 
                size="sm" 
                className="flex-1"
                onClick={() => setShapeType("rectangle")}
              >
                <Square className="h-4 w-4 mr-1" />
                Rectangle
              </Button>
              <Button 
                variant={shapeType === "circle" ? "default" : "outline"} 
                size="sm" 
                className="flex-1"
                onClick={() => setShapeType("circle")}
              >
                <Circle className="h-4 w-4 mr-1" />
                Circle
              </Button>
              <Button 
                variant={shapeType === "triangle" ? "default" : "outline"} 
                size="sm" 
                className="flex-1"
                onClick={() => setShapeType("triangle")}
              >
                <Triangle className="h-4 w-4 mr-1" />
                Triangle
              </Button>
            </div>
          </div>

          {/* Fill Color */}
          <div>
            <Label htmlFor="shape-color">Fill Color</Label>
            <div className="flex gap-2 mt-2">
              <input
                type="color"
                id="shape-color"
                value={shapeColor}
                onChange={(e) => setShapeColor(e.target.value)}
                className="w-12 h-8 rounded border border-border cursor-pointer"
                title="Select shape fill color"
              />
              <Input 
                value={shapeColor} 
                onChange={(e) => setShapeColor(e.target.value)}
                placeholder="#000000"
                className="flex-1"
                title="Enter hex color code"
              />
            </div>
          </div>

          {/* Border Color */}
          <div>
            <Label htmlFor="shape-border-color">Border Color</Label>
            <div className="flex gap-2 mt-2">
              <input
                type="color"
                id="shape-border-color"
                value={shapeBorderColor}
                onChange={(e) => setShapeBorderColor(e.target.value)}
                className="w-12 h-8 rounded border border-border cursor-pointer"
                title="Select shape border color"
              />
              <Input 
                value={shapeBorderColor} 
                onChange={(e) => setShapeBorderColor(e.target.value)}
                placeholder="#000000"
                className="flex-1"
                title="Enter hex color code"
              />
            </div>
          </div>

          {/* Border Width */}
          <div>
            <Label>Border Width: {shapeBorderWidth[0]}px</Label>
            <Slider 
              value={shapeBorderWidth} 
              onValueChange={setShapeBorderWidth}
              max={20} 
              min={0} 
              step={1} 
              className="mt-2" 
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0px</span>
              <span>20px</span>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={onAddShape}
          >
            Add {shapeType.charAt(0).toUpperCase() + shapeType.slice(1)}
          </Button>
        </CardContent>
      </Card>

      {/* Color Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Color Presets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.colorGrid}>
            {[
              { name: "Black", color: "#000000" },
              { name: "White", color: "#FFFFFF" },
              { name: "Red", color: "#FF0000" },
              { name: "Blue", color: "#0000FF" },
              { name: "Green", color: "#00FF00" },
              { name: "Yellow", color: "#FFFF00" },
              { name: "Purple", color: "#800080" },
              { name: "Orange", color: "#FFA500" }
            ].map((preset) => (
              <button
                key={preset.color}
                onClick={() => setShapeColor(preset.color)}
                className={styles.colorPreset}
                style={{ backgroundColor: preset.color }}
                title={`${preset.name} (${preset.color})`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
