import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB8SzZ6GOxlYMNr_T9GHUKhO2lyjD8M2j0',
  authDomain: 'react-b5cf5.firebaseapp.com',
  projectId: 'react-b5cf5',
  storageBucket: 'react-b5cf5.appspot.com',
  messagingSenderId: '900710457605',
  appId: '1:900710457605:web:8e09473fe7403a8ff3576c',
};

const firebaseApp = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(firebaseApp);
