# Sistema de Cotizaciones y Notas de Venta

Aplicación web para generar cotizaciones y notas de venta con soporte para clientes, vendedores y productos.

## Estructura de archivos

```
prueva/
├── functions/           # Cloud Functions (Node.js)
│   └── index.js
├── public/              # Frontend (HTML, CSS, JS)
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── firebase.json        # Configuración de Firebase Hosting y Functions
├── firestore.rules      # Reglas de Firestore
├── storage.rules        # Reglas de Storage
└── package.json         # Dependencias y scripts
```

## Despliegue en Firebase

1. Instalar las herramientas de Firebase e iniciar sesión:

   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. Configurar el proyecto (una sola vez):

   ```bash
   firebase init
   # Seleccionar Hosting y Functions, usar la carpeta `public` y `functions`
   ```

3. Ejecutar en local con emuladores:

   ```bash
   npm start
   ```

4. Desplegar a Firebase:

   ```bash
   firebase deploy
   ```

## Uso

- Cargar datos de la empresa en Firestore (`config/company`).
- Agregar clientes, vendedores y productos.
- Generar PDF de la cotización con el botón "Generar PDF".

Reemplace los valores de `firebaseConfig` en `public/app.js` con los de su proyecto.
