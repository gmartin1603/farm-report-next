import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth, db } from "./firebaseApp";
import { useAppState } from "@/context/AppProvider";
import { doc, getDoc } from "firebase/firestore";

const useAuthHook = () => {
  const [{}, dispatch] = useAppState();

  const updateAuth = async () => {
    onAuthStateChanged(auth, async (userObj) => {
      // console.log("AuthStateChanged Ran")
      if (userObj) {
        console.log(`${userObj.email} signed in`);
        dispatch({ type: "SET", name: "user", load: userObj.uid });
        await getDoc(doc(db, userObj.uid, "profile")).then((doc) => {
          let profile = structuredClone(doc.data());
          profile["uid"] = userObj.uid;
          dispatch({ type: "SET", name: "profile", load: profile });
        });
      } else {
        dispatch({ type: "SET", name: "profile", load: { dName: "User" } });
        console.log(`No one is signed in`);
      }
    });
  };
  useEffect(() => {
    window.addEventListener("subscribe", updateAuth);
    updateAuth();
    return () => {
      window.removeEventListener("subscribe", updateAuth);
    };
  }, []);

  return;
};

export default useAuthHook;
