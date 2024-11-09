import { useContext } from 'react'
import { clsx } from 'clsx';
import { themeContext, userDataContext } from '../../context';
import UserTable from '../../components/UserTable';

const Dashboard = () => {
  const { appTheme} = useContext(themeContext)
  const {userData} = useContext(userDataContext)

  return (
    <div className={clsx('flex flex-col gap-4  items-center justify-center py-4 px-8', { "bg-black text-white": appTheme === "dark", })}>
      <text className='text-3xl font-bold'>User Management Dashboard</text>
      <UserTable data={userData || []}/>
    </div>
  )
}

export default Dashboard
