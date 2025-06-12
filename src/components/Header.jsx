import { Bell, LogOut } from 'lucide-react';
import React from 'react';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    // console.log(user)

    return (
        <header className='bg-white/5 backdrop-blur-3xl shadow-lg border-b border-black mt-4 mb-2 rounded-lg'>
            <nav className=' py-4 mx-auto flex justify-between items-center px-4 sm:px-6'>
                <h1 className='text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100'>Book Vault</h1>

                <div className='flex gap-4 items-center text-gray-100'>

                    {/* Notification */}
                    <div className='relative'>
                        <Bell className='w-5 h-5 text-gray-300 cursor-pointer hover:text-white' />
                    </div>

                    {/* Profile Image */}
                    <div>
                        <img 
                            src={user?.profilePicture || 'https://avatar.iran.liara.run/public/boy'} 
                            alt='Profile'
                            className='w-10 h-10 rounded-full border border-gray-300 object-cover'
                        />
                    </div>

                    {/* User Name */}
                    <span className='hidden sm:block bg-[green]/10 backdrop-blur-md text-green-500 border border-green-400 px-2 rounded-md uppercase font-medium'>
                        {user?.role || 'Guest'}
                    </span>

                    {/* Logout Button */}
                    <button 
                        onClick={logout}
                        className='flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-1 py-1 rounded transition-all duration-300 text-sm'
                    >
                        <LogOut className='w-4 h-4' />
                        Logout
                    </button>

                </div>
            </nav>
        </header>
    );
}

export default Header;
