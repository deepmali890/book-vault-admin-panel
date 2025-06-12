import React, { useState, useEffect } from 'react';
import { Bell, Clock } from 'lucide-react';

const sampleNotifications = [
  {
    id: 1,
    title: "New User Registered",
    message: "John Doe has signed up successfully.",
    createdAt: "2025-06-10T12:34:56Z",
  },
  {
    id: 2,
    title: "Order Placed",
    message: "Order #2451 has been placed successfully.",
    createdAt: "2025-06-09T10:20:30Z",
  },
  {
    id: 3,
    title: "New Book Added",
    message: "The book 'Rich Dad Poor Dad' was added by Admin.",
    createdAt: "2025-06-08T09:15:10Z",
  },
  {
    id: 4,
    title: "Subscription Expiring",
    message: "User Jane's subscription will expire in 3 days.",
    createdAt: "2025-06-07T15:45:20Z",
  }
];

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // TODO: future API call yaha karega
    setNotifications(sampleNotifications);
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <section className="bg-white/5 backdrop-blur-3xl py-4 rounded-md max-w-5xl mx-auto text-white">
      <div className="py-8 px-4 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bell /> Notifications
          </h2>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center text-gray-400">No notifications available.</div>
          ) : (
            notifications.map((notif) => (
              <div key={notif.id} className="bg-zinc-900 border border-gray-700 p-4 rounded-lg shadow-md hover:scale-[1.02] transition cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{notif.title}</h3>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <Clock size={14} />
                    <span>{formatDate(notif.createdAt)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-300">{notif.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Notification;
