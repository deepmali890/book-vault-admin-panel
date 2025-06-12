import axiosInstance from '@/lib/axios';
import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AddBook = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfName, setPdfName] = useState(null);
  const [bookName, setBookName] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [status, setStatus] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [subcategory, setSubcategory] = useState('');
  const [accessType, setAccessType] = useState('free');
  const [availableForOrder, setAvailableForOrder] = useState(true);
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

  const fetchSubCategory = async () => {
    try {
      const res = await axiosInstance.get('/subCategory/activeSubCategory');
      if (res.data.success) {
        setSubCategories(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!subcategory) {
      toast.error("Please select a sub category");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', bookName);
      formData.append('description', description);
      formData.append('author', author);
      formData.append('subCategory', subcategory); // ✅ only subcategory id
      formData.append('status', status);
      formData.append('featured', featured);
      formData.append('coverImage', coverImage);
      formData.append('bookPdf', pdfFile);
      formData.append('price', price);
      formData.append('mrp', mrp);
      formData.append('accessType', accessType);
      formData.append('availableForOrder', availableForOrder);

      const response = await axiosInstance.post('/book/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        // reset form
        setBookName('');
        setDescription('');
        setAuthor('');
        setSubcategory('');
        setStatus(true);
        setFeatured(false);
        setCoverImage(null);
        setPdfFile(null);
        setPrice('');
        setMrp('');
        setAccessType('free');
        setAvailableForOrder(true);
        navigate('/admin/viewbook');
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to add book");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white/5 backdrop-blur-3xl py-4 rounded-md max-w-7xl mx-auto text-white">
      <div className="py-8 px-4 mx-auto max-w-4xl">
        <div className="flex justify-between items-center">
          <h2 className="mb-4 text-xl font-bold">Add New Book</h2>
          <Link to={'/admin/viewbook'}>
            <Eye className='text-xl text-white' />
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Book Name</label>
              <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" placeholder="Enter Book Name" />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Author</label>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" placeholder="Enter Author Name" />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">SubCategory</label>
              <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg outline-0 block w-full p-2.5" required>
                <option value="">Select Sub Category</option>
                {subCategories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Cover Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" />
              {coverPreview && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium">Image Preview:</p>
                  <img src={coverPreview} alt="Cover Preview" className="rounded-lg h-60 object-cover" />
                </div>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Book PDF</label>
              <input type="file" accept=".pdf" onChange={handlePdfChange}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" />
              {pdfName && (
                <p className="mt-2 text-sm">Selected File: <span className="font-semibold">{pdfName}</span></p>
              )}
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" placeholder="Enter Price" />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">MRP</label>
              <input type="number" value={mrp} onChange={(e) => setMrp(e.target.value)}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" placeholder="Enter MRP" />
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Access Type</label>
              <select value={accessType} onChange={(e) => setAccessType(e.target.value)}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5">
                <option value="free">Free</option>
                <option value="premium">Premium</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Featured</label>
              <select value={featured} onChange={(e) => setFeatured(e.target.value === "true")}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value === "true")}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5">
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Available For Order</label>
              <select value={availableForOrder} onChange={(e) => setAvailableForOrder(e.target.value === "true")}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Description</label>
              <textarea rows="5" value={description} onChange={(e) => setDescription(e.target.value)}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5" placeholder="Enter Description" />
            </div>

          </div>

          <button type="submit" disabled={isLoading}
            className="inline-flex items-center px-5 py-2.5 mt-6 text-sm font-semibold rounded-md bg-white text-black transition hover:scale-105">
            {isLoading ? 'Submitting...' : 'Add Book'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddBook;
