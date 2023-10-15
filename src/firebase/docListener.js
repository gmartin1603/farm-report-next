import { useEffect } from "react";
import { db } from "./firebaseApp";
import { doc, onSnapshot, query } from "firebase/firestore";
import { useAppState } from "@/context/AppProvider";

const useDocListener = (name) => {
  const [{ user }, dispatch] = useAppState();

  useEffect(() => {
    if (user) {
      console.log("Doc Listener Ran", name);
      // const q = doc(db, user, doc);
      const unsubscribe = onSnapshot(doc(db, user, name), (docSnap) => {
        let arr = docSnap.data().values;
        dispatch({ type: "SET", name: name, load: arr });
      });
      return () => unsubscribe();
    } else {
      console.log("No one signed in");
      return () => {};
    }
  }, [user]);
};

export default useDocListener;