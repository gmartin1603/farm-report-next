import Link from 'next/link';
import React from 'react';
import { auth } from '../../firebase/firebaseApp';
import { useAppState } from "@/context/AppProvider";

function Header({ user }) {
  const [{ profile }, dispatch] = useAppState();
  const signOut = () => {
    auth.signOut();
  };

  const styles = {
    main: `h-[70px] w-full bg-blue-800 flex items-end justify-between pb-[5px] pr-10 text-white font-semibold`,
    logo: `w-[20%] bg-blue-600 pl-10 pt-1 flex flex-col items-start justify-start rounded-tr-lg rounded-bl-lg`,
    h1: `text-xl font-semibold `,
    p: `text-sm font-light italic`,
    nav: `w-full flex`,
    link: `text-xl px-[1%] font-bold hover:text-blue-500 border-2 border-transparent hover:border-blue-500 hover:bg-black`,
    button: `text-lg font-semibold bg-red-700 px-[10px] rounded hover:text-white border-2 border-transparent hover:border-red-500`,
  };

  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <h1 className={styles.h1}>Farm Report</h1>
        <p className={styles.p}>Agricultural expense reports made simple</p>
      </div>
      <h1 className={styles.h1}>Welcome {profile.dName}!</h1>
      {/* <nav className={styles.nav}>
            <Link className={styles.link} href="/">Create New Report</Link>
            <Link className={styles.link} href="/View">View and Edit Reports</Link>
            <Link className={styles.link} href="Add">Add New Option</Link>
        </nav> */}
      {user && (
        <button className={styles.button} onClick={() => signOut()}>
          Log Out
        </button>
      )}
    </div>
  );
}

export default Header;