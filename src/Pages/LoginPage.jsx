import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="flex justify-center items-center h-screen transition-colors duration-300 font-montserrat px-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#135B3A] dark:text-white">Welcome Back</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Email Address</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Password</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="w-full bg-[#135B3A] text-white p-3 rounded font-bold hover:bg-[#0f462c] transition-colors shadow-md">
          Login
        </button>
        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Don&apos;t have an account? <Link to="/signup" className="text-[#D4AF37] hover:underline font-semibold">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
