interface LoadingSpinnerProps {
    isAnimating: boolean;
  }
  
  export function LoadingSpinner({ isAnimating }: LoadingSpinnerProps) {
    if (!isAnimating) return null;
    
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-30 z-10">
        <div className="w-8 h-8 border-4 border-t-[var(--color-primary)] border-[var(--color-paleGreen)] rounded-full animate-spin"></div>
      </div>
    );
  }