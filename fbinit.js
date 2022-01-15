// import firebase from "firebase/app"
// import "firebase/firestore"
// import "firebase/auth"

// const firebaseConfig = {
// 	apiKey: "AIzaSyDPsAoGL7jaArH_gbYTLSHlUWiC7vuQwVY",
//     authDomain: "quizzs.firebaseapp.com",
//     projectId: "quizzs",
//     storageBucket: "quizzs.appspot.com",
//     messagingSenderId: "659467004964",
//     appId: "1:659467004964:web:2c75bf4f6194f4c2a0bcb1"
// }

// const initFb = () => {
// 	if (!firebase.apps.length){
// 		firebase.initializeApp(firebaseConfig)
// 	}
// }

// initFb()

// export default firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPsAoGL7jaArH_gbYTLSHlUWiC7vuQwVY",
  authDomain: "quizzs.firebaseapp.com",
  projectId: "quizzs",
  storageBucket: "quizzs.appspot.com",
  messagingSenderId: "659467004964",
  appId: "1:659467004964:web:2c75bf4f6194f4c2a0bcb1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()
const db = getFirestore()

export { auth, db }