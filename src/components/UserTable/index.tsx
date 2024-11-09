import clsx from 'clsx';
import { useContext, useState } from 'react'
import { themeContext } from '../../context';
const UserTable = ({ data }: { data: any }) => {
    const [showMore, setShowMore] = useState<boolean>(false)
    const [selectedUserId, setSelectedUserId] = useState<number>()
    const { appTheme } = useContext(themeContext)
    console.log(selectedUserId)
    return (
        <div className={clsx("", { "bg-black text-white": appTheme === "dark" })}>
            <div className={clsx("relative overflow-x-auto", { "bg-black text-white": appTheme === "dark" })}>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Company Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className={clsx("", { "bg-black text-white": appTheme === "dark" })}>
                        {data!.map((user: any) => {
                            const { id, name, email, company, address, phone } = user
                            return (<tr key={user} className="">
                                <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                                    {id}
                                </th>
                                <td className="px-6 py-4">
                                    {name}
                                </td>
                                <td className="px-6 py-4">
                                    {email}
                                </td>
                                <td className="px-6 py-4">
                                    {company.name}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => {setShowMore(true); setSelectedUserId(id)}} className={clsx("px-2 py-2 rounded-md hover:scale-110 transition-all duration-300 border-2",
                                         { "text-white bg-gray-700 ": appTheme === "dark", "text-black ": appTheme === "light" })}>
                                            Show More
                                    </button>
                                </td>
                                {
                                    showMore && selectedUserId===user.id  && 
                                    ( 
                                    <>
                                      <td className="px-6 py-4">
                                        {address.suite+" "+address.street+" "+address.city}
                                      </td>
                                      <td className="px-6 py-4">
                                        {phone}
                                      </td>
                                    </>
                                    )
                                }
                            </tr>)
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserTable
