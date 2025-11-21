import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

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
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
const functions = getFunctions(app);

// Connect to emulators in development
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

export { app, functions };