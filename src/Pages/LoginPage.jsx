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
    <div className="flex justify-center items-center h-screen transition-colors duration-300 font-montserrat px-4">
      <form onSubmit={handleSubmit} className="bg-[#F0B52E] p-8 rounded-lg shadow-lg w-full max-w-md border border-white/10">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Welcome Back</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block text-white mb-2 font-medium">Email Address</label>
          <input
            type="email"
            className="w-full p-3 border border-white/30 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6 relative">
          <label className="block text-white mb-2 font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 pr-10 border border-white/30 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>
        <button type="submit" className="w-full bg-[#135B3A] text-white p-3 rounded font-bold hover:bg-[#0f462c] transition-colors shadow-md border border-white/20">
          Login
        </button>
        <p className="mt-6 text-center text-white/90">
          Don&apos;t have an account? <Link to="/signup" className="text-white hover:underline font-bold">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
