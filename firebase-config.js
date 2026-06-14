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
  apiKey:            "TU_API_KEY",
  authDomain:        "TU_PROJECT_ID.firebaseapp.com",
  projectId:         "TU_PROJECT_ID",
  storageBucket:     "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId:             "TU_APP_ID"
};
