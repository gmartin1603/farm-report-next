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
        const profile = await getDoc(doc(db, userObj.uid, "profile"));
        if (profile.exists()) {
          console.log(profile.data());
          dispatch({
            type: "SET",
            name: "profile",
            load: { ...profile.data(), uid: userObj.uid },
          });
        }
      } else {
        dispatch({ type: "SET", name: "profile", load: { dName: "User" } });
        dispatch({ type: "SET", name: "user", load: null });
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
