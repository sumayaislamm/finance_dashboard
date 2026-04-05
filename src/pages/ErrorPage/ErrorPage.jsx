import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center page-slide-in-left">
      <h1 className="text-9xl font-extrabold text-red-500 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-primary mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-base-content mb-6">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;