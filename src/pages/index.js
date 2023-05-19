import { Inter } from "next/font/google";
import Login from "./components/Login";
import { useEffect } from "react";
import { useAppState } from "@/context/AppProvider";
import ReportSelect from "./components/ReportSelect";
import Loading from "./components/Loading";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [{ user, reports, profile, expenses }, dispatch] = useAppState();

  const getYears = () => {
    let years = new Array(6);
    let year = new Date().getFullYear();
    year -= 2;
    for (let i = 0; i < years.length; i++) {
      years[i] = year + i;
    }
    // console.log(years)
    dispatch({ type: "SET", name: "years", load: years });
  };

  // useEffect(() => {
  //   console.log(user, reports, profile, expenses);
  // }, [user, reports, profile, expenses]);

  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

  useEffect(() => {
    if (user) {
      getYears();
    }
  }, [user]);

  const styles = {
    main: `min-h-screen w-screen flex flex-col items-center justify-start`,
    button: `h-fit bg-green-500 hover:bg-green-700 text-white font-bold mt-2 py-2 px-4 rounded`,
  };
  return (
    <div className={styles.main}>
      {user ? profile.uid ? <ReportSelect /> : <Loading /> : <Login />}
    </div>
  );
}
