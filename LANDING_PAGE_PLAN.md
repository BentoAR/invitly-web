# Landing Page — Plan completo de invitly-web

> Documento de referencia para el rediseño/mejora de la landing de Bento.
> Generado en base a: análisis del código actual + research de competidores + estrategia de conversión para el mercado argentino.
> Fecha: abril 2026

---

## Estado actual — diagnóstico rápido

### Lo que existe hoy (orden real en `page.tsx`)

| Sección | Componente | Estado |
|---|---|---|
| Navbar | `Navbar.tsx` | Se oculta al 85% del scroll del hero — problema en mobile |
| Hero | `Hero.tsx` + `HeroPhonesClient.tsx` + `HeroTypewriter.tsx` | CTA principal lleva a `#invitaciones`, no a registro |
| Cómo funciona | `HowItWorksSection.tsx` + `HowItWorksClient.tsx` | Bien ejecutado. GSAP scroll-pin en desktop |
| Templates | `TemplatesSection.tsx` + `InvitationsList.tsx` | Correcto. Sin filtros de categoría |
| Features | `FeaturesScrollSequence.tsx` | Placeholders de gradiente en vez de screenshots reales |
| Contacto | `ContactSection.tsx` + `ContactForm.tsx` | Único punto de conversión profunda — barrera alta |
| Footer | `Footer.tsx` | Funcional |

### Gaps críticos (en orden de impacto)

1. **Sin CTA de registro en ningún lado** — ni en navbar, ni en hero, ni en features
2. **Sin pricing** — el usuario no sabe si puede pagarlo ni si hay plan gratis
3. **Sin testimonials** — los "10K+ clientes" son un número abstracto sin cara ni nombre
4. **Features sin imágenes reales** — FeaturesScrollSequence muestra bloques con gradiente
5. **Sin FAQ** — objeciones sin respuesta antes de que el usuario se vaya
6. **Sin social proof contextual** — "¿esto funciona para Argentina?"
7. **Navbar se oculta** — el usuario pierde acceso a navegación muy rápido

---

## Estructura completa propuesta

### Orden de secciones y prioridad de implementación

```
┌─────────────────────────────────────────────────────┐
│  NAVBAR sticky                         🔴 urgente   │
├─────────────────────────────────────────────────────┤
│  1. HERO                               🔴 refinar   │
│  2. SOCIAL PROOF BANNER                🟡 agregar   │
│  3. CÓMO FUNCIONA                      🟢 mantener  │
│  4. TEMPLATES                          🟡 mejorar   │
│  5. FEATURES con screenshots           🔴 refactori │
│  6. TESTIMONIALS                       🔴 agregar   │
│  7. PRICING                            🔴 agregar   │
│  8. COMPARACIÓN PAPEL VS DIGITAL       🟡 agregar   │
│  9. FAQ                                🟡 agregar   │
│  10. CTA FINAL                         🔴 refactori │
│  FOOTER                                🟢 mantener  │
└─────────────────────────────────────────────────────┘
```

---

## Detalle de cada sección

---

### NAVBAR (sticky, siempre visible)

**Problema actual:** La navbar se oculta (`isHidden`) al 85% del scroll del hero. En mobile eso son ~400-500px de contenido sin acceso a navegación. El navbar tampoco tiene ningún CTA de entrada al producto.

**Cambios necesarios:**
- Mantener sticky en toda la página (eliminar o ajustar el `isHidden`)
- Agregar dual CTA a la derecha:
  - `Iniciar sesión` (outline)
  - `Crear mi invitación` (filled, color primario → `app.bento.com.ar/register`)
- Links: Cómo funciona · Templates · **Precios** (nuevo)

**Copy:** "Crear mi invitación" en vez de "Registrarse" — es más concreto y evoca la acción exacta.

---

### SECCIÓN 1 — HERO

**Lo que mantener:**
- Phones animadas con GSAP — visual más recordable de la landing
- Stats: `500+ Plantillas`, `10K+ Eventos organizados`, `98% Satisfacción`
- Título "Todo tu evento, en un solo lugar" — claro y funcional

