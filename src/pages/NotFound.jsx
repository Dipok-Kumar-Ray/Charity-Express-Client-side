import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-green-100 to-green-50 dark:from-gray-900 dark:to-gray-800 px-4 transition-colors duration-500">
      
      <div className="max-w-md text-center">
        <h1 className="text-9xl font-extrabold text-green-700 dark:text-green-400 mb-6 select-none animate-pulse">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-red-800 dark:text-red-500 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-green-800 dark:text-green-200 mb-6">
          The page you're looking for does't exist or has been moved.  
          Let's get you back to saving food and fighting waste!
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow 
            hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-500 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
