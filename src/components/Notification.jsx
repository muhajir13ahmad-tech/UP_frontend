import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Notification({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`notification-toast ${type === 'error' ? 'toast-error' : 'toast-success'}`}>
      <div className="toast-icon">
        {type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
      </div>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={onClose} type="button">
        <X size={16} />
      </button>
    </div>
  );
}