**Cambios de copy:**

Subtitle actual:
> "Bento reúne diseño, invitaciones y gestión de invitados en una sola plataforma."

Subtitle propuesto:
> "Diseñá, enviá y gestioná las confirmaciones de tus invitados — todo desde el celular, en menos de 5 minutos."

**CTAs:**

| Actual | Propuesto |
|---|---|
| "Ver categorías" → scroll `#invitaciones` | "Crear mi invitación gratis" → `app.bento.com.ar/register` |
| "Contactanos" → WhatsApp | "Ver un ejemplo real" → link a invitación pública sin login |

**Agregar bajo los CTAs (micro-copy de confianza):**
```
Sin tarjeta de crédito · Listo en minutos · +10.000 eventos en Argentina
```

Este bloque de 3 líneas elimina las 3 objeciones más comunes del usuario argentino que nunca usó un SaaS.

---

### SECCIÓN 2 — SOCIAL PROOF BANNER (nueva)

Franja angosta (80-100px) entre el hero y "Cómo funciona.

**Contenido:**
```
Más de 10.000 eventos organizados en Argentina
Casamientos · Quinceañeros · Cumpleaños · Eventos corporativos
```

Con avatares o logos de usuarios reales si los hay. Si no, el texto solo sobre fondo crema (`#F5F0E8`).

**Objetivo:** Anclar credibilidad inmediatamente después de la promesa del hero, antes de que el usuario decida seguir scrolleando.

---

### SECCIÓN 3 — CÓMO FUNCIONA

**Estado actual:** Bien estructurado. GSAP scroll-pin en desktop, Framer Motion en mobile. Los 3 pasos están en orden correcto.

**Refinamiento de copy por paso:**

**Paso 1 — Elegí tu diseño**
> Actual: "Explorá más de 200 diseños únicos. Casamientos, quinceaños, cumpleaños y más."
> Propuesto: "Elegí entre más de 200 plantillas hechas por diseñadores. Casamiento campestre, quinceañero moderno, cumpleaños infantil — hay para todos los estilos."

**Paso 2 — Personalizá los detalles**
> Actual: "Agregá la información del evento, fotos, música y colores. Sin conocimientos técnicos."
> Propuesto: "Editá el texto, las fotos, la música y los colores — sin saber de diseño ni tecnología. Si podés usar WhatsApp, podés usar Bento."

**Paso 3 — Compartí con tus invitados**
> Actual: "Enviá el link por WhatsApp, Instagram o email. Tus invitados confirman asistencia con un clic."
> Propuesto: "Mandá el link por WhatsApp o Instagram. Cada invitado confirma con un toque y vos ves las confirmaciones en tiempo real, sin llamar a nadie."

**Agregar al final de la sección:** CTA de transición.
```
[Empezá gratis →]
```

---

### SECCIÓN 4 — TEMPLATES

**Estado actual:** `InvitationsList` muestra templates reales — es el punto más fuerte de la landing porque el usuario toca el producto antes de registrarse.

**Mejoras:**

- Agregar subtitle al encabezado: *"Cada plantilla es interactiva — tocá cualquiera para ver cómo se ve en tu celular."*
- Agregar filtros de categoría horizontal encima del grid: `Casamiento · Quinceañero · Cumpleaños · Corporativo · Todos` (el `CategoriesSwiper` existe pero no está en `page.tsx`)
- Agregar link al final: `Ver todas las plantillas →` → `/templates`

---

### SECCIÓN 5 — FEATURES (refactorizar)

**Problema:** `FeaturesScrollSequence` muestra bloques de gradiente `#DADAC9` con el nombre del feature en italic. Sin imágenes del producto real.

**Features recomendados (en este orden):**

**1. Invitaciones que impresionan**
- Visual: screenshot de una invitación animada abierta en celular
- Copy: *"Tus invitados no van a poder creer que una invitación digital puede verse así."*

