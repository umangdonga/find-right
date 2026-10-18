import React, { useState } from 'react';
import { Project, Freelancer, HireRequest, NavView, StarterCredit } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
  Calendar,
  IndianRupee,
  Sparkles,
  MessageSquare,
  Video,
  FileCheck2,
  Plus,
  Trash2,
  AlertCircle,
  Clock,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface FinalizeProjectDetailsViewProps {
  project: Project;
  freelancer: Freelancer;
  request?: HireRequest | null;
  credits: StarterCredit[];
  onBack: () => void;
  onProceedToHireAndPayment: (finalizedTerms: {
    agreedPrice: number;
    deliverables: string[];
    deadline: string;
    aiPolicy: Project['aiPolicy'];
    revisionRounds: number;
    scopeNotes: string;
  }) => void;
  onOpenChat: (freelancerId: string) => void;
  onStartVideoCall: () => void;
}

export const FinalizeProjectDetailsView: React.FC<FinalizeProjectDetailsViewProps> = ({
  project,
  freelancer,
  request,
  credits,
  onBack,
  onProceedToHireAndPayment,
  onOpenChat,
  onStartVideoCall,
}) => {
  // Initial pre-filled values from proposal & project
  const initialPrice = request?.proposedPrice || project.agreedPrice || project.budgetMin || 7500;
  const [agreedPrice, setAgreedPrice] = useState<number>(initialPrice);
  const [deadline, setDeadline] = useState<string>(project.deadline || 'Nov 6, 2026');
  const [revisionRounds, setRevisionRounds] = useState<number>(2);
  const [aiPolicy, setAiPolicy] = useState<Project['aiPolicy']>(project.aiPolicy || 'AI-assisted ideation only');
  const [scopeNotes, setScopeNotes] = useState<string>(
    'Client and designer agreed on warm earth tones, mobile-first responsive layout, and Figma component handoff.'
  );

  const [deliverablesList, setDeliverablesList] = useState<string[]>([
    '6 high-fidelity responsive screens in Figma (Desktop & Mobile)',
    'Interactive clickable prototype for user testing',
    'Reusable design system component library & typography tokens',
    'Final asset kit export (SVG icons, high-res images, and CSS tokens)',
  ]);
  const [newDeliverableInput, setNewDeliverableInput] = useState('');

  // Confirmation checkboxes for Step 6
  const [discussedViaChatOrVideo, setDiscussedViaChatOrVideo] = useState(true);
  const [agreedOnScopeAndPrice, setAgreedOnScopeAndPrice] = useState(true);
  const [acceptedAiPolicy, setAcceptedAiPolicy] = useState(true);

  const handleAddDeliverable = () => {
    if (!newDeliverableInput.trim()) return;
    setDeliverablesList((prev) => [...prev, newDeliverableInput.trim()]);
    setNewDeliverableInput('');
  };

  const handleRemoveDeliverable = (index: number) => {
    setDeliverablesList((prev) => prev.filter((_, i) => i !== index));
  };

  const isConfirmationReady =
    discussedViaChatOrVideo &&
    agreedOnScopeAndPrice &&
    acceptedAiPolicy &&
    deliverablesList.length > 0 &&
    agreedPrice > 0;

  const advance10Percent = Math.round(agreedPrice * 0.1);
  const final90Percent = agreedPrice - advance10Percent;

  const handleConfirmAndProceed = () => {
    if (!isConfirmationReady) return;
    onProceedToHireAndPayment({
      agreedPrice,
      deliverables: deliverablesList,
      deadline,
      aiPolicy,
      revisionRounds,
      scopeNotes,
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Back button & Stepper header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#6E3FF3] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to applicants</span>
        </button>

        {/* 7-Step breadcrumb indicator */}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold overflow-x-auto pb-1 text-gray-400">
          <span className="text-emerald-600 flex items-center gap-0.5">
            <Check className="w-3 h-3 stroke-[3]" /> 1. Review
          </span>
          <span>→</span>
          <span className="text-emerald-600 flex items-center gap-0.5">
            <Check className="w-3 h-3 stroke-[3]" /> 2. Selected
          </span>
          <span>→</span>
          <span className="text-emerald-600 flex items-center gap-0.5">
            <Check className="w-3 h-3 stroke-[3]" /> 3. Chat
          </span>
          <span>→</span>
          <span className="text-emerald-600 flex items-center gap-0.5">
            <Check className="w-3 h-3 stroke-[3]" /> 4. Video
          </span>
          <span>→</span>
          <span className="text-[#6E3FF3] font-bold bg-purple-100 px-2 py-0.5 rounded-md">
            5. Finalize Details
          </span>
          <span>→</span>
          <span className="text-gray-500 font-medium">6. Confirm Hire</span>
          <span>→</span>
          <span className="text-gray-400 font-normal">7. Payment</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-purple-50 rounded-3xl border border-purple-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#6E3FF3] text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
            {freelancer.initials}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-[#110D17]">
                Step 5: Finalize Project Scope &amp; Terms
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-[#6E3FF3] text-[11px] font-bold border border-purple-200">
                With {freelancer.name}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1 max-w-xl">
              Lock in the exact deliverables, agreed contract price, timeline, and AI policy. Once
              both sides agree, confirm hiring before moving to the 10% advance escrow deposit.
            </p>
          </div>
        </div>

        {/* Quick Chat & Video Call Shortcuts */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => onOpenChat(freelancer.id)}
            className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-[#6E3FF3] text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
            title="Open chat with freelancer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#6E3FF3]" />
            <span>Chat</span>
          </button>
          <button
            onClick={onStartVideoCall}
            className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-[#6E3FF3] text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
            title="Launch video meeting"
          >
            <Video className="w-3.5 h-3.5 text-[#6E3FF3]" />
            <span>Video Call</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Finalization Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Detailed Terms & Agreement (Step 5) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Agreed Scope & Deliverables */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#6E3FF3]" />
                <h3 className="font-extrabold text-sm sm:text-base text-[#110D17]">
                  1. Agreed Deliverables Checklist
                </h3>
              </div>
              <span className="text-[11px] text-gray-500 font-medium">
                {deliverablesList.length} items included
              </span>
            </div>

            <p className="text-xs text-gray-500 leading-normal">
              These are the concrete project items {freelancer.name} must deliver before the 90%
              final payment is approved and released from escrow.
            </p>

            <div className="space-y-2">
              {deliverablesList.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#FAF8FC] border border-purple-50 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-purple-100 text-[#6E3FF3] flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-gray-800 font-medium">{item}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveDeliverable(idx)}
                    className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                    title="Remove deliverable"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Custom Deliverable row */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newDeliverableInput}
                onChange={(e) => setNewDeliverableInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDeliverable())}
                placeholder="Add another deliverable agreed in chat (e.g. Dark mode variation)..."
                className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#6E3FF3]"
              />
              <button
                type="button"
                onClick={handleAddDeliverable}
                className="px-3.5 py-2 bg-purple-100 hover:bg-purple-200 text-[#6E3FF3] rounded-xl text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Section 2: Agreed Price & Escrow Schedule */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-[#6E3FF3]" />
                <h3 className="font-extrabold text-sm sm:text-base text-[#110D17]">
                  2. Agreed Contract Fee &amp; Payment Schedule
                </h3>
              </div>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
                Protected by Escrow
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Final Agreed Contract Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-gray-500 text-sm font-bold">₹</span>
                  <input
                    type="number"
                    value={agreedPrice}
                    onChange={(e) => setAgreedPrice(Number(e.target.value))}
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-bold text-[#110D17] focus:outline-none focus:border-[#6E3FF3]"
                  />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">
                  Original quote: ₹{initialPrice.toLocaleString()} · Both sides can agree on updates
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Target Delivery Deadline
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#6E3FF3]"
                  />
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">
                  Expected completion in ~2–3 weeks
                </span>
              </div>
            </div>

            {/* Escrow Distribution Diagram */}
            <div className="p-4 rounded-2xl bg-[#F8F6FC] border border-purple-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-gray-500 font-medium">10% Advance Deposit (Step 7)</span>
                <div className="text-xl font-black text-[#6E3FF3]">
                  ₹{advance10Percent.toLocaleString()}
                </div>
                <p className="text-[10px] text-gray-500">
                  Funded into FindRight Escrow to start work safely. Refundable if designer does not begin.
                </p>
              </div>

              <div className="space-y-1 sm:border-l sm:border-purple-200 sm:pl-4">
                <span className="text-gray-500 font-medium">90% Released on Final Approval</span>
                <div className="text-xl font-black text-[#110D17]">
                  ₹{final90Percent.toLocaleString()}
                </div>
                <p className="text-[10px] text-gray-500">
                  Released ONLY after you review final Figma files &amp; approve deliverables.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Revisions & AI Policy Agreement */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm sm:text-base text-[#110D17]">
              3. AI Usage &amp; Revisions Agreement
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  AI Usage Policy for this Project
                </label>
                <select
                  value={aiPolicy}
                  onChange={(e: any) => setAiPolicy(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#6E3FF3] bg-white font-medium"
                >
                  <option value="AI-assisted ideation only">
                    AI-assisted ideation only (Final UI 100% human crafted)
                  </option>
                  <option value="No AI (100% human-made)">
                    No AI (100% human-made strictly)
                  </option>
                  <option value="AI-supported design">
                    AI-supported design (AI allowed with upfront disclosure)
                  </option>
                </select>
                <span className="text-[10px] text-gray-400 mt-1 block">
                  Freelancer disclosed: {freelancer.primaryTag}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Revision Rounds Included
                </label>
                <div className="flex items-center gap-2">
                  {[2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRevisionRounds(num)}
                      className={`flex-1 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                        revisionRounds === num
                          ? 'border-[#6E3FF3] bg-purple-50 text-[#6E3FF3]'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {num} Rounds
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 block">
                  Included without extra charge
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Collaboration Notes &amp; Brand Guidelines agreed in Chat/Video
              </label>
              <textarea
                rows={2}
                value={scopeNotes}
                onChange={(e) => setScopeNotes(e.target.value)}
                placeholder="Add special notes from your chat with the designer..."
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#6E3FF3]"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Step 6 Mutual Confirmation & Next to Step 7 Payment */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-4 sticky top-24">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#6E3FF3] text-white font-bold text-xs flex items-center justify-center">
                6
              </span>
              <h3 className="font-extrabold text-base text-[#110D17]">
                Confirm Hiring Agreement
              </h3>
            </div>

            <p className="text-xs text-gray-500">
              Please review the confirmation checklist before proceeding to Step 7 (Starter credits
              &amp; Escrow Payment).
            </p>

            {/* Agreed Summary Box */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8FC] border border-purple-100 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-gray-900">
                <span>Selected Freelancer:</span>
                <span className="text-[#6E3FF3]">{freelancer.name}</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Total Contract:</span>
                <strong className="text-gray-900 font-extrabold">₹{agreedPrice.toLocaleString()}</strong>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Deliverables:</span>
                <span>{deliverablesList.length} items</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Target Deadline:</span>
                <span>{deadline}</span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>Revisions:</span>
                <span>{revisionRounds} rounds</span>
              </div>
            </div>

            {/* Step 6 Checklist */}
            <div className="space-y-2.5 pt-2 border-t border-gray-100 text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={discussedViaChatOrVideo}
                  onChange={(e) => setDiscussedViaChatOrVideo(e.target.checked)}
                  className="mt-0.5 rounded text-[#6E3FF3] focus:ring-[#6E3FF3] accent-[#6E3FF3]"
                />
                <span className="text-gray-700 leading-tight text-[11px]">
                  <strong>Requirements discussed:</strong> I have communicated with {freelancer.name} via chat or video call.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreedOnScopeAndPrice}
                  onChange={(e) => setAgreedOnScopeAndPrice(e.target.checked)}
                  className="mt-0.5 rounded text-[#6E3FF3] focus:ring-[#6E3FF3] accent-[#6E3FF3]"
                />
                <span className="text-gray-700 leading-tight text-[11px]">
                  <strong>Scope &amp; fee agreed:</strong> Deliverables checklist and contract fee ₹{agreedPrice.toLocaleString()} are finalized.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={acceptedAiPolicy}
                  onChange={(e) => setAcceptedAiPolicy(e.target.checked)}
                  className="mt-0.5 rounded text-[#6E3FF3] focus:ring-[#6E3FF3] accent-[#6E3FF3]"
                />
                <span className="text-gray-700 leading-tight text-[11px]">
                  <strong>AI Policy accepted:</strong> {aiPolicy} accepted upfront.
                </span>
              </label>
            </div>

            {/* Step 7 Preview: Starter credits available */}
            <div className="p-3 rounded-xl bg-purple-50/80 border border-purple-100 text-[11px] text-purple-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#6E3FF3] shrink-0" />
              <span>
                <strong>Next Step 7:</strong> Apply your 15% Starter Credit discount and pay 10% advance deposit into escrow.
              </span>
            </div>

            {/* Action Button to move to Step 7 Payment */}
            <button
              onClick={handleConfirmAndProceed}
              disabled={!isConfirmationReady}
              className={`w-full py-3.5 text-white text-xs sm:text-sm font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 ${
                isConfirmationReady
                  ? 'bg-[#6E3FF3] hover:bg-[#5D2EE0] active:scale-98 shadow-[#6E3FF3]/25'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>Confirm Hiring &amp; Proceed to Escrow (Step 7)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Escrow protected until final approval</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
