'use client';

import { useEffect } from 'react';

type EmailModalProps = {
  open: boolean;
  onClose: () => void;
  email: string;
};

export default function EmailModal({ open, onClose, email }: EmailModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-xl font-semibold text-gray-900">Stay in touch</h3>
        <p className="mt-2 text-sm text-gray-600">
          Email us directly at <a className="font-medium text-black underline" href={`mailto:${email}`}>{email}</a> or leave your
          email below and we will reach out.
        </p>
        <form className="mt-4 flex gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button type="button" className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800">
            Submit
          </button>
        </form>
        <button onClick={onClose} className="absolute right-3 top-3 h-8 w-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200">×</button>
      </div>
    </div>
  );
}


