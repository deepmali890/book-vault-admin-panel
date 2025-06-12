import React from 'react';

const Orders = () => {
  const dummyOrders = [
    {
      _id: 'ORD001',
      customerName: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      totalAmount: 499.99,
      status: 'Pending',
      createdAt: '2025-06-10T09:45:00Z',
    },
    {
      _id: 'ORD002',
      customerName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543210',
      totalAmount: 299.99,
      status: 'Completed',
      createdAt: '2025-06-09T14:30:00Z',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500';
      case 'Completed':
        return 'bg-green-500/10 text-green-400 border border-green-500';
      case 'Cancelled':
        return 'bg-red-500/10 text-red-400 border border-red-500';
      default:
        return 'bg-gray-500/10 text-gray-400 border border-gray-500';
    }
  };

  return (
    <div className="p-6 bg-white/5 text-white backdrop-blur-md rounded-xl shadow-lg max-w-7xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Orders</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-md hover:scale-105 transition">
          Refresh
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-zinc-900 rounded-lg overflow-hidden shadow">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white uppercase text-sm">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {dummyOrders.map((order) => (
              <tr key={order._id} className="border-b border-white/10 hover:bg-white/10 transition">
                <td className="p-4 font-bold">{order._id}</td>
                <td className="p-4">{order.customerName}</td>
                <td className="p-4">{order.email}</td>
                <td className="p-4">{order.phone}</td>
                <td className="p-4">${order.totalAmount.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-md text-sm font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
