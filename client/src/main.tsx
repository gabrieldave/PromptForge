import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Force dark mode by default
document.documentElement.classList.add("dark");

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registrado exitosamente:', registration.scope);
        
        // Verificar actualizaciones cada hora
        setInterval(() => {
          registration.update();
        }, 3600000);
      })
      .catch((error) => {
        console.log('Error al registrar Service Worker:', error);
      });

    // Escuchar mensajes del service worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SW_UPDATED') {
        // Opcional: mostrar notificación de actualización disponible
        console.log('Nueva versión disponible');
      }
    });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
