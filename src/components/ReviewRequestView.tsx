import React, { useState } from 'react';
import { ArrowLeft, Check, X, MessageSquare, Video, Star, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { HireRequest, Project, NavView, Freelancer } from '../types';

interface ReviewRequestViewProps {
  request: HireRequest;
  project: Project;
  onBack: () => void;
  onAcceptAndHire: (request: HireRequest) => void;
  onStartFinalization?: (request: HireRequest) => void;
  onStartConsultation?: (request: HireRequest) => void;
  onRejectWithFeedback: (requestId: string, tags: string[], message: string, sentThankYou: boolean) => void;
  onQuickReject: (requestId: string) => void;
  onOpenChat: (freelancerId: string) => void;
  onScheduleVideoCall: () => void;
  onViewProfile: (freelancerId: string) => void;
}

export const ReviewRequestView: React.FC<ReviewRequestViewProps> = ({
  request,
  project,
  onBack,
  onAcceptAndHire,
  onStartFinalization,
  onStartConsultation,
  onRejectWithFeedback,
  onQuickReject,
  onOpenChat,
  onScheduleVideoCall,
  onViewProfile,
}) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [feedbackTags, setFeedbackTags] = useState<string[]>([
    'Portfolio not relevant',
    'Timeline too long',
  ]);
  const [feedbackMessage, setFeedbackMessage] = useState<string>(
    'Thanks for applying. Your UI work is clean, but I would like to see more wellness or e-commerce samples and a shorter timeline. Consider adding a case study next time.'
  );
  const [sendThankYouNote, setSendThankYouNote] = useState<boolean>(true);

  const availableTags = [
    'Portfolio not relevant',
    'Price too high',
    'Timeline too long',
    'Needs clearer AI disclosure',
    'Cover note too generic',
    'Missing similar experience',
  ];

  const toggleTag = (tag: string) => {
    setFeedbackTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSendFeedbackAndReject = () => {
    onRejectWithFeedback(request.id, feedbackTags, feedbackMessage, sendThankYouNote);
    setShowFeedbackModal(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#6E3FF3] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to hire requests</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Request details, cover note, proposal, samples */}
        <div className="lg:col-span-8 space-y-6">
          {/* Freelancer Header Card */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-[#F3E8FF] text-[#6E3FF3] font-black text-lg flex items-center justify-center shrink-0 border border-purple-200">
                {request.freelancer.initials}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#110D17]">{request.freelancer.name}</h2>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5 flex-wrap">
                  <span>{request.freelancer.role}</span>
                  <span>•</span>
                  <span>{request.freelancer.completedProjects} projects</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                    ★ {request.freelancer.rating}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-[10px] font-semibold text-[#6E3FF3] border border-purple-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6E3FF3]" />
                    {request.freelancer.primaryTag}
                  </span>
                  {request.freelancer.isRisingTalent && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-[10px] font-semibold text-amber-800 border border-amber-200">
                      Rising talent
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => onViewProfile(request.freelancer.id)}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:border-[#6E3FF3] hover:text-[#6E3FF3] transition-colors self-start sm:self-auto"
            >
              View full profile
            </button>
          </div>

          {/* Cover Note */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Cover note
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {request.coverNote}
            </p>
          </div>

          {/* Proposal breakdown */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Proposal
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Proposed price</span>
                <span className="font-extrabold text-base text-[#110D17]">
                  ₹{request.proposedPrice.toLocaleString()}{' '}
                  <span className="text-xs font-normal text-gray-400">
                    (budget ₹{project.budgetMax.toLocaleString()})
                  </span>
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Delivery</span>
                <strong className="text-gray-800">{request.deliveryWeeks} weeks</strong>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Deliverables</span>
                <strong className="text-gray-800">{request.deliverablesText}</strong>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-gray-500">AI usage</span>
                <span className="font-bold text-[#6E3FF3]">{request.aiUsageDetail}</span>
              </div>
            </div>
          </div>

          {/* Relevant work (2 samples) matching PDF 2 Page 6 */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Relevant work (2 samples)
            </h3>

            <div className="grid grid-cols-2 gap-3.5">
              {request.sampleWork.map((sample, idx) => (
                <div
                  key={idx}
                  className="h-28 rounded-2xl p-4 flex flex-col justify-between"
                  style={{ backgroundColor: sample.bgColor }}
                >
                  <span className="text-[10px] font-bold text-gray-800 bg-white/70 px-2 py-0.5 rounded-md self-start">
                    Verified Work
                  </span>
                  <span className="text-xs font-bold text-gray-900">{sample.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The 3 Decision Options (PDF 2 Page 6) */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-base font-extrabold text-[#110D17]">Your decision</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Choose how you want to respond to this request.
              </p>
            </div>

            {/* DECISION OPTION 1: 7-Step Hiring Flow */}
            <div className="p-4 rounded-2xl border-2 border-purple-200 bg-[#FAF7FF] space-y-3">
              <div className="flex items-center gap-1.5 font-bold text-xs text-[#6E3FF3]">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>1 · Select &amp; Proceed to Collaboration</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-normal">
                Follow FindRight&apos;s transparent steps: Chat &amp; video call with {request.freelancer.name.split(' ')[0]} to align on deliverables before finalizing project terms and payment.
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    if (onStartConsultation) onStartConsultation(request);
                    else onOpenChat(request.freelancer.id);
                  }}
                  className="w-full py-2.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-98 flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat &amp; Discuss Requirements (Step 3)</span>
                </button>

                <button
                  onClick={onScheduleVideoCall}
                  className="w-full py-2 bg-white hover:bg-purple-50 text-[#6E3FF3] text-xs font-bold rounded-xl border border-[#6E3FF3] transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Schedule Video Call (Step 4)</span>
                </button>

                <button
                  onClick={() => {
                    if (onStartFinalization) onStartFinalization(request);
                    else onAcceptAndHire(request);
                  }}
                  className="w-full py-2 bg-purple-100 hover:bg-purple-200 text-[#6E3FF3] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Finalize Project Details (Step 5) →</span>
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-purple-50 text-[10px] text-purple-900 border border-purple-100">
                💡 <strong>Important:</strong> Payment is not taken upfront. You will review terms, confirm hire, and then pay the 10% advance escrow deposit.
              </div>
            </div>

            {/* DECISION OPTION 2: Reject with feedback (Page 6 & 7) */}
            <div className="p-4 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors space-y-2.5">
              <div className="font-bold text-xs text-gray-800">
                2 · Reject with feedback
              </div>
              <p className="text-[11px] text-gray-500 leading-normal">
                Decline, but tell the freelancer what to improve so they can grow.
              </p>
              <button
                onClick={() => setShowFeedbackModal(true)}
                className="w-full py-2 bg-white hover:bg-gray-50 border border-gray-300 text-xs font-semibold text-gray-700 rounded-xl transition-colors"
              >
                Give feedback &amp; reject
              </button>
            </div>

            {/* DECISION OPTION 3: Direct Reject */}
            <div className="p-4 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors space-y-2.5">
              <div className="flex items-center gap-1 text-xs font-bold text-rose-600">
                <X className="w-3.5 h-3.5" />
                <span>3 · Reject</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-normal">
                Not the right fit. The request is closed without feedback.
              </p>
              <button
                onClick={() => onQuickReject(request.id)}
                className="w-full py-2 bg-white hover:bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-600 rounded-xl transition-colors"
              >
                Reject request
              </button>
            </div>

            {/* Not sure yet? */}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <span className="text-[11px] font-bold text-gray-500 block">Not sure yet?</span>
              <button
                onClick={() => onOpenChat(request.freelancer.id)}
                className="w-full py-2 text-xs font-semibold text-gray-700 hover:text-[#6E3FF3] bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat with {request.freelancer.name.split(' ')[0]}</span>
              </button>
              <button
                onClick={onScheduleVideoCall}
                className="w-full py-2 text-xs font-semibold text-gray-700 hover:text-[#6E3FF3] bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Schedule a video meeting</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* REJECT WITH FEEDBACK MODAL matching PDF 2 Page 7 */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#110D17]">Reject with feedback</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Help {request.freelancer.name} improve. Your feedback is shared privately.
                </p>
              </div>
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* What could be better pills (PDF 2 Page 7) */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-800 mb-2">
                What could be better?
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => {
                  const isSelected = feedbackTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#6E3FF3] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isSelected ? `✓ ${tag}` : tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message input */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-800 mb-1.5">Your message</label>
              <textarea
                rows={4}
                value={feedbackMessage}
                onChange={(e) => setFeedbackMessage(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 text-xs text-gray-700 focus:outline-none focus:border-[#6E3FF3] leading-relaxed"
              />
            </div>

            {/* Checkbox */}
            <label className="flex items-center gap-2 mb-6 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={sendThankYouNote}
                onChange={(e) => setSendThankYouNote(e.target.checked)}
                className="rounded text-[#6E3FF3] focus:ring-[#6E3FF3]"
              />
              <span className="text-xs text-gray-600">
                Send a thank-you note with my feedback
              </span>
            </label>

            {/* Modal actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSendFeedbackAndReject}
                className="px-5 py-2.5 rounded-xl bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send feedback &amp; reject</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
