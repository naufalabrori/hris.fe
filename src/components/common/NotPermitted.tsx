import { XCircle } from 'lucide-react';

export const NotPermitted = () => {
  return (
    <div className="h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <XCircle className="w-16 h-16 text-red-500 mx-auto" />
        <h1 className="text-2xl font-semibold text-gray-900">Access Denied</h1>
        <p className="text-gray-600">You do not have permission to access this page.</p>
      </div>
    </div>
  );
};
