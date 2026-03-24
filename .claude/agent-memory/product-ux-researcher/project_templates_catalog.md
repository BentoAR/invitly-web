---
name: Estado actual del catálogo de templates
description: Arquitectura y estado actual de InvitationsList y TemplatesSection en invitly-web
type: project
---

El catálogo de templates en la landing page (TemplatesSection) funciona así:

- Layout actual: grid uniforme 1 / 2 / 4 columnas (responsive) con gap-6
- Hover actual: solo scale-110 en la imagen + overlay negro con dos botones (Ver demo / Obtener)
- Aspect ratio de cards: 3/4 (portrait, correcto para invitaciones)
- Skeleton: animate-pulse básico con grises planos
- No hay animaciones de entrada (scroll reveal, stagger) en las cards
- TemplatesSection tiene un efecto SVG dome animado con GSAP ScrollTrigger al entrar en viewport
- Las cards ya tienen group-hover wired, pero el overlay solo aparece en md+ (en mobile los botones siempre visibles)
- El componente es "use client" — puede usar hooks de animación sin restricciones

**Why:** El catálogo es el principal elemento de conversión del sitio. Mejorar las micro-interacciones y el layout tiene impacto directo en la percepción de calidad del producto.

**How to apply:** Al sugerir mejoras de animación, tener en cuenta que GSAP ya está importado en TemplatesSection pero no en InvitationsList. Framer Motion puede usarse en InvitationsList sin conflictos.
