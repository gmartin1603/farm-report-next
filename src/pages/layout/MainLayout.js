import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useAppState } from "@/context/AppProvider";

const MainLayout = ({ children }) => {
  const [{ profile }, dispatch] = useAppState();
  return (
    <>
      <Header />
      <div className="flex justify-end p-10">
        {profile.uid && <SideBar />}
        <main className="flex justify-center w-[70%]">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
