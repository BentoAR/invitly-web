---
name: Patrones de animación de entrada de cards flotantes — investigación técnica detallada
description: Análisis exhaustivo de los patrones de entrada de floating cards en SaaS premium, con valores técnicos específicos de GSAP y recomendación final para Bento
type: project
---

## Contexto

Investigación realizada en abril 2026 para mejorar la animación de entrada de cards en FeaturesScrollSequence. El componente ya tiene GSAP ScrollTrigger con scrub, fase de título y fase de cards. La pregunta era: ¿cómo deberían entrar exactamente las cards para sentirse premium?

## Estado actual de la animación (baseline)

```
CARD_ENTRY: solo x/y offset (±900px horizontal, 700px vertical)
ease: "power3.out"
duration: 1.2 (en unidades de timeline scrubbed)
scale: 0.9 → 1
opacity: 0 → 1
SIN rotación, SIN blur, SIN stagger real (spacing de 1.1 en timeline)
```

El stagger está "simulado" como spacing entre tweens en el scrubbed timeline, no como stagger real de Gsap. El resultado es que cada card aparece cuando el usuario llega scrolleando a ese punto.

## Taxonomía de patrones de entrada (benchmarks industriales)

### 1. Scatter con Rotación — patrón Revolut/Superlist
- Cards entran con rotación inicial (ej: card top-left con rotation: -12°) y animan a su posición final rotada (-3°)
- La rotación durante el vuelo es la clave: no parte desde 0° y llega a -3°, sino que parte desde un ángulo exagerado y "desacelera" en su ángulo final
- Origen: desde fuera del viewport por el borde más lógico para su posición (top-left viene de izquierda o de arriba)
- Ease: power3.out o expo.out — NO elastic (demasiado rebote para premium)
- Duración efectiva: 0.8-1.2s (fire-once) o equivalente scrubbed
- Feeling: físico, como papeles arrojados que caen en su lugar

### 2. Bounce/Spring — patrón consumer apps (Beeper, apps iOS)
- back.out(1.2-1.7) da un overshoot del 20-30% antes de asentarse
- El overshoot aplica al eje de traslación principal (ej: si viene de izquierda, va un poco más a la derecha antes de volver)
- También puede aplicar a escala: 1.0 → 1.08 → 1.0 (overshoot en scale)
- Duración típica: 0.6-0.9s fire-once
- **PROBLEMA con scrub**: back.out y elastic NO funcionan bien en timelines scrubbed porque el scrub interpola linealmente y aplana el overshoot. Solo funciona bien fire-once o con scrub: false.
- Feeling: ligereza, playful, buena para consumer pero puede cheapenizar producto premium

### 3. Stagger direccional — patrón Linear/productos B2B
- Las cards cercanas al centro entran primero, las de los bordes después (o viceversa)
- Alternativamente: top cards primero, bottom cards después (0.08-0.15s stagger)
- Sin rotación, sin escala dramática — solo traslación + opacity
- Ease: power2.out
- Feeling: digital, ordenado, tecnológico

### 4. Blur + Fade — patrón Apple/editorial premium
- filter: blur(8-16px) → blur(0)
- Combinado con opacity 0→1 y traslación suave (y: 20-40px, no 900px)
- La distancia de traslación es CORTA — el blur reemplaza la necesidad de volar desde lejos
- Ease: power2.out en opacity/transform, power3.out en blur
- Duración: 0.6-1.0s
- **PROBLEMA**: filter: blur en animaciones scrubbed GSAP tiene costo de GPU. En 6 cards simultáneas puede causar jank en dispositivos mid-range.
- Feeling: editorial, cinematico, premium — el más sofisticado visualmente

### 5. Scatter con Rotación + Scale overshoot — patrón recomendado para Bento
Combinación de los patrones 1 y 2 con restricciones:
- Rotación durante el vuelo + settling en ángulo final (no en 0°)
- Scale: 0.85 → 1.03 → 1.0 (micro overshoot, implementado como dos tweens en secuencia)
- Ease: back.out(1.3) para el tween principal, pero SOLO si no está en scrubbed timeline
- Si está en scrubbed: usar power3.out con un segundo micro-tween de "settle"
- Duración: 0.9-1.1s

## Valores técnicos específicos por patrón

### Patrón Scatter Rotación (recomendado para scrubbed timeline)

```javascript
// Ejemplo para Card 0 (top-left, viene de la izquierda)
// Estado inicial (gsap.set):
{ x: -900, y: 0, rotation: -18, scale: 0.88, opacity: 0 }

// Tween de entrada (en timeline scrubbed):
{ x: 0, y: 0, rotation: -4, scale: 1, opacity: 1,
  ease: "power3.out", duration: 1.4 }

// La rotación de llegada (-4°) debe ser la misma que el slot tiene en su CSS transform final
```

