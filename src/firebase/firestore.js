import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  orderBy,
  query,
  where,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { db } from "./firebaseApp";

export const getData = (coll, func) => {
  let arr = [];
  collection(coll)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(doc.data())
        arr.push(doc.data());
        return func({
          type: "ADD-ARR",
          name: coll,
          load: arr,
        });
      });
    });
};

export const buildDoc = (coll, doc, label, options) => {
  collection(coll).doc(doc).set(
    {
      id: doc,
      label: label,
      options: options,
    },
    { merge: true }
  );
};

export const writeData = (coll, doc, key, load) => {
  collection(coll)
    .doc(doc)
    .set(
      {
        [key]: load,
      },
      { merge: true }
    );
};

export const writeReport = (report) => {
  collection("reports")
    .doc(`${report.landLord} ${report.crop} ${report.year}`)
    .set(report)
    .then(() => {
      alert("Report saved to database");
    });
};

export const getReports = async (dispatch) => {
  let arr = [];
  await getDocs(collection(db, "reports")).then((snapshot) => {
    snapshot.forEach((doc) => {
      fs.writeFile(
        `C:\/Users\/georg\/Documents\/data\/${"Reports"}/${doc.id}.json`,
        JSON.stringify(data),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
      arr.push(doc.data());
      return dispatch({
        type: "ADD-ARR",
        name: "reports",
        load: arr,
      });
    });
  });
};
