"use client";

import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

/**
 * Error Boundary Component
 * Catches React component errors and displays fallback UI
 * Prevents entire app from crashing on component errors
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: undefined };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error details for debugging
        console.error('Error caught by boundary:', error, errorInfo);

        // TODO: Send to error tracking service (e.g., Sentry, LogRocket)
        // trackError(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <ErrorFallback error={this.state.error} />;
        }

        return this.props.children;
    }
}

/**
 * Default Error Fallback UI
 * Shows when ErrorBoundary catches an error
 */
function ErrorFallback({ error }: { error?: Error }) {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#201612] px-6">
            <div className="text-center max-w-md">
                {/* Error Icon */}
                <span className="material-symbols-outlined text-8xl text-primary mb-6 block">
                    error
                </span>

                {/* Error Title */}
                <h1 className="text-3xl font-bold text-white mb-4">
                    Something Went Wrong
                </h1>

                {/* Error Message */}
                <p className="text-white/60 mb-2 text-sm leading-relaxed">
                    {error?.message || 'An unexpected error occurred'}
                </p>

                {/* Development Error Details */}
                {process.env.NODE_ENV === 'development' && error?.stack && (
                    <details className="mt-4 mb-6 text-left">
                        <summary className="text-white/40 text-xs cursor-pointer hover:text-white/60">
                            Show Error Details
                        </summary>
                        <pre className="mt-2 p-4 bg-black/40 rounded-lg text-xs text-white/60 overflow-auto max-h-48">
                            {error.stack}
                        </pre>
                    </details>
                )}

                {/* Reload Button */}
                <button
                    onClick={handleReload}
                    className="mt-6 px-6 py-3 bg-primary rounded-full text-white font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 active:scale-95"
                >
                    Reload Page
                </button>

                {/* Additional Help */}
                <p className="text-white/40 text-xs mt-6">
                    If the problem persists, please clear your browser cache or contact support.
                </p>
            </div>
        </div>
    );
}
