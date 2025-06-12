import { Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axios';

const AddBookCategory = () => {

  const [name, setName] = useState('');
  const [status, setStatus] = useState(true);  // BOOLEAN
  const [featured, setFeatured] = useState(false);  // BOOLEAN
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post('/bookCategory/create', {
        name,
        status,
        featured,
        description,
      });

      console.log('Category added:', response.data);

      setName('');
      setStatus(true);
      setFeatured(false);
      setDescription('');

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/admin/viewbookcategory');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error(error?.response?.data?.message || "Failed to add category");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="bg-white/5 backdrop-blur-3xl py-4 rounded-md max-w-7xl mx-auto text-white">
      <div className="py-8 px-4 mx-auto max-w-2xl">
        <div className="flex justify-between items-center">
          <h2 className="mb-4 text-xl font-bold">Add a New Category</h2>
          <Link to={'/admin/viewbookcategory'}>
            <Eye className='text-xl text-white' />
          </Link>
        </div>
        <form onSubmit={handleAddCategory}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">Category Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg outline-0 block w-full p-2.5"
                placeholder="Type Category name"
                required
              />
            </div>

            <div className="w-full">
              <label htmlFor="status" className="block mb-2 text-sm font-medium">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value === 'true')}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg outline-0 block w-full p-2.5"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <div className="w-full">
              <label htmlFor="featured" className="block mb-2 text-sm font-medium">Featured</label>
              <select
                id="featured"
                value={featured}
                onChange={(e) => setFeatured(e.target.value === 'true')}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg w-full p-2.5"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block mb-2 text-sm font-medium">Description</label>
              <textarea
                id="description"
                rows="6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block p-2.5 w-full text-sm outline-0 bg-zinc-900 border border-gray-600 text-white rounded-lg"
                placeholder="Your category description here"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`inline-flex items-center px-5 py-2.5 mt-6 text-sm font-semibold rounded-md bg-white text-black transition hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Adding...' : 'Add Category'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddBookCategory;
