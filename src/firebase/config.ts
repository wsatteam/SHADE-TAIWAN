// src/firebase/config.ts
// 設定 Firebase 初始化（使用 modular SDK）

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_NATIVE_FIREBASE_API_KEY || '',
  authDomain: process.env.REACT_NATIVE_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.REACT_NATIVE_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.REACT_NATIVE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.REACT_NATIVE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.REACT_NATIVE_FIREBASE_APP_ID || '',
};

export function initFirebase() {
  if (!firebaseConfig.apiKey) {
    console.warn('Firebase config missing — set env variables or use a local .env');
  }
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);
  return { app, db, storage };
}
