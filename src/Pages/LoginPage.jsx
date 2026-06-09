import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      // Navigation handled by useEffect
    } catch (err) {
      console.error("Login Error:", err);
      setError(`Failed to log in: ${err.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen transition-colors duration-300 font-montserrat px-4 bg-brand-cream dark:bg-primary-dark">
      <form onSubmit={handleSubmit} className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#135B3A]/10 dark:border-white/5 transition-colors duration-300 mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center font-serif text-[#135B3A] dark:text-green-500">Welcome Back</h2>
        {error && (
          <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 py-2 px-4 rounded-lg text-sm mb-4 text-center border border-red-100 dark:border-red-900/30">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-brand-black/80 dark:text-gray-300">Email Address</label>
          <input
            type="email"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6 relative">
          <label className="block text-sm font-semibold mb-2 text-brand-black/80 dark:text-gray-300">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 pr-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>
        <button type="submit" className="w-full bg-[#135B3A] hover:bg-[#0E462D] dark:bg-green-700 dark:hover:bg-green-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md text-sm uppercase tracking-wider">
          Login
        </button>
        <p className="mt-6 text-center text-sm text-brand-black/80 dark:text-gray-300">
          Don&apos;t have an account? <Link to="/signup" className="text-[#135B3A] dark:text-green-400 hover:underline font-bold pl-1">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
