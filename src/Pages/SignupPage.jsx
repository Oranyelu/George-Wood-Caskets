import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    setError('');
    try {
      await signup(email, password);
      navigate('/');
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.message || 'Failed to create an account');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen transition-colors duration-300 font-montserrat px-4 py-12 bg-brand-cream dark:bg-primary-dark">
      <form onSubmit={handleSubmit} className="bg-brand-card dark:bg-brand-card-dark p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#135B3A]/10 dark:border-white/5 mt-16 transition-colors duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center font-serif text-[#135B3A] dark:text-green-500">Create Account</h2>
        {error && (
          <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 py-2 px-4 rounded-lg text-sm mb-4 text-center border border-red-100 dark:border-red-900/30">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-brand-black/80 dark:text-gray-300">Email Address</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-semibold mb-2 text-brand-black/80 dark:text-gray-300">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full p-3 pr-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
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
        <div className="mb-6 relative">
          <label className="block text-sm font-semibold mb-2 text-brand-black/80 dark:text-gray-300">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              className="w-full p-3 pr-10 rounded-xl border border-gray-300 dark:border-gray-700 bg-brand-white dark:bg-[#1a2e23]/30 text-brand-black dark:text-brand-white focus:outline-none focus:ring-2 focus:ring-[#135B3A] dark:focus:ring-green-600 focus:border-transparent text-sm transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>
        <button type="submit" className="w-full bg-[#135B3A] hover:bg-[#0E462D] dark:bg-green-700 dark:hover:bg-green-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md text-sm uppercase tracking-wider">
          Sign Up
        </button>
        <p className="mt-6 text-center text-sm text-brand-black/80 dark:text-gray-300">
          Already have an account? <Link to="/login" className="text-[#135B3A] dark:text-green-400 hover:underline font-bold pl-1">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
