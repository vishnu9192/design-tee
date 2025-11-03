"use client"

import { Button } from "@/components/ui/button"
import {
  Undo,
  Redo,
  RotateCcw,
  Grid3x3,
  ZoomIn,
  ZoomOut,
  Download,
  Save,
} from "lucide-react"

interface DesignHeaderProps {
  zoom: number
  setZoom: (zoom: number) => void
  showGrid: boolean
  setShowGrid: (show: boolean) => void
  onUndo: () => void
  onRedo: () => void
  onReset: () => void
  canUndo: boolean
  canRedo: boolean
}

export function DesignHeader({
  zoom,
  setZoom,
  showGrid,
  setShowGrid,
  onUndo,
  onRedo,
  onReset,
  canUndo,
  canRedo,
}: DesignHeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        {/* Left: Branding */}
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold">DesignTee</h1>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
            Studio
          </span>
        </div>

        {/* Center: Tools */}
        <div className="flex items-center gap-2">
          {/* History */}
          <div className="flex items-center gap-1 border-r border-border pr-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onUndo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRedo}
              disabled={!canRedo}
              title="Redo (Ctrl+Y)"
            >
              <Redo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              title="Reset Design"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* View Options */}
          <div className="flex items-center gap-1 border-r border-border pr-3">
            <Button
              variant={showGrid ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowGrid(!showGrid)}
              title="Toggle Grid"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 border-r border-border pr-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom(Math.max(25, zoom - 10))}
              title="Zoom Out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <div className="w-16 px-2 py-1 text-center text-sm bg-muted rounded">
              {zoom}%
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              title="Zoom In"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>

          {/* Export & Share */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              title="Save Design"
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              title="Download Design"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button size="sm">
            Add to Cart - $29.99
          </Button>
        </div>
      </div>
    </header>
  )
}

