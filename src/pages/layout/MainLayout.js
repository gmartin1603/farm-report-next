import React from "react";
import Header from "../components/Header";
import { useAppState } from "@/context/AppProvider";
import useAuthHook from "@/firebase/authHook";

const MainLayout = ({ children }) => {
  const [{ profile }, dispatch] = useAppState();
  useAuthHook();
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainLayout;
