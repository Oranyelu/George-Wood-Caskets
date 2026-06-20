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
  const { signup, loginWithGoogle } = useContext(AuthContext);
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

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error("Google Signup Error:", err);
      setError(`Google signup failed: ${err.message}`);
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

        <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-gray-250 dark:border-gray-750"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-xs font-bold uppercase">or</span>
            <div className="flex-grow border-t border-gray-250 dark:border-gray-750"></div>
        </div>

        <button 
          type="button" 
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 dark:border-gray-750 bg-white dark:bg-gray-800 hover:bg-gray-55 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-200 font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm text-sm uppercase tracking-wider flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Sign Up with Google
        </button>

        <p className="mt-6 text-center text-sm text-brand-black/80 dark:text-gray-300">
          Already have an account? <Link to="/login" className="text-[#135B3A] dark:text-green-400 hover:underline font-bold pl-1">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
