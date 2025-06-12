import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';

const AddEpisodeDesign = () => {
  const [selectedBook, setSelectedBook] = useState('');
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [description, setDescription] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [audioName, setAudioName] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await axiosInstance.get('/book/allBooks');
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

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    setAudioName(file?.name);
    if (file) {
      setAudioPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBook || !episodeTitle || !episodeNumber || !description || !audioFile) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", episodeTitle);
    formData.append("episodeNumber", episodeNumber);
    formData.append("description", description);
    formData.append("audio", audioFile);

    try {
      const res = await axiosInstance.post(`/episode/book/${selectedBook}/episode`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        toast.success(res.data.message)
        // clear form after success
        setEpisodeTitle('');
        setEpisodeNumber('');
        setDescription('');
        setSelectedBook('');
        setAudioFile(null);
        setAudioName(null);
        setAudioPreview(null);
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error uploading episode:", error);
      alert("Error uploading episode");
    }
  };

  return (
    <section className="bg-white/5 backdrop-blur-3xl py-4 rounded-md max-w-5xl mx-auto text-white">
      <div className="py-8 px-4 mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="mb-4 text-xl font-bold">Add New Episode</h2>
          <Link to={'/admin/viewepisodes'}>
            <Eye className='text-xl text-white' />
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Select Book</label>
              <select
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
              >
                <option value="">-- Select Book --</option>
                {books.map(book => (
                  <option key={book._id} value={book._id}>{book.name}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Episode Title</label>
              <input
                type="text"
                value={episodeTitle}
                onChange={(e) => setEpisodeTitle(e.target.value)}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Episode Title"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Episode Number</label>
              <input
                type="number"
                value={episodeNumber}
                onChange={(e) => setEpisodeNumber(e.target.value)}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Episode Number"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Description</label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Description"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Upload Audio</label>
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
              />
              {audioName && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium">Selected File: {audioName}</p>
                  <audio controls className="w-full rounded-lg">
                    <source src={audioPreview} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>

          </div>

          <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-6 text-sm font-semibold rounded-md bg-white text-black transition hover:scale-105">
            Add Episode
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddEpisodeDesign;
