import React from "react";
import { auth } from "../../firebase/firebaseApp";
import { useAppState } from "@/context/AppProvider";
import { useRouter } from "next/router";

function Header({}) {
  const [{ profile }, dispatch] = useAppState();

  const router = useRouter();

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
      {/* <nav className={styles.nav}>
            <Link className={styles.link} href="/">Create New Report</Link>
            <Link className={styles.link} href="/View">View and Edit Reports</Link>
            <Link className={styles.link} href="Add">Add New Option</Link>
          </nav> */}
      {profile.uid && (
        <>
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
