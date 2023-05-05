import { initializeApp } from "firebase/app"
import { connectAuthEmulator, getAuth } from "firebase/auth"
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore"

const firebaseConfig = require("../private/firebaseConfig.json")

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
connectFirestoreEmulator(db, 'localhost', 5050)

export const auth = getAuth(app)
connectAuthEmulator(auth, "http://localhost:9099");