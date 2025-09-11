# 📌 Parroquia Frontend

Este es el frontend de la **Aplicación de Gestión Parroquial**, desarrollado en **React + Vite**.  
El sistema permite gestionar **feligreses, comunidades, eventos, ministerios, turnos litúrgicos, peticiones** y mucho más.  
La aplicación está pensada para ser escalable, modular y fácil de mantener.

---

## 🚀 Tecnologías utilizadas

- ⚛️ **React.js** (Vite) → Librería principal para la interfaz.
- 🛠️ **Redux Toolkit** → Manejo del estado global.
- 🔄 **React Router v6** → Navegación de rutas.
- 🎨 **TailwindCSS / CSS Modules** → Estilos rápidos y personalizables.
- 🌐 **Axios / Fetch API** → Consumo de la API backend.
- ✅ **ESLint + Prettier** → Estándares de código.

---

## 📂 Estructura del proyecto

```bash
src/
│── api/              # Configuración de Axios, servicios HTTP
│── app/              # Store de Redux Toolkit
│── assets/           # Imágenes, fuentes, estilos globales
│── components/       # Componentes reutilizables (botones, inputs, modales, etc.)
│── features/         # Slices de Redux organizados por dominio (usuarios, eventos, etc.)
│── hooks/            # Custom hooks
│── layouts/          # Layouts generales (ej: DashboardLayout, AuthLayout)
│── pages/            # Páginas principales (Login, Home, Feligreses, Eventos, etc.)
│── router/           # Configuración de rutas con React Router
│── styles/           # Estilos globales (Tailwind config o CSS base)
│── utils/            # Helpers, validaciones, formateadores
│── main.jsx          # Punto de entrada
```

## 📦 Instalación y ejecución

Sigue estos pasos para correr el proyecto en tu máquina local:

---

1. Clonar repositorio

```bash
git clone https://github.com/tu-usuario/parroquia-frontend.git
cd parroquia-frontend
```

2. configurar valiables de entorno

```bash
  VITE_API_URL=http://localhost:3000/api
```

3. Ejecutar el servidor de desarrollo

```bash
  npm run dev
```
