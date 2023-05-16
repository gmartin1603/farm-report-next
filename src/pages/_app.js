import { AppProvider } from "@/context/AppProvider";
import appReducer, { initialState } from "@/context/appReducer";
import "@/styles/globals.css";
import MainLayout from "./layout/MainLayout";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider initialState={initialState} reducer={appReducer}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </AppProvider>
  );
}
