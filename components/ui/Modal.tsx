import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl border border-green-500/50 shadow-[0_0_25px_rgba(16,185,129,0.5)] transform transition-all duration-300 scale-95 animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-green-400 neon-text">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
      {/* FIX: The `jsx` attribute is specific to styled-jsx (used in frameworks like Next.js) and is not a standard React prop for the <style> element. Removing it resolves the type error. */}
      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Modal;