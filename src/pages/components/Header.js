import Link from 'next/link';
import React from 'react';
import { auth } from '../../firebase/firebaseApp';

function Header({user}) {
    const signOut = () => {
        auth.signOut()
    }

    const styles = {
        main:`h-[50px] w-[80%] bg-blue-800 flex items-around justify-center`,
        nav:`w-full flex`,
        link: `text-xl px-[1%] font-bold hover:text-blue-500 border-2 border-transparent hover:border-blue-500 hover:bg-black`,
        button: `text-xl font-bold bg-red-700 px-1 rounded hover:text-white border-2 border-transparent hover:border-red-500`
    }

    return (
        <div className={styles.main}>
            <h1>Farm Report 5.0</h1>
            {user &&
                <>
                <nav className={styles.nav}>
                    <Link className={styles.link} href="/">Create New Report</Link>
                    <Link className={styles.link} href="/View">View and Edit Reports</Link>
                    <Link className={styles.link} href="Add">Add New Option</Link>
                </nav>
                <button className={styles.button} onClick={() => signOut()}>Logout</button>
                </>
            }
        </div>
    );
}

export default Header;