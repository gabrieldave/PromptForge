// Script directo para generar iconos PWA sin dependencias externas
// Usa el SVG existente y crea versiones optimizadas

const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'client', 'public');

console.log('🎨 Generador de Iconos PWA para PromptForge\n');
console.log('📁 Directorio de salida:', publicDir, '\n');

// Verificar si existe el favicon
const faviconPath = path.join(publicDir, 'favicon.svg');
if (!fs.existsSync(faviconPath)) {
  console.log('⚠️  No se encontró favicon.svg, creando uno mejorado...\n');
  createEnhancedFavicon();
}

console.log('💡 INSTRUCCIONES:\n');
console.log('   1. Abre el archivo: script/generar-iconos-pwa.html');
console.log('   2. Haz clic en "Generar Todos los Iconos"');
console.log('   3. Los iconos se descargarán automáticamente');
console.log('   4. Copia los archivos a: client/public/\n');
console.log('   O usa un servicio online como:');
console.log('   - https://realfavicongenerator.net/');
console.log('   - https://www.pwabuilder.com/imageGenerator\n');

// Intentar con sharp si está disponible
try {
  const sharp = require('sharp');
  console.log('✅ Sharp encontrado, generando iconos...\n');
  generateWithSharp();
} catch (error) {
  console.log('ℹ️  Sharp no está instalado.');
  console.log('   Para instalarlo: npm install sharp --save-dev\n');
  console.log('   Mientras tanto, usa el generador HTML mencionado arriba.\n');
}

async function generateWithSharp() {
  const svgContent = fs.readFileSync(faviconPath, 'utf-8');
  
  for (const size of sizes) {
    try {
      const outputPath = path.join(publicDir, `icon-${size}x${size}.png`);
      
      await sharp(Buffer.from(svgContent))
        .resize(size, size, {
          kernel: sharp.kernel.lanczos3,
          fit: 'contain',
          background: { r: 139, g: 92, b: 246, alpha: 1 }
        })
        .png({
          quality: 100,
          compressionLevel: 9,
          adaptiveFiltering: true
        })
        .toFile(outputPath);
      
      console.log(`✅ Generado: icon-${size}x${size}.png`);
    } catch (error) {
      console.error(`❌ Error en ${size}x${size}:`, error.message);
    }
  }
  
  console.log('\n🎉 ¡Iconos generados exitosamente!');
  console.log('📁 Ubicación: client/public/\n');
}

function createEnhancedFavicon() {
  const enhancedSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#a855f7;stop-opacity:1" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="100" height="100" rx="28" fill="url(#grad)"/>
  <g transform="translate(50, 50)">
    <line x1="-20" y1="8" x2="20" y2="-8" stroke="white" stroke-width="4" stroke-linecap="round" filter="url(#glow)"/>
    <circle cx="20" cy="-8" r="6" fill="white" filter="url(#glow)"/>
    <g>
      <g transform="translate(-25, -5)">
        <line x1="0" y1="-4" x2="0" y2="4" stroke="white" stroke-width="2.5" stroke-linecap="round" filter="url(#glow)"/>
        <line x1="-4" y1="0" x2="4" y2="0" stroke="white" stroke-width="2.5" stroke-linecap="round" filter="url(#glow)"/>
      </g>
      <g transform="translate(15, -20)">
        <line x1="0" y1="-3" x2="0" y2="3" stroke="white" stroke-width="2" stroke-linecap="round" filter="url(#glow)"/>
        <line x1="-3" y1="0" x2="3" y2="0" stroke="white" stroke-width="2" stroke-linecap="round" filter="url(#glow)"/>
      </g>
      <g transform="translate(25, 5)">
        <line x1="0" y1="-3" x2="0" y2="3" stroke="white" stroke-width="2" stroke-linecap="round" filter="url(#glow)"/>
        <line x1="-3" y1="0" x2="3" y2="0" stroke="white" stroke-width="2" stroke-linecap="round" filter="url(#glow)"/>
      </g>
    </g>
  </g>
</svg>`;
  
  fs.writeFileSync(faviconPath, enhancedSvg);
  console.log('✅ Favicon mejorado creado\n');
}

