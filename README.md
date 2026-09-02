# Dashboard — Presidencia Municipal de Acámbaro

Panel administrativo de gestión municipal (solicitudes, usuarios y documentos PDF).

Este repositorio es una **demo pública**: cualquier visitante puede iniciar sesión y explorar **todas las secciones en modo lectura**. Las escrituras están protegidas en el servidor para que la demo no pueda ser modificada.

🔐 **Acceso demo:** `invitado@gmail.com` / `invitado#1234` (rol *Visualización*).

## Stack

| Capa            | Tecnología                                                   |
| --------------- | ------------------------------------------------------------ |
| Framework       | Next.js 15 (App Router) + React 19 + TypeScript              |
| Estilos         | Tailwind CSS + componentes estilo shadcn/ui (Radix)          |
| Autenticación   | NextAuth 4 (credentials, sesión JWT)                         |
| Base de datos   | PostgreSQL (Neon) + Prisma 6                                 |
| PDF             | html2pdf.js                                                  |
| Package manager | pnpm 11 — pins exactos y gate de antigüedad en `pnpm-workspace.yaml` |

## Funcionalidades

- **Login por credenciales** con tres roles: `Admin`, `Edicion` y `Visualizacion`.
- **Dashboard** (`/dashboard`): tabla de solicitudes con alta, edición y baja.
- **Documento PDF** (`/documento-pdf`): generación y edición de documentos.
- **Usuarios** (`/usuarios`): listado y edición de usuarios (permisos y contraseña).
- Rutas existentes adicionales: `/solicitudes` y `/estadisticas` (sin sección en el menú por defecto).

## Acceso por rol

| Rol             | Ver todas las secciones | Escritura                                                      |
| --------------- | ----------------------- | -------------------------------------------------------------- |
| `Admin`         | ✅                      | ✅                                                             |
| `Edicion`       | ✅                      | ✅                                                             |
| `Visualizacion` | ✅                      | ❌ (*"No tienes permisos para realizar esta acción"*)          |

La protección de escritura vive en el **servidor**: las server actions y `POST /api/auth/register` validan la sesión y el rol antes de mutar la base de datos. Ocultar botones en el frontend es solo UX, no seguridad.

**Permiso extra de `Admin`:** registrar usuarios y administrarlos — alta, edición de permisos, cambio de contraseña y baja — desde la sección `/usuarios`.

## Puesta en marcha

Requisitos: Node.js 20+ y pnpm 11 (el `packageManager` está fijado en el repo).

```bash
# 1. Instalar dependencias
pnpm install

# 2. Variables de entorno (.env)
#    DATABASE_URL=postgresql://...   # obligatoria
#    NEXTAUTH_SECRET=...             # recomendada
#    NEXT_PUBLIC_BASE_URL=...        # opcional: URLs absolutas de la API de PDF

# 3. Aplicar migraciones
pnpm exec prisma migrate deploy

# 4. Entorno de desarrollo
pnpm dev
```

> ⚠️ `prisma migrate deploy` también corre automáticamente dentro de `pnpm build`. No ejecutes el build de producción si la base de datos no está lista.

## Despliegue (Vercel)

| Paso    | Comando                                       |
| ------- | --------------------------------------------- |
| Install | `pnpm install` (default de Vercel)            |
| Build   | `pnpm build` → `prisma migrate deploy && next build` |

Variables de entorno requeridas en Vercel: `DATABASE_URL`, `NEXTAUTH_SECRET` y, opcionalmente, `NEXT_PUBLIC_BASE_URL`.

## Scripts

| Comando                 | Acción                                  |
| ----------------------- | --------------------------------------- |
| `pnpm dev`              | Servidor de desarrollo                  |
| `pnpm build`            | Migraciones + build de producción       |
| `pnpm start`            | Servidor de producción                  |
| `pnpm lint`             | ESLint                                  |
| `pnpm exec tsc --noEmit` | Type check                              |