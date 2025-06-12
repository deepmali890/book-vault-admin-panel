import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";

const CreateUserForm = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'user',
        subscription: false
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axiosInstance.post('/auth/admin-register', formData)
            toast.success(res.data.message);
            setLoading(false);
            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                role: 'user',
                subscription: false
            })

        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong');

        } finally {
            setLoading(false);
        }
    }


    return (
        <form
            className=" flex flex-col gap-4 bg-white/5 backdrop-blur-3xl p-8  rounded-xl border border-gray-700 shadow-lg"
            onSubmit={handleSubmit}
        >
            <h2 className="text-2xl font-bold text-white text-center mb-4">Create New Member</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="firstname"
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full h-12 rounded-lg border border-gray-600 bg-transparent text-white px-4 focus:outline-none placeholder:text-gray-400"
                    required
                />
                <input
                    name="lastname"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="w-full h-12 rounded-lg border border-gray-600 bg-transparent text-white px-4 focus:outline-none placeholder:text-gray-400"
                    required
                />
            </div>

            <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border border-gray-600 bg-transparent text-white px-4 focus:outline-none placeholder:text-gray-400"
                required
                type="email"
            />

            <input
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border border-gray-600 bg-transparent text-white px-4 focus:outline-none placeholder:text-gray-400"
                required
                type="password"
            />

            <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full h-12 rounded-lg border border-gray-600 bg-transparent text-white px-4 focus:outline-none"
            >
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
            </select>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="subscription"
                    checked={formData.subscription}
                    onChange={handleChange}
                    className="w-5 h-5 check-box"
                />
                <span className="text-white">Subscription Active</span>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full h-12 rounded-lg text-white font-semibold transition-all duration-300 ${loading
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
            >
                {loading ? 'Creating...' : 'Create Member'}
            </button>
        </form>

    )
}

export default CreateUserForm
