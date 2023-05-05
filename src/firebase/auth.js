import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "./firebaseApp";
import { doc, setDoc } from "firebase/firestore";

const makeProfile = async (uid, profile) => {
    await setDoc(doc(db, uid, "profile"), profile)
    .then(() => console.log("Document successfully written!"))
    .catch((err) => console.log(err));
}

export const signin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((user) => console.log(user))
    .catch((err) => console.log(err));
};

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user, token)
      makeProfile(user.uid, {dName: user.displayName, names: [], commodities: [], start: 2000})
    })
    .catch((err) => console.log(err));
};

export const createUser = async (email, password, profile) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user.uid);
      await setDoc(doc(db, user.uid, "profile"), profile)
        .then(() => console.log("Document successfully written!"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
