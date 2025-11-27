import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA-f25L-D_U3uG6Io5OWU23sYtVJN0iV6A',
  authDomain: 'georgewoodcasket-2fa70.firebaseapp.com',
  projectId: 'georgewoodcasket-2fa70',
  storageBucket: 'georgewoodcasket-2fa70.appspot.com',
  messagingSenderId: '178994925214',
  appId: '1:178994925214:web:9dd4ef7a3c4c23e5c9358f',
  measurementId: 'G-PFZ72YFDMX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const functions = getFunctions(app);


export { app, functions };