**2. Confirmaciones en tiempo real**
- Visual: screenshot del dashboard de RSVP con lista confirmados/pendientes
- Copy: *"Sabé exactamente quién viene y quién no, sin llamar a nadie. Tu lista actualizada al instante."*

**3. Enviá por donde quieras**
- Visual: preview de WhatsApp con el link de la invitación
- Copy: *"Un solo link que funciona en WhatsApp, Instagram, email o donde quieras. Sin apps, sin downloads."*

**4. Playlist colaborativa**
- Visual: screenshot de la sección de música de una invitación
- Copy: *"Dejá que tus invitados agreguen las canciones que quieren escuchar. El DJ del evento, elegido por todos."*

**Antes de implementar:** Confirmar que existen screenshots reales del dashboard y de las invitaciones para reemplazar los placeholders.

---

### SECCIÓN 6 — TESTIMONIALS (nueva)

Esta es la sección con mayor impacto potencial en conversión para el mercado argentino. El usuario argentino compra cuando alguien que conoce ya lo compró, o cuando ve que "gente de acá" lo usa.

**Encabezado:**
> "Lo que dicen los que ya lo usaron"
> Subheader: "Más de 10.000 eventos organizados en Argentina. Estos son algunos de los que confiaron en Bento."

**Formato por card (grid de 3 en desktop, stack en mobile):**
```
[Foto real]
Florencia Sandez — Buenos Aires
Casamiento · octubre 2025

"No sabía bien cómo iba a quedar. Pero cuando mis amigas 
empezaron a escribirme preguntando cómo habíamos hecho 
la invitación, entendí que había valido la pena. La lista 
de confirmados la tuve en tiempo real."

★★★★★
```

**Elementos no negociables:**
- Foto real (no avatar ni iniciales)
- Nombre + tipo de evento + fecha aproximada
- El resultado **emocional** (qué reacción tuvo de afuera), no el beneficio funcional
- Un detalle específico que suene real, no redactado por marketing

**Si no hay testimonials reales todavía:** Screenshots de comentarios de Instagram/WhatsApp (con permiso) — formato que en Argentina se reconoce como auténtico.

**Mínimo:** 3 cards. Máximo visible: 6. Uno de cada: casamiento, XV, cumpleaños o corporativo.

---

### SECCIÓN 7 — PRICING (nueva)

**El pricing va después de testimonials** — el usuario tiene que haber visto el valor antes de ver el costo.

**Encabezado:**
> "Simple y transparente"
> Subheader: "Empezá gratis. Upgrades cuando los necesités."

**Estructura de 3 planes:**

| | BÁSICO | PRO ⭐ | PREMIUM |
|---|---|---|---|
| Precio | Gratis | $X / evento | $Y / mes |
| Eventos | 1 | Ilimitados | Ilimitados |
| Invitados | Hasta 50 | Hasta 500 | Ilimitados |
| Templates | Básicas | Todas | Todas + exclusivas |
| RSVP + Playlist | ✓ | ✓ | ✓ |
| Sin branding Bento | ✗ | ✓ | ✓ |
| Estadísticas | ✗ | ✓ | ✓ |
| Soporte prioritario | ✗ | ✗ | ✓ |
| CTA | Empezar gratis | Elegir Pro | Contactar |

**Copy bajo la tabla:**
```
Sin tarjeta de crédito para el plan gratuito · Cancelás cuando querés
¿Tenés un salón o sos organizador profesional? Hablemos →
```

**Contexto de precio** (va en letra chica bajo el pricing):
> "Menos que imprimir 20 tarjetas. Y sin gastar en sobre ni correo."

**Nota de implementación:** Precios en ARS con claridad sobre IVA. Revisar frecuentemente dado el contexto inflacionario. El pricing B2B (salones, planners) no va en tabla pública — va a WhatsApp o formulario separado.

---

### SECCIÓN 8 — COMPARACIÓN PAPEL VS DIGITAL (nueva)

Aborda la objeción principal del mercado argentino: "¿vale más que una imagen de WhatsApp o una tarjeta física?"

