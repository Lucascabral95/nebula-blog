# 🚀 Guía de Deployment en Vercel

## ✅ Cambios Realizados

### 1. **MongoDB Connection Fix**
- ✅ Corregido el bug en `src/services/mongoDB.jsx`
- ✅ Ahora usa `mongoose.connection` en lugar de `mongoose.connections[0]`
- ✅ Agregada validación de `MONGODB_URI`

### 2. **Middleware Fix**
- ✅ Renombrado `src/middleware.jsx` → `src/middleware.js`
- Next.js requiere que el middleware sea `.js` o `.ts`, no `.jsx`

### 3. **Vercel Configuration**
- ✅ Simplificado `vercel.json`

---

## 🔧 Configuración de Variables de Entorno en Vercel

### Paso 1: Ir a tu proyecto en Vercel
1. Ve a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**

### Paso 2: Agregar las siguientes variables

#### **MONGODB_URI** (REQUERIDO)
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```
- Copia tu URI de MongoDB Atlas
- **IMPORTANTE**: Asegúrate de que tu IP de Vercel esté en la whitelist de MongoDB Atlas
  - En MongoDB Atlas: Network Access → Add IP Address → **Allow Access from Anywhere** (0.0.0.0/0)

#### **NEXTAUTH_URL** (REQUERIDO)
```
https://tu-dominio.vercel.app
```
- Reemplaza con tu URL de producción de Vercel
- **NO uses** `http://localhost:3000`

#### **NEXTAUTH_SECRET** (REQUERIDO)
```
tu-secret-key-super-segura-aqui
```
- Genera un secret seguro con:
  ```bash
  openssl rand -base64 32
  ```
- O usa: https://generate-secret.vercel.app/32

#### **GOOGLE_CLIENT_ID** (Opcional - si usas Google OAuth)
```
tu-google-client-id.apps.googleusercontent.com
```

#### **GOOGLE_CLIENT_SECRET** (Opcional - si usas Google OAuth)
```
tu-google-client-secret
```

### Paso 3: Configurar para todos los entornos
- Marca las variables para: **Production**, **Preview**, y **Development**

---

## 🔍 Problemas Comunes y Soluciones

### ❌ Error: "Cannot read property 'readyState' of undefined"
**Solución**: ✅ Ya corregido en `mongoDB.jsx`

### ❌ Error: "NEXTAUTH_URL is not defined"
**Solución**: Agrega `NEXTAUTH_URL` en Vercel con tu URL de producción

### ❌ Error: "MongoServerError: bad auth"
**Solución**: 
1. Verifica que `MONGODB_URI` sea correcta
2. Verifica que el usuario/contraseña de MongoDB sean correctos
3. Asegúrate de que la IP de Vercel esté en la whitelist de MongoDB

### ❌ Error: "MongooseServerSelectionError"
**Solución**:
1. En MongoDB Atlas → Network Access
2. Add IP Address → **0.0.0.0/0** (Allow from anywhere)
3. Espera 2-3 minutos para que se aplique

### ❌ Error 500 en producción pero funciona en local
**Solución**:
1. Revisa los logs en Vercel: Project → Deployments → [tu deployment] → View Function Logs
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que `NEXTAUTH_URL` sea la URL de producción, no localhost

---

## 📝 Checklist antes de Deploy

- [ ] Variables de entorno configuradas en Vercel
- [ ] `NEXTAUTH_URL` apunta a tu dominio de producción
- [ ] IP de Vercel en whitelist de MongoDB (0.0.0.0/0)
- [ ] `NEXTAUTH_SECRET` generado y configurado
- [ ] Código commiteado y pusheado a GitHub
- [ ] Vercel auto-deployará desde GitHub

---

## 🚀 Deploy

### Opción 1: Auto-deploy desde GitHub (Recomendado)
1. Push tus cambios a GitHub:
   ```bash
   git add .
   git commit -m "Fix: Vercel deployment issues"
   git push
   ```
2. Vercel detectará el push y deployará automáticamente

### Opción 2: Deploy manual
```bash
npm install -g vercel
vercel --prod
```

---

## 🔎 Ver Logs en Vercel

1. Ve a tu proyecto en Vercel
2. **Deployments** → Selecciona el deployment más reciente
3. **View Function Logs** → Aquí verás los errores en tiempo real

---

## 📞 Si sigues teniendo problemas

1. **Revisa los logs** en Vercel (paso anterior)
2. **Comparte el error específico** que ves en los logs
3. **Verifica** que todas las variables de entorno estén configuradas correctamente

---

## ✨ Después del Deploy Exitoso

Tu app debería estar funcionando en:
```
https://tu-proyecto.vercel.app
```

**Nota**: El primer request puede tardar unos segundos (cold start), pero después será rápido.
