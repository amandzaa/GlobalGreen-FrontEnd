// components/ui/Modal.tsx
import React, { ReactNode, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnClickOutside?: boolean;
  showCloseButton?: boolean;
  footer?: ReactNode;
  overlayOpacity?: number; // 0-100 percentage of opacity
}

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md', 
  closeOnClickOutside = true,
  showCloseButton = true,
  footer,
  overlayOpacity = 30 // 30% opacity by default
}: ModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Small delay to ensure the animation starts properly
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
      
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else if (isVisible) {
      // Start closing animation
      setIsVisible(false);
      
      // Wait for animation to complete before unmounting
      const timeout = setTimeout(() => {
        setIsAnimating(false);
        document.body.style.overflow = 'auto';
      }, 300); // Match this with the CSS transition duration
      
      return () => clearTimeout(timeout);
    }
  }, [isOpen, isVisible]);
  
  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      // Ensure body scroll is restored when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  // Don't render anything if not animating and not open
  if (!isAnimating && !isOpen) return null;
  
  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
  };
  
  const modalContent = (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        !isVisible && !isOpen ? 'pointer-events-none' : ''
      }`}
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay with transition */}
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-300 ease-in-out"
        style={{ 
          opacity: isVisible ? overlayOpacity / 100 : 0,
          pointerEvents: isVisible ? 'auto' : 'none' 
        }}
        onClick={closeOnClickOutside && isVisible ? onClose : undefined}
        aria-hidden="true"
      ></div>
      
      {/* Modal content with transition */}
      <div 
        className={`bg-white rounded-md shadow-lg w-full ${sizeClasses[size]} z-10 max-h-[90vh] flex flex-col transition-all duration-300 ease-in-out ${
          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}
        style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium">{title}</h2>
            {showCloseButton && (
              <button 
                onClick={onClose} 
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        
        <div className="p-6 overflow-y-auto flex-grow">{children}</div>
        
        {footer && (
          <div className="border-t border-gray-200 p-4">{footer}</div>
        )}
      </div>
    </div>
  );
  
  // Use portal to render modal at the document body level and clean up properly when not needed
  return (isAnimating || isOpen) && typeof window !== 'undefined' 
    ? createPortal(modalContent, document.body) 
    : null;
};

export default Modal;