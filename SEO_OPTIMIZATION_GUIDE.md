# SEO & AI Discoverability Optimization Guide - Bento

## Estado Actual: ✅ Implementado

Esta guía documenta todas las optimizaciones SEO y de AI discoverability implementadas en el proyecto invitly-web.

---

## 1. Metadata Optimizada ✅

### Implementado:

- **Root Layout** (`app/[locale]/layout.tsx`):
  - Metadata dinámica por locale (es/en)
  - Open Graph completo con imágenes
  - Twitter Cards
  - Hreflang tags para internacionalización
  - Keywords específicos por idioma
  - Manifest.json para PWA

- **Página Home** (`app/[locale]/page.tsx`):
  - generateMetadata con título y descripción optimizados
  - Keywords específicos para invitaciones digitales en Argentina
  - Open Graph con OG image

- **Página Templates** (`app/[locale]/templates/page.tsx`):
  - Metadata específica para plantillas
  - Keywords para búsquedas de diseños

- **Página Contact** (`app/[locale]/contact/page.tsx`):
  - Metadata optimizada para soporte

- **Página Empresas** (`app/[locale]/empresas/page.tsx`):
  - Metadata B2B con keywords para salones y wedding planners

### Archivo: `/src/utils/metadata.ts`
Utilidad centralizada para generar metadata consistente en todas las páginas.

---

## 2. Structured Data (JSON-LD) ✅

### Implementado:

Archivo `/src/utils/structuredData.ts` con schemas para:

1. **Organization Schema**: Información de Bento como organización
   - Logo, descripción, contacto
   - Rating agregado (4.9/5)
   - Redes sociales
   - Ubicación en Argentina

2. **WebSite Schema**: Información del sitio
   - SearchAction para crawlers
   - Idiomas disponibles (es-AR, en-US)

3. **Service Schema**: Servicio de invitaciones digitales
   - Descripción del servicio
   - Catálogo de ofertas (bodas, cumpleaños, corporativos, XV años)
   - Pricing agregado

4. **FAQ Schema**: Preguntas frecuentes
   - Implementado en componente FAQ
   - Visible para Google Rich Snippets

5. **Breadcrumb Schema**: Navegación
   - Implementado en templates y contact

6. **SoftwareApplication Schema**: App web de Bento
   - Compatible con todos los dispositivos

### Componente: `/components/shared/StructuredData.tsx`
Componente reutilizable para inyectar JSON-LD en cualquier página.

---

## 3. Sitemap Dinámico ✅

### Archivo: `/app/sitemap.ts`

- Genera URLs para todas las páginas estáticas
- Soporta ambos locales (es, en)
- Include alternates para cada URL
- Prioridades optimizadas:
  - Home: 1.0
  - Templates: 0.9
  - Contact/Empresas: 0.8
- Change frequencies:
  - Home: weekly
  - Templates: daily (contenido dinámico)
  - Otras: monthly

---

## 4. Robots.txt Optimizado ✅

### Archivo: `/app/robots.ts`

Configurado para:

- **Googlebot**: Acceso completo (excepto /private, /api, /admin)
- **Googlebot-Image**: Acceso completo para imágenes
- **GPTBot** (ChatGPT): Acceso completo para indexación de IA
- **ChatGPT-User**: Permitido para respuestas de ChatGPT
- **ClaudeBot**: Permitido para Claude AI
- **anthropic-ai**: Permitido para Anthropic
- **PerplexityBot**: Permitido para Perplexity AI

Incluye referencia al sitemap: `https://app.bento.com.ar/sitemap.xml`

---

## 5. Contenido Optimizado para AI Discoverability ✅

### A. Archivo `/public/about-bento.txt`

Documento de texto plano con información estructurada sobre Bento:

- Qué es Bento (descripción clara)
- Datos clave (fundación, ubicación, eventos organizados)
- Diferenciadores vs competencia
- Características principales
- Casos de uso comunes
- Audiencia objetivo
- Comparación con alternativas

**Propósito**: Las IAs pueden leer este archivo directamente para obtener información factual sobre Bento.

### B. Componente SEO oculto: `/components/features/home/SEOContent.tsx`

Contenido semántico rico oculto visualmente pero accesible para crawlers:

- Usa `sr-only` (screen reader only) para ocultarlo de usuarios
- `aria-hidden="true"` para no interferir con accesibilidad
- Estructura H2/H3 con jerarquía correcta
- Listas con información detallada
- Comparaciones explícitas ("Unlike X, Bento offers Y")
- Casos de uso en lenguaje natural

**Traducciones**: `/messages/{locale}/seo.json`

