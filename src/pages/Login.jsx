import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // loading state

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // start loading
    try {
      const res = await axiosInstance.post('/auth/login', {
        email,
        password
      });
      const user = res.data.user;
      if (user.role === "admin" || user.role === "moderator") {
        toast.success(res.data.message);
        setUser(user);
        setEmail('');
        setPassword('');
        window.location.href = "/admin";
      } else {
        toast.error("You are not authorized to access the Admin Panel.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="font-inter bg-black min-h-screen flex items-center justify-center">
      <section className="w-full max-w-lg px-6 py-20">
        <div className="rounded-2xl bg-white/5 backdrop-blur-3xl shadow-xl border border-gray-700">
          <form className="p-10 mx-auto" onSubmit={handlesubmit}>
            <div className="mb-10">
              <h1 className="text-white text-center text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-400 text-center text-base">
                Let’s get started with your Admin Panel
              </p>
            </div>

            <input
              type="email"
              className="w-full h-12 text-white placeholder:text-gray-400 text-lg rounded-lg border border-gray-600 bg-transparent px-4 mb-6 focus:outline-none"
              placeholder="Email"
              required
              autoFocus
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full h-12 text-white placeholder:text-gray-400 text-lg rounded-lg border border-gray-600 bg-transparent px-4 mb-6 focus:outline-none"
              placeholder="Password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-end mb-6">
              <a href="#" className="text-indigo-500 text-base">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-12 text-white text-base font-semibold rounded-lg transition-all duration-300 mb-10 
              ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
