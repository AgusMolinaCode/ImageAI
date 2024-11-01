# 🖼️ imageAI - Customización de Imágenes con Inteligencia Artificial

**imageAI** es una aplicación web para personalizar imágenes usando IA, ideal para ecommerce y cualquier persona que necesite editar, almacenar o gestionar imágenes de manera rápida y sencilla. 🛍️ La plataforma permite a los usuarios modificar, guardar y eliminar imágenes, con una sección especial para personalización de imágenes de productos.

---

## 🚀 Tecnologías Utilizadas

Aquí un vistazo a las tecnologías que impulsan **imageAI**:

- **⚛️ Next.js**: Framework de React para el desarrollo del frontend y servidor.
- **🍃 MongoDB**: Base de datos NoSQL para almacenar datos de usuarios y registros de imágenes.
- **💅 ShadCN**: Componentes estilizados que crean una interfaz intuitiva y atractiva.
- **☁️ Cloudinary**: API de procesamiento de imágenes en la nube, para optimización, transformación y almacenamiento.
- **🔐 Clerk**: Autenticación segura para la gestión de registros, logins y datos de usuarios.
- **🤖 IA para Imágenes**: Potente personalización de imágenes para un toque único y profesional.
- **💳 Stripe**: Sistema de pagos para la compra de créditos adicionales.

---

## 🌟 Funcionalidades Principales

- **✨ Personalización Avanzada de Imágenes**: Ideal para ecommerce, los usuarios pueden customizar imágenes para resaltar productos y mejorar la visualización.
- **💾 Gestión de Imágenes**: Almacena, edita y elimina imágenes fácilmente.
- **🔒 Autenticación Segura**: Clerk se encarga de una autenticación sólida y segura, permitiendo una experiencia personalizada y protegida.
- **💰 Compra de Créditos**: Los usuarios pueden adquirir créditos para realizar más personalizaciones, además de los tokens gratuitos que reciben al registrarse.

---

## 🛠️ Instalación

Sigue estos pasos para instalar y ejecutar **imageAI** en tu entorno local:

1. **Clona el repositorio** 🌀:

   ```bash
   git clone https://github.com/tu_usuario/imageAI.git
   cd imageAI
   
2. **Instala las dependencias** 📦:
   ```bash
   npm install

3. **Configura las variables de entorno** 🔧:

    Crea un archivo .env en la raíz del proyecto y agrega las variables necesarias para:

    - MongoDB 📂: conexión a la base de datos.
    - Cloudinary ☁️: integración de la API para gestionar imágenes.
    - Clerk 🔐: autenticación de usuarios.
    - Stripe 💳: configuración para la compra de créditos.

      ```bash
      # .env.example
    
      # URL del servidor
      NEXT_PUBLIC_SERVER_URL=https://image-ai-xi.vercel.app/
      
      # Claves de Stripe
      STRIPE_WEBHOOK_SECRET=whsec_XXXXXX
      STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXX
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXX
      
      # Configuración de Cloudinary
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
      CLOUDINARY_API_SECRET=your_api_secret
      CLOUDINARY_API_KEY=your_api_key
      
      # URL de conexión a MongoDB
      MONGODB_URL=mongodb+srv://username:password@cluster0.mongodb.net/?retryWrites=true&w=majority
      
      # Webhook secreto
      WEBHOOK_SECRET=whsec_XXXXXX
      
      # Configuración de Clerk
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXX
      CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXX
      NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
      NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
      NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
      NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

      ```
4. **Ejecuta el proyecto** ▶️:
   ```bash
   npm run dev

5. **¡Abre el proyecto en tu navegador!** 🌐:
     - Visita http://localhost:3000 para ver imageAI en acción. 🎉

  
  

      
  
