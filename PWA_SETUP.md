# Configuración PWA - PromptForge

## ✅ Archivos Creados

1. **manifest.json** - Configuración del PWA
2. **sw.js** - Service Worker para funcionalidad offline
3. **main.tsx** - Registro del Service Worker
4. **index.html** - Meta tags PWA y referencias

## 📱 Generar Iconos PWA

Para generar los iconos necesarios para la PWA, tienes dos opciones:

### Opción 1: Usar el Generador HTML (Recomendado)

1. Abre el archivo `script/create-pwa-icons.html` en tu navegador
2. Haz clic en "Generar Iconos"
3. Se descargarán todos los iconos necesarios
4. Copia los archivos descargados a `client/public/`

### Opción 2: Usar Node.js con Sharp (Alta Calidad)

```bash
npm install sharp --save-dev
node script/generar-iconos-directo.js
```

Esto generará los iconos directamente desde el SVG usando sharp.

### Opción 3: Usar un Generador Online

1. Visita https://realfavicongenerator.net/ o https://www.pwabuilder.com/imageGenerator
2. Sube el archivo `client/public/favicon.svg`
3. Genera los iconos en los siguientes tamaños:
   - 72x72
   - 96x96
   - 128x128
   - 144x144
   - 152x152
   - 192x192
   - 384x384
   - 512x512
4. Descarga y coloca los iconos en `client/public/`

## 🚀 Verificar PWA

1. **Chrome DevTools:**
   - Abre DevTools (F12)
   - Ve a la pestaña "Application"
   - Verifica "Manifest" y "Service Workers"

2. **Lighthouse:**
   - Ejecuta Lighthouse en Chrome DevTools
   - Verifica la sección "Progressive Web App"

3. **Instalación:**
   - En Chrome/Edge: Verás un botón de instalación en la barra de direcciones
   - En Android: Aparecerá un banner de "Agregar a pantalla de inicio"
   - En iOS: Usa el botón "Compartir" → "Agregar a pantalla de inicio"

## 📝 Características PWA Implementadas

- ✅ Manifest.json con configuración completa
- ✅ Service Worker con estrategia Network First
- ✅ Iconos múltiples tamaños (requiere generación)
- ✅ Meta tags para iOS y Android
- ✅ Theme color y background color
- ✅ Display mode: standalone
- ✅ Shortcuts para acceso rápido

## 🔧 Personalización

### Cambiar colores del tema:
Edita `client/public/manifest.json`:
```json
{
  "theme_color": "#8b5cf6",
  "background_color": "#0a0a0f"
}
```

### Actualizar versión del cache:
Edita `client/public/sw.js`:
```javascript
const CACHE_NAME = 'promptforge-v2.0.1'; // Cambia la versión
```

## 📱 Optimizaciones Móviles

- ✅ Sidebar responsive con menú hamburguesa
- ✅ Layout adaptativo en Builder
- ✅ Tabs responsive (2 columnas en móvil, 4 en desktop)
- ✅ Espaciado optimizado para pantallas pequeñas
- ✅ Textos escalables

## 🐛 Solución de Problemas

### Service Worker no se registra:
- Verifica que `sw.js` esté en `client/public/`
- Asegúrate de servir desde HTTPS (o localhost)
- Revisa la consola del navegador

### Iconos no aparecen:
- Verifica que los iconos estén en `client/public/`
- Comprueba las rutas en `manifest.json`
- Limpia el cache del navegador

### PWA no se puede instalar:
- Verifica que el manifest sea válido
- Asegúrate de tener un service worker activo
- Comprueba que la app sea servida desde HTTPS

