import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = require("../private/firebaseConfig.json");
const firebaseConfig2 = require("../private/firebaseStagingConfig.json");

// PRODUCTION
// const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig2, 'secondary');
const db = getFirestore(app);
const auth = getAuth(app);
// STAGING
// const db = getFirestore(secondary);
// const auth = getAuth(secondary);

if (process.env.REACT_APP_USE_EMULATOR === "true") {
  console.log("development");
  connectFirestoreEmulator(db, "localhost", 5050);
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { db, auth, app };
