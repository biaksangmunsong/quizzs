import { initializeApp } from "firebase/app"
// import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyDPsAoGL7jaArH_gbYTLSHlUWiC7vuQwVY",
	authDomain: "quizzs.firebaseapp.com",
	projectId: "quizzs",
	storageBucket: "quizzs.appspot.com",
	messagingSenderId: "659467004964",
	appId: "1:659467004964:web:2c75bf4f6194f4c2a0bcb1"
}

initializeApp(firebaseConfig)

// const auth = getAuth()
const db = getFirestore()

export {
	// auth,
	db
}