import { Link } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm';
import { ThermometerSun } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <ThermometerSun className="mx-auto h-12 w-12 text-[#F97316]" />
        <h2 className="mt-6 text-3xl font-extrabold text-white">
          Sign in to HeatWatch
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Or{' '}
          <Link to="/register" className="font-medium text-[#06B6D4] hover:text-cyan-400">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-card py-8 px-4 sm:px-10">
          <LoginForm />
          
          <div className="mt-6 border-t border-gray-700 pt-6 text-center">
            <p className="text-sm text-gray-500">Demo Accounts</p>
            <p className="text-xs text-gray-400 mt-1">Admin: admin@heatwatch.com / Admin@1234</p>
            <p className="text-xs text-gray-400 mt-1">User: user@heatwatch.com / User@1234</p>
          </div>
        </div>
      </div>
    </div>
  );
}
