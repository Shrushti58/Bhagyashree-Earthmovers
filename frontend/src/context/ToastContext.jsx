import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

// Toast Component
const Toast = ({ id, message, type, onClose }) => {
  const config = {
    success: {
      icon: CheckCircle,
      bgClass: 'bg-green-500',
      borderClass: 'border-green-600'
    },
    error: {
      icon: AlertCircle,
      bgClass: 'bg-red-500',
      borderClass: 'border-red-600'
    },
    warning: {
      icon: AlertTriangle,
      bgClass: 'bg-yellow-500',
      borderClass: 'border-yellow-600'
    },
    info: {
      icon: Info,
      bgClass: 'bg-blue-500',
      borderClass: 'border-blue-600'
    }
  };

  const { icon: Icon, bgClass, borderClass } = config[type] || config.info;

  return (
    <div
      className={`${bgClass} ${borderClass} border-2 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[320px] max-w-md animate-slide-in`}
    >
      <Icon className="w-6 h-6 flex-shrink-0" />
      <p className="flex-1 font-medium text-sm">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="hover:bg-white/20 p-1 rounded transition-colors flex-shrink-0"
        aria-label="Close notification"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

// Toast Container
const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-3">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={removeToast}
          />
        ))}
      </div>
    </div>
  );
};

// Toast Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = {
    success: (message, duration) => addToast(message, 'success', duration),
    error: (message, duration) => addToast(message, 'error', duration),
    warning: (message, duration) => addToast(message, 'warning', duration),
    info: (message, duration) => addToast(message, 'info', duration),
    remove: removeToast
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

