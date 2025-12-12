import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      setError('Failed to create an account');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen transition-colors duration-300 font-montserrat px-4 py-8">
      <form onSubmit={handleSubmit} className="bg-[#F0B52E] p-8 rounded-lg shadow-lg w-full max-w-md border border-white/10 mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Create Account</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block text-white mb-2 font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 border border-white/30 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2 font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-3 border border-white/30 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a password"
          />
        </div>
        <div className="mb-6">
          <label className="block text-white mb-2 font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full p-3 border border-white/30 rounded bg-white/90 text-black focus:outline-none focus:ring-2 focus:ring-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit" className="w-full bg-[#135B3A] text-white p-3 rounded font-bold hover:bg-[#0f462c] transition-colors shadow-md border border-white/20">
          Sign Up
        </button>
        <p className="mt-6 text-center text-white/90">
          Already have an account? <Link to="/login" className="text-white hover:underline font-bold">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
