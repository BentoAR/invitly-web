# Instalación de Optimizaciones SEO

## Paso 1: Instalar Dependencias

```bash
cd /Users/lauti/Desktop/bento/invitly-web
npm install schema-dts --save
```

Esta dependencia proporciona tipos de TypeScript para Schema.org, asegurando que los structured data schemas sean válidos.

---

## Paso 2: Crear Imagen Open Graph

Crear una imagen OG optimizada:

**Ubicación**: Subir a CloudFront en `/media/og-image.jpg`

**Especificaciones**:
- Dimensiones: 1200x630px
- Formato: JPG (optimizado) o PNG
- Tamaño: < 300KB
- Contenido sugerido:
  - Logo de Bento (centrado o superior izquierdo)
  - Texto: "Invitaciones Digitales Profesionales"
  - Subtexto: "Más de 10,000 eventos en Argentina"
  - Background: Gradiente con #FFA459 (brand color)
  - Fonts: Inter para el texto, Playfair Display para el título

**Herramientas sugeridas**:
- Figma con template de OG image
- Canva con dimensiones 1200x630
- Photoshop con export optimizado

---

## Paso 3: Obtener Google Search Console Verification

1. Ir a [Google Search Console](https://search.google.com/search-console)
2. Agregar propiedad para `app.bento.com.ar`
3. Elegir método "HTML tag"
4. Copiar el código de verificación

5. Editar `/Users/lauti/Desktop/bento/invitly-web/src/utils/metadata.ts`:

```typescript
// Línea 62
verification: {
  google: "CODIGO_AQUI", // Reemplazar con código real
},
```

---

## Paso 4: Verificar Build

```bash
npm run build
```

Si hay errores:

### Error: "Cannot find module 'schema-dts'"
→ Ejecutar `npm install schema-dts --save`

### Error en tipos de structured data
→ Verificar que todos los schemas en `/src/utils/structuredData.ts` usen tipos de `schema-dts`

### Error en traducciones SEO
→ Verificar que `/messages/es/seo.json` y `/messages/en/seo.json` existan

---

## Paso 5: Deploy y Verificación

### Después del Deploy:

1. **Verificar sitemap**:
   - Ir a: `https://app.bento.com.ar/sitemap.xml`
   - Debe mostrar lista de URLs para es y en

2. **Verificar robots.txt**:
   - Ir a: `https://app.bento.com.ar/robots.txt`
   - Debe incluir sitemap y permitir AI bots

3. **Verificar manifest**:
   - Ir a: `https://app.bento.com.ar/manifest.json`
   - Debe devolver JSON válido

4. **Verificar about-bento.txt**:
   - Ir a: `https://app.bento.com.ar/about-bento.txt`
   - Debe mostrar texto plano con información de Bento

---

## Paso 6: Validar Metadata

### Open Graph (Facebook)
1. Ir a [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Ingresar: `https://app.bento.com.ar/es`
3. Click "Debug"
4. Verificar que muestre:
   - Título correcto
   - Descripción completa
   - Imagen OG (1200x630)
   - Locale es_AR

### Twitter Cards
1. Ir a [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. Ingresar: `https://app.bento.com.ar/es`
3. Click "Preview card"
4. Verificar que muestre summary_large_image

### Google Rich Results
1. Ir a [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Ingresar: `https://app.bento.com.ar/es`
3. Click "Test URL"
4. Verificar schemas válidos:
   - Organization ✓
   - WebSite ✓
   - Service ✓
   - FAQ ✓ (si está en la página)

---

## Paso 7: Enviar a Search Engines

### Google Search Console

1. Agregar propiedad `app.bento.com.ar`
2. Verificar con meta tag (código del Paso 3)
3. Ir a Sitemaps
4. Agregar: `https://app.bento.com.ar/sitemap.xml`
5. Click "Submit"
6. Ir a Inspección de URLs
7. Solicitar indexación para:
   - `https://app.bento.com.ar/es`
   - `https://app.bento.com.ar/es/templates`
   - `https://app.bento.com.ar/es/empresas`
   - `https://app.bento.com.ar/en`

### Bing Webmaster Tools

1. Ir a [Bing Webmaster](https://www.bing.com/webmasters)
2. Agregar sitio `app.bento.com.ar`
3. Importar desde Google Search Console (más rápido)
4. Enviar sitemap: `https://app.bento.com.ar/sitemap.xml`

---

## Paso 8: Testear AI Discoverability

Probar en las siguientes IAs (1 semana después del deploy):

### ChatGPT
```
Pregunta: "¿Qué plataforma me recomendás para crear invitaciones digitales en Argentina?"

Resultado esperado: Bento mencionado en la respuesta
```

### Claude
```
Pregunta: "Necesito crear invitaciones digitales para una boda. ¿Qué opciones tengo en Argentina?"

Resultado esperado: Bento en la lista de opciones
```

### Perplexity
```
Pregunta: "Mejor software para gestión de eventos y confirmaciones en Argentina"

Resultado esperado: Bento citado con link
```

**Documentar resultados** para trackear mejoras mes a mes.

---

## Paso 9: Configurar Google Analytics

### Eventos personalizados para SEO:

```javascript
// Agregar en GoogleAnalytics.tsx si es necesario
gtag('event', 'organic_landing', {
  page_path: window.location.pathname,
  referrer: document.referrer,
});
```

### Objetivos en GA:
1. Organic → Signup
2. Organic → Template View
3. Organic → Contact Form Submit

---

## Paso 10: Monitoreo Continuo

### Semanalmente:
- [ ] Revisar Google Search Console
  - Impresiones
  - Clicks
  - CTR
  - Posición promedio

### Mensualmente:
- [ ] Testear AI discoverability (ChatGPT, Claude, Perplexity)
- [ ] Revisar Core Web Vitals
- [ ] Analizar keywords que generan tráfico
- [ ] Verificar que rich snippets se muestran

### Trimestralmente:
- [ ] Actualizar keywords según tendencias
- [ ] Crear contenido nuevo basado en search queries
- [ ] Optimizar páginas con bajo CTR
- [ ] Revisar y actualizar structured data

---

## Troubleshooting

### Sitemap no aparece en Google
- Verificar que `sitemap.xml` sea accesible
- Verificar formato XML válido
- Esperar 24-48 horas después de envío

### Rich snippets no aparecen
- Verificar con Rich Results Test
- Corregir errores de validación
- Esperar 2-4 semanas para indexación

### OG image no se muestra
- Verificar que imagen existe en CloudFront
- Verificar dimensiones 1200x630
- Usar Facebook Debugger para "scrape again"

### AI no menciona Bento
- Verificar `about-bento.txt` accesible
- Agregar más contenido factual en páginas
- Esperar 2-4 semanas para re-crawl de AI bots

---

## Checklist Final

- [ ] `npm install schema-dts` ejecutado
- [ ] Build sin errores (`npm run build`)
- [ ] OG image creada y subida a CloudFront
- [ ] Google verification code agregado
- [ ] Deploy realizado
- [ ] Sitemap accesible y enviado a Google/Bing
- [ ] Open Graph validado en Facebook Debugger
- [ ] Twitter Cards validado
- [ ] Rich Results validado en Google
- [ ] Google Analytics configurado
- [ ] Monitoreo semanal configurado

---

**¡Listo!** El sitio ahora está completamente optimizado para SEO y AI discoverability.

**Soporte**: Ver `SEO_OPTIMIZATION_GUIDE.md` y `SEO_IMPLEMENTATION_SUMMARY.md` para detalles técnicos.
