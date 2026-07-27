import { useState } from 'react';
import { useStore } from '../../store/useStore';
import apiClient from '../../api/client';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const setAuth = useStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.post('/api/auth/login', {
        email,
        password
      });
      
      const { access_token, refresh_token } = response.data;
      
      // We don't have a /me endpoint in the spec, so we'll decode the token or mock user object
      // Actually, we can fetch user profile or just use token claims for role
      const decoded = jwtDecode(access_token);
      
      setAuth(
        { id: decoded.id, role: decoded.role, email: email, name: email.split('@')[0] }, 
        access_token, 
        refresh_token
      );
      
      toast.success('Successfully logged in!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
          placeholder="admin@heatwatch.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
          placeholder="••••••••"
        />
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full btn-primary py-3 font-bold text-lg mt-6"
      >
        {loading ? 'Logging in...' : 'Sign In'}
      </button>
    </form>
  );
}
