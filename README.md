# bento - Plataforma de Invitaciones Digitales

Aplicación web para explorar y solicitar invitaciones digitales personalizadas.

![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8)

## 🚀 Stack Técnico

- **Framework:** Next.js 16.0.0 (App Router) + React 19.2.0
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **State:** Zustand + TanStack Query
- **Forms:** React Hook Form + Zod
- **i18n:** next-intl (ES/EN)
- **Testing:** Jest + React Testing Library

## ✨ Características

- 🎨 Galería de plantillas con filtrado por categoría
- 🌐 Multi-idioma (Español/Inglés)
- 📱 Diseño responsive
- 📝 Formulario de contacto con validación
- ⚡ Performance optimizada (ISR, lazy loading, suspense)
- ♿ Accesibilidad (ARIA labels, semantic HTML)

## 🛠 Instalación y Ejecución

### Prerequisitos

- Node.js 18+
- npm 9+

### Setup

```bash
# Clonar el repositorio
git clone <repository-url>
cd bento-front

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

### Comandos

```bash
# Desarrollo
npm run dev              # http://localhost:3000

# Build
npm run build
npm run start

# Tests
npm run test             # Ejecutar tests
npm run test:watch       # Modo watch
npm run test:coverage    # Con coverage

# Lint
npm run lint
```

## 📁 Estructura del Proyecto

```
bento-front/
├── app/[locale]/          # Pages (Home, Templates, Contact)
├── components/
│   ├── features/         # Por feature (home, templates, contact)
│   ├── shared/           # Reutilizables (Navbar, Footer)
│   └── ui/               # shadcn/ui components
├── hooks/                # useCategories, useTemplates
├── services/             # API calls
├── stores/               # Zustand stores
├── utils/                # Types, validations, helpers
├── messages/             # Traducciones (es/en)
└── __tests__/            # Tests
```

## 📊 API

| Método | Endpoint      | Descripción                 |
| ------ | ------------- | --------------------------- |
| GET    | `/categories` | Lista categorías            |
| GET    | `/templates`  | Lista templates (filtrable) |
| POST   | `/inquiries`  | Crea consulta               |

---

**Desarrollado con Next.js 16 + TypeScript**
