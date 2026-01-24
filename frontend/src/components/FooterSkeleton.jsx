import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function FooterSkeleton() {
  const { theme } = useTheme();

  return (
    <footer className={`relative transition-colors duration-300 font-sans ${
      theme === 'dark' ? 'bg-black' : 'bg-gray-900'
    }`}>
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-900/5"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Contact Section Skeleton */}
        <div className="px-4 sm:px-6 pt-12 pb-8">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-800 rounded-lg w-80 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-800 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          
          {/* Contact Cards Skeleton */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gray-700 rounded-xl animate-pulse flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-6 bg-gray-700 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-40 animate-pulse"></div>
                  </div>
                </div>
                <div className="h-6 bg-gray-700 rounded w-36 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-28 mb-3 animate-pulse"></div>
                <div className="h-3 bg-gray-700 rounded w-32 animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Office Information Skeleton */}
          <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg animate-pulse flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-gray-700 rounded w-32 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-48 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-40 animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded w-28 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content Skeleton */}
        <div className="px-6 py-12 border-t border-gray-800">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info Skeleton */}
            <div className="lg:col-span-1">
              <div className="mb-6 space-y-2">
                <div className="h-8 bg-gray-800 rounded w-48 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-32 animate-pulse"></div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="h-4 bg-gray-800 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse"></div>
              </div>
              
              {/* Social Links Skeleton */}
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-lg bg-gray-800 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            {/* Services Skeleton */}
            <div>
              <div className="h-6 bg-gray-800 rounded w-32 mb-6 animate-pulse"></div>
              <ul className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <li key={i}>
                    <div className="h-4 bg-gray-800 rounded w-40 animate-pulse"></div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Skeleton */}
            <div>
              <div className="h-6 bg-gray-800 rounded w-28 mb-6 animate-pulse"></div>
              <ul className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <li key={i}>
                    <div className="h-4 bg-gray-800 rounded w-36 animate-pulse"></div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Emergency Contact Skeleton */}
            <div>
              <div className="h-6 bg-gray-800 rounded w-40 mb-6 animate-pulse"></div>
              <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700/50">
                <div className="h-4 bg-gray-700 rounded w-24 mb-2 animate-pulse"></div>
                <div className="h-7 bg-gray-700 rounded w-36 mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-full mb-4 animate-pulse"></div>
                <div className="h-12 bg-gray-700 rounded-lg w-full animate-pulse"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar Skeleton */}
        <div className="border-t border-gray-800 px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="h-4 bg-gray-800 rounded w-80 animate-pulse"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}