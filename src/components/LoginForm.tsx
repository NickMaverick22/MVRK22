import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from './AuthContext';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister, onLoginSuccess }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        onLoginSuccess();
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-12">
          <img 
            src="/582b3ba5-44a7-495b-99db-d934013589cf-removebg-preview.png" 
            alt="MVRK Logo" 
            className="h-16 mx-auto mb-8 filter drop-shadow-2xl"
          />
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-xl text-gray-300">
            Sign in to your MVRK account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl border border-gray-700">
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors duration-300"
                  placeholder="Your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !formData.email || !formData.password}
            className="w-full mt-8 group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
          >
            <span className="flex items-center justify-center gap-3">
              {isSubmitting ? 'Signing In...' : 'Sign In'}
              {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />}
            </span>
          </button>

          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-red-400 hover:text-red-300 font-semibold transition-colors duration-300"
              >
                Create Account
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;