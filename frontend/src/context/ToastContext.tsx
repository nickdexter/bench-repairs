import { createContext, useContext, useState, type ReactNode } from 'react';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
    isExiting?: boolean;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = (id: number) => {
        // Mark toast as exiting to trigger slide-down animation
        setToasts((prev) =>
            prev.map((t) => (t.id === id ? { ...t, isExiting: true } : t))
        );

        // Remove from state after animation finishes (300ms)
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 300);
    };

    const showToast = (message: string, type: ToastType = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type, isExiting: false }]);

        // Start exit animation after 3.7 seconds (total display time ~4s)
        setTimeout(() => {
            removeToast(id);
        }, 3700);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-5 right-5 z-50 space-y-3 w-80 sm:w-96 pointer-events-none overflow-hidden pb-4">
                {toasts.map((t) => {
                    const isSuccess = t.type === 'success';
                    const isError = t.type === 'error';

                    return (
                        <div
                            key={t.id}
                            className={`pointer-events-auto rounded-md p-4 shadow-lg border ${t.isExiting ? 'animate-slide-down' : 'animate-slide-up'
                                } ${isSuccess
                                    ? 'bg-green-50 border-green-200 text-green-800'
                                    : isError
                                        ? 'bg-red-50 border-red-200 text-red-800'
                                        : 'bg-slate-50 border-slate-200 text-slate-800'
                                }`}
                        >
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    {isSuccess && <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />}
                                    {isError && <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />}
                                    {!isSuccess && !isError && <InformationCircleIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />}
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium">
                                        {t.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}