// ══════════════════════════════════════════════════════════════
//  CONFIGURACIÓN DE FIREBASE PARA CIAM
//  1. Ve a https://console.firebase.google.com/
//  2. Crea un proyecto (o abre uno existente)
//  3. En "Descripción general del proyecto" → haz clic en el ícono </> (Web)
//  4. Registra la app y copia los valores de firebaseConfig aquí abajo
//  5. En el menú lateral → Build → Firestore Database → Crear base de datos
//     (elige modo "Producción" y la región más cercana, ej: us-east1)
//  6. En Firestore → Reglas, pega estas reglas y publica:
//
//     rules_version = '2';
//     service cloud.firestore {
//       match /databases/{database}/documents {
//         match /products/{doc} {
//           allow read: if true;
//           allow write: if true;
//         }
//       }
//     }
//
//  NOTA: Las reglas de arriba permiten escritura pública (OK para comenzar).
//        Más adelante puedes agregar autenticación al panel admin.
// ══════════════════════════════════════════════════════════════

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyBZpOBBZq2VOTg4rQHNedK3UIHSHG3KaF4",
  authDomain:        "ciam-siteweb.firebaseapp.com",
  projectId:         "ciam-siteweb",
  storageBucket:     "ciam-siteweb.firebasestorage.app",
  messagingSenderId: "992483033692",
  appId:             "1:992483033692:web:1c65fa44fa2dd4b7a75c99"
};
