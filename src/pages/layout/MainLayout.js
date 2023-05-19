import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useAppState } from "@/context/AppProvider";
import useAuthHook from "@/firebase/authHook";

const MainLayout = ({ children }) => {
  const [{ profile }, dispatch] = useAppState();
  useAuthHook();
  return (
    <>
      <Header />
      <div className="flex justify-end p-10">
        {profile.uid && <SideBar />}
        <main className="flex justify-center w-full max-w-[70%] print:max-w-full">
          {children}
        </main>
      </div>
    </>
  );
};

export default MainLayout;
