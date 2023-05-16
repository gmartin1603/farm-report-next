import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "./firebaseApp";
import { useAppState } from "@/context/AppProvider";
import { doc, getDoc } from "firebase/firestore";

const useAuthHook = () => {
  const [user, setUser] = useState("");
  const [{}, dispatch] = useAppState();

  const updateAuth = async () => {
    onAuthStateChanged(auth, async (userObj) => {
      // console.log("AuthStateChanged Ran")
      if (userObj) {
        console.log(`${userObj.email} signed in`);
        setUser(userObj.uid);
        await getDoc(doc(db, userObj.uid, "profile")).then((doc) => {
          let profile = structuredClone(doc.data());
          profile["uid"] = userObj.uid;
          dispatch({ type: "SET-OBJ", name: "profile", load: profile });
        });
      } else {
        setUser(false);
        dispatch({ type: "SET-OBJ", name: "profile", load: { dName: "User" } });
        console.log(`No one is signed in`);
      }
    });
  };
  useEffect(() => {
    window.addEventListener("authState", updateAuth);
    updateAuth();
    return () => {
      window.removeEventListener("authState", updateAuth);
    };
  }, []);

  return user;
};

export default useAuthHook;
