// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {collection,getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-Bof96MQzBCDSqbx_fuFN6PDo5MfCTAs",
  authDomain: "zoom-clone-8696a.firebaseapp.com",
  projectId: "zoom-clone-8696a",
  storageBucket: "zoom-clone-8696a.appspot.com",
  messagingSenderId: "853140778223",
  appId: "1:853140778223:web:06d2834e858f4588f8ff1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app)
export const firebaseDB=getFirestore(app)
export const useRef =collection(firebaseDB,"users")
export const meetingsRef=collection(firebaseDB,'meetings')