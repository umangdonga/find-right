import React, { useState } from 'react';
import { Freelancer, Project, ChatMessage, NavView } from '../types';
import { ArrowLeft, Video, Calendar, Send, ShieldCheck, Check, Sparkles, FileText, ChevronRight } from 'lucide-react';

interface ConsultationViewProps {
  project: Project;
  freelancer: Freelancer;
  messages: ChatMessage[];
  onSendMessage: (freelancerId: string, text: string) => void;
  onStartVideoCall: () => void;
  onProceedToTerms: () => void;
  onBack: () => void;
}

export const ConsultationView: React.FC<ConsultationViewProps> = ({
  project,
  freelancer,
  messages,
  onSendMessage,
  onStartVideoCall,
  onProceedToTerms,
  onBack,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(freelancer.id, inputText.trim());
    setInputText('');
  };

  const discountAmount = project.useStarterCredit ? Math.round((project.agreedPrice || 8000) * 0.15) : 0;
  const contractTotal = (project.agreedPrice || 8000) - discountAmount;
  const advance10 = Math.round(contractTotal * 0.1);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Back button & Stepper */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#6E3FF3] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to proposals</span>
        </button>

        {/* Visual Progress Steps matching 7-Step User Flow */}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold overflow-x-auto pb-1 text-gray-400">
          <span className="text-emerald-600 flex items-center gap-0.5">
            <Check className="w-3 h-3 stroke-[3]" /> 1. Review
          </span>
          <span>→</span>
          <span className="text-emerald-600 flex items-center gap-0.5">
            <Check className="w-3 h-3 stroke-[3]" /> 2. Selected
          </span>
          <span>→</span>
          <span className="text-[#6E3FF3] font-bold bg-purple-100 px-2 py-0.5 rounded-md">
            3 &amp; 4. Chat &amp; Video Call
          </span>
          <span>→</span>
          <span className="text-gray-500 font-medium">5. Finalize Details</span>
          <span>→</span>
          <span className="text-gray-400 font-normal">6. Confirm Hire</span>
          <span>→</span>
          <span className="text-gray-400 font-normal">7. Payment</span>
        </div>
      </div>

      {/* Header Banner: Pre-Hire Alignment */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 rounded-3xl border border-purple-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#6E3FF3] text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
            {freelancer.initials}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#110D17]">
                Pre-Hire Consultation with {freelancer.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                Proposal Selected (Step 3 &amp; 4)
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-1 max-w-xl">
              Discuss project deliverables, clarify questions via chat or video call before agreeing
              on final terms and funding the 10% advance escrow.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-stretch sm:self-auto">
          <button
            onClick={onStartVideoCall}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#6E3FF3] text-[#6E3FF3] hover:bg-purple-50 text-xs font-bold transition-all shadow-2xs"
          >
            <Video className="w-4 h-4" />
            <span>Launch Video Call (Step 4)</span>
          </button>

          <button
            onClick={onProceedToTerms}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-bold transition-all shadow-md shadow-[#6E3FF3]/25 active:scale-95"
          >
            <span>Finalize Project Details (Step 5)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Workspace: Chat & Video room + Project Scope sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Chat & Consultation Stream */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#ECE7F2] shadow-xs flex flex-col h-[560px] overflow-hidden">
          {/* Stream header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="text-xs text-gray-900">{freelancer.name} is ready to consult</strong>
              <span className="text-[11px] text-gray-400">Avg response: {freelancer.avgResponseTime}</span>
            </div>
            <button
              onClick={onStartVideoCall}
              className="text-xs font-semibold text-[#6E3FF3] hover:underline flex items-center gap-1"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Hop on Video</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3.5 bg-[#FBF9F6]">
            <div className="flex justify-center">
              <span className="text-[11px] text-purple-700 bg-purple-100/70 px-3.5 py-1 rounded-full font-medium">
                Scope discussion initiated · Discuss timeline &amp; deliverables freely
              </span>
            </div>

            {messages.map((m) => {
              const isClient = m.sender === 'client';
              const isSys = m.sender === 'system';

              if (isSys) {
                return (
                  <div key={m.id} className="text-center text-[11px] text-gray-400 my-1">
                    {m.text}
                  </div>
                );
              }

              return (
                <div
                  key={m.id}
                  className={`flex items-end gap-2.5 ${isClient ? 'justify-end' : 'justify-start'}`}
                >
                  {!isClient && (
                    <div className="w-7 h-7 rounded-xl bg-purple-100 text-[#6E3FF3] text-[10px] font-bold flex items-center justify-center shrink-0">
                      {freelancer.initials}
                    </div>
                  )}

                  <div
                    className={`max-w-md rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      isClient
                        ? 'bg-[#6E3FF3] text-white rounded-br-xs'
                        : 'bg-white text-gray-800 border border-[#ECE7F2] rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    <p>{m.text}</p>
                    <div
                      className={`text-[10px] mt-1 text-right ${
                        isClient ? 'text-purple-200' : 'text-gray-400'
                      }`}
                    >
                      {m.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input form */}
          <form onSubmit={handleSend} className="p-3.5 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask questions about timelines, design styles, or deliverables…"
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#6E3FF3]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs active:scale-95"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Right Column: Agreed Scope & Token Credit Status */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-[#110D17]">Project Deliverables Summary</h3>
            <div className="text-xs text-gray-600 space-y-2">
              <div className="font-bold text-gray-900">{project.title}</div>
              <ul className="list-disc pl-4 space-y-1 text-gray-600">
                {project.deliverables.slice(0, 3).map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            {/* Token status chosen at post job time */}
            <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
              <span className="font-bold text-gray-800 block">Starter Hire Credit:</span>
              {project.useStarterCredit ? (
                <div className="p-3 rounded-2xl bg-purple-50 text-purple-900 border border-purple-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#6E3FF3]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>15% Credit Configured at Job Post</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-normal">
                    This job was posted with a Starter Credit enabled. ₹{discountAmount.toLocaleString()} will be automatically deducted at terms!
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-gray-50 text-gray-600 border border-gray-200 text-[11px]">
                  Standard contract (No starter credit chosen during job post).
                </div>
              )}
            </div>

            {/* Estimated escrow numbers */}
            <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Agreed Project Cost:</span>
                <strong className="text-gray-900">₹{(project.agreedPrice || 8000).toLocaleString()}</strong>
              </div>
              {project.useStarterCredit && (
                <div className="flex justify-between text-[#6E3FF3]">
                  <span>Starter Discount (15%):</span>
                  <span className="font-bold">- ₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-gray-900 pt-1 border-t border-gray-100">
                <span>Contract Total:</span>
                <span>₹{contractTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold pt-1">
                <span>10% Advance due after terms:</span>
                <span>₹{advance10.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={onProceedToTerms}
              className="w-full py-3 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-bold rounded-2xl shadow-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Agree on Scope &amp; Set Terms</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
