#!/usr/bin/env python3
"""
Script simple para generar iconos PWA desde el favicon.svg
Requiere: cairosvg o Pillow (pip install cairosvg pillow)
"""

import os
import sys
from pathlib import Path

# Tamaños requeridos
SIZES = [72, 96, 128, 144, 152, 192, 384, 512]

def generate_icons():
    """Genera iconos PWA en múltiples tamaños"""
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    public_dir = project_root / "client" / "public"
    favicon_svg = public_dir / "favicon.svg"
    
    if not favicon_svg.exists():
        print(f"❌ No se encontró {favicon_svg}")
        print("💡 Creando icono básico...")
        create_basic_icon(public_dir)
        return
    
    print(f"📁 Usando: {favicon_svg}")
    print("🔄 Generando iconos...\n")
    
    try:
        import cairosvg
        print("✅ Usando cairosvg\n")
        
        for size in SIZES:
            output_path = public_dir / f"icon-{size}x{size}.png"
            cairosvg.svg2png(
                url=str(favicon_svg),
                write_to=str(output_path),
                output_width=size,
                output_height=size
            )
            print(f"✓ Generado: icon-{size}x{size}.png")
        
        print("\n✅ ¡Iconos generados exitosamente!")
        
    except ImportError:
        try:
            from PIL import Image
            import xml.etree.ElementTree as ET
            
            print("✅ Usando Pillow\n")
            
            # Leer SVG
            tree = ET.parse(favicon_svg)
            root = tree.getroot()
            
            # Crear iconos
            for size in SIZES:
                # Crear imagen desde SVG (simplificado)
                # Nota: Pillow no soporta SVG directamente, necesitamos cairosvg
                print(f"⚠️  Para generar PNGs, instala: pip install cairosvg")
                print(f"💡 Alternativa: Usa el generador HTML en script/create-pwa-icons.html")
                break
                
        except ImportError:
            print("❌ No se encontraron librerías para convertir SVG a PNG")
            print("\n📦 Instalación:")
            print("   pip install cairosvg")
            print("\n💡 Alternativa:")
            print("   Abre script/create-pwa-icons.html en tu navegador")
            print("   y genera los iconos desde ahí.")

def create_basic_icon(public_dir):
    """Crea un icono SVG básico si no existe"""
    basic_svg = """<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#a855f7;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="144" fill="url(#grad)"/>
  <g transform="translate(256, 256)">
    <line x1="-102" y1="41" x2="102" y2="-41" stroke="white" stroke-width="20" stroke-linecap="round" opacity="0.95"/>
    <circle cx="102" cy="-41" r="31" fill="white" opacity="0.95"/>
    <g transform="translate(-128, -26)">
      <line x1="0" y1="-20" x2="0" y2="20" stroke="white" stroke-width="13" stroke-linecap="round" opacity="0.8"/>
      <line x1="-20" y1="0" x2="20" y2="0" stroke="white" stroke-width="13" stroke-linecap="round" opacity="0.8"/>
    </g>
    <g transform="translate(77, -102)">
      <line x1="0" y1="-15" x2="0" y2="15" stroke="white" stroke-width="10" stroke-linecap="round" opacity="0.8"/>
      <line x1="-15" y1="0" x2="15" y2="0" stroke="white" stroke-width="10" stroke-linecap="round" opacity="0.8"/>
    </g>
    <g transform="translate(128, 26)">
      <line x1="0" y1="-15" x2="0" y2="15" stroke="white" stroke-width="10" stroke-linecap="round" opacity="0.8"/>
      <line x1="-15" y1="0" x2="15" y2="0" stroke="white" stroke-width="10" stroke-linecap="round" opacity="0.8"/>
    </g>
  </g>
</svg>"""
    
    icon_path = public_dir / "favicon.svg"
    icon_path.write_text(basic_svg)
    print(f"✅ Creado: {icon_path}")

if __name__ == "__main__":
    generate_icons()

