"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, Trash2, ZoomIn, ZoomOut, Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import styles from "./DesignCanvas.module.css"

type DesignElement = {
  id: string
  type: string
  content: string
  x: number
  y: number
  width: number
  height: number
  rotation?: number
  fontSize?: number
  fontFamily?: string
  fontWeight?: string
  fontStyle?: string
  textAlign?: string
  color?: string
  backgroundColor?: string
  borderWidth?: number
}

interface DesignCanvasProps {
  selectedProduct: string
  selectedColor: string
  designElements: DesignElement[]
  zoom: number
  setZoom: (zoom: number) => void
  showGrid: boolean
  setShowGrid: (show: boolean) => void
  selectedElement: string | null
  setSelectedElement: (id: string | null) => void
  onElementMouseDown: (e: React.MouseEvent, id: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
  onDownload: () => void
  uploadedImages: Map<string, string>
  onMouseMove?: (e: React.MouseEvent) => void
  onMouseUp?: () => void
}

export function DesignCanvas({
  selectedProduct,
  selectedColor,
  designElements,
  zoom,
  setZoom,
  showGrid,
  setShowGrid,
  selectedElement,
  setSelectedElement,
  onElementMouseDown,
  onDuplicate,
  onDelete,
  onDownload,
  uploadedImages,
  onMouseMove,
  onMouseUp
}: DesignCanvasProps) {
  const getTshirtImage = () => {
    const colorMap: { [key: string]: string } = {
      "White": "/tshirts/white-tshirt.png",
      "Black": "/tshirts/black-tshirt.png",
      "Navy": "/tshirts/navy-tshirt.png",
      "Red": "/tshirts/red-tshirt.png",
      "Green": "/tshirts/green-tshirt.png",
      "Yellow": "/tshirts/yellow-tshirt.png",
      "Purple": "/tshirts/purple-tshirt.png",
      "Pink": "/tshirts/pink-tshirt.png",
      "Orange": "/tshirts/orange-tshirt.png",
      "Gray": "/tshirts/gray-tshirt.png"
    }
    return colorMap[selectedColor] || "/tshirts/white-tshirt.png"
  }

  const renderDesignElement = (element: DesignElement) => {
    const baseStyle: React.CSSProperties = {
      left: `${element.x}px`,
      top: `${element.y}px`,
      width: `${element.width}px`,
      height: `${element.height}px`,
      transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined,
      border: selectedElement === element.id ? "2px solid #3b82f6" : "1px solid transparent"
    }

    if (element.type === "text") {
      return (
        <div
          key={element.id}
          className={styles.textElement}
          style={{
            ...baseStyle,
            fontSize: `${element.fontSize || 16}px`,
            fontFamily: element.fontFamily || "arial",
            fontWeight: element.fontWeight === "bold" ? "bold" : "normal",
            fontStyle: element.fontStyle === "italic" ? "italic" : "normal",
            textAlign: (element.textAlign as "left" | "center" | "right") || "left",
            color: element.color || "#000000",
            backgroundColor: element.backgroundColor || "transparent"
          }}
          onMouseDown={(e) => onElementMouseDown(e, element.id)}
          onClick={() => setSelectedElement(element.id)}
        >
          {element.content}
        </div>
      )
    }

    if (element.type === "image") {
      const imageUrl = uploadedImages.get(element.content || "")
      if (!imageUrl) return null
      return (
        <div
          key={element.id}
          className={styles.designElement}
          style={baseStyle}
          onMouseDown={(e) => onElementMouseDown(e, element.id)}
          onClick={() => setSelectedElement(element.id)}
        >
          <Image
            src={imageUrl}
            alt="design"
            fill
            className="object-cover"
          />
        </div>
      )
    }

    if (element.type === "shape") {
      let shapeJSX = null
      const shapeCommonStyle: React.CSSProperties = {
        backgroundColor: element.backgroundColor || "#000000",
        borderWidth: element.borderWidth || 0,
        borderStyle: "solid",
        borderColor: element.color || "#000000"
      }

      if (element.content === "rectangle") {
        shapeJSX = <div className={styles.shapeElement} style={shapeCommonStyle} />
      } else if (element.content === "circle") {
        shapeJSX = <div className={styles.shapeElement} style={{ ...shapeCommonStyle, borderRadius: "50%" }} />
      } else if (element.content === "triangle") {
        shapeJSX = (
          <div style={{
            width: 0,
            height: 0,
            borderLeft: `${element.width / 2}px solid transparent`,
            borderRight: `${element.width / 2}px solid transparent`,
            borderBottom: `${element.height}px solid ${element.backgroundColor || "#000000"}`
          }} />
        )
      }

      return (
        <div
          key={element.id}
          className={styles.designElement}
          style={baseStyle}
          onMouseDown={(e) => onElementMouseDown(e, element.id)}
          onClick={() => setSelectedElement(element.id)}
        >
          {shapeJSX}
        </div>
      )
    }
  }

  return (
    <div className="space-y-4">
      {/* Canvas Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Canvas Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setZoom(Math.max(zoom - 10, 50))}
              disabled={zoom <= 50}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="flex-1 px-2 text-center text-sm">{zoom}%</div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setZoom(Math.min(zoom + 10, 200))}
              disabled={zoom >= 200}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* Grid Toggle */}
          <Button
            size="sm"
            variant={showGrid ? "default" : "outline"}
            className="w-full"
            onClick={() => setShowGrid(!showGrid)}
          >
            {showGrid ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
            Grid: {showGrid ? "On" : "Off"}
          </Button>

          {/* Download Design */}
          <Button
            size="sm"
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={onDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Design
          </Button>
        </CardContent>
      </Card>

      {/* Selected Element Controls */}
      {selectedElement && (
        <Card className="border-primary bg-accent">
          <CardHeader>
            <CardTitle className="text-sm">Element Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => onDuplicate(selectedElement)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="w-full"
                onClick={() => onDelete(selectedElement)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Design Canvas Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">
            {selectedProduct} Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div 
            className={styles.canvasScaleWrapper}
            style={{ transform: `scale(${zoom / 100})` }}
          >
            <div 
              className={styles.canvasContainer}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              {/* Grid Background */}
              {showGrid && (
                <div className={styles.gridOverlay} />
              )}

              {/* T-Shirt Base */}
              <Image
                src={getTshirtImage()}
                alt={selectedColor}
                fill
                className="object-cover"
              />

              {/* Design Elements */}
              <div className={styles.canvasInner}>
                {designElements.map((element) => renderDesignElement(element))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Design Elements List */}
      {designElements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Design Elements ({designElements.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {designElements.map((element) => (
                <div
                  key={element.id}
                  className="flex items-center justify-between p-2 rounded border border-border hover:bg-accent cursor-pointer"
                  onClick={() => setSelectedElement(element.id)}
                >
                  <span className="text-xs truncate">
                    {element.type === "text" ? `Text: ${element.content?.substring(0, 20)}...` : 
                     element.type === "image" ? "Image" : 
                     `Shape: ${element.content}`}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {element.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
