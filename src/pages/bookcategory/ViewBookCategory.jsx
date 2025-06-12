import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';  // <-- Next.js ka nahi, react-router-dom ka lena hai
import { useEffect, useState } from 'react';
import axiosInstance from '@/lib/axios';

const ViewBookCategory = () => {
    const [category, setCategory] = useState([]);

    const fetchCategory = async () => {
        try {
         const response = await axiosInstance.get('/bookCategory')
            console.log("hello mister ",response.data);
            if (response.status === 200) {
                const data = response.data?.data || [];
                setCategory(Array.isArray(data) ? data : []);
            }
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
console.log("category",category)
    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <div className="bg-white/5 p-4 backdrop-blur-3xl rounded-md">
            <div className="flex w-full justify-between text-white text-2xl my-6 px-4">
                <h2>View Category</h2>
                <Link to="/admin/addbookcategory">
                    <Pencil />
                </Link>
            </div>

            <div className="flex flex-col w-full text-white overflow-y-auto custom-scrollbar sidebar-scrollbar  shadow-md rounded-lg">
                <table className="w-full text-left table-auto min-w-max text-white">
                    <thead>
                        <tr className="border-b">
                            <th className="p-4 text-sm font-semibold uppercase tracking-wider">Category Name</th>
                            <th className="p-4 text-sm font-semibold uppercase tracking-wider">Date</th>
                            <th className="p-4 text-sm font-semibold uppercase tracking-wider">Role</th>
                            <th className="p-4 text-sm font-semibold uppercase tracking-wider">Description</th>
                            <th className="p-4 text-sm font-semibold uppercase tracking-wider">Status</th>
                            <th className="p-4 text-sm font-semibold uppercase tracking-wider">Feature</th>
                            <th className="p-4 text-sm font-semibold uppercase tracking-wider">Action</th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((item, index) => (
                            <tr key={item._id || index} className="hover:bg-white/10 rounded-lg">
                                <td className="p-4">
                                    <p className="text-sm font-bold">{item.name || 'N/A'}</p>
                                </td>
                                <td className="p-4">
                                    <p className="text-sm">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</p>
                                </td>
                                <td className="p-4">
                                    <p className="text-sm">{item.createdBy?.role || 'N/A'}</p>
                                </td>
                                <td className="p-4">
                                    <p className="text-sm">{item.description || 'N/A'}</p>
                                </td>
                                <td className="p-4">
                                    <p className={`text-xs font-medium text-center py-0.5 rounded ${item.status ? "bg-[green]/10 backdrop-blur-md text-green-500 border cursor-pointer scale-100 hover:scale-105 duration-200 border-green-400" : "bg-[red]/5 backdrop-blur-md cursor-pointer text-red-500 border scale-100 hover:scale-105 duration-200 border-red-400"}`}>
                                        {item.status ? "Enabled" : "Disabled"}
                                    </p>
                                </td>
                                <td className="p-4">
                                    <p className={`text-xs font-medium text-center py-0.5 rounded ${item.featured ? "bg-[green]/10 backdrop-blur-md text-green-500 border cursor-pointer scale-100 hover:scale-105 duration-200 border-green-400" : "bg-[red]/10 backdrop-blur-md text-red-500 border cursor-pointer scale-100 hover:scale-105 duration-200 border-red-400"}`}>
                                        {item.featured ? "Enabled" : "Disabled"}
                                    </p>
                                </td>
                                <td className="p-4">
                                    <Link to={`/admin/edit-category/${item._id}`}>
                                        <span className="text-sm font-semibold text-blue-400 hover:underline">Edit</span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewBookCategory;
