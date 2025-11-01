# 🔧 Variables de Entorno para Vercel

## ❌ PROBLEMA ACTUAL

Tus variables de entorno tienen URLs de `localhost` que **NO funcionan en producción**:

```bash
# ❌ INCORRECTO (localhost no funciona en Vercel)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_URL_INTERNAL="http://localhost:3000/error"
REDIRECCION_ACCESO="http://localhost:3000/blog"
URL_ORIGINAL="http://localhost:3000"
```

---

## ✅ CONFIGURACIÓN CORRECTA PARA VERCEL

### 1. Ve a tu proyecto en Vercel
- Dashboard → Tu Proyecto → Settings → Environment Variables

### 2. Configura estas variables (REEMPLAZA localhost con tu URL de Vercel)

#### **Para Production:**

```bash
# MongoDB (CORRECTO - ya lo tienes bien)
MONGODB_URI=mongodb+srv://edgardo:0GiDPOpQGwwwt6jDjlc@cluster0.q044u1z.mongodb.net/nebula-blog?appName=Cluster0

# NextAuth (CAMBIA localhost por tu URL de Vercel)
NEXTAUTH_URL=https://tu-proyecto.vercel.app
NEXTAUTH_SECRET=secret

# Google OAuth (ya los tienes bien)
GOOGLE_CLIENT_ID=24050ee1425677-s9u1lharimff38pht3ad49t4eciaarrd.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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ZT

# URLs de redirección (CAMBIA localhost por tu URL de Vercel)
REDIRECCION_ACCESO=https://tu-proyecto.vercel.app/blog
URL_ORIGINAL=https://tu-proyecto.vercel.app
```

**IMPORTANTE**: Reemplaza `https://tu-proyecto.vercel.app` con tu URL real de Vercel.

---

## 🔍 ¿Cómo encontrar tu URL de Vercel?

1. Ve a tu proyecto en Vercel Dashboard
2. En la parte superior verás tu URL de producción, algo como:
   - `https://nebula-blog.vercel.app`
   - `https://blog-lucascabral.vercel.app`
   - O tu dominio personalizado si tienes uno

---

## 📝 Pasos para Configurar

### Paso 1: Elimina las variables incorrectas
En Vercel → Settings → Environment Variables, **elimina** estas variables si existen:
- ❌ `NEXTAUTH_URL_INTERNAL` (no es necesaria)

### Paso 2: Actualiza/Agrega estas variables

| Variable | Valor | Entorno |
|----------|-------|---------|
| `MONGODB_URI` | `mongodb+srv://edgardo:0GiDPOpQGwwwt6jDjlc@cluster0.q044u1z.mongodb.net/nebula-blog?appName=Cluster0` | Production, Preview, Development |
| `NEXTAUTH_URL` | `https://TU-URL.vercel.app` | Production |
| `NEXTAUTH_SECRET` | `secret` (o genera uno nuevo con `openssl rand -base64 32`) | Production, Preview, Development |
| `GOOGLE_CLIENT_ID` | `24050ee1425677-s9u1lharimff38pht3ad49t4eciaarrd.apps.googleusercontent.com` | Production, Preview, Development |
| `GOOGLE_CLIENT_SECRET` | `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ZT` | Production, Preview, Development |
| `REDIRECCION_ACCESO` | `https://TU-URL.vercel.app/blog` | Production |
| `URL_ORIGINAL` | `https://TU-URL.vercel.app` | Production |

### Paso 3: Guarda y Re-deploy

Después de configurar las variables:
1. Guarda los cambios en Vercel
2. Ve a **Deployments**
3. En el último deployment, haz clic en los 3 puntos (⋯)
4. Selecciona **Redeploy**

---

## 🔐 Google OAuth - Configuración Adicional

Si usas Google OAuth, también necesitas actualizar las URLs autorizadas en Google Cloud Console:

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Selecciona tu proyecto
3. APIs & Services → Credentials
4. Edita tu OAuth 2.0 Client ID
5. Agrega en **Authorized redirect URIs**:
   ```
   https://TU-URL.vercel.app/api/auth/callback/google
   ```

---

## 🚀 Después de Configurar

1. **Commit y push** los cambios del código:
   ```bash
   git add .
   git commit -m "Fix: MongoDB connection singleton pattern"
   git push
   ```

2. **Vercel auto-deployará** con las nuevas variables de entorno

3. **Verifica** que funcione visitando tu URL de producción

---

## ✅ Checklist Final

- [ ] Variables de entorno actualizadas en Vercel (sin localhost)
- [ ] `NEXTAUTH_URL` apunta a tu URL de Vercel
- [ ] Código commiteado y pusheado
- [ ] Google OAuth URLs actualizadas (si usas Google login)
- [ ] MongoDB Atlas permite IPs de Vercel (0.0.0.0/0)
- [ ] Re-deploy realizado en Vercel

---

## 🎯 Resumen de Cambios

### Código:
✅ **Arreglado**: Sistema de conexión MongoDB con singleton pattern
✅ **Removido**: `bufferCommands: false` que causaba el error

### Variables de Entorno:
❌ **Problema**: URLs con `localhost` en producción
✅ **Solución**: Usar tu URL de Vercel en todas las variables

---

## 📞 Si Sigues con Problemas

Comparte:
1. Tu URL de Vercel (la que ves en el dashboard)
2. Los nuevos logs después del re-deploy
3. Confirma que actualizaste las variables de entorno
