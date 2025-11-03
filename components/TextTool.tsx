"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Type, Underline } from "lucide-react"
import styles from "./TextTool.module.css"

interface TextToolProps {
  textContent: string
  setTextContent: (content: string) => void
  fontSize: number[]
  setFontSize: (size: number[]) => void
  fontFamily: string
  setFontFamily: (family: string) => void
  fontWeight: string
  setFontWeight: (weight: string) => void
  fontStyle: string
  setFontStyle: (style: string) => void
  textAlign: string
  setTextAlign: (align: string) => void
  textColor: string
  setTextColor: (color: string) => void
  textUnderline: boolean
  setTextUnderline: (underline: boolean) => void
  onAddText: () => void
}

export function TextTool({
  textContent,
  setTextContent,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  fontWeight,
  setFontWeight,
  fontStyle,
  setFontStyle,
  textAlign,
  setTextAlign,
  textColor,
  setTextColor,
  textUnderline,
  setTextUnderline,
  onAddText
}: TextToolProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Text</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="text-content">Text Content</Label>
            <Input 
              id="text-content" 
              placeholder="Enter your text..." 
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="font-family">Font Family</Label>
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger>
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arial">Arial</SelectItem>
                <SelectItem value="helvetica">Helvetica</SelectItem>
                <SelectItem value="times">Times New Roman</SelectItem>
                <SelectItem value="georgia">Georgia</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="montserrat">Montserrat</SelectItem>
                <SelectItem value="playfair">Playfair Display</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Font Size: {fontSize[0]}px</Label>
            <Slider 
              value={fontSize} 
              onValueChange={setFontSize}
              max={72} 
              min={8} 
              step={1} 
              className="mt-2" 
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>8px</span>
              <span>72px</span>
            </div>
          </div>

          {/* Text Style Options */}
          <div>
            <Label>Text Style</Label>
            <div className="flex gap-1 mt-2">
              <Button 
                variant={fontWeight === "bold" ? "default" : "outline"} 
                size="sm" 
                className="flex-1"
                onClick={() => setFontWeight(fontWeight === "bold" ? "normal" : "bold")}
              >
                <Bold className="h-3 w-3" />
              </Button>
              <Button 
                variant={fontStyle === "italic" ? "default" : "outline"} 
                size="sm" 
                className="flex-1"
                onClick={() => setFontStyle(fontStyle === "italic" ? "normal" : "italic")}
              >
                <Italic className="h-3 w-3" />
              </Button>
              <Button 
                variant={textUnderline ? "default" : "outline"} 
                size="sm" 
                className="flex-1"
                onClick={() => setTextUnderline(!textUnderline)}
              >
                <Underline className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Text Alignment */}
          <div>
            <Label>Text Alignment</Label>
            <div className="flex gap-1 mt-2">
              <Button 
                variant={textAlign === "left" ? "default" : "outline"} 
                size="sm" 
                className="flex-1"
                onClick={() => setTextAlign("left")}
              >
                <AlignLeft className="h-3 w-3" />
              </Button>
              <Button 
                variant={textAlign === "center" ? "default" : "outline"} 
                size="sm" 
                className="flex-1"
                onClick={() => setTextAlign("center")}
              >
                <AlignCenter className="h-3 w-3" />
              </Button>
              <Button 
                variant={textAlign === "right" ? "default" : "outline"} 
                size="sm" 
                className="flex-1"
                onClick={() => setTextAlign("right")}
              >
                <AlignRight className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Text Color */}
          <div>
            <Label htmlFor="text-color">Text Color</Label>
            <div className="flex gap-2 mt-2">
              <input
                type="color"
                id="text-color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-12 h-8 rounded border border-border cursor-pointer"
                title="Select text color"
              />
              <Input 
                value={textColor} 
                onChange={(e) => setTextColor(e.target.value)}
                placeholder="#000000"
                className="flex-1"
                title="Enter hex color code"
              />
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={onAddText}
            disabled={!textContent.trim()}
          >
            <Type className="h-4 w-4 mr-2" />
            Add Text
          </Button>
        </CardContent>
      </Card>

      {/* Quick Text Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Quick Presets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { name: "Heading", size: 36, weight: "bold" },
              { name: "Subheading", size: 24, weight: "600" },
              { name: "Body Text", size: 16, weight: "normal" },
              { name: "Caption", size: 12, weight: "normal" }
            ].map((preset) => (
              <Button 
                key={preset.name} 
                variant="outline" 
                size="sm" 
                className="w-full bg-transparent text-left justify-start"
                onClick={() => {
                  setFontSize([preset.size])
                  setFontWeight(preset.weight)
                }}
              >
                <span 
                  className={styles.presetButton}
                  style={{ fontSize: `${preset.size * 0.7}px`, fontWeight: preset.weight }}
                >
                  {preset.name}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