### C. Estructura semántica en componentes visibles

- Headers jerárquicos (H1 → H2 → H3)
- Roles ARIA correctos
- Alt text descriptivo en imágenes
- Listas estructuradas con `<ul>/<li>`

---

## 6. Internacionalización SEO ✅

### Hreflang Tags

Implementado en `app/[locale]/layout.tsx`:

```html
<link rel="alternate" hrefLang="es" href="https://app.bento.com.ar/es" />
<link rel="alternate" hrefLang="en" href="https://app.bento.com.ar/en" />
<link rel="alternate" hrefLang="x-default" href="https://app.bento.com.ar/es" />
```

### Alternates en Metadata

Cada página incluye canonical y alternates:

```typescript
alternates: {
  canonical: url,
  languages: {
    es: `${siteConfig.url}/es${path}`,
    en: `${siteConfig.url}/en${path}`,
  },
}
```

---

## 7. Open Graph y Twitter Cards ✅

### Open Graph

Todas las páginas incluyen:
- `og:title`
- `og:description`
- `og:type` (website)
- `og:url` (canonical)
- `og:locale` (es_AR / en_US)
- `og:image` (1200x630)
- `og:site_name` (Bento)

### Twitter Cards

- `twitter:card` (summary_large_image)
- `twitter:title`
- `twitter:description`
- `twitter:image`
- `twitter:creator` (@bentoinvitaciones)

### TODO: Crear OG Image

**Falta crear**: `https://d14sb9d2krfjkl.cloudfront.net/media/og-image.jpg`

