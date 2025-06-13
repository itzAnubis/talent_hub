import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Dashboard
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;