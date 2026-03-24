---
name: Patrones UX/UI para catálogo de templates premium
description: Investigación de benchmarks y recomendaciones de animación/layout para InvitationsList de Bento
type: project
---

## Referencias analizadas
- withjoy.com: crossfade a segunda imagen en hover, prueba social (hearts), CTA directo "Usar este diseño". Header: arranca directo en filtros, sin título de sección.
- Greenvelope.com: split-panel lista + preview grande, crossfade entre previews, precio siempre visible
- Paperless Post: color shadow dinámico por imagen, hover muestra interior de sobre. Header: eyebrow uppercase small + serif grande, sin subtítulo largo.
- Framer.com/templates: best-in-class. Featured card grande, lift effect, layout animation al filtrar, preview live embebido. Header: eyebrow + número editorial (01) + serif grande.
- Canva templates: badges de estado (Nuevo/Popular), contador de templates por categoría, modo grid/lista
- Minted.com: split layout editorial left-aligned, contador de resultados al nivel del eyebrow ("342 designs"), subtítulo desaparece en favor de filtros activos.
- Artifact Uprising: minimalismo radical, serif grande, badge tipo label con número de colecciones, sin subtítulos explicativos.

## Patrones de header premium (anti-genéricos)
- NO centrar todo + subtítulo largo explicativo → comunica "sección introductoria genérica"
- NO repetir misma familia tipográfica en eyebrow y título
- NO usar text-muted-foreground en fondo de marca (pierde contraste y personalidad)
- SÍ: contraste tipográfico mono/serif o sans-small/serif-large
- SÍ: left-aligned en desktop cuando hay mucho contenido debajo
- SÍ: eyebrow en uppercase + tracking ancho en Inter, título en Playfair
- SÍ: datos (contador) solo si vienen de API real, nunca hardcodeados
- SÍ: línea decorativa dorada como detalle de identidad de bajo costo

## 4 opciones de header diseñadas para Bento (2025-03)
1. Editorial Split con Contador — flex justify-between items-end, eyebrow+título left, contador right
2. Número Editorial decorativo — número 01 absoluto como fondo, eyebrow+título centrado
3. Warm Minimal con Badge — badge pill #200041, título corto left-aligned, descripción 1 línea evocadora
4. Eyebrow con Línea + Split Color — línea flex-1 al lado del eyebrow, título partido en dos colores (#200041 + #bc8129)

Recomendación: Opción 3 + elementos de Opción 1 (badge pill + left-aligned + línea dorada bajo título). Sin contador hasta tener dato real del API.

## Recomendaciones priorizadas (por impacto/esfuerzo)

1. **Stagger reveal (Framer Motion whileInView + variants)** — Bajo esfuerzo, alto impacto
   - ease recomendado: [0.16, 1, 0.3, 1] (ease out expo), staggerChildren: 0.08
2. **Shimmer skeleton on-brand** — Muy bajo esfuerzo, impacto visual inmediato
   - Usar colores crema/dorado de Bento en vez de grises genéricos
3. **Lift effect en hover** — translateY(-4px) + sombra expandida, muy bajo esfuerzo
4. **Overlay con clip-path inset() en vez de opacity** — más sofisticado, mismo esfuerzo
5. **AnimatePresence al cambiar categoría** — key={selectedCategory} fuerza remount animado
6. **Featured card con col-span-2 row-span-2** — jerarquía visual, diferenciación premium
7. **Crossfade a segunda imagen en hover** — requiere segunda URL de preview en backend
8. **3D tilt con parallax de imagen** — solo desktop (pointer: fine), alto impacto visual
9. **Color shadow dinámico** — requiere color dominante del template desde backend/Canvas API

## Stack de animación recomendado
- Framer Motion para cards (stagger, hover, layout animation al filtrar)
- GSAP reservado para animaciones de sección (ya existe para el dome SVG)
- NO usar ambas libs en el mismo componente — mantener separación clara

## Consideraciones LATAM/ARG
- Respetar prefers-reduced-motion siempre
- 3D tilt y parallax solo con @media (hover: hover) y (pointer: fine)
- En mobile: overlay siempre visible o activable en tap, nunca solo en hover
- Eases siempre "out" — nunca bounce/spring de alta tensión (contexto emocional alto)
