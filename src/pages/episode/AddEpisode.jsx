import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample books for design purpose, tu baad me API se dynamic fetch karega
const sampleBooks = [
  { _id: '1', name: 'The Alchemist' },
  { _id: '2', name: 'Harry Potter' },
  { _id: '3', name: 'Rich Dad Poor Dad' },
];

const AddEpisodeDesign = () => {
  const [selectedBook, setSelectedBook] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [audioName, setAudioName] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);

  // (Future Scope: fetch books from API)
  useEffect(() => {
    // TODO: Fetch book list from API
  }, []);

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    setAudioName(file?.name);
    if (file) {
      setAudioPreview(URL.createObjectURL(file));
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

        <form>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

            {/* Book Selection */}
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Select Book</label>
              <select
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
              >
                <option value="">-- Select Book --</option>
                {sampleBooks.map(book => (
                  <option key={book._id} value={book._id}>{book.name}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Episode Title</label>
              <input
                type="text"
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Episode Title"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Episode Number</label>
              <input
                type="number"
                className="bg-zinc-900 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Episode Number"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium">Description</label>
              <textarea
                rows="4"
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

          <button type="button" className="inline-flex items-center px-5 py-2.5 mt-6 text-sm font-semibold rounded-md bg-white text-black transition hover:scale-105">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddEpisodeDesign;
