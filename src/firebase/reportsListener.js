import { useEffect, useState } from "react";
import { db } from "./firebaseApp";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useAppState } from "@/context/AppProvider";

const useReportsListener = () => {
  const [reports, setReports] = useState(null);

  const [{ profile }, dispatch] = useAppState();

  useEffect(() => {
    // console.log("Reports Listener Ran");
    const q = query(
      collection(db, profile.uid, "profile", "reports"),
      orderBy("year", "desc")
    );
    const unsubscribe = onSnapshot(q, (qSnap) => {
      let arr = [];
      if (qSnap.size > 0) {
        qSnap.forEach((doc) => {
          arr.push(doc.data());
        });
      }
      setReports(arr);
      dispatch({ type: "SET", name: "reports", load: arr });
    });
    if (profile.uid) {
      return () => unsubscribe();
    } else {
      return () => {};
    }
  }, [profile]);

  return reports;
};

export default useReportsListener;
