// Script para generar iconos PWA desde el favicon SVG
// Requiere: sharp (npm install sharp --save-dev)

const fs = require('fs');
const path = require('path');

// Tamaños de iconos requeridos para PWA
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Colores del tema (púrpura/violeta)
const primaryColor = '#8b5cf6';
const accentColor = '#a855f7';

// Función para crear un icono SVG simple si no existe el favicon
function createDefaultIcon(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${primaryColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${accentColor};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>
  <path d="M${size * 0.3} ${size * 0.3} L${size * 0.7} ${size * 0.3} L${size * 0.5} ${size * 0.7} Z" fill="white" opacity="0.9"/>
  <circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.15}" fill="white" opacity="0.7"/>
</svg>`;
}

// Función para crear iconos PNG usando Canvas (fallback si no hay sharp)
function createPNGIcon(size) {
  console.log(`Generando icono ${size}x${size}...`);
  
  // Si sharp está disponible, usarlo
  try {
    const sharp = require('sharp');
    const svgBuffer = Buffer.from(createDefaultIcon(size));
    
    return sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer();
  } catch (error) {
    console.warn('Sharp no disponible. Creando SVG placeholder...');
    // Crear SVG como fallback
    const svgContent = createDefaultIcon(size);
    return Buffer.from(svgContent);
  }
}

async function generateIcons() {
  const publicDir = path.join(__dirname, '..', 'client', 'public');
  
  console.log('Generando iconos PWA...');
  
  for (const size of iconSizes) {
    try {
      const iconBuffer = await createPNGIcon(size);
      const filename = `icon-${size}x${size}.png`;
      const filepath = path.join(publicDir, filename);
      
      // Si sharp no está disponible, guardar como SVG
      if (iconBuffer.toString().startsWith('<?xml')) {
        const svgPath = filepath.replace('.png', '.svg');
        fs.writeFileSync(svgPath, iconBuffer);
        console.log(`✓ Creado ${filename.replace('.png', '.svg')}`);
      } else {
        fs.writeFileSync(filepath, iconBuffer);
        console.log(`✓ Creado ${filename}`);
      }
    } catch (error) {
      console.error(`Error generando icono ${size}x${size}:`, error.message);
    }
  }
  
  console.log('\n¡Iconos generados exitosamente!');
  console.log('Nota: Para mejores resultados, instala sharp: npm install sharp --save-dev');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  generateIcons().catch(console.error);
}

module.exports = { generateIcons, createDefaultIcon };

