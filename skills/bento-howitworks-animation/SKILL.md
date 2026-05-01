---
name: bento-howitworks-animation
description: >
  Diseña y ajusta secuencias narrativas para el bloque HowItWorks de Bento, especialmente flujos chat -> dashboard con GSAP.
  Trigger: Cuando haya que crear, corregir o refinar animaciones explicativas en HowItWorks, timelines GSAP por pasos, o transiciones de UI tipo producto.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Cuando una animación en `components/features/home/HowItWorksClient.tsx` no “cuenta” bien el paso
- Cuando haya que encadenar microinteracciones tipo chat, input, envío, dashboard y notificación
- Cuando un trigger de GSAP falle por depender de `progress` o umbrales frágiles
- Cuando haya que convertir una demo visual en una narrativa de producto

## Critical Patterns

- Dispará secuencias por estado visual real, no por heurísticas débiles.
  Si el paso 3 depende de que el panel esté visible, usá el estado del panel (`gsap.getProperty(..., "y")`) o una condición equivalente del layout real.

- No cuentes “apariciones”; contá causa y efecto.
  Para Bento, la historia correcta es:
  `escribís -> enviás -> llega respuesta -> Bento actualiza el dashboard`.

- El chat y el dashboard no deben competir si el objetivo es explicar el resultado.
  Si el dashboard es la consecuencia, el chat debe desaparecer o perder protagonismo ANTES de mostrar el estado del sistema.

- Las microinteracciones deben ser semánticas.
  Ejemplos:
  `mic -> send`, `tap del botón`, `check -> double check`, `typing indicator`, `bell notification`, `+1`.

- El reset debe dejar todos los refs en un estado consistente.
  Si el usuario vuelve hacia atrás en scroll, reiniciá:
  input, cursor, iconos del botón, checks, typing indicator, chat bubbles, contadores, badges y dashboard.

- Evitá depender de `self.animation` en triggers secundarios si no está garantizado.
  En timelines complejos, preferí leer `stepTl.time()` o el estado directo de los nodos animados.

- Si una secuencia parece “UI suelta”, falta una transición narrativa intermedia.
  Antes de agregar estilos, definí qué evento lógico une una escena con la siguiente.

## Decision Rules

| Situación | Regla |
|---|---|
| El paso no se entiende como chat | Agregar interacción explícita: typewriter, botón enviar, checks, typing |
| El paso no se entiende como producto | Mostrar consecuencia en dashboard, no solo mensajes |
| El trigger falla al entrar a un step | Atarlo al estado visible del panel o a `stepTl.time()` |
| El final queda confuso | Hacer desaparecer la escena anterior antes de introducir la siguiente |
| El usuario pasa referencia visual | Ajustar composición primero, después timing |

## Recommended Sequence

Para flujos de Bento tipo compartir por WhatsApp:

1. Sale o se reduce el Lottie inicial
2. Aparece el input
3. Se escribe el mensaje con cadencia humana
4. El mic se convierte en enviar
5. Tap del botón
6. La burbuja enviada sube al hilo
7. Aparece `escribiendo...`
8. Entran respuestas con delays distintos
9. El chat desaparece
10. Entra el dashboard
11. Notificación/campana
12. `Confirmados +1`
13. Se revela la card del nuevo invitado

## Code Examples

```ts
const getPanelTranslateY = (panel: HTMLDivElement | null) => {
  if (!panel) return Number.POSITIVE_INFINITY;
  const value = gsap.getProperty(panel, "y");
  if (typeof value === "number") return value;
  const parsed = Number.parseFloat(String(value));
  return Number.isFinite(parsed) ? parsed : Number.POSITIVE_INFINITY;
};
```

```ts
ScrollTrigger.create({
  trigger: section,
  start: "top top",
  end: `+=${scrollLength}`,
  onUpdate: () => {
    const step3PanelY = getPanelTranslateY(rightPanelRefs.current[2]);

    if (step3PanelY <= 8 && !step3Triggered) {
      step3Triggered = true;
      step3AutoTl.restart();
    }

    if (step3PanelY > 24 && step3Triggered) {
      step3Triggered = false;
      resetStep3Animation();
    }
  }
});
```

```ts
step3AutoTl.to(chatStageRef.current, {
  autoAlpha: 0,
  x: -82,
  duration: 0.38,
  ease: "power2.in"
});

step3AutoTl.to(dashboardStageRef.current, {
  autoAlpha: 1,
  x: 0,
  duration: 0.44,
  ease: "power2.out"
}, "<0.08");
```

## Commands

```bash
rg -n "step3|HowItWorks|ScrollTrigger|gsap" components/features/home/HowItWorksClient.tsx
npm test -- --runInBand __tests__/HowItWorksClient.test.tsx
```

## Resources

- **Implementation target**: `components/features/home/HowItWorksClient.tsx`
- **Project context**: `CLAUDE.md`
