import Image from 'next/image'
import { Inter } from 'next/font/google'
import SideBar from './components/SideBar'
import Header from './components/Header'
import useAuthHook from '@/firebase/authHook'
import Login from './components/Login'
import { useEffect } from 'react'
import { useAppState } from '@/context/AppProvider'
import Text from './components/Text'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const user = useAuthHook()
  const [{}, dispatch] = useAppState()

  useEffect(() => {
    let years = new Array(6)
    let year = new Date().getFullYear()
    year -= 2
    for (let i=0; i < years.length; i++) {
      years[i] = year + i
    }
    console.log(years)
    dispatch({type: "ADD-ARR", name: "years", load: years})
  }, []);

  const styles = {
    button:`h-fit bg-green-500 hover:bg-green-700 text-white font-bold mt-2 py-2 px-4 rounded`,
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <Header user={user}/>
      { user?
        <div className="flex justify-start w-full">
          <SideBar/>
          <Text/>
        </div>
        :
        <Login/>
      }
    </main>
  )
}
