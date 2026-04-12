---
name: Patrones de cards flotantes en posición absoluta — referencias y propuestas para Bento
description: Investigación de referencias visuales del patrón floating cards scattered + 3 propuestas concretas de diseño para FeaturesScrollSequence de Bento
type: project
---

## Contexto de la investigación

El componente FeaturesScrollSequence usa GSAP para animar cards que "vuelan" desde fuera del viewport y quedan flotando en posición absoluta alrededor del título encogiéndose. La animación está OK. Lo que se investiga es el diseño visual de las cards y su composición.

**Estado actual de las cards (baseline):**
- Glassmorphism: `rgba(250,248,255,0.92)` + `backdropFilter: blur(12px)`
- Borde: `1px solid rgba(32,0,65,0.09)` (casi invisible)
- Sombra: `0 4px 20px rgba(32,0,65,0.07)` (extremadamente sutil)
- Ícono Unicode badge naranja 34px (✦ ◈ ⬡)
- Número monospace dorado (`01`, `02`...)
- Título + descripción a 3 líneas clamp
- Ancho: `clamp(185px, 19vw, 265px)`
- Posiciones simétricas en 4 cuadrantes + bottom-center + mid-left
- Sin rotación, sin overlapping, todos del mismo tamaño

## Referencias analizadas

### Revolut (fintech consumer)
- Pills horizontales compactas + cards cuadradas de distintos tamaños
- Fondo blanco sólido, border-radius cercano a cápsula (~20-24px)
- Sombra generosa con desplazamiento vertical: `0 12px 32px rgba(0,0,0,0.14)`
- Rotaciones ±3-5°, overlapping con borde del teléfono central
- Feeling: tech-frío. Técnica aplicable, tono no aplicable a Bento

### Superlist (productividad premium)
- Cards de tarea flotando con rotación ±4°
- Fondo blanco sólido, sombra cálida `0 8px 24px rgba(0,0,0,0.12)`
- Border-radius 12-16px (no cápsula)
- Contenido minimal: solo checkbox + texto, sin descripción
- 4-5 cards de distintos tamaños en distribución "media luna" descendente
- Feeling: premium-consumer-warm — el cruce más cercano a Bento

### Mercury Bank (fintech B2B premium)
- Elementos de interfaz en planos de profundidad (no scattered caótico)
- Fondo blanco puro, borde 1px gris claro, border-radius ~12px
- Truco clave: anillo exterior de 1px `rgba(0,0,0,0.04)` para definición sin borde duro
- Sombra larga: `0 8px 40px rgba(0,0,0,0.10)`
- Sin glassmorphism. Sin rotación. Overlapping controlado
- Feeling: premium serio. Útil para técnica de sombra, no para tono

### Beeper / apps consumer warm
- Elementos muy redondeados (cercano a cápsula), tamaños muy variables
- Rotación hasta 8°, overlapping moderado
- Distribución genuinamente asimétrica (no grid disfrazado)
- Feeling: warm consumer playful

### Paperless Post / Withjoy (nicho invitaciones)
- NO usan floating cards. Su hero es siempre la invitación real
- Insight clave: en el nicho de invitaciones, el objeto-invitación es el hero más potente
- Las cards de features deberían contener producto real, no texto genérico

### "Isolated Component Hero" (patrón DesignerUp)
- En lugar de mostrar toda la interfaz, se toman piezas de UI descontextualizadas
- Cada card = una feature concreta representada como elemento de UI real
- Patrón usado por Feedly, Circle.so, Superlist
- Más honesto y más persuasivo que texto de features

## 3 Propuestas concretas para Bento

### Propuesta 1 — "Petite Invitations"
**Concepto:** Cards que imitan papelería física premium
- Fondo crema puro (`#fafaf8`), sin glassmorphism
- Borde gold `rgba(188,129,41,0.22)`
- Sombra: `0 12px 40px rgba(32,0,65,0.10), 0 2px 8px rgba(32,0,65,0.06)` (dos capas = papel levantado)
- Ícono SVG 20px monocromático, sin badge/contenedor
- Título en Playfair Display regular 13-14px. SIN descripción
- Ornamento decorativo: línea gold 24px en borde inferior
- Ancho: 160-190px (más pequeñas que las actuales)
- Rotación ±1.5° a ±3°, overlapping leve entre 2 cards bottom-center
- Jerarquía: Card 1 más ancha que Card 3
- Para: posicionamiento luxury/premium, segmento bodas y 15 años
- Esfuerzo: Bajo

