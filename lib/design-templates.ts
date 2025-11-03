export interface DesignTemplate {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  style: string;
  colors: string[];
  promptSuggestion: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

// Array of actual design images from your collection
const designImages = [
  '/white-t-shirt.png',
  '/black-t-shirt.png',
  '/navy-blue-t-shirt.png',
  '/blue-t-shirt.png',
  '/red-t-shirt.png',
  '/purple-t-shirt.png',
  '/green-t-shirt.png',
  '/olive-green-t-shirt.png',
  '/yellow-t-shirt.jpg',
  '/teal-t-shirt.jpg',
  '/cream-colored-t-shirt.jpg',
  '/dusty-pink-t-shirt.jpg',
  '/urban-street-art-tank-top.jpg',
  '/vintage-sunset-t-shirt.jpg',
  '/nature-pattern-design.jpg',
  '/typography-t-shirt-design.jpg',
  '/stylish-t-shirt-design-.jpg',
  '/sunset-design.png',
  '/urban-street-art.png',
  '/minimalist-hoodie.jpg',
  '/white-t-shirt-on-hanger.jpg',
  '/2.jpg',
  '/8.jpg',
  '/9.jpg',
  '/11.jpg',
  '/12.jpg',
  '/15.jpg',
  '/28.jpg',
]

export const designTemplates: DesignTemplate[] = [
  {
    id: 'template-1',
    name: 'Minimalist White Long Sleeve',
    description: 'Clean and simple long-sleeve design with text on sleeve',
    image: '/templates/minimalist-white-longsleeve.png',
    category: 'Minimalist',
    style: 'minimalist',
    colors: ['#FFFFFF', '#000000'],
    promptSuggestion: 'Create a minimalist long-sleeve shirt with vertical text on the sleeve, clean lines, simple aesthetic',
    difficulty: 'beginner',
    tags: ['minimalist', 'long-sleeve', 'text', 'simple']
  },
  {
    id: 'template-2',
    name: 'Coral Gradient Graphic',
    description: 'Vibrant coral t-shirt with bold text design',
    image: '/templates/coral-graphic-tshirt.png',
    category: 'Bold Graphics',
    style: 'modern',
    colors: ['#FF6B6B', '#FF8C6B', '#FFFFFF'],
    promptSuggestion: 'Bold coral colored t-shirt with centered vertical text design in white, gradient effect',
    difficulty: 'intermediate',
    tags: ['graphic', 'coral', 'bold', 'centered']
  },
  {
    id: 'template-3',
    name: 'Neon Clown Street Art',
    description: 'Neon glowing clown illustration on black',
    image: '/templates/neon-clown-tshirt.png',
    category: 'Street Art',
    style: 'urban',
    colors: ['#000000', '#FF1493', '#00FF00', '#00FFFF'],
    promptSuggestion: 'Neon glowing clown illustration with street art vibes, neon pink, green, and cyan on black background',
    difficulty: 'advanced',
    tags: ['neon', 'glowing', 'clown', 'street-art', 'urban']
  },
  {
    id: 'template-4',
    name: 'Ringer Contrast Tee',
    description: 'Classic ringer t-shirt with contrasting collar and sleeves',
    image: '/templates/ringer-contrast-tshirt.png',
    category: 'Classic',
    style: 'vintage',
    colors: ['#2C3E50', '#7B68EE'],
    promptSuggestion: 'Vintage ringer t-shirt with contrasting color collar and sleeves, pocket detail, retro style',
    difficulty: 'beginner',
    tags: ['vintage', 'ringer', 'contrast', 'classic']
  },
  {
    id: 'template-5',
    name: 'Japanese Dragon Back Print',
    description: 'Traditional Japanese dragon design on back',
    image: '/templates/japanese-dragon-tshirt.png',
    category: 'Asian Art',
    style: 'traditional',
    colors: ['#000000', '#FFFFFF', '#B8B8B8'],
    promptSuggestion: 'Japanese traditional dragon illustration, intricate line work, on black shirt, back print design',
    difficulty: 'advanced',
    tags: ['japanese', 'dragon', 'traditional', 'back-print', 'line-art']
  },
  {
    id: 'template-6',
    name: 'Beige Solid Comfort',
    description: 'Minimalist solid color beige t-shirt',
    image: '/templates/beige-solid-tshirt.png',
    category: 'Solid Colors',
    style: 'minimalist',
    colors: ['#F5E6D3'],
    promptSuggestion: 'Soft beige solid color t-shirt, clean classic design, comfortable minimalist aesthetic',
    difficulty: 'beginner',
    tags: ['solid', 'beige', 'neutral', 'comfortable']
  },
  {
    id: 'template-7',
    name: 'Red Foals Band Tee',
    description: 'Band graphic with red animal print',
    image: '/templates/foals-band-tshirt.png',
    category: 'Band & Music',
    style: 'graphic',
    colors: ['#000000', '#FF4444', '#FFFFFF'],
    promptSuggestion: 'Band t-shirt with red foal/animal illustration, bold typography, street wear aesthetic',
    difficulty: 'intermediate',
    tags: ['band-tee', 'graphic', 'music', 'animal', 'bold']
  },
  {
    id: 'template-8',
    name: 'Osaka Japanese Script',
    description: 'Black shirt with white Japanese characters',
    image: '/templates/osaka-japanese-tshirt.png',
    category: 'International',
    style: 'typography',
    colors: ['#000000', '#FFFFFF'],
    promptSuggestion: 'Black long-sleeve with Japanese characters and text, clean typography, cultural design',
    difficulty: 'intermediate',
    tags: ['japanese', 'typography', 'characters', 'cultural']
  },
  {
    id: 'template-9',
    name: 'Cream Solid Premium',
    description: 'Premium cream colored t-shirt',
    image: '/templates/cream-solid-tshirt.png',
    category: 'Solid Colors',
    style: 'minimalist',
    colors: ['#F0E6D2'],
    promptSuggestion: 'Premium cream colored t-shirt, soft neutral tone, clean simple design',
    difficulty: 'beginner',
    tags: ['solid', 'cream', 'premium', 'neutral']
  },
  {
    id: 'template-10',
    name: 'Black Basic Tee',
    description: 'Pure black solid t-shirt',
    image: '/templates/black-basic-tshirt.png',
    category: 'Solid Colors',
    style: 'minimalist',
    colors: ['#000000'],
    promptSuggestion: 'Classic pure black solid t-shirt, versatile basic essential',
    difficulty: 'beginner',
    tags: ['solid', 'black', 'basic', 'essential']
  },
  {
    id: 'template-11',
    name: 'Bright Blue Classic',
    description: 'Vibrant blue solid t-shirt',
    image: '/templates/blue-classic-tshirt.png',
    category: 'Solid Colors',
    style: 'modern',
    colors: ['#0066FF'],
    promptSuggestion: 'Bright vibrant blue t-shirt, classic fit, modern solid color',
    difficulty: 'beginner',
    tags: ['solid', 'blue', 'vibrant', 'classic']
  },
  {
    id: 'template-12',
    name: 'Forest Green Essential',
    description: 'Deep forest green t-shirt',
    image: '/templates/forest-green-tshirt.png',
    category: 'Solid Colors',
    style: 'natural',
    colors: ['#2D5016'],
    promptSuggestion: 'Forest green solid t-shirt, natural earth tones, comfortable essential',
    difficulty: 'beginner',
    tags: ['solid', 'green', 'forest', 'natural']
  },
  {
    id: 'template-13',
    name: 'Yellow Bright Casual',
    description: 'Sunny yellow t-shirt',
    image: '/templates/yellow-bright-tshirt.png',
    category: 'Solid Colors',
    style: 'casual',
    colors: ['#FFD700'],
    promptSuggestion: 'Sunny yellow t-shirt, bright cheerful color, casual comfortable wear',
    difficulty: 'beginner',
    tags: ['solid', 'yellow', 'bright', 'casual']
  },
  {
    id: 'template-14',
    name: 'Purple Vibrant',
    description: 'Rich purple t-shirt',
    image: '/templates/purple-vibrant-tshirt.png',
    category: 'Solid Colors',
    style: 'modern',
    colors: ['#6B46C1'],
    promptSuggestion: 'Rich purple solid t-shirt, vibrant trendy color, modern style',
    difficulty: 'beginner',
    tags: ['solid', 'purple', 'vibrant', 'trendy']
  },
  {
    id: 'template-15',
    name: 'Red Bold',
    description: 'Bold red t-shirt',
    image: '/templates/red-bold-tshirt.png',
    category: 'Solid Colors',
    style: 'bold',
    colors: ['#E63946'],
    promptSuggestion: 'Bold red solid t-shirt, confident statement piece, vibrant energy',
    difficulty: 'beginner',
    tags: ['solid', 'red', 'bold', 'statement']
  },
  {
    id: 'template-16',
    name: 'Navy Essential',
    description: 'Classic navy blue t-shirt',
    image: '/templates/navy-essential-tshirt.png',
    category: 'Solid Colors',
    style: 'classic',
    colors: ['#001F3F'],
    promptSuggestion: 'Classic navy blue solid t-shirt, timeless essential, professional casual',
    difficulty: 'beginner',
    tags: ['solid', 'navy', 'classic', 'essential']
  },
  {
    id: 'template-17',
    name: 'Olive Green Natural',
    description: 'Natural olive green t-shirt',
    image: '/templates/olive-green-tshirt.png',
    category: 'Solid Colors',
    style: 'natural',
    colors: ['#6B8E23'],
    promptSuggestion: 'Natural olive green t-shirt, earthy tone, sustainable aesthetic',
    difficulty: 'beginner',
    tags: ['solid', 'olive', 'natural', 'earthy']
  },
  {
    id: 'template-18',
    name: 'Neon Retro Geometric',
    description: 'Neon geometric diagonal stripes',
    image: '/templates/neon-geometric-tshirt.png',
    category: 'Geometric',
    style: 'retro',
    colors: ['#FFFFFF', '#FF00FF', '#00FFFF', '#FFFF00', '#FF1493'],
    promptSuggestion: 'Neon geometric pattern with diagonal stripes in 80s retro style, vibrant neon colors on white',
    difficulty: 'intermediate',
    tags: ['geometric', 'neon', 'retro', '80s', 'pattern']
  },
  {
    id: 'template-19',
    name: 'Sunset Landscape',
    description: 'Retro sunset with horizontal lines',
    image: '/templates/sunset-landscape-tshirt.png',
    category: 'Nature',
    style: 'retro',
    colors: ['#0D47A1', '#FF9800', '#FFEB3B', '#FF5722'],
    promptSuggestion: 'Retro sunset landscape with sun and horizontal lines, gradient effects, vintage aesthetic',
    difficulty: 'intermediate',
    tags: ['sunset', 'landscape', 'retro', 'nature', 'gradient']
  },
  {
    id: 'template-20',
    name: 'Minimalist Typography White',
    description: 'White shirt with minimal text design',
    image: '/templates/minimalist-typography-white.png',
    category: 'Typography',
    style: 'minimalist',
    colors: ['#FFFFFF', '#000000'],
    promptSuggestion: 'White t-shirt with minimalist text design, clean typography, simple elegant',
    difficulty: 'beginner',
    tags: ['typography', 'minimalist', 'text', 'elegant']
  }
];

// Group templates by category
export const templateCategories = [
  'Solid Colors',
  'Minimalist',
  'Bold Graphics',
  'Street Art',
  'Classic',
  'Asian Art',
  'Band & Music',
  'International',
  'Geometric',
  'Nature',
  'Typography'
];

// Get templates by category
export function getTemplatesByCategory(category: string): DesignTemplate[] {
  return designTemplates.filter(template => template.category === category);
}

// Get templates by difficulty
export function getTemplatesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): DesignTemplate[] {
  return designTemplates.filter(template => template.difficulty === difficulty);
}

// Search templates
export function searchTemplates(query: string): DesignTemplate[] {
  const lowerQuery = query.toLowerCase();
  return designTemplates.filter(template =>
    template.name.toLowerCase().includes(lowerQuery) ||
    template.description.toLowerCase().includes(lowerQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

// Get random templates
export function getRandomTemplates(count: number = 4): DesignTemplate[] {
  const shuffled = [...designTemplates].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Get random design images for AI generation
export function getRandomDesignImages(count: number = 4): string[] {
  const shuffled = [...designImages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
