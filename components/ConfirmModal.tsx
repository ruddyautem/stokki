"use client";

import { X, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  isLoading = false,
}: ConfirmModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
      onClose();
    }
  };

  const handleBackdropKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      (e.key === "Enter" || e.key === " ") &&
      e.target === e.currentTarget &&
      !isLoading
    ) {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      onClick={handleBackdropClick}
      onKeyDown={handleBackdropKeyDown}
      role='dialog'
      aria-modal='true'
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      {/* Backdrop */}
      <div
        className='absolute inset-0 min-h-screen bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200'
        aria-hidden='true'
      />

      {/* Modal */}
      <div className='relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200'>
        {/* Close button */}
        <button
          type='button'
          onClick={onClose}
          disabled={isLoading}
          className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50'
          aria-label='Fermer'
        >
          <X className='w-5 h-5' />
        </button>

        {/* Icon */}
        <div
          className='flex items-center justify-center mb-4'
          aria-hidden='true'
        >
          <div className='bg-red-100 rounded-full p-3'>
            <AlertTriangle className='w-8 h-8 text-red-600' />
          </div>
        </div>

        {/* Content */}
        <div className='text-center mb-6'>
          <h3
            id='modal-title'
            className='text-xl font-bold text-slate-900 mb-2'
          >
            {title}
          </h3>
          <p id='modal-description' className='text-slate-600'>
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className='flex gap-3'>
          <button
            onClick={onClose}
            disabled={isLoading}
            className='flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
            type='button'
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className='flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md cursor-pointer'
            type='button'
          >
            {isLoading ? "Traitement..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
