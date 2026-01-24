import React from 'react';
import { Navigate } from 'react-router-dom';
import { Shield, Loader2 } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

function ProtectedRoute({ children }) {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              backgroundImage: `linear-gradient(#CC6500 1px, transparent 1px), linear-gradient(90deg, #CC6500 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          ></div>
        </div>

        {/* Loading content */}
        <div className="relative z-10 text-center">
          {/* Shield icon with glow effect */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
            <div className="relative p-6 rounded-full bg-gray-900/50 border-2 border-primary/30 backdrop-blur-sm">
              <Shield className="w-16 h-16 text-primary animate-pulse" />
            </div>
          </div>

          {/* Loading text */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <h2 className="text-2xl font-bold text-white">
                Verifying Access
              </h2>
            </div>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Checking admin credentials and permissions...
            </p>
          </div>

          {/* Animated progress bar */}
          <div className="mt-8 w-64 mx-auto">
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary via-orange-400 to-primary bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-primary/20 rounded-tl-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-primary/20 rounded-br-3xl"></div>

        <style>{`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}</style>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;