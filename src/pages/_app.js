import { AppProvider } from '@/context/AppProvider'
import appReducer, { initialState } from '@/context/appReducer'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <AppProvider initialState={initialState} reducer={appReducer}>
      <Component {...pageProps} />
    </AppProvider>
  )
}
