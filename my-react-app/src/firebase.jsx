import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAhBb7m-cb14g0lfAb6-TrqyxNKC4LzYZA",
  authDomain: "bloomlet-25a47.firebaseapp.com",
  projectId: "bloomlet-25a47",
  storageBucket: "bloomlet-25a47.appspot.com",
  messagingSenderId: "760824569787",
  appId: "1:760824569787:web:3972613eb7480238da2e9e",
  measurementId: "G-GPL5SZTRZ6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
