import clsx from 'clsx';
import { useContext, useState, useEffect } from 'react';
import { themeContext } from '../../context';

const UserTable = ({ data }: { data: any }) => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const [selectedUserId, setSelectedUserId] = useState<number>();
    const { appTheme } = useContext(themeContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);

  
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery) {
                setFilteredData(
                    data.filter(
                        (user: any) =>
                            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                );
            } else {
                setFilteredData(data); 
            }
        }, 300); 

        return () => clearTimeout(handler); 
    }, [searchQuery, data]);

    return (
        <div className={clsx("", { "bg-black text-white": appTheme === "dark" })}>
            <div className={clsx("mb-4 w-[25%]",{ "bg-black text-white": appTheme === "dark" })}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or email"
                    className={clsx("p-2 border rounded w-full",{ "bg-black text-white": appTheme === "dark" })}
                />
            </div>

            <div className={clsx("relative overflow-x-auto", { "bg-black text-white": appTheme === "dark" })}>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Company Name</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className={clsx("", { "bg-black text-white": appTheme === "dark" })}>
                        {filteredData.map((user: any) => {
                            const { id, name, email, company, address, phone } = user;
                            return (
                                <tr key={id} className="">
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        {id}
                                    </th>
                                    <td className="px-6 py-4">{name}</td>
                                    <td className="px-6 py-4">{email}</td>
                                    <td className="px-6 py-4">{company.name}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => { setShowMore(true); setSelectedUserId(id); }}
                                            className={clsx("px-2 py-2 rounded-md hover:scale-110 transition-all duration-300 border-2", 
                                                { "text-white bg-gray-700": appTheme === "dark", "text-black": appTheme === "light" })}
                                        >
                                            Show More
                                        </button>
                                    </td>
                                    {showMore && selectedUserId === user.id && (
                                        <>
                                            <td className="px-6 py-4">
                                                {address.suite + " " + address.street + " " + address.city}
                                            </td>
                                            <td className="px-6 py-4">
                                                {phone}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
