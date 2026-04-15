# 🎯 Microsoft Clarity - Guía de instalación

Microsoft Clarity ya está **integrado en el proyecto**. Solo falta obtener tu Project ID y configurarlo.

## 📋 Pasos para activar Clarity:

### 1️⃣ Crear cuenta en Microsoft Clarity

1. Andá a: **https://clarity.microsoft.com/**
2. Iniciá sesión con tu cuenta de Microsoft (o creá una gratis)
3. Hacé clic en **"Add new project"**

### 2️⃣ Configurar tu proyecto

1. **Project name**: `Bento - invitly-web`
2. **Website URL**: `https://app.bento.com.ar` (o tu dominio)
3. Hacé clic en **"Create project"**

### 3️⃣ Obtener tu Clarity ID

Después de crear el proyecto, vas a ver una pantalla con el código de instalación.

Buscá una línea que diga:
```javascript
clarity("init", "xxxxxxxxxx");
```

Ese `xxxxxxxxxx` es tu **Clarity Project ID**.

### 4️⃣ Configurar en el proyecto

1. Abrí el archivo `.env` en la raíz del proyecto
2. Pegá tu Clarity ID:
   ```
   NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
   ```
3. Guardá el archivo
4. Reiniciá el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## ✅ Verificar que funciona

1. Abrí tu sitio en el navegador
2. Abrí las DevTools (F12)
3. En la consola, escribí: `clarity`
4. Si te devuelve una función, **¡está funcionando!** ✨

También podés ir a tu dashboard de Clarity en 2-3 minutos y deberías ver tu sesión grabándose en vivo.

## 🎬 ¿Qué vas a poder ver?

- 📹 **Session recordings**: Grabaciones de cómo navegan los usuarios
- 🔥 **Heatmaps**: Dónde hacen clic, hasta dónde scrollean
- 💢 **Rage clicks**: Usuarios que hacen clic muchas veces (algo está roto)
- 💀 **Dead clicks**: Clics en elementos que no hacen nada
- 📊 **JavaScript errors**: Errores que ven tus usuarios
- 📱 **Device insights**: Desktop vs mobile, navegadores

## 🚀 Tips

- **Las grabaciones aparecen en 2-3 minutos** (no son en tiempo real exacto)
- Es **100% gratis**, sin límites de grabaciones
- **No afecta la performance** de tu sitio
- Funciona en **producción y desarrollo**

## 🔒 Privacidad

Clarity cumple con GDPR y enmascara automáticamente:
- Campos de contraseña
- Campos de email (opcional)
- Inputs sensibles

---

**¿Necesitás ayuda?** Escribime y te ayudo a configurarlo.