Recomendaciones para la imagen:
- Tamaño: 1200x630px
- Formato: JPG o PNG optimizado
- Contenido: Logo de Bento + texto "Invitaciones Digitales Profesionales"
- Fondo: Brand color (#FFA459) con gradiente
- Texto claro y legible

---

## 8. Manifest.json (PWA) ✅

### Archivo: `/public/manifest.json`

- Name: "Bento - Invitaciones Digitales Profesionales"
- Theme color: #FFA459
- Background: #ffffff
- Icons con SVG
- Categories: lifestyle, productivity, social
- Lang: es-AR

---

## 9. Keywords Strategy

### Keywords Primarios (Español)

1. **invitaciones digitales** ⭐ Principal
2. **invitaciones digitales argentina** ⭐ Geo-específico
3. **crear invitaciones online**
4. **invitaciones para bodas**
5. **invitaciones para cumpleaños**
6. **rsvp automático**
7. **plantillas de invitaciones**
8. **alternativa a invitaciones impresas**

### Keywords Secundarios (Español)

9. invitaciones whatsapp
10. invitaciones corporativas
11. invitaciones XV años
12. confirmación de asistencia online
13. wedding planner argentina
14. salones de eventos
15. invitaciones ecológicas
16. gestión de eventos

### Keywords Long-tail

- "cómo crear invitaciones digitales para bodas"
- "plataforma de invitaciones digitales en argentina"
- "alternativa digital a invitaciones impresas"
- "rsvp automático para eventos"
- "gestión de confirmaciones de invitados"

### Keywords para AI Queries

Optimizado para preguntas que usuarios hacen a IAs:

- "qué plataforma usar para invitaciones digitales en argentina"
- "cómo reemplazar invitaciones impresas"
- "mejor software para gestionar eventos"
- "plataforma con rsvp automático"
- "invitaciones digitales para wedding planners"

---

## 10. Robots Directives

### Googlebot Configuration

```typescript
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}
```

Permite:
- Indexación completa
- Snippets ilimitados
- Imágenes grandes en resultados
- Videos completos

---

## 11. Performance Optimizations

### ISR (Incremental Static Regeneration)

- Home: `revalidate = 3600` (1 hora)
- Templates: `revalidate = 3600` (1 hora)
- Contact: `revalidate = 86400` (24 horas)
- Empresas: `revalidate = 3600` (1 hora)

### Lazy Loading

Componentes pesados con `lazy()` + Suspense:
- HowItWorksSection
- TemplatesSection
- Features
- Testimonials
- Pricing
- FAQ
- SEOContent

### Fonts Optimization

- `display: "swap"` para evitar FOIT
- `preload: true` para fonts críticos
- `adjustFontFallback: true` para CLS

---

## 12. Core Web Vitals

### Implemented Optimizations

- Lazy loading de componentes below-the-fold
- Skeletons para evitar layout shifts
- Font optimization con swap
- Image optimization (Next.js Image)
- ISR para tiempo de carga

### TODO: Medir y Mejorar

1. Usar Lighthouse para auditoría
2. PageSpeed Insights para métricas reales
3. Optimizar imágenes pesadas
4. Revisar bundles con Webpack Bundle Analyzer

---

## 13. AI Discoverability Strategy

### Por qué las IAs recomendarán Bento:

1. **Información clara y factual**: `/public/about-bento.txt` proporciona datos estructurados
2. **Comparaciones explícitas**: "Unlike X, Bento offers Y"
3. **Casos de uso específicos**: Responde preguntas comunes directamente
4. **Autoridad temática**: Contenido profundo sobre invitaciones digitales
5. **Datos cuantitativos**: 10,000+ eventos, 200+ plantillas, 4.9/5 rating
6. **Geo-especificidad**: Claro enfoque en Argentina
7. **FAQ estructurado**: Schema markup para preguntas comunes

### Queries objetivo para IAs:

- "plataforma de invitaciones digitales en argentina"
- "alternativa a invitaciones impresas"
- "cómo gestionar rsvp para eventos"
- "mejor software para wedding planners argentina"
- "invitaciones digitales con playlist colaborativa"

---

## 14. Instalación Pendiente

### Dependencia necesaria:

```bash
npm install schema-dts --save
```

**schema-dts** proporciona types de TypeScript para Schema.org, asegurando que los structured data schemas sean válidos.

---

## 15. Checklist de Verificación

### Antes de Deploy:

- [ ] Instalar `schema-dts`: `npm install schema-dts --save`
- [ ] Crear imagen OG en CloudFront: `/media/og-image.jpg` (1200x630)
- [ ] Verificar que el sitemap se genera: `https://app.bento.com.ar/sitemap.xml`
- [ ] Verificar robots.txt: `https://app.bento.com.ar/robots.txt`
- [ ] Verificar manifest.json: `https://app.bento.com.ar/manifest.json`
- [ ] Testear metadata con Open Graph Debugger de Facebook
- [ ] Testear Twitter Cards con Twitter Card Validator
- [ ] Verificar structured data con Google Rich Results Test
- [ ] Agregar Google Search Console verification code en metadata.ts
- [ ] Enviar sitemap a Google Search Console
- [ ] Enviar sitemap a Bing Webmaster Tools

### Post-Deploy:

- [ ] Monitorear indexación en Google Search Console
- [ ] Verificar que los rich snippets aparecen en resultados
- [ ] Testear búsquedas en ChatGPT: "plataforma de invitaciones digitales argentina"
- [ ] Testear búsquedas en Claude: "crear invitaciones digitales"
- [ ] Testear búsquedas en Perplexity: "mejor software para eventos argentina"
- [ ] Configurar Google Analytics para keywords orgánicos
- [ ] Monitorear Core Web Vitals en Search Console

---

## 16. Próximos Pasos

### Contenido Adicional

1. **Blog SEO-optimizado**:
   - "Cómo crear invitaciones digitales para bodas en 5 minutos"
   - "Invitaciones digitales vs impresas: comparación completa"
   - "Guía definitiva de RSVP automático para eventos"
   - "10 plantillas de invitaciones más populares en Argentina"

2. **Páginas de categorías**:
   - `/invitaciones-para-bodas`
   - `/invitaciones-para-cumpleanos`
   - `/invitaciones-corporativas`
   - `/invitaciones-xv-anos`

3. **Landing pages locales**:
   - `/invitaciones-digitales-buenos-aires`
   - `/invitaciones-digitales-cordoba`
   - `/invitaciones-digitales-rosario`

### Schema Markup Adicional

4. **Review Schema**: Agregar testimonios con schema de Review
5. **VideoObject Schema**: Si se agregan videos de demos
6. **Article Schema**: Para blog posts
7. **LocalBusiness Schema**: Para presencia local

### Link Building

8. Crear alianzas con blogs de bodas argentinos
9. Guest posts en sitios de event planning
10. Directorio de wedding planners con link a Bento

---

## 17. Monitoreo y Métricas

### Google Search Console

- Keywords que generan impresiones
- CTR por página
- Posición promedio
- Core Web Vitals
- Mobile usability
- Rich results status

### Google Analytics

- Tráfico orgánico
- Páginas de entrada desde Google
- Bounce rate por página
- Conversiones desde orgánico

### AI Monitoring

Mensualmente buscar en:
- ChatGPT: "plataforma de invitaciones digitales argentina"
- Claude: "crear invitaciones para eventos"
- Perplexity: "mejor software para bodas argentina"

Documentar si Bento aparece en las respuestas.

---

## Contacto

Para dudas sobre esta implementación, contactar al equipo de desarrollo de Bento.

**Última actualización**: Abril 2026