Rotaciones de entrada sugeridas por slot (desde posición inicial exagerada → posición final):
- top-left (viene de left): `rotation: -18 → -4`
- top-right (viene de right): `rotation: 16 → 3`
- bottom-left (viene de left): `rotation: 14 → -2`
- bottom-right (viene de right): `rotation: -12 → 4`
- bottom-center (viene de bottom): `rotation: -8 → -1`
- mid-left (viene de left): `rotation: 20 → -5`

### Patrón Blur + Fade (recomendado para fire-once, NO scrubbed)

```javascript
gsap.fromTo(card,
  { opacity: 0, y: 40, filter: "blur(12px)" },
  { opacity: 1, y: 0, filter: "blur(0px)",
    ease: "power2.out", duration: 0.85,
    delay: i * 0.12 }
)
```

### Stagger valores seguros

- Stagger muy sutil (casi imperceptible): 0.06-0.10s
- Stagger perceptible pero fluido: 0.12-0.18s
- Stagger dramático (demasiado): > 0.25s

En timeline scrubbed, el stagger se traduce en spacing de posición en el timeline. Con cardStep: 1.1 (actual), el spacing es generoso. Para una entrada más simultánea y premium: reducir a 0.5-0.7.

## El debate crítico: Scrubbed vs Fire-Once para cards

### Scrubbed (como está actualmente)
**Pro:** El usuario controla el ritmo. Se puede ir hacia atrás y ver la animación de nuevo.
**Con:** El ease queda "aplastado" por el scrub. back.out y elastic no se expresan correctamente. La sensación de "peso físico" se pierde porque el usuario puede pausar en cualquier punto intermedio.
**Mejor ease en scrubbed:** power3.out, expo.out (curvas sin overshoot que lucen bien en cualquier posición de pausa)

### Fire-Once (disparado al llegar a la fase de cards)
**Pro:** El ease se expresa completamente. back.out da el overshoot real. La animación tiene un carácter propio.
**Con:** En un contexto donde el título ya está siendo scrubbed, cambiar a fire-once en las cards rompe la coherencia del scroll.

### Solución híbrida (la mejor para Bento)
Mantener el scrub en el timeline principal para el título. Para las cards: usar un ScrollTrigger separado con `scrub: false` que se dispara cuando el scroll llega al punto donde las cards deberían aparecer. Esto permite usar back.out en las cards mientras el título sigue siendo scrubbed.

Implementación conceptual:
```javascript
// El título sigue en el timeline scrubbed principal

// Las cards usan un ScrollTrigger independiente, fire-once:
ScrollTrigger.create({
  trigger: desktopSection,
  start: `top+=${scrollDist * 0.45} top`, // 45% del scroll total = cuando el título ya asentó
  onEnter: () => {
    gsap.to(cards, {
      opacity: 1, scale: 1, x: 0, y: 0, rotation: "var(--final-rotation)",
      ease: "back.out(1.2)",
      stagger: { amount: 0.6, from: "center" }
    });
  },
  once: true
});
```

## Delay entre título y cards: ¿cuánto es correcto?

Referencia perceptual: el usuario necesita ~300-500ms después de que el título "llegó" para que su atención se desplace de él a las cards.

En el timeline scrubbed actual (cardStart: 2.0, fase título: 0-2.2), hay un overlap: las cards empiezan antes de que el título termine. Esto puede sentirse apresurado. Recomendación: cardStart: 2.4-2.6 para dar un pequeño "respiro" perceptual.

## Recomendación definitiva para Bento

**Patrón: Scatter Rotación en scrubbed + micro overshoot simulado**

Motivo: Las invitaciones son objetos físicos — papeles, sobres, tarjetas. Una animación que evoca "papeles volando y aterrizando" es literalmente metafórica del producto. La rotación sutil (no exagerada) en la posición de llegada conecta con eso.

El overshoot (back.out) idealmente debería ser fire-once, pero si la complejidad de híbrido es alta, power3.out + rotación ya es una mejora sustancial sobre el estado actual.

**Por qué NO blur+fade para Bento:**
- Alto costo GPU en dispositivos mid-range (mercado AR)
- La distancia corta de traslación (y: 40px) hace que las cards "aparezcan" más que "entren" — pierde el drama del scatter
- El blur es una elección editorial/tech, no cálida/emocional

**Por qué NO stagger puro sin rotación:**
- Sin rotación, el movimiento se lee como "UI apareciéndose", no como "objetos llegando"
- En un producto de invitaciones (cargado emocionalmente), la metáfora del objeto físico vale la complejidad

**Why:** La rotación durante el vuelo + settling en ángulo no-cero ancla visualmente las cards como objetos con carácter propio, no como placeholders de UI genérico. Es la diferencia entre "una tarjeta de invitación cayendo sobre la mesa" y "un tooltip de dashboard abriéndose".
