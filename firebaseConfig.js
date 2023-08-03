// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDuCxuStjfVh74DZO5_xXoDOrxj_cQAb9M",
  authDomain: "reactnative-b4fd3.firebaseapp.com",
  projectId: "reactnative-b4fd3",
  storageBucket: "reactnative-b4fd3.appspot.com",
  messagingSenderId: "822591805800",
  appId: "1:822591805800:web:d7366aca550560afbb1edd"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);