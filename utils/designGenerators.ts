// Design generator functions for AI-powered t-shirt designs

export const generateMinimalistSunset = (): string => {
  const svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1"/><stop offset="50%" style="stop-color:#FFB347;stop-opacity:1"/><stop offset="100%" style="stop-color:#FFA500;stop-opacity:1"/></linearGradient></defs><rect width="200" height="200" fill="url(#skyGradient)"/><circle cx="100" cy="80" r="35" fill="#FFD700" opacity="0.9"/><circle cx="100" cy="80" r="32" fill="#FFA500"/><line x1="20" y1="120" x2="180" y2="120" stroke="#2D3E50" stroke-width="2" opacity="0.3"/><line x1="20" y1="130" x2="180" y2="130" stroke="#2D3E50" stroke-width="1" opacity="0.2"/><line x1="20" y1="140" x2="180" y2="140" stroke="#2D3E50" stroke-width="1" opacity="0.15"/><rect x="0" y="140" width="200" height="60" fill="#2D3E50" opacity="0.4"/></svg>`
  return `data:image/svg+xml;base64,${typeof window !== 'undefined' ? btoa(unescape(encodeURIComponent(svg))) : ''}`
}

export const generatePurpleDesign = (): string => {
  const svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#9333EA;stop-opacity:1"/><stop offset="100%" style="stop-color:#7e22ce;stop-opacity:1"/></linearGradient></defs><rect width="200" height="200" fill="url(#purpleGrad)"/><circle cx="50" cy="50" r="25" fill="#FFD700"/><rect x="120" y="80" width="40" height="40" fill="#FFD700" transform="rotate(45 140 100)"/><polygon points="100,150 120,190 80,190" fill="#FFD700"/></svg>`
  return `data:image/svg+xml;base64,${typeof window !== 'undefined' ? btoa(unescape(encodeURIComponent(svg))) : ''}`
}

export const generateYellowDesign = (): string => {
  const svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#FCD34D;stop-opacity:1"/><stop offset="100%" style="stop-color:#FBBF24;stop-opacity:1"/></linearGradient></defs><rect width="200" height="200" fill="url(#yellowGrad)"/><circle cx="100" cy="100" r="40" fill="#FFFFFF" opacity="0.8"/><circle cx="85" cy="85" r="8" fill="#333333"/><circle cx="115" cy="85" r="8" fill="#333333"/><path d="M 85 110 Q 100 120 115 110" stroke="#333333" stroke-width="3" fill="none"/></svg>`
  return `data:image/svg+xml;base64,${typeof window !== 'undefined' ? btoa(unescape(encodeURIComponent(svg))) : ''}`
}

export const generatePinkDesign = (): string => {
  const svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#EC4899;stop-opacity:1"/><stop offset="100%" style="stop-color:#DB2777;stop-opacity:1"/></linearGradient></defs><rect width="200" height="200" fill="url(#pinkGrad)"/><line x1="30" y1="60" x2="170" y2="60" stroke="#FFFFFF" stroke-width="3"/><line x1="30" y1="100" x2="170" y2="100" stroke="#FFFFFF" stroke-width="3"/><line x1="30" y1="140" x2="170" y2="140" stroke="#FFFFFF" stroke-width="3"/></svg>`
  return `data:image/svg+xml;base64,${typeof window !== 'undefined' ? btoa(unescape(encodeURIComponent(svg))) : ''}`
}

export const generateOrangeDesign = (): string => {
  const svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#FB923C;stop-opacity:1"/><stop offset="100%" style="stop-color:#EA580C;stop-opacity:1"/></linearGradient></defs><rect width="200" height="200" fill="url(#orangeGrad)"/><rect x="40" y="40" width="60" height="60" fill="#FFFFFF" opacity="0.9"/><rect x="120" y="120" width="60" height="60" fill="#FFFFFF" opacity="0.9"/><circle cx="100" cy="100" r="30" fill="#FFFFFF" opacity="0.7"/></svg>`
  return `data:image/svg+xml;base64,${typeof window !== 'undefined' ? btoa(unescape(encodeURIComponent(svg))) : ''}`
}

export const generateGreyDesign = (): string => {
  const svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="greyGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#9CA3AF;stop-opacity:1"/><stop offset="100%" style="stop-color:#6B7280;stop-opacity:1"/></linearGradient></defs><rect width="200" height="200" fill="url(#greyGrad)"/><line x1="50" y1="50" x2="150" y2="50" stroke="#FFFFFF" stroke-width="2"/><line x1="50" y1="100" x2="150" y2="100" stroke="#FFFFFF" stroke-width="2"/><line x1="50" y1="150" x2="150" y2="150" stroke="#FFFFFF" stroke-width="2"/><line x1="50" y1="50" x2="50" y2="150" stroke="#FFFFFF" stroke-width="2"/></svg>`
  return `data:image/svg+xml;base64,${typeof window !== 'undefined' ? btoa(unescape(encodeURIComponent(svg))) : ''}`
}
