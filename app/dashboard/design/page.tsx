"use client"

import { useState, useCallback } from "react"
import { DesignElement, generateId } from "@/lib/design-helpers"
import { CanvasArea } from "@/components/CanvasArea"
import { LeftSidebar } from "@/components/LeftSidebar"
import { RightSidebar } from "@/components/RightSidebar"
import { DesignHeader } from "@/components/DesignHeader"
import { productColors } from "@/lib/design-helpers"

export default function DesignPage() {
  // Canvas state
  const [designElements, setDesignElements] = useState<DesignElement[]>([])
  const [selectedElement, setSelectedElement] = useState<string>("")
  const [zoom, setZoom] = useState(100)
  const [showGrid, setShowGrid] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Product state
  const [selectedColor, setSelectedColor] = useState("white")

  // AI state
  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  // Text state
  const [textContent, setTextContent] = useState("")
  const [fontSize, setFontSize] = useState([16])
  const [fontFamily, setFontFamily] = useState("arial")
  const [textColor, setTextColor] = useState("#000000")

  // Shape state
  const [shapeColor, setShapeColor] = useState("#FFFFFF")
  const [shapeBorderColor, setShapeBorderColor] = useState("#000000")

  // History state
  const [history, setHistory] = useState<DesignElement[][]>([[]])
  const [historyIndex, setHistoryIndex] = useState(0)

  // Add to history
  const addToHistory = useCallback((elements: DesignElement[]) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(elements)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex])

  // Add text
  const handleAddText = useCallback(() => {
    if (!textContent.trim()) return

    const newElement: DesignElement = {
      id: generateId(),
      type: "text",
      content: textContent,
      x: 50,
      y: 50,
      width: 200,
      height: 50,
      rotation: 0,
      fontSize: fontSize[0],
      fontFamily,
      fontWeight: "normal",
      fontStyle: "normal",
      textAlign: "center",
      color: textColor,
    }

    const updated = [...designElements, newElement]
    setDesignElements(updated)
    addToHistory(updated)
    setTextContent("")
  }, [textContent, fontSize, fontFamily, textColor, designElements, addToHistory])

  // Add shape
  const handleAddShape = useCallback(
    (shapeType: string) => {
      const newElement: DesignElement = {
        id: generateId(),
        type: "shape",
        content: shapeType,
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        rotation: 0,
        color: shapeBorderColor,
        backgroundColor: shapeColor,
        borderWidth: 2,
      }

      const updated = [...designElements, newElement]
      setDesignElements(updated)
      addToHistory(updated)
    },
    [designElements, shapeColor, shapeBorderColor, addToHistory]
  )

  // Add image
  const handleAddImage = useCallback(
    (file: File) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string

        const newElement: DesignElement = {
          id: generateId(),
          type: "image",
          content: imageUrl,
          x: 50,
          y: 50,
          width: 150,
          height: 150,
          rotation: 0,
        }

        const updated = [...designElements, newElement]
        setDesignElements(updated)
        addToHistory(updated)
      }
      reader.readAsDataURL(file)
    },
    [designElements, addToHistory]
  )

  // Apply template
  // const handleApplyTemplate = useCallback(
  //   (templateId: number, templateUrl: string) => {
  //     const newElement: DesignElement = {
  //       id: generateId(),
  //       type: "template",
  //       content: templateUrl,
  //       x: 50,
  //       y: 50,
  //       width: 200,
  //       height: 200,
  //       rotation: 0,
  //     }

  //     const updated = [...designElements, newElement]
  //     setDesignElements(updated)
  //     addToHistory(updated)
  //   },
  //   [designElements, addToHistory]
  // )

  // Unused but kept for reference

  // Generate AI design
  const handleGenerateAI = useCallback(async () => {
    if (!aiPrompt.trim()) return

    setIsGenerating(true)
    try {
      // Simulate API call - replace with actual API when available
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create realistic, detailed designs based on prompt
      const designThemes = [
        {
          name: "sunset",
          svg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sunset" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:1" />
                <stop offset="30%" style="stop-color:#F7931E;stop-opacity:1" />
                <stop offset="60%" style="stop-color:#FDB833;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#EE5622;stop-opacity:1" />
              </linearGradient>
              <radialGradient id="sun" cx="50%" cy="40%">
                <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
                <stop offset="70%" style="stop-color:#FFA500;stop-opacity:0.8" />
                <stop offset="100%" style="stop-color:#FF8C00;stop-opacity:0" />
              </radialGradient>
            </defs>
            <rect width="400" height="400" fill="url(#sunset)"/>
            <circle cx="200" cy="120" r="60" fill="url(#sun)"/>
            <path d="M 50 350 Q 100 320 150 340 T 250 340 T 350 320 L 400 400 L 0 400 Z" fill="#8B6F47" opacity="0.6"/>
            <path d="M 60 360 Q 120 340 180 350 T 320 340 L 400 400 L 0 400 Z" fill="#6B5D4F" opacity="0.4"/>
          </svg>`
        },
        {
          name: "mountain",
          svg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#E0F6FF;stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect width="400" height="400" fill="url(#sky)"/>
            <polygon points="200,50 50,300 150,300" fill="#8B7355"/>
            <polygon points="200,50 60,300 100,300" fill="#A0826D"/>
            <polygon points="280,120 100,300 200,300" fill="#6B5D4F"/>
            <polygon points="280,120 120,300 160,300" fill="#8B7355"/>
            <polygon points="350,180 200,300 280,300" fill="#5A4A3A"/>
            <circle cx="80" cy="100" r="8" fill="white" opacity="0.7"/>
            <circle cx="120" cy="80" r="6" fill="white" opacity="0.6"/>
          </svg>`
        },
        {
          name: "ocean",
          svg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ocean" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#1E90FF;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#00CED1;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#006994;stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect width="400" height="400" fill="url(#ocean)"/>
            <path d="M 0 180 Q 50 170 100 180 T 200 180 T 300 180 T 400 180 L 400 250 Q 350 240 300 250 T 200 250 T 100 250 T 0 250 Z" fill="#0099CC" opacity="0.8"/>
            <path d="M 0 250 Q 50 240 100 250 T 200 250 T 300 250 T 400 250 L 400 350 Q 350 340 300 350 T 200 350 T 100 350 T 0 350 Z" fill="#004D7A" opacity="0.6"/>
            <circle cx="100" cy="80" r="30" fill="white" opacity="0.9"/>
            <circle cx="90" cy="75" r="28" fill="#E0F6FF" opacity="0.7"/>
          </svg>`
        },
        {
          name: "forest",
          svg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="forest" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#90EE90;stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect width="400" height="400" fill="url(#forest)"/>
            <polygon points="80,150 50,220 110,220" fill="#228B22"/>
            <polygon points="80,160 55,225 105,225" fill="#2E8B57"/>
            <polygon points="180,100 140,200 220,200" fill="#228B22"/>
            <polygon points="180,110 150,210 210,210" fill="#3CB371"/>
            <polygon points="300,140 260,240 340,240" fill="#1E7C1E"/>
            <polygon points="300,150 270,245 330,245" fill="#228B22"/>
            <rect x="40" y="240" width="15" height="80" fill="#8B4513"/>
            <rect x="170" y="210" width="20" height="110" fill="#654321"/>
            <rect x="280" y="250" width="18" height="100" fill="#8B4513"/>
            <ellipse cx="100" cy="300" rx="8" ry="5" fill="#654321" opacity="0.6"/>
          </svg>`
        },
        {
          name: "abstract",
          svg: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#667EEA;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#764BA2;stop-opacity:1" />
              </linearGradient>
              <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#F093FB;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#F5576C;stop-opacity:1" />
              </linearGradient>
            </defs>
            <rect width="400" height="400" fill="url(#grad1)"/>
            <circle cx="100" cy="100" r="70" fill="url(#grad2)" opacity="0.7"/>
            <circle cx="300" cy="100" r="50" fill="#FFD700" opacity="0.5"/>
            <circle cx="100" cy="300" r="60" fill="#00FF00" opacity="0.5"/>
            <circle cx="300" cy="300" r="55" fill="#FF1493" opacity="0.6"/>
            <path d="M 200 50 L 250 150 L 200 200 L 150 150 Z" fill="#FFFF00" opacity="0.7"/>
          </svg>`
        }
      ]

      // Select a random design theme that matches the prompt
      const theme = designThemes[Math.floor(Math.random() * designThemes.length)]
      const svg = theme.svg

      const encoded = btoa(svg)
      const imageUrl = `data:image/svg+xml;base64,${encoded}`

      // Create a larger design element that fills the canvas nicely
      const newElement: DesignElement = {
        id: generateId(),
        type: "ai-generated",
        content: imageUrl,
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        rotation: 0,
      }

      const updated = [...designElements, newElement]
      setDesignElements(updated)
      addToHistory(updated)
    } catch (error) {
      console.error("Error generating AI design:", error)
    } finally {
      setIsGenerating(false)
      setAiPrompt("")
    }
  }, [aiPrompt, designElements, addToHistory])

  // Element drag handlers
  const handleElementMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    setSelectedElement(id)
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !selectedElement) return

      const dx = e.clientX - dragStart.x
      const dy = e.clientY - dragStart.y

      const updated = designElements.map((el) => {
        if (el.id === selectedElement) {
          return {
            ...el,
            x: el.x + dx,
            y: el.y + dy,
          }
        }
        return el
      })

      setDesignElements(updated)
      setDragStart({ x: e.clientX, y: e.clientY })
    },
    [isDragging, selectedElement, dragStart, designElements]
  )

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)
      addToHistory(designElements)
    }
  }, [isDragging, designElements, addToHistory])

  // Delete element
  const handleDeleteElement = useCallback(
    (id: string) => {
      const updated = designElements.filter((el) => el.id !== id)
      setDesignElements(updated)
      addToHistory(updated)
      if (selectedElement === id) {
        setSelectedElement("")
      }
    },
    [designElements, selectedElement, addToHistory]
  )

  // Duplicate element
  const handleDuplicateElement = useCallback(
    (id: string) => {
      const element = designElements.find((el) => el.id === id)
      if (!element) return

      const newElement = {
        ...element,
        id: generateId(),
        x: element.x + 10,
        y: element.y + 10,
      }

      const updated = [...designElements, newElement]
      setDesignElements(updated)
      addToHistory(updated)
    },
    [designElements, addToHistory]
  )

  // Move to front
  const handleMoveToFront = useCallback(
    (id: string) => {
      const index = designElements.findIndex((el) => el.id === id)
      if (index === -1 || index === designElements.length - 1) return

      const updated = [
        ...designElements.slice(0, index),
        ...designElements.slice(index + 1),
        designElements[index],
      ]
      setDesignElements(updated)
      addToHistory(updated)
    },
    [designElements, addToHistory]
  )

  // Move to back
  const handleMoveToBack = useCallback(
    (id: string) => {
      const index = designElements.findIndex((el) => el.id === id)
      if (index === -1 || index === 0) return

      const updated = [
        designElements[index],
        ...designElements.slice(0, index),
        ...designElements.slice(index + 1),
      ]
      setDesignElements(updated)
      addToHistory(updated)
    },
    [designElements, addToHistory]
  )

  // Undo/Redo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setDesignElements(history[newIndex])
    }
  }, [history, historyIndex])

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setDesignElements(history[newIndex])
    }
  }, [history, historyIndex])

  const handleReset = useCallback(() => {
    setDesignElements([])
    setHistory([[]])
    setHistoryIndex(0)
    setSelectedElement("")
  }, [])

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <DesignHeader
        zoom={zoom}
        setZoom={setZoom}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleReset}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar
          aiPrompt={aiPrompt}
          setAiPrompt={setAiPrompt}
          isGenerating={isGenerating}
          onGenerateAI={handleGenerateAI}
          textContent={textContent}
          setTextContent={setTextContent}
          fontSize={fontSize}
          setFontSize={setFontSize}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          textColor={textColor}
          setTextColor={setTextColor}
          onAddText={handleAddText}
          shapeColor={shapeColor}
          setShapeColor={setShapeColor}
          shapeBorderColor={shapeBorderColor}
          setShapeBorderColor={setShapeBorderColor}
          shapeBorderWidth={[2]}
          setShapeBorderWidth={() => {}}
          onAddShape={handleAddShape}
          isUploading={false}
          uploadedImages={new Map()}
          onImageUpload={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0]
            if (file) handleAddImage(file)
          }}
          onAddImageFromTemplate={() => {}}
          designElements={designElements}
          selectedElement={selectedElement || null}
          setSelectedElement={(id: string | null) => setSelectedElement(id || "")}
          onDelete={handleDeleteElement}
          onDuplicate={handleDuplicateElement}
        />

        {/* Canvas Area */}
        <CanvasArea
          selectedColor={selectedColor}
          designElements={designElements}
          selectedElement={selectedElement}
          zoom={zoom}
          showGrid={showGrid}
          isDragging={isDragging}
          textUnderline={false}
          onElementMouseDown={handleElementMouseDown}
          onElementClick={setSelectedElement}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          productColors={productColors}
        />

        {/* Right Sidebar */}
        <RightSidebar
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedElement={selectedElement}
          designElements={designElements}
          onDuplicate={handleDuplicateElement}
          onDelete={handleDeleteElement}
          onMoveToFront={handleMoveToFront}
          onMoveToBack={handleMoveToBack}
          productColors={productColors}
        />
      </div>
    </div>
  )
}
