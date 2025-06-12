import CreateUserForm from '@/components/CreateUserForm';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { ShieldAlert } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const CreateUserPage = () => {
    const { user } = useAuth();
    return (
        <div className="max-w-lg mx-auto mt-10">
            <h1 className="text-2xl font-bold text-white mb-4 text-center" >Create Member</h1>

            {user?.role === 'admin' ? (
                <CreateUserForm />
            ) : (
                <div className="h-screen mx-auto grid place-items-center text-center px-8">
                    <div>
                        <ShieldAlert className="w-20 h-20 mx-auto text-red-500" />
                        <h1 className="mt-10 text-3xl md:text-4xl font-bold text-white">
                            Access Denied
                        </h1>
                        <p className="mt-8 mb-14 text-[18px] font-normal text-gray-400 mx-auto md:max-w-md">
                            Sorry, you don't have permission to access this page.
                            <br />
                            If you believe this is a mistake, please contact the administrator.
                        </p>
                

                    </div>
                </div>
            )}
        </div>
    )
}

export default CreateUserPage
