---
name: Prioridades de Optimización - Bento Web
description: Issues críticos identificados en la auditoría de marketing de abril 2026 que bloquean conversión, ordenados por impacto
type: project
---

## Prioridad 1 - CRÍTICO (Hacerlo YA)

### 1. Demo URL rota en Hero
**Estado:** `DEMO_INVITATION_URL = "#"` apunta a nada
**Impacto:** 🔥🔥🔥 ALTO - el demo es el mejor vendedor
**Acción:**
1. Crear invitación demo completa: "Casamiento de Juan & María" o similar
2. Publicarla en `app.bento.com.ar/demo/casamiento-ejemplo`
3. Debe incluir: RSVP funcionando (modo preview), playlist con 5-10 canciones, galería con 3-4 fotos, mapa con ubicación ejemplo
4. Actualizar variable en `Hero.tsx`

**Why:** Visitantes escépticos que ven el demo funcionando tienen 10x más conversión que quienes solo leen copy. Es proof tangible.

### 2. Transparencia de Pricing
**Estado:** Plan "Celebración" dice "Consultar" (genera fricción)
**Impacto:** 🔥🔥🔥 ALTO - ProfitWell data: transparencia aumenta conversión 15-30%
**Acción:**
- Cambiar "Consultar" por precio específico: "$12.000" o el real
- Si hay variabilidad, mostrar "Desde $X" o rango "$X - $Y"

**Why:** "Consultar" implica proceso de ventas largo, llamadas, negociación. Usuario moderno quiere self-service.

### 3. Contradicción en Plan Celebración
**Estado:** Dice "por evento" pero lista "Eventos ilimitados" como feature
**Impacto:** 🔥🔥 MEDIO-ALTO - genera confusión en momento de decisión
**Acción:**
- Definir modelo: ¿pago único por evento O suscripción mensual?
- Opción A (recomendada): "$12.000 por evento · pago único" → cambiar feature a "1 evento con todas las funciones"
- Opción B: "$8.000 por mes" → mantener "Eventos ilimitados durante suscripción"
- Actualizar `Pricing.tsx`

**Why:** Incoherencia pricing = desconfianza = abandono.

### 4. Features 5 y 6 faltantes
**Estado:** `FeaturesScrollSequence.tsx` hardcodea `N_CARDS = 6` pero solo hay 4 features en JSON
**Impacto:** 🔥🔥 MEDIO - hay repetición de features en carrusel
**Acción:**
- Agregar a `messages/es/home.json`:
  - Feature 5: "Todo en un solo lugar" (fecha, mapa, galería, RSVP en una página)
  - Feature 6: "Cambiá lo que quieras, cuando quieras" (editable en tiempo real)

**Why:** Completitud + comunica ventaja vs Canva (PDF estático no editable).

## Prioridad 2 - HIGH (Próximo Sprint)

### 5. Tabla de Comparación vs Alternativas
**Impacto:** 🔥🔥 MEDIO
**Acción:** Crear componente `<ComparisonTable />` que compare Bento vs Impreso vs Canva vs WhatsApp imagen
**Ubicación:** Después de Features, antes de Testimonials

**Why:** Hace explícita la comparación mental del usuario. Posiciona a Bento como obvio ganador.

### 6. Calculadora ROI en Pricing
**Impacto:** 🔥🔥 MEDIO-ALTO
**Acción:** Agregar módulo debajo de tabla de pricing:
```
Invitación impresa: $130.000
Bento Celebración: $12.000
Ahorrás: $118.000 💰
```
**Why:** Re-frame precio como ahorro masivo, no gasto.

### 7. Expandir Testimonios
**Impacto:** 🔥 MEDIO
**Acción:**
- Agregar testimonio de evento corporativo (B2B case)
- Agregar testimonio de egresados (target 17-18 años)
- Rotar cuáles se muestran (A/B implícito)

**Why:** Diversifica social proof, más usuarios se identifican.

## Próximos A/B Tests Sugeridos

### Test 1: Hero Headline
- Control: "Todo tu evento, en un solo lugar"
- Variante A: "Invitaciones digitales que parecen de diseñador"
- Variante B: "Creá invitaciones que impresionan en 5 minutos"
- **Hipótesis:** A o B superan control (más específicos)

### Test 2: Pricing Transparency
- Control: "Consultar"
- Variante: "$12.000"
- **Hipótesis:** Transparencia aumenta conversión

### Test 3: CTA con Urgencia
- Control: "Crear mi invitación gratis"
- Variante: "Crear gratis + bonus mes Celebración (primeros 100)"
- **Hipótesis:** Urgencia aumenta clicks (validar calidad de leads)

## Métricas de Éxito por Sección

| Sección | KPI | Target |
|---------|-----|--------|
| Hero CTA primario | CTR | >8% |
| Hero CTA demo | CTR | >3% |
| Templates | Clicks en card | >15% |
| Pricing CTAs | CTR total | >12% |
| CTA Split final | CTR | >10% |

**How to apply:** Configurar eventos en GA4 para trackear estos clicks. Review semanal de métricas, iterar copy si están <50% del target.

**Why:** Data > opiniones. Medir para optimizar sistemáticamente.
