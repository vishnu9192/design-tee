// Helper function to generate unique IDs
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Design element type definition
export type DesignElement = {
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

// Product colors configuration
export const productColors = [
  { name: "White", value: "white", hex: "#FFFFFF" },
  { name: "Black", value: "black", hex: "#000000" },
  { name: "Navy", value: "navy", hex: "#1E3A8A" },
  { name: "Red", value: "red", hex: "#DC2626" },
  { name: "Green", value: "green", hex: "#16A34A" },
  { name: "Yellow", value: "yellow", hex: "#EAB308" },
  { name: "Purple", value: "purple", hex: "#9333EA" },
  { name: "Pink", value: "pink", hex: "#EC4899" },
  { name: "Orange", value: "orange", hex: "#EA580C" },
  { name: "Gray", value: "gray", hex: "#6B7280" },
]

// Design templates
export const designTemplates = [
  { id: 1, name: "Minimalist Text", category: "text", image: "/minimalist-text-design.png", popular: true },
  { id: 2, name: "Geometric Pattern", category: "pattern", image: "/geometric-pattern-design.jpg", popular: false },
  { id: 3, name: "Nature Inspired", category: "nature", image: "/nature-pattern-design.jpg", popular: true },
  { id: 4, name: "Urban Street", category: "street", image: "/urban-street-art.png", popular: false },
  { id: 5, name: "Abstract Art", category: "abstract", image: "/abstract-art-design.png", popular: false },
  { id: 6, name: "Vintage Logo", category: "vintage", image: "/vintage-logo-design.jpg", popular: true },
  { id: 7, name: "Sunset Design", category: "nature", image: "/sunset-design.png", popular: true },
  { id: 8, name: "Typography", category: "text", image: "/typography-t-shirt-design.jpg", popular: false },
]

// AI prompt suggestions
export const aiPromptSuggestions = [
  "A minimalist sunset over mountains with geometric shapes",
  "Minimalist sunset with horizontal lines and circle sun",
  "Simple sunset landscape with mountain silhouettes",
  "Abstract sunset with warm color blocks",
  "Serene sunset scene with zen aesthetic",
  "Urban street art with graffiti style typography",
  "Vintage-inspired logo with retro colors",
  "Abstract geometric pattern in pastel colors"
]

// SVG generator function
export const generateMinimalistSunset = (): string => {
  const svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1"/><stop offset="50%" style="stop-color:#FFB347;stop-opacity:1"/><stop offset="100%" style="stop-color:#FFA500;stop-opacity:1"/></linearGradient></defs><rect width="200" height="200" fill="url(#skyGradient)"/><circle cx="100" cy="80" r="35" fill="#FFD700" opacity="0.9"/><circle cx="100" cy="80" r="32" fill="#FFA500"/><line x1="20" y1="120" x2="180" y2="120" stroke="#2D3E50" stroke-width="2" opacity="0.3"/><line x1="20" y1="130" x2="180" y2="130" stroke="#2D3E50" stroke-width="1" opacity="0.2"/><line x1="20" y1="140" x2="180" y2="140" stroke="#2D3E50" stroke-width="1" opacity="0.15"/><rect x="0" y="140" width="200" height="60" fill="#2D3E50" opacity="0.4"/></svg>`
  
  try {
    const encoded = btoa(unescape(encodeURIComponent(svg)))
    return `data:image/svg+xml;base64,${encoded}`
  } catch (error) {
    console.error('Error encoding SVG:', error)
    const svgEncoded = encodeURIComponent(svg)
    return `data:image/svg+xml;utf8,${svgEncoded}`
  }
}
