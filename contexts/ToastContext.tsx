
import React, { createContext, useState, useCallback, useContext, ReactNode } from 'react';

type ToastStatus = 'success' | 'error' | 'warning' | 'info';

interface ToastMessage {
  id: number;
  title: string;
  description?: string;
  status: ToastStatus;
}

interface ToastContextType {
  addToast: (options: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const statusStyles: Record<ToastStatus, { bg: string, text: string, icon: ReactNode }> = {
  success: { bg: 'bg-green-500', text: 'text-white', icon: <hero-icon-outline-check-circle class="h-6 w-6 mr-3"/> },
  error: { bg: 'bg-red-500', text: 'text-white', icon: <hero-icon-outline-x-circle class="h-6 w-6 mr-3"/> },
  warning: { bg: 'bg-yellow-500', text: 'text-white', icon: <hero-icon-outline-exclamation-triangle class="h-6 w-6 mr-3"/> },
  info: { bg: 'bg-blue-500', text: 'text-white', icon: <hero-icon-outline-information-circle class="h-6 w-6 mr-3"/> },
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((options: Omit<ToastMessage, 'id'>) => {
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { id, ...options }]);
    setTimeout(() => {
      setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-5 right-5 z-50 flex flex-col items-end space-y-3">
        {toasts.map((toast) => {
          const styles = statusStyles[toast.status];
          return (
            <div
              key={toast.id}
              className={`flex items-center p-4 rounded-lg shadow-lg text-white ${styles.bg} ${styles.text} animate-fade-in-right`}
            >
              {styles.icon}
              <div>
                <p className="font-bold">{toast.title}</p>
                {toast.description && <p className="text-sm">{toast.description}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.addToast;
};
