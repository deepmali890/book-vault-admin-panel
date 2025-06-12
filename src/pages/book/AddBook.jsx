import { Eye } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AddBook = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfName, setPdfName] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
    setPdfName(file?.name);
  };

  return (
    <section className="bg-white/5 backdrop-blur-3xl py-4 rounded-md max-w-7xl mx-auto text-white">
      <div className="py-8 px-4 mx-auto max-w-4xl">
        <div className="flex justify-between items-center">
          <h2 className="mb-4 text-xl font-bold">Add New Book </h2>
          <Link to={'/admin/viewbook'}>
            <Eye className='text-xl text-white' />
          </Link>
        </div>

        <form>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Book Name</label>
              <input type="text" className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" placeholder="Enter Book Name" />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Description</label>
              <textarea rows="5" className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" placeholder="Enter Description" />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Author</label>
              <input type="text" className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" placeholder="Enter Author Name" />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Book Category</label>
              <select className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5">
                <option>Select Category</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">SubCategory</label>
              <select className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5">
                <option>Select SubCategory</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Cover Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" />
              {coverPreview && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium">Image Preview:</p>
                  <img src={coverPreview} alt="Cover Preview" className="rounded-lg h-60 object-cover" />
                </div>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Book PDF</label>
              <input type="file" accept=".pdf" onChange={handlePdfChange} className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" />
              {pdfName && (
                <p className="mt-2 text-sm">Selected File: <span className="font-semibold">{pdfName}</span></p>
              )}
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Price</label>
              <input type="number" className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" placeholder="Enter Price" />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">MRP</label>
              <input type="number" className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" placeholder="Enter MRP" />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Access Type</label>
              <select className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5">
                <option value="free">Free</option>
                <option value="premium">Premium</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Featured</label>
              <select className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Status</label>
              <select className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5">
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Available For Order</label>
              <select className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

          </div>

          <button type="button" className="inline-flex items-center px-5 py-2.5 mt-6 text-sm font-semibold rounded-md bg-white text-black transition hover:scale-105">
            Add Book
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddBook;
