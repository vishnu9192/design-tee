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
