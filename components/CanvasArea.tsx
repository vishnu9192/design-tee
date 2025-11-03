"use client"

import { Button } from "@/components/ui/button"
import { Undo, Redo, RotateCcw, Palette } from "lucide-react"
import { cn } from "@/lib/utils"
import { DesignElement } from "@/lib/design-helpers"
import styles from "./CanvasArea.module.css"

interface CanvasAreaProps {
  selectedColor: string
  designElements: DesignElement[]
  selectedElement: string
  zoom: number
  showGrid: boolean
  isDragging: boolean
  textUnderline: boolean
  onElementMouseDown: (e: React.MouseEvent, id: string) => void
  onElementClick: (id: string) => void
  onMouseMove: (e: React.MouseEvent) => void
  onMouseUp: () => void
  productColors: Array<{name: string; value: string; hex: string}>
}

const productImageMap: {[key: string]: {[key: string]: string}} = {
  tshirt: {
    white: "/white-t-shirt.png",
    black: "/black-t-shirt.png",
    blue: "/blue-t-shirt.png",
    navy: "/navy-blue-t-shirt.png",
    red: "/red-t-shirt.png",
    green: "/green-t-shirt.png",
  }
}

export function CanvasArea({
  selectedColor,
  designElements,
  selectedElement,
  zoom,
  showGrid,
  isDragging,
  textUnderline,
  onElementMouseDown,
  onElementClick,
  onMouseMove,
  onMouseUp,
  productColors,
}: CanvasAreaProps) {
  const getProductImage = () => {
    const productMap = productImageMap["tshirt"]
    if (productMap && productMap[selectedColor]) {
      return productMap[selectedColor]
    }
    return "/white-t-shirt.png"
  }

  const getColorName = () => {
    const color = productColors.find(c => c.value === selectedColor)
    return color?.name || selectedColor
  }

  return (
    <div className={styles.canvas}>
      {/* Canvas Toolbar */}
      <div className={styles.canvasToolbar}>
        <div className={styles.toolbarContent}>
          <div className={styles.toolbarLeft}>
            <Button variant="ghost" size="sm">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Redo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <div className={styles.toolbarRight}>
            <span className="text-sm text-muted-foreground">Zoom:</span>
            <Button variant="outline" size="sm" className="bg-transparent">
              {zoom}%
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className={styles.canvasContainer}>
        {/* Grid Background */}
        {showGrid && <div className={styles.gridBackground} />}
        
        <div 
          className={styles.canvasWrapper}
          style={{ 
            "--canvas-zoom": `${zoom / 100}` 
          } as React.CSSProperties}
        >
          {/* Product Preview */}
          <div className={styles.canvasPreview}>
            {/* Always show the product base */}
            <img
              src={getProductImage()}
              alt="Product preview"
              className="w-full h-full object-cover"
            />
            
            {/* Design Overlay */}
            <div className={styles.designOverlay}>
              <div 
                className={styles.designCanvas}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
              >
                {designElements.length === 0 ? (
                  <div className={styles.emptyState}>
                    <Palette className={cn(styles.emptyStateIcon, "lucide-icon")} />
                    <p className={styles.emptyStateText}>Your design will appear here</p>
                    <p className={styles.emptyStateSubtext}>Use the tools on the left to get started</p>
                  </div>
                ) : (
                  <>
                    {/* Render Design Elements */}
                    {designElements.map((element) => (
                      <div
                        key={element.id}
                        className={cn(
                          styles.designElement,
                          selectedElement === element.id && styles.selected,
                          isDragging && selectedElement === element.id && styles.dragging
                        )}
                        style={{
                          "--element-x": `${element.x}px`,
                          "--element-y": `${element.y}px`,
                          "--element-width": `${element.width}px`,
                          "--element-height": `${element.height}px`,
                          "--element-rotation": `${element.rotation || 0}deg`,
                        } as React.CSSProperties}
                        onClick={() => onElementClick(selectedElement === element.id ? "" : element.id)}
                        onMouseDown={(e) => onElementMouseDown(e, element.id)}
                      >
                        {element.type === "text" && (
                          <div
                            className={styles.textElement}
                            style={{
                              "--text-size": `${element.fontSize || 16}px`,
                              "--text-family": element.fontFamily || "arial",
                              "--text-weight": element.fontWeight || "normal",
                              "--text-style": element.fontStyle || "normal",
                              "--text-align": (element.textAlign as "left" | "center" | "right") || "center",
                              "--text-color": element.color || "#000000",
                              "--text-decoration": textUnderline ? "underline" : "none",
                            } as React.CSSProperties}
                          >
                            {element.content}
                          </div>
                        )}
                        
                        {element.type === "shape" && (
                          <div className={styles.shapeElement}>
                            {element.content === "rectangle" && (
                              <div 
                                className={styles.shapeRectangle}
                                style={{
                                  "--bg-color": element.backgroundColor || "#FFFFFF",
                                  "--border-color": element.color || "#000000",
                                  "--border-width": `${element.borderWidth || 2}px`,
                                } as React.CSSProperties}
                              />
                            )}
                            {element.content === "circle" && (
                              <div 
                                className={styles.shapeCircle}
                                style={{
                                  "--bg-color": element.backgroundColor || "#FFFFFF",
                                  "--border-color": element.color || "#000000",
                                  "--border-width": `${element.borderWidth || 2}px`,
                                } as React.CSSProperties}
                              />
                            )}
                            {element.content === "triangle" && (
                              <div 
                                className={styles.shapeTriangle}
                                style={{
                                  "--triangle-size": `${element.width / 2}px`,
                                  "--triangle-height": `${element.height}px`,
                                  "--triangle-color": element.backgroundColor || "#FFFFFF",
                                } as React.CSSProperties}
                              />
                            )}
                          </div>
                        )}
                        
                        {element.type === "ai-generated" && (
                          <div className={styles.aiGeneratedElement}>
                            {element.content.startsWith('data:image') ? (
                              <img
                                src={element.content}
                                alt="AI Generated"
                                className="w-full h-full object-cover"
                              />
                            ) : null}
                          </div>
                        )}
                        
                        {(element.type === "image" || element.type === "template") && (
                          <div className={styles.imageElement}>
                            <img
                              src={element.content}
                              alt="Design element"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        {/* Selection Handles */}
                        {selectedElement === element.id && (
                          <>
                            <div className={cn(styles.selectionHandle, styles.handleTopLeft)}></div>
                            <div className={cn(styles.selectionHandle, styles.handleTopRight)}></div>
                            <div className={cn(styles.selectionHandle, styles.handleBottomLeft)}></div>
                            <div className={cn(styles.selectionHandle, styles.handleBottomRight)}></div>
                          </>
                        )}
                      </div>
                    ))}
                    
                    {/* Layer counter */}
                    <div className={styles.layerCounter}>
                      {designElements.length} elements
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Canvas Info */}
            <div className={styles.canvasInfo}>
              T-Shirt • {getColorName()}
            </div>
            
            {/* Zoom Info */}
            <div className={styles.canvasZoom}>
              {zoom}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
