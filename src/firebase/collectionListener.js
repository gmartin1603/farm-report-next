import { useEffect } from "react";
import { db } from "./firebaseApp";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useAppState } from "@/context/AppProvider";

const useCollectionListener = (coll) => {
  const [{ user }, dispatch] = useAppState();

  useEffect(() => {
    if (user) {
      console.log("Collection Listener Ran", coll);
      const q = query(collection(db, user, "profile", coll));
      const unsubscribe = onSnapshot(q, (qSnap) => {
        let arr = [];
        if (1 > 0) {
          qSnap.forEach((doc) => {
            arr.push(doc.data());
          });
        } else {
          console.log("No data in collection");
          return;
        }
        dispatch({ type: "SET", name: coll, load: arr });
      });
      return () => unsubscribe();
    } else {
      console.log("No one signed in");
      return () => {};
    }
  }, [user]);
};

export default useCollectionListener;
