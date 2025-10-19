// src/components/Dialog.jsx
import { useEffect, useRef } from "react";
type props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
const Dialog = ({ isOpen, onClose, children }: props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Use a useEffect to control the native dialog methods
  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isOpen) {
      dialogElement.showModal();
      document.body.style.overflow = "hidden"; // Prevents background scroll
    } else {
      dialogElement.close();
      document.body.style.overflow = "";
    }

    // Cleanup function to remove event listener
    return () => {
      dialogElement.removeEventListener("close", onClose);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose} // Closes the dialog when the "Escape" key is pressed
      className="bg-transparent p-0 backdrop:bg-black/50 overflow-hidden" // Tailwind classes for styling
    >
      <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
        <div className="relative rounded-lg bg-white p-6 shadow-xl">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default Dialog;
