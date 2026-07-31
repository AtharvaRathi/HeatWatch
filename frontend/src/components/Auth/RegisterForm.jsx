import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import apiClient from '../../api/client';
import { useStore } from '../../store/useStore';
import { Loader2 } from 'lucide-react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    language_preference: 'en',
  });
  
  const navigate = useNavigate();
  const setAuth = useStore((state) => state.setAuth);

  const registerMutation = useMutation({
    mutationFn: async (data) => {
      // 1. Register
      await apiClient.post('/api/auth/register', data);
      
      // 2. Auto-login after successful registration
      const loginRes = await apiClient.post('/api/auth/login', {
        email: data.email,
        password: data.password
      });
      return loginRes.data;
    },
    onSuccess: (data) => {
      // Decode JWT to get user data
      const base64Url = data.access_token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const user = JSON.parse(jsonPayload);
      
      setAuth(user, data.access_token, data.refresh_token);
      toast.success('Account created successfully!');
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.response?.data?.detail || 'Registration failed. Please try again.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    registerMutation.mutate(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300">Full Name</label>
        <div className="mt-1">
          <input
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="John Doe"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300">Email address</label>
        <div className="mt-1">
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            placeholder="you@example.com"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300">Phone Number (Optional)</label>
        <div className="mt-1">
          <input
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
            placeholder="+1 555-555-5555"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Password</label>
        <div className="mt-1">
          <input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="input-field"
            placeholder="••••••••"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300">Preferred Alert Language</label>
        <div className="mt-1">
          <select
            name="language_preference"
            value={formData.language_preference}
            onChange={handleChange}
            className="input-field"
          >
            <option value="en">English</option>
            <option value="hi">Hindi (हिंदी)</option>
            <option value="mr">Marathi (मराठी)</option>
          </select>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full btn-primary flex justify-center py-2.5"
        >
          {registerMutation.isPending ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            'Create Account'
          )}
        </button>
      </div>
    </form>
  );
}
