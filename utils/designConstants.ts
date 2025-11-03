// Design studio constants and data

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

export const getTshirtImage = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    "white": "/tshirts/white-tshirt.png",
    "black": "/tshirts/black-tshirt.png",
    "navy": "/tshirts/navy-tshirt.png",
    "red": "/tshirts/red-tshirt.png",
    "green": "/tshirts/green-tshirt.png",
    "yellow": "/tshirts/yellow-tshirt.png",
    "purple": "/tshirts/purple-tshirt.png",
    "pink": "/tshirts/pink-tshirt.png",
    "orange": "/tshirts/orange-tshirt.png",
    "gray": "/tshirts/gray-tshirt.png"
  }
  return colorMap[color] || "/tshirts/white-tshirt.png"
}
