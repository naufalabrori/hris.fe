const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="relative">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>

        {/* Loading Text */}
        <div className="mt-4 text-center text-gray-700 font-medium">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
