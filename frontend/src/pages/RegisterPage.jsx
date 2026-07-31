import { Link } from 'react-router-dom';
import RegisterForm from '../components/Auth/RegisterForm';
import { ThermometerSun } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <ThermometerSun className="mx-auto h-12 w-12 text-[#F97316]" />
        <h2 className="mt-6 text-3xl font-extrabold text-white">
          Join HeatWatch
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#06B6D4] hover:text-cyan-400">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="glass-card py-8 px-4 sm:px-10">
          <RegisterForm />
          <div className="mt-6 pt-6 text-center text-xs text-gray-500 border-t border-gray-700">
            The first registered user automatically becomes the Admin!
          </div>
        </div>
      </div>
    </div>
  );
}