### Propuesta 2 — "Notification Stack" (MAYOR IMPACTO DE CONVERSIÓN)
**Concepto:** Piezas de UI real del producto (Isolated Component Hero)
- Fondo blanco puro (`#ffffff`), sin glassmorphism
- Borde: `1px solid rgba(32,0,65,0.07)` + anillo `rgba(32,0,65,0.04)` (truco Mercury)
- Sombra: `0 4px 16px rgba(32,0,65,0.08)`
- Contenido de cada card = notificación real de Bento:
  - RSVP: "Sofía M. confirmó asistencia — 2 personas"
  - Playlist: "Nicki agregó 'Flowers' a la playlist"
  - Invitados: "47 confirmados · 8 pendientes" con mini progress bar
  - Template: miniatura real de template de boda
  - Vistas: "Tu invitación fue vista 234 veces esta semana"
  - Colores: selector con 5 swatches, "Paleta aplicada"
- 3 tamaños: pill 52px alto, medium 80px alto, large 120px alto
- Pill sin rotación, medium ±1-2°, pill extremo ±3-4°
- Large (bottom-center) = ancla visual, sin rotación, sombra más pronunciada
- Para: conversión, usuario que vive en el teléfono, reconoce UI patterns
- Esfuerzo: Medio (requiere copy de UI redactado + assets)

### Propuesta 3 — "Velvet Chip" (RECOMENDADA PARA IMPLEMENTAR PRIMERO)
**Concepto:** Pills horizontales premium con acento de marca
- Fondo gradiente: `linear-gradient(135deg, #fffdf9 0%, #fff8f0 100%)` (crema → crema-naranja)
- Borde: `1px solid rgba(255,164,89,0.18)` (naranja tenue)
- Sombra TINTADA: `0 8px 28px rgba(255,164,89,0.12), 0 2px 8px rgba(32,0,65,0.06)`
  (capa 1 matiz naranja + capa 2 matiz purple = profundidad sin oscuridad)
- Ícono SVG 28px naranja, sin badge, sin contenedor — "suelto"
- Título Inter semibold 13.5px, sin descripción
- Border-radius 18px (igual al botón principal del navbar → consistencia)
- Forma horizontal: ancho 190-230px, alto fijo 64px
- 5 cards (no 6) — 2 tamaños: small 190px, large 230px
- Rotación ±1° a ±5° (Card 1 la más rotada = capta mirada primero)
- Overlapping leve entre Cards 4 y 5 (~8px)
- Para: cualquier segmento, refuerza identidad de marca
- Esfuerzo: Bajo

## Por qué eliminar glassmorphism en las tres propuestas

El glassmorphism funciona cuando hay algo detrás que "transparentar" (foto, gradiente fuerte, patrón). En `#fafaf8` crema sólido, el blur no tiene qué hacer — resulta en un fondo casi idéntico al de la sección pero con artefactos visuales de rendimiento. Las propuestas usan sombra + borde coloreado para crear profundidad, que es más honesto en este contexto.

## Recomendación de implementación

**Inmediato:** Propuesta 3 (Velvet Chip)
- Cambios en `FeatureCard`: eliminar glassmorphism, cambiar sombra a tintada, ícono suelto, eliminar badge + número + descripción
- Cambios en `CARD_SLOTS`: posiciones asimétricas reales + rotación en el style de cada slot
- Sin nuevos assets

**Siguiente iteración:** Propuesta 2 (Notification Stack)
- Requiere definir el copy de UI de cada feature con el equipo de producto

**Why:** La sombra tintada (Propuesta 3) es el cambio de mayor impacto visual con menor costo de implementación. Convierte las cards de "genéricas" a "de Bento" sin cambiar una sola línea de GSAP.
