---
name: Patrones UX/UI para sección de Features/Benefits premium
description: Investigación de patrones de layout y animación para FeaturesScrollSequence de Bento — benchmarks Linear, Vercel, Framer, Craft.do y análisis del componente actual
type: project
---

## Estado actual del componente (2025-03)

Archivo: `components/features/home/FeaturesScrollSequence.tsx`
Patrón: GSAP pin + scrub, split 50/50, 6 features, fade up/down

### Problemas identificados en el código actual
- Panel derecho (card decorativa) duplica título y descripción del izquierdo — el usuario lee lo mismo dos veces
- Número gigante de fondo en la card usa `rgba(255,252,247,0.035)` — tan tenue que no se percibe
- `Icon badge` debajo del texto izquierdo repite el título por tercera vez en mayúsculas — ruido sin señal
- La card glass/blur no muestra el producto real — oportunidad perdida de conversión

### Lo que funciona bien y no tocar
- GSAP pin + scrub con scrub: 1.6 — el ritmo es correcto
- Counter `01/06` en mono gold — genuinamente premium, mantener
- Progreso bar inferior + dots derecha — patrón de navegación claro
- Tipografía: Playfair Display grande + cuerpo crema tenue — correcto para tono emocional

## Benchmarks analizados

### Linear (features page)
- Card-based grid, cada card con imagen contextual propia
- Imágenes con "right bottom fade" — profundidad sin corte brusco
- Cada feature tiene su screenshot mostrando ESA feature específica, no un generic mockup
- Minimalismo: título + descripción + imagen, sin ornamentación extra

### Vercel (dark sections)
- Sistema de theming dark/light con CSS custom properties
- Split flex con sidebar independiente del contenido principal
- Font Geist — identidad tipográfica fuerte como señal de premium

### Framer (features section)
- 4 feature blocks modulares con headline + subtítulo + CTA "Learn more"
- Stacked blocks — scroll normal, sin pin
- Demo embebida del propio producto (usan Framer para mostrar Framer)

### Craft.do
- Modular cards con alternating content arrangements
- Glassmorphic buttons con gradient overlays
- User persona storytelling ("Tom, Podcaster") — muestra uso real, no feature list
- Paper/texture overlays para sensación táctil

## 4 opciones diseñadas para Bento

### Opción 1 — Screenshot Real (RECOMENDADA como base)
**Patrón:** Linear / Vercel
**Cambio:** Reemplazar card decorativa por screenshot real de cada feature funcionando
**Animación:** Image "respira" en transición — scale(0.95)+opacity:0 → scale(1.05)→scale(1)+opacity:1
**Por qué premium:** Mostrar el producto real es señal de confianza y madurez
**Assets necesarios:** 6 screenshots (una por feature: editor, mockup celular, lista invitados, playlist, galería, notificaciones)
**Esfuerzo:** Bajo-Medio (solo reemplazar JSX del panel derecho, GSAP no cambia)

### Opción 2 — Bento Grid Reveal
**Patrón:** Craft.do / Notion-style
**Cambio:** Abandon pin, usar sticky right + scroll normal left. Grilla de 6 cards siempre visible, con estado activo/dormido
**Animación:** Intersection Observer activa la card correspondiente (border gold, icon scale, opacity)
**Por qué premium:** La grilla siempre visible muestra completitud — patrón Linear/Raycast
**Esfuerzo:** Medio-Alto (refactor significativo, abandona GSAP por IO)

### Opción 3 — Horizontal Filmstrip
**Patrón:** Awwwards / agencias creativas
**Cambio:** GSAP horizontal scroll driven by vertical — panels full-width se mueven de derecha a izquierda
**Animación:** `gsap.to(tapeRef, { x: -(totalWidth - vw), scrollTrigger: { pin: true, scrub: 1 } })`
**Por qué premium:** Pattern interrupt — rompe expectativa de scroll vertical
**Problema:** Mobile difícil, accessibility compleja, puede generar fricción en producto emocional
**Esfuerzo:** Medio (GSAP horizontal straightforward, el riesgo es mobile)

### Opción 4 — Live Demo Inline
**Patrón:** Framer-using-Framer / Stripe live demos
**Cambio:** Panel derecho renderiza componente real de invitation-front con datos mock, scroll programático interno hacia la sección relevante de cada feature
**Animación:** Highlight ring (border gold) sobre el elemento activo dentro del demo
**Por qué premium:** Demostración más honesta posible — el producto en vivo como argumento de venta
**Problema:** Requiere extraer componentes de invitation-front hacia invitly-web — alto acoplamiento
**Esfuerzo:** Alto (es la versión 2.0)

## Recomendación final

**Implementar Opción 1 + elemento de Opción 2**

Razonamiento: El patrón de animación (pin + scrub) es sólido. El problema es que el panel derecho no muestra el producto. Reemplazar la card decorativa por screenshots reales es el cambio de mayor impacto con menor costo.

Elemento de Opción 2 a sumar: Los dots de navegación del right edge podrían ser miniaturas clicables en desktop (no solo indicadores).

**Eliminar del código actual sin agregar nada:**
- Icon badge debajo del texto izquierdo
- Card de glass con número gigante tenue
- Texto duplicado dentro de la card derecha

**Opción 4 es la v2.0** — cuando el sistema de templates sea estable.

## Consideraciones de assets

El cuello de botella real no es el código sino los screenshots/mockups de cada feature.
Fallback temporal válido: `aspect-video bg-[#200041] rounded-2xl` con título en Playfair centrado
ya es mejor que repetir el contenido de texto.
