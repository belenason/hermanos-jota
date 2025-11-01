import { useEffect } from 'react';

export default function Toast({ show, message, onClose, duration = 2000 }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div role="status" aria-live="polite" className="position-fixed bottom-0 end-0 p-3 toast-wrapper">
      <div className="shadow rounded-3 text-white px-3 py-2 d-flex align-items-center toast-content">
        <span className="flex-grow-1">{message}</span>
      </div>
    </div>
  );
}