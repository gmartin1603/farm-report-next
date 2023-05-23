import React from "react";
import { auth } from "../../firebase/firebaseApp";
import { useAppState } from "@/context/AppProvider";
import { useRouter } from "next/router";

function Header({}) {
  const [{ profile, reports }, dispatch] = useAppState();

  const url = "http://localhost:5001/farm-report-86ac2/us-central1/writeData";

  const router = useRouter();

  const auxCall = () => {
    let names = [];
    reports.map((report) => {
      if (!names.includes(report.name)) {
        names.push(report.name);
      }
    });

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        coll: profile.uid,
        data: names,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.parse(data).message);
      })
      .catch((err) => console.log(err));
  };

  const signOut = () => {
    auth.signOut();
  };

  const styles = {
    main: `sticky top-0 h-[70px] w-full bg-blue-800 flex items-end justify-between pb-[5px] pr-10 text-white font-semibold print:hidden`,
    logo: `cursor-pointer w-[20%] min-w-fit bg-blue-600 ml-4 px-5 pt-1 flex flex-col items-start justify-start rounded-tr-lg rounded-bl-lg`,
    h1: `text-xl font-semibold `,
    p: `text-sm font-light italic`,
    nav: `w-full flex`,
    link: `text-xl px-[1%] font-bold hover:text-blue-500 border-2 border-transparent hover:border-blue-500 hover:bg-black`,
    button: `text-lg font-semibold bg-red-700 px-[10px] rounded hover:text-white border-2 border-transparent hover:border-red-500`,
  };

  return (
    <div className={styles.main}>
      <div
        onClick={() => {
          router.push("/");
        }}
        className={styles.logo}
      >
        <h1 className={styles.h1}>Farm Report</h1>
        <p className={styles.p}>Agricultural expense reports made simple</p>
      </div>
      {profile.uid && (
        <>
          <button className={styles.logo} onClick={() => auxCall()}>
            Aux
          </button>
          <h1 className={styles.h1}>Welcome {profile.dName}!</h1>
          <button className={styles.button} onClick={() => signOut()}>
            Log Out
          </button>
        </>
      )}
    </div>
  );
}

export default Header;
