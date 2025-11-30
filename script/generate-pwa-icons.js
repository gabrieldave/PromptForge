// Script para generar iconos PWA creativos para PromptForge
// Usa el favicon.svg existente y lo convierte a todos los tamaños necesarios

const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'client', 'public');
const faviconPath = path.join(publicDir, 'favicon.svg');

// Leer el SVG existente
let svgTemplate = '';
if (fs.existsSync(faviconPath)) {
  svgTemplate = fs.readFileSync(faviconPath, 'utf-8');
  console.log('✅ Usando favicon.svg existente como base\n');
} else {
  // Crear SVG mejorado si no existe
  svgTemplate = createEnhancedIcon();
  fs.writeFileSync(faviconPath, svgTemplate);
  console.log('✅ Creado favicon.svg mejorado\n');
}

console.log('🎨 Generando iconos PWA creativos para PromptForge...\n');

// Intentar usar sharp primero
try {
  const sharp = require('sharp');
  console.log('✅ Usando sharp para generar PNGs de alta calidad\n');
  
  generateWithSharp();
} catch (error) {
  console.log('⚠️  Sharp no disponible, usando método alternativo...\n');
  console.log('💡 Para mejor calidad, instala: npm install sharp --save-dev\n');
  generateWithCanvas();
}

async function generateWithSharp() {
  for (const size of sizes) {
    try {
      const outputPath = path.join(publicDir, `icon-${size}x${size}.png`);
      
      // Ajustar el SVG para el tamaño específico
      const sizedSvg = svgTemplate.replace(/viewBox="[^"]*"/, `viewBox="0 0 100 100"`);
      
      await sharp(Buffer.from(sizedSvg))
        .resize(size, size, {
          kernel: sharp.kernel.lanczos3,
          fit: 'contain',
          background: { r: 139, g: 92, b: 246, alpha: 1 } // Color primario como fondo
        })
        .png({
          quality: 100,
          compressionLevel: 9,
          adaptiveFiltering: true
        })
        .toFile(outputPath);
      
      console.log(`✅ Generado: icon-${size}x${size}.png`);
    } catch (error) {
      console.error(`❌ Error generando ${size}x${size}:`, error.message);
    }
  }
  console.log('\n🎉 ¡Iconos generados exitosamente!');
}

function generateWithCanvas() {
  // Método alternativo usando canvas (si está disponible)
  try {
    const { createCanvas } = require('canvas');
    console.log('✅ Usando canvas para generar PNGs\n');
    
    for (const size of sizes) {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      
      // Fondo con gradiente
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, '#8b5cf6');
      gradient.addColorStop(1, '#a855f7');
      
      // Fondo redondeado
      const radius = size * 0.2;
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(size - radius, 0);
      ctx.quadraticCurveTo(size, 0, size, radius);
      ctx.lineTo(size, size - radius);
      ctx.quadraticCurveTo(size, size, size - radius, size);
      ctx.lineTo(radius, size);
      ctx.quadraticCurveTo(0, size, 0, size - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.fill();
      
      // Dibujar varita mágica y efectos
      drawWandIcon(ctx, size);
      
      const outputPath = path.join(publicDir, `icon-${size}x${size}.png`);
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(outputPath, buffer);
      console.log(`✅ Generado: icon-${size}x${size}.png`);
    }
    
    console.log('\n🎉 ¡Iconos generados exitosamente!');
  } catch (error) {
    console.error('❌ Canvas no disponible:', error.message);
    console.log('\n💡 Opciones:');
    console.log('   1. Instala sharp: npm install sharp --save-dev');
    console.log('   2. O usa el generador HTML: script/create-pwa-icons.html');
    console.log('   3. O usa un servicio online como realfavicongenerator.net');
  }
}

function drawWandIcon(ctx, size) {
  const centerX = size / 2;
  const centerY = size / 2;
  const scale = size / 100;
  
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(scale, scale);
  
  // Varita mágica principal
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.lineWidth = 4 * (100 / size);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  
  // Palo de la varita
  ctx.beginPath();
  ctx.moveTo(-20, 8);
  ctx.lineTo(20, -8);
  ctx.stroke();
  
  // Punta de la varita (brillante)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.beginPath();
  ctx.arc(20, -8, 6, 0, Math.PI * 2);
  ctx.fill();
  
  // Efecto de brillo en la punta
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.beginPath();
  ctx.arc(20, -8, 3, 0, Math.PI * 2);
  ctx.fill();
  
  // Sparkles/estrellas alrededor
  const sparkles = [
    { x: -25, y: -5 },
    { x: 15, y: -20 },
    { x: 25, y: 5 }
  ];
  
  sparkles.forEach((sparkle, i) => {
    const sparkleSize = i === 0 ? 2.5 : 2;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = sparkleSize * (100 / size);
    
    ctx.beginPath();
    ctx.moveTo(sparkle.x, sparkle.y - 4);
    ctx.lineTo(sparkle.x, sparkle.y + 4);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(sparkle.x - 4, sparkle.y);
    ctx.lineTo(sparkle.x + 4, sparkle.y);
    ctx.stroke();
  });
  
  ctx.restore();
}

function createEnhancedIcon() {
  // SVG mejorado con más detalles
  return `<?xml version="1.0" encoding="UTF-8"?>
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
  <!-- Background with rounded corners (squircle) -->
  <rect width="100" height="100" rx="28" fill="url(#grad)"/>
  
  <!-- Magic wand -->
  <g transform="translate(50, 50)">
    <!-- Wand stick -->
    <line x1="-20" y1="8" x2="20" y2="-8" stroke="white" stroke-width="4" stroke-linecap="round" filter="url(#glow)"/>
    <!-- Wand tip (rounded end) -->
    <circle cx="20" cy="-8" r="6" fill="white" filter="url(#glow)"/>
    
    <!-- Sparkles -->
    <g>
      <!-- Top left sparkle -->
      <g transform="translate(-25, -5)">
        <line x1="0" y1="-4" x2="0" y2="4" stroke="white" stroke-width="2.5" stroke-linecap="round" filter="url(#glow)"/>
        <line x1="-4" y1="0" x2="4" y2="0" stroke="white" stroke-width="2.5" stroke-linecap="round" filter="url(#glow)"/>
      </g>
      <!-- Top right sparkle -->
      <g transform="translate(15, -20)">
        <line x1="0" y1="-3" x2="0" y2="3" stroke="white" stroke-width="2" stroke-linecap="round" filter="url(#glow)"/>
        <line x1="-3" y1="0" x2="3" y2="0" stroke="white" stroke-width="2" stroke-linecap="round" filter="url(#glow)"/>
      </g>
      <!-- Bottom right sparkle -->
      <g transform="translate(25, 5)">
        <line x1="0" y1="-3" x2="0" y2="3" stroke="white" stroke-width="2" stroke-linecap="round" filter="url(#glow)"/>
        <line x1="-3" y1="0" x2="3" y2="0" stroke="white" stroke-width="2" stroke-linecap="round" filter="url(#glow)"/>
      </g>
    </g>
  </g>
</svg>`;
}

