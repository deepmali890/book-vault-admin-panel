import React from 'react';

const Inquire = () => {
  const dummyInquiries = [
    {
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      message: 'I want to know more about your services.',
      createdAt: '2025-06-11T10:30:00Z',
    },
    {
      _id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543210',
      message: 'Do you offer custom solutions?',
      createdAt: '2025-06-10T15:45:00Z',
    },
  ];

  return (
    <div className="p-6 bg-white/5 text-white backdrop-blur-md rounded-xl shadow-lg max-w-7xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Inquiries</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-md hover:scale-105 transition">
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-zinc-900 rounded-lg overflow-hidden shadow">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white uppercase text-sm">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {dummyInquiries.map((inquiry) => (
              <tr key={inquiry._id} className="border-b border-white/10 hover:bg-white/10 transition">
                <td className="p-4">{inquiry.name}</td>
                <td className="p-4">{inquiry.email}</td>
                <td className="p-4">{inquiry.phone}</td>
                <td className="p-4 max-w-xs truncate">{inquiry.message}</td>
                <td className="p-4">{new Date(inquiry.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inquire;
