import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, ShieldCheck, RefreshCw, CheckCircle2, RotateCcw } from 'lucide-react';
import { Project, NavView } from '../types';

interface ExitPolicyViewProps {
  project: Project;
  onNavigate: (view: NavView) => void;
  onBack: () => void;
  onSimulateFreelancerExit: (exitProgress: number) => void;
}

export const ExitPolicyView: React.FC<ExitPolicyViewProps> = ({
  project,
  onNavigate,
  onBack,
  onSimulateFreelancerExit,
}) => {
  const [sliderProgress, setSliderProgress] = useState<number>(60);
  const [exitSimulated, setExitSimulated] = useState<boolean>(false);

  const contractTotal = project.contractTotal || 6800;
  const advanceInEscrow = project.advancePaid || 680;

  // Calculate exit cut percentage based on table in PDF 2 Page 14
  const getExitCutPct = (prog: number): number => {
    if (prog < 25) return 0.5; // 50%
    if (prog < 50) return 0.3; // 30%
    if (prog < 75) return 0.2; // 20%
    if (prog < 100) return 0.1; // 10%
    return 0; // 0%
  };

  const exitCutPct = getExitCutPct(sliderProgress);
  const earnedAmount = Math.round(contractTotal * (sliderProgress / 100));
  const exitCutAmount = Math.round(earnedAmount * exitCutPct);
  const freelancerKeeps = earnedAmount - exitCutAmount;
  const clientPaysRemaining = Math.max(0, freelancerKeeps - advanceInEscrow);
  const clientRefundFromEscrow = Math.max(0, advanceInEscrow - freelancerKeeps);

  const handleTriggerExit = () => {
    onSimulateFreelancerExit(sliderProgress);
    setExitSimulated(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#6E3FF3] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </button>

      {/* Main Title matching PDF 2 Page 14 */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#110D17]">
          If a freelancer leaves mid-project
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Payout is based on approved progress, minus an exit cut that stays with the client.
        </p>
      </div>

      {exitSimulated && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
            <span>
              <strong>Mid-project exit processed!</strong> Escrow adjusted and starter credit restored to your account.
            </span>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="px-3 py-1 bg-amber-600 text-white rounded-lg font-semibold text-xs"
          >
            View Projects
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Exit Payout Table & What Happens Next (Page 14) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Table Card matching PDF 2 Page 14 */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-[#110D17]">Exit payout table</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase">
                    <th className="py-2.5 pr-4">Work done at exit</th>
                    <th className="py-2.5 px-4 text-purple-700">Exit cut</th>
                    <th className="py-2.5 pl-4 text-right text-gray-700">Freelancer keeps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  <tr className={sliderProgress < 25 ? 'bg-purple-50/70 font-bold' : ''}>
                    <td className="py-3 pr-4 text-gray-900">Below 25%</td>
                    <td className="py-3 px-4 text-purple-600">50% of earned amount</td>
                    <td className="py-3 pl-4 text-right text-emerald-600">50%</td>
                  </tr>
                  <tr className={sliderProgress >= 25 && sliderProgress < 50 ? 'bg-purple-50/70 font-bold' : ''}>
                    <td className="py-3 pr-4 text-gray-900">25% – 50%</td>
                    <td className="py-3 px-4 text-purple-600">30% of earned amount</td>
                    <td className="py-3 pl-4 text-right text-emerald-600">70%</td>
                  </tr>
                  <tr className={sliderProgress >= 50 && sliderProgress < 75 ? 'bg-purple-50/70 font-bold' : ''}>
                    <td className="py-3 pr-4 text-gray-900">50% – 75%</td>
                    <td className="py-3 px-4 text-purple-600">20% of earned amount</td>
                    <td className="py-3 pl-4 text-right text-emerald-600">80%</td>
                  </tr>
                  <tr className={sliderProgress >= 75 && sliderProgress < 100 ? 'bg-purple-50/70 font-bold' : ''}>
                    <td className="py-3 pr-4 text-gray-900">75% – 99%</td>
                    <td className="py-3 px-4 text-purple-600">10% of earned amount</td>
                    <td className="py-3 pl-4 text-right text-emerald-600">90%</td>
                  </tr>
                  <tr className={sliderProgress === 100 ? 'bg-purple-50/70 font-bold' : ''}>
                    <td className="py-3 pr-4 text-gray-900">Final work submitted</td>
                    <td className="py-3 px-4 text-gray-400">No cut</td>
                    <td className="py-3 pl-4 text-right text-emerald-600">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* What happens next matching PDF 2 Page 14 */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-3">
            <h3 className="font-extrabold text-base text-[#110D17]">What happens next</h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 text-gray-700">
                <span className="text-emerald-600 font-bold text-sm">✓</span>
                <span>
                  <strong>Earned amount</strong> = contract total × approved progress
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-gray-700">
                <span className="text-emerald-600 font-bold text-sm">✓</span>
                <span>
                  The <strong>10% advance already in escrow</strong> counts toward the payout
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-gray-700">
                <span className="text-emerald-600 font-bold text-sm">✓</span>
                <span>
                  Remaining escrow is <strong>refunded to the client</strong>
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-gray-700">
                <span className="text-emerald-600 font-bold text-sm">✓</span>
                <span>
                  Client can re-post the job and <strong>the starter credit is restored</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Calculator & Freelancer View Action (PDF 2 Page 14) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Interactive Calculation Card matching Page 14 */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-[#110D17]">
                Live Simulator: leaves at {sliderProgress}%
              </h3>
            </div>

            {/* Slider to test different progress percentages */}
            <div className="space-y-1.5 pb-2">
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>Test exit at:</span>
                <span className="font-bold text-[#6E3FF3]">{sliderProgress}% progress</span>
              </div>
              <input
                type="range"
                min="5"
                max="95"
                step="5"
                value={sliderProgress}
                onChange={(e) => setSliderProgress(Number(e.target.value))}
                className="w-full accent-[#6E3FF3] cursor-pointer"
              />
            </div>

            {/* Live calculation breakdown matching Page 14 */}
            <div className="space-y-2.5 py-3 border-y border-gray-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Contract total</span>
                <span className="font-semibold text-gray-800">
                  ₹{contractTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Earned ({sliderProgress}%)</span>
                <span className="font-semibold text-gray-800">
                  ₹{earnedAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-purple-700">
                <span>Exit cut ({Math.round(exitCutPct * 100)}%)</span>
                <span className="font-semibold">- ₹{exitCutAmount.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-sm">
                <span className="font-bold text-[#110D17]">Freelancer receives</span>
                <span className="font-black text-[#6E3FF3]">
                  ₹{freelancerKeeps.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-gray-500 text-[11px] pt-1">
                <span>Already in escrow (10%)</span>
                <span>₹{advanceInEscrow.toLocaleString()}</span>
              </div>

              {clientPaysRemaining > 0 ? (
                <div className="flex items-center justify-between text-gray-800 font-semibold text-xs">
                  <span>Client pays now</span>
                  <span>₹{clientPaysRemaining.toLocaleString()}</span>
                </div>
              ) : (
                <div className="flex items-center justify-between text-emerald-700 font-semibold text-xs">
                  <span>Client refund from escrow</span>
                  <span>₹{clientRefundFromEscrow.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Restored Credit Guarantee */}
            <div className="p-3 rounded-2xl bg-purple-50 text-[11px] text-purple-900 flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5 text-[#6E3FF3] shrink-0" />
              <span>
                Your <strong>15% Starter Credit is automatically restored</strong> if this contract exits early.
              </span>
            </div>
          </div>

          {/* Freelancer View: Leave Project Box matching PDF 2 Page 14 */}
          <div className="p-6 rounded-3xl bg-white border border-rose-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-rose-600 font-extrabold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Freelancer view · Leave project</span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              You are at <strong>{sliderProgress}% progress</strong>. If you leave now you will receive{' '}
              <strong className="text-gray-900">₹{freelancerKeeps.toLocaleString()}</strong> and your reliability score will drop.
            </p>

            <div className="space-y-2">
              <button
                onClick={handleTriggerExit}
                className="w-full py-2.5 rounded-xl border border-rose-300 text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors"
              >
                Leave project
              </button>

              <button
                onClick={onBack}
                className="w-full py-2.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Keep working
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
