import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SalesOverViewChart from '@/components/SalesOverViewChart';
import Sidebar from '@/components/Sidebar';
import States from '@/components/States';
import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex flex-col w-full">
        <Header />
        
        <div className="flex-1  p-6 overflow-y-auto custom-scrollbar sidebar-scrollbar">
          <Outlet />
        </div>

        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default AdminLayout;