**Headline:**
> "¿Seguís con las invitaciones de papel?"

**Subheader:**
> "No hay nada malo con el papel. Pero cuando tu casamiento tiene 200 invitados y necesitás saber quién confirma antes de llamar a cada uno, Bento te ahorra semanas de trabajo."

**Tabla comparativa:**

| | Papel | Imagen de WhatsApp | Bento |
|---|---|---|---|
| Costo | $$$ | Gratis | Desde gratis |
| Tiempo de creación | 7-14 días | 1-2 horas | 5 minutos |
| Confirmaciones | Llamadas manuales | "Respondan por privado" | Automáticas, en tiempo real |
| Cambios de último momento | Reimprimir todo | Reenviar imagen | Editás y se actualiza solo |
| Impacto ambiental | Alto | Bajo | Cero |

**Copy de cierre:**
> "Todos mandamos la invitación por WhatsApp. Pero hay una diferencia entre mandar una imagen que se pierde en el scroll, y mandar un link que se abre como una experiencia. Bento es esa diferencia."

---

### SECCIÓN 9 — FAQ

Responde las objeciones antes de que el usuario las exprese. Formato: accordion expandible.

**Las 6 preguntas que más importan:**

**1. ¿Los invitados necesitan descargarse algo?**
> "No. El link se abre directamente en el navegador del celular — sin app, sin login, sin nada."

**2. ¿Puedo editar la invitación después de enviarla?**
> "Sí. Si cambia la fecha, el lugar, o querés agregar algo, lo editás desde tu panel y los que ya tienen el link ven la versión actualizada automáticamente."

**3. ¿Cómo confirman mis invitados?**
> "Con un toque. Abren el link, tocan 'Confirmo asistencia' y listo. Vos ves quién confirmó en tiempo real desde tu dashboard."

**4. ¿Es complicado de configurar?**
> "No. La mayoría de nuestros usuarios tiene su invitación lista en menos de 10 minutos. Si necesitás ayuda, te escribimos por WhatsApp."

**5. ¿Vale la pena si igual mando todo por WhatsApp?**
> "Sí, la compartís por WhatsApp. La diferencia es que en lugar de una imagen que se pierde, mandás un link que se ve como una página premium. Y sabés quién confirmó sin tener que preguntarle a cada uno."

**6. ¿Sirve para eventos corporativos?**
> "Sí. Tenemos planes para empresas con funcionalidades específicas. [Contactanos →]"

---

### SECCIÓN 10 — CTA FINAL (reformar ContactSection)

**Propuesta:** Dos caminos en paralelo — autoservicio y contacto.

```
┌─────────────────────────────┬─────────────────────────────┐
│  Listo para empezar         │  ¿Tenés preguntas?          │
│                             │                             │
│  Creá tu primera            │  Hablá con nosotros por     │
│  invitación gratis en       │  WhatsApp, email o          │
│  menos de 5 minutos.        │  Instagram.                 │
│                             │                             │
│  [Crear mi invitación →]    │  [Contactar →]              │
└─────────────────────────────┴─────────────────────────────┘
```

**Headline sugerido:**
> "Empezá hoy. Tu evento se merece la mejor invitación."

El formulario de contacto actual puede vivir dentro del panel derecho como opción secundaria — no como la acción principal.

---

### FOOTER

**Estado actual:** Funcional.

**Agregar:**
- Link a `/precios` (cuando pricing esté publicado)
- "Hecho en Argentina 🇦🇷" — no subestimar el impacto en el mercado local
- Links legales: Términos de uso · Política de privacidad

---

## SEO — Keywords a atacar

### Intención de compra alta (para H1, title, meta description)

- `invitaciones digitales Argentina`
- `invitaciones digitales para XV años`
- `invitaciones digitales para casamiento Argentina`
- `invitaciones digitales online Argentina`
- `hacer invitaciones digitales gratis Argentina`
- `invitaciones digitales con RSVP`

