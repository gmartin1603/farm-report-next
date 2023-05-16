import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = require("../private/firebaseConfig.json");

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

if (process.env.NODE_ENV === "development") {
  console.log("development");
  connectFirestoreEmulator(db, "localhost", 5050);
  connectAuthEmulator(auth, "http://localhost:9099");
}
