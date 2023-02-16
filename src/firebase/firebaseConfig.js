import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1LVOydMiQzz8XvNrP7OaLyDRu5qoD6f8",
  authDomain: "react-app-curso-ca5bd.firebaseapp.com",
  projectId: "react-app-curso-ca5bd",
  storageBucket: "react-app-curso-ca5bd.appspot.com",
  messagingSenderId: "1005539846136",
  appId: "1:1005539846136:web:8737b0cddbc900c1e9180d",
}
 
 // Initialize Firebase
const firebase = initializeApp( firebaseConfig )
// const provider = new firebase.auth.GoogleAuthProvider()
const db = getFirestore( firebase )
const auth = getAuth( firebase )
const googleProvider = new GoogleAuthProvider()

// previene el autologin - se elije siempre cuenta 
googleProvider.setCustomParameters({
  prompt: 'select_account'
})

export{
  auth,
  db,
  googleProvider, 
}