import { Eye, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axios';

const AddSubCategory = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState('');

  const navigate = useNavigate();

  // Fetch active categories for parentCategory dropdown
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get('/bookCategory');  // Make sure this returns categories
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    if (!parentCategory) {
      toast.error("Please select a parent category");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('status', status);
      formData.append('featured', featured);
      formData.append('parentCategory', parentCategory);
      formData.append('SubCategoryImage', image);

      const response = await axiosInstance.post('/subCategory/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/admin/viewsubcategory');
      }
    } catch (error) {
      console.error('Error adding subcategory:', error);
      toast.error(error?.response?.data?.message || "Failed to add subcategory");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white/5 backdrop-blur-3xl py-4 rounded-md max-w-7xl mx-auto text-white">
      <div className="py-8 px-4 mx-auto max-w-2xl">
        <div className="flex justify-between items-center">
          <h2 className="mb-4 text-xl font-bold">Add New SubCategory</h2>
          <Link to={'/admin/viewsubcategory'}>
            <Eye className='text-xl text-white' />
          </Link>
        </div>

        <form onSubmit={handleAddSubCategory} encType="multipart/form-data">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">SubCategory Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg outline-0 block w-full p-2.5"
                placeholder="Enter SubCategory name" required />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">SubCategory Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg outline-0 block w-full p-2.5" required />
              {preview && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium">Image Preview:</p>
                  <img src={preview} alt="Preview" className="rounded-lg h-40 object-cover" />
                </div>
              )}
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Parent Category</label>
              <select value={parentCategory} onChange={(e) => setParentCategory(e.target.value)}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg outline-0 block w-full p-2.5" required>
                <option value="">Select Parent Category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value === 'true')}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg outline-0 block w-full p-2.5">
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium">Featured</label>
              <select value={featured} onChange={(e) => setFeatured(e.target.value === 'true')}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5">
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Description</label>
              <textarea rows="6" value={description} onChange={(e) => setDescription(e.target.value)}
                className="block p-2.5 w-full text-sm outline-0 bg-zinc-900 border border-gray-600 text-white rounded-lg"
                placeholder="Enter description here"></textarea>
            </div>

          </div>

          <button type="submit" disabled={isLoading}
            className={`inline-flex items-center px-5 py-2.5 mt-6 text-sm font-semibold rounded-md bg-white text-black transition hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {isLoading ? (<><Loader2 className="animate-spin mr-2" /> Adding...</>) : 'Add SubCategory'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddSubCategory;
