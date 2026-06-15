// ══════════════════════════════════════════════════════════════
//  CONFIGURACIÓN DE FIREBASE PARA CIAM
// ══════════════════════════════════════════════════════════════
//
//  REGLAS DE FIRESTORE (Firestore → Reglas → Publicar):
//
//  rules_version = '2';
//  service cloud.firestore {
//    match /databases/{database}/documents {
//      // Productos: lectura pública, escritura solo autenticado
//      match /products/{doc} {
//        allow read: if true;
//        allow write: if request.auth != null;
//      }
//      // Config (PDFs, admin): lectura pública, escritura solo autenticado
//      match /config/{doc} {
//        allow read: if true;
//        allow write: if request.auth != null;
//      }
//    }
//  }
//
//  NOTA: Activa también "Email/Contraseña" en Firebase Console:
//        Authentication → Sign-in method → Email/contraseña → Habilitar
// ══════════════════════════════════════════════════════════════

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyBZpOBBZq2VOTg4rQHNedK3UIHSHG3KaF4",
  authDomain:        "ciam-siteweb.firebaseapp.com",
  projectId:         "ciam-siteweb",
  storageBucket:     "ciam-siteweb.firebasestorage.app",
  messagingSenderId: "992483033692",
  appId:             "1:992483033692:web:1c65fa44fa2dd4b7a75c99"
};
