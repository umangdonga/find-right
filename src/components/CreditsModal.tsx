import React from 'react';
import { Sparkles, Check, ShieldCheck, RotateCcw } from 'lucide-react';
import { StarterCredit } from '../types';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  credits: StarterCredit[];
  onUseCreditClick: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({
  isOpen,
  onClose,
  credits,
  onUseCreditClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#6E3FF3] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#110D17]">Starter Hire Credits</h3>
              <p className="text-xs text-gray-500">FindRight hiring incentives for rising talent</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {credits.map((c) => (
            <div
              key={c.id}
              className={`p-4 rounded-2xl border-2 flex items-center justify-between ${
                c.status === 'applied'
                  ? 'border-purple-300 bg-purple-50/50'
                  : 'border-[#6E3FF3] bg-[#FCFAFF]'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-[#6E3FF3] bg-purple-100 px-2 py-0.5 rounded-md">
                    {c.name}
                  </span>
                  <span className="text-xs font-black text-gray-900">{c.discountPercent}% OFF</span>
                </div>
                <div className="text-xs text-gray-600">Up to ₹{c.maxAmount.toLocaleString()} discount</div>
                <div className="text-[11px] text-gray-400 mt-1">{c.validFor}</div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  c.status === 'applied'
                    ? 'bg-purple-100 text-[#6E3FF3]'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {c.status === 'applied' ? 'In Use' : 'Available'}
              </span>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2 mb-6">
          <h4 className="font-bold text-gray-900">How do starter credits work?</h4>
          <ul className="space-y-1.5 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">✓</span>
              <span>Encourages hiring verified rising talent (fresher &amp; intermediate designers).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold">✓</span>
              <span>Applied instantly at checkout — deducts 15% from the agreed contract price.</span>
            </li>
            <li className="flex items-start gap-2">
              <RotateCcw className="w-3.5 h-3.5 text-[#6E3FF3] shrink-0 mt-0.5" />
              <span>
                <strong>Mid-project protection:</strong> If a freelancer ever leaves before completion, your starter credit is immediately restored!
              </span>
            </li>
          </ul>
        </div>

        <div className="flex justify-end gap-2 text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onUseCreditClick();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#6E3FF3] text-white font-semibold"
          >
            Hire Rising Talent Now
          </button>
        </div>
      </div>
    </div>
  );
};