### Cola larga con alta intención

- `cómo hacer invitaciones digitales para XV años`
- `invitaciones digitales casamiento argentina 2026`
- `invitación digital interactiva casamiento`
- `invitación digital con confirmación de asistencia`

### URLs recomendadas (páginas por categoría para SEO)

- `/invitaciones-digitales-casamiento`
- `/invitaciones-digitales-xv-anos`
- `/invitaciones-digitales-cumpleanos`
- `/invitaciones-digitales-corporativas`

Cada una con metadata específica en el app router de Next.js 16 (`export const metadata`). No es la misma landing con distinto H1 — contenido diferenciado por segmento.

---

## Prioridades de implementación

### Alta prioridad — esta semana

| # | Tarea | Impacto | Esfuerzo |
|---|---|---|---|
| 1 | Agregar CTA de registro en navbar | Muy alto | Bajo |
| 2 | Cambiar CTA hero a "Crear mi invitación gratis" → `/register` | Muy alto | Muy bajo |
| 3 | Agregar CTA secundario "Ver un ejemplo real" → invitación pública sin login | Muy alto | Bajo |
| 4 | Agregar micro-copy de confianza bajo los CTAs | Alto | Muy bajo |
| 5 | Hacer navbar sticky en toda la página (revisar `isHidden`) | Alto | Bajo |

### Alta prioridad — próximas 2 semanas

| # | Tarea | Impacto | Esfuerzo |
|---|---|---|---|
| 6 | Agregar sección de Testimonials (mínimo 3 reales con foto) | Muy alto | Medio |
| 7 | Agregar sección de Pricing | Muy alto | Medio |
| 8 | Reemplazar placeholders de Features con screenshots reales | Alto | Medio |
| 9 | Reformar CTA final (doble camino autoservicio/contacto) | Alto | Bajo |

### Media prioridad

| # | Tarea | Impacto | Esfuerzo |
|---|---|---|---|
| 10 | Agregar FAQ | Medio | Bajo |
| 11 | Agregar filtros de categoría en TemplatesSection | Medio | Bajo |
| 12 | Agregar Social Proof Banner post-hero | Medio | Muy bajo |
| 13 | Agregar comparación Papel vs Digital | Medio | Medio |

### Baja prioridad

| # | Tarea | Impacto | Esfuerzo |
|---|---|---|---|
| 14 | Páginas SEO por categoría (casamiento, XV, etc.) | Alto a largo plazo | Alto |
| 15 | Demo interactiva sin registro | Muy alto | Alto |
| 16 | Video 30s de celular abriendo una invitación (para el hero) | Alto | Bajo si es grabación simple |

---

## Preguntas a confirmar antes de implementar

1. ¿Existe un plan gratuito real, o el producto es 100% pago? Cambia todo el copy del hero.
2. ¿Hay screenshots del dashboard de RSVP para reemplazar los placeholders de Features?
3. ¿Cuál es la URL de registro en `app.bento.com.ar`? Confirmar que el flujo funciona desde la landing.
4. ¿Hay 3-5 clientes dispuestos a dar testimonio con foto para la sección de Testimonials?
5. ¿Los precios están estabilizados para ponerlos en una página estática?
6. ¿Hay alguna invitación pública de demo accesible sin login para el CTA "Ver un ejemplo real"?

---

## Referentes visuales y de copy

| Plataforma | Lo que tomar prestado |
|---|---|
| **Partiful** | Formato de testimonial cards (foto + nombre + tipo de evento + resultado emocional) |
| **Greenvelope** | Promesa de tiempo en el hero ("en menos de 5 minutos"), "sin tarjeta de crédito" |
| **RSVPify** | Pricing visible, segmentación por tipo de evento, FAQ de objeciones |
| **Zola** | Dual CTA en navbar (log in / get started), diseño limpio con espacio negativo |
| **Joy** | Perspectiva del invitado en el copy ("tus invitados lo van a adorar"), dark luxury |
| **Linear** | Screenshots reales del UI en la sección de features |
