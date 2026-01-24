import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function MachinerySkeleton() {
  const { theme } = useTheme();
  return (
    <div className={`relative py-12 lg:py-20 overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-brand-black' : 'bg-brand-white'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#CC6500 1px, transparent 1px), linear-gradient(90deg, #CC6500 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          {/* Badge Skeleton */}
          <div className="flex justify-center mb-4">
            <div className={`h-8 w-32 rounded-full animate-pulse ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
            }`}></div>
          </div>
          
          {/* Title Skeleton */}
          <div className="flex justify-center">
            <div className={`h-12 w-80 rounded-lg animate-pulse ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
            }`}></div>
          </div>
          
          {/* Subtitle Skeleton */}
          <div className="flex justify-center">
            <div className={`h-6 w-96 rounded-lg animate-pulse ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
            }`}></div>
          </div>
        </div>

        {/* Machinery Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className={`rounded-xl overflow-hidden border ${
                theme === 'dark'
                  ? 'bg-gray-900 border-gray-800'
                  : 'bg-white border-gray-200'
              }`}
            >
              {/* Image Skeleton */}
              <div className={`h-64 animate-pulse ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <div className="absolute top-4 right-4">
                  <div className={`h-8 w-24 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className={`h-7 w-32 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                </div>
              </div>

              {/* Content Skeleton */}
              <div className="p-6 space-y-4">
                {/* Title Skeleton */}
                <div className="space-y-2">
                  <div className={`h-7 w-3/4 rounded animate-pulse ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                  }`}></div>
                </div>

                {/* Best For Section Skeleton */}
                <div className={`p-4 rounded-lg space-y-2 ${
                  theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}>
                  <div className={`h-3 w-20 rounded animate-pulse ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                  <div className={`h-4 w-full rounded animate-pulse ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                  <div className={`h-4 w-2/3 rounded animate-pulse ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                </div>

                {/* Pricing Skeleton */}
                <div className={`flex items-baseline gap-2 pt-2 border-t ${
                  theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                }`}>
                  <div className={`h-9 w-28 rounded animate-pulse ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                  }`}></div>
                  <div className={`h-4 w-16 rounded animate-pulse ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                  }`}></div>
                </div>

                {/* Buttons Skeleton */}
                <div className="flex gap-3 pt-2">
                  <div className={`flex-1 h-12 rounded-lg animate-pulse ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                  }`}></div>
                  <div className={`h-12 w-12 rounded-lg animate-pulse ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
                  }`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Skeleton */}
        <div className={`mt-12 p-6 rounded-2xl border ${
          theme === 'dark'
            ? 'bg-gray-900/80 border-gray-800'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left space-y-2 flex-1">
              <div className={`h-7 w-64 rounded animate-pulse ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
              }`}></div>
              <div className={`h-5 w-96 rounded animate-pulse ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
              }`}></div>
            </div>

            <div className="flex gap-3">
              <div className={`h-12 w-32 rounded-lg animate-pulse ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
              }`}></div>
              <div className={`h-12 w-28 rounded-lg animate-pulse ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
              }`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}