import './App.css'
import { useState, useEffect } from 'react'
import Dashboard from './pages/dashboard'
import { themeContext, userDataContext } from './context/index'
import clsx from 'clsx'
import ThemeToggle from './components/ToggleTheme'
import Loader from './components/ui/loader'

function App() {
  const [appTheme, setAppTheme] = useState<string>("light")
  const [userData, setUserData] = useState<any>()
  const [userDataLoading, setUserDataLoading] = useState<boolean>(true)
  const fetchUsers = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", { method: "GET" });
      const data = await res.json()
      setUserDataLoading(false)
      setUserData(data);
    } catch (error) {
    }

  }
  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <themeContext.Provider value={{ appTheme, setAppTheme }}>
      <userDataContext.Provider value={{ userData }}>
        <div className={clsx('flex flex-col w-[100%] flex-grow-1 h-[100vh] p-4 justify-start', { "bg-black text-white": appTheme === "dark", })}>
          <div className='ml-auto w-fit'><ThemeToggle /></div>
          <div className='w-[100vw] h-[100vh] items-center justify-start text-center flex-grow-1'>
            {userDataLoading ? <Loader />:<Dashboard />}
          </div> 
        </div>
      </userDataContext.Provider>
    </themeContext.Provider>
  )
}

export default App
