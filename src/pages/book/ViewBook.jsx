import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import axiosInstance from '@/lib/axios';

const ViewBooks = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get('/book/allBooks');
      console.log('jai ho sa',res.data)
      if (res.data.success) {
        setBooks(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="bg-white/5 p-4 backdrop-blur-3xl rounded-md overflow-x-scroll overflow-scroll">
      <div className="flex w-full justify-between text-white    text-2xl my-6 px-4">
        <h2>View Books</h2>
        <Link to="/admin/addbook">
          <Pencil />
        </Link>
      </div>

      <div className="flex flex-col w-full text-white overflow-y-auto overflow-x-auto  custom-scrollbar sidebar-scrollbar shadow-md rounded-lg">
        <table className=" overflow-x-auto min-w-[1400px] text-left   text-white custom-scrollbar sidebar-scrollbar ">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-sm font-semibold uppercase tracking-wider">Cover</th>
              <th className="p-4 text-sm font-semibold uppercase tracking-wider">Book Name</th>
              <th className="p-4 text-sm font-semibold uppercase tracking-wider">Author</th>
              <th className="p-4 text-sm font-semibold uppercase tracking-wider">SubCategory</th>
              <th className="p-4 text-sm font-semibold uppercase tracking-wider">Price</th>
              <th className="p-4 text-sm font-semibold uppercase tracking-wider">MRP</th>
              <th className="p-4 text-sm font-semibold uppercase tracking-wider">Access Type</th>
              <th className="p-4 text-sm font-semibold uppercase tracking-wider">Featured</th>
              <th className="p-4 text-sm font-semibold uppercase tracking-wider">Available</th>
              <th className="p-4 text-sm font-semibold uppercase tracking-wider">Status</th>
              <th className="p-4 text-sm font-semibold uppercase tracking-wider">Created At</th>
              <th className="p-4 text-sm font-semibold uppercase tracking-wider">Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((item, index) => (
              <tr key={item._id || index} className="hover:bg-white/10 rounded-lg">
                <td className="p-4">
                  <img src={item.coverImage} alt="cover" className="h-16 w-12 object-cover rounded" />
                </td>

                <td className="p-4">
                  <p className="text-sm font-bold">{item.name || 'N/A'}</p>
                </td>

                <td className="p-4">
                  <p className="text-sm">{item.author || 'N/A'}</p>
                </td>

                <td className="p-4">
                  <p className="text-sm">{item.subCategory?.name || 'N/A'}</p>
                </td>

                <td className="p-4">
                  ₹ {item.price || '0'}
                </td>

                <td className="p-4">
                  ₹ {item.mrp || '0'}
                </td>

                <td className="p-4 capitalize">
                  <p className="text-sm">{item.accessType}</p>
                </td>

                <td className="p-4">
                  <p className={`text-xs font-medium text-center py-0.5 rounded ${item.featured ? "bg-green-600/20 text-green-400 border border-green-400" : "bg-red-600/20 text-red-400 border border-red-400"}`}>
                    {item.featured ? "Featured" : "Not Featured"}
                  </p>
                </td>

                <td className="p-4">
                  <p className={`text-xs font-medium text-center py-0.5 rounded ${item.availableForOrder ? "bg-green-600/20 text-green-400 border border-green-400" : "bg-red-600/20 text-red-400 border border-red-400"}`}>
                    {item.availableForOrder ? "Yes" : "No"}
                  </p>
                </td>

                <td className="p-4">
                  <p className={`text-xs font-medium text-center py-0.5 rounded ${item.status ? "bg-green-600/20 text-green-400 border border-green-400" : "bg-red-600/20 text-red-400 border border-red-400"}`}>
                    {item.status ? "Enabled" : "Disabled"}
                  </p>
                </td>

                <td className="p-4">
                  <p className="text-sm">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</p>
                </td>

                <td className="p-4">
                  <Link to={`/admin/edit-book/${item._id}`}>
                    <span className="text-sm font-semibold text-blue-400 hover:underline">Edit</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ViewBooks;
