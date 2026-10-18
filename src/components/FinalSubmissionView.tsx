import React, { useState } from 'react';
import { Project, NavView } from '../types';
import { ArrowLeft, Check, Download, ExternalLink, ShieldCheck, Star, Sparkles, AlertCircle, FileCheck } from 'lucide-react';

interface FinalSubmissionViewProps {
  project: Project;
  onApproveAndReleasePayment: () => void;
  onRequestRevisions: (note: string) => void;
  onNavigate: (view: NavView) => void;
  onBack: () => void;
}

export const FinalSubmissionView: React.FC<FinalSubmissionViewProps> = ({
  project,
  onApproveAndReleasePayment,
  onRequestRevisions,
  onNavigate,
  onBack,
}) => {
  const [showRevisionModal, setShowRevisionModal] = useState<boolean>(false);
  const [revisionNotes, setRevisionNotes] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const freelancer = project.hiredFreelancer;
  const contractTotal = project.contractTotal || 6800;
  const advancePaid = project.advancePaid || 680;
  const finalPayment = project.finalPending || contractTotal - advancePaid;

  const handleDownload = (filename: string) => {
    setDownloadSuccess(`Downloaded ${filename}`);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const submitRevision = () => {
    onRequestRevisions(revisionNotes || 'Please adjust button padding on the checkout screen.');
    setShowRevisionModal(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header matching PDF 2 Page 12 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#6E3FF3] mb-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to project</span>
          </button>
          <h1 className="text-2xl font-extrabold text-[#110D17]">Final submission</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            <strong>{freelancer?.name || 'Umang Donga'}</strong> submitted the final work on Nov 5, 2026
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200 self-start sm:self-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Awaiting your approval
        </span>
      </div>

      {downloadSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
          <span>✓ {downloadSuccess}</span>
          <button onClick={() => setDownloadSuccess(null)} className="text-emerald-700 font-bold">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Delivered work visual preview, files, deliverables checklist */}
        <div className="lg:col-span-8 space-y-6">
          {/* Delivered Work Visual Frames matching PDF 2 Page 12 */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-3">
            <h3 className="font-extrabold text-base text-[#110D17]">Delivered work</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              <div className="h-44 rounded-2xl bg-[#DDD6FE] p-4 flex flex-col justify-between hover:shadow-sm transition-shadow">
                <span className="text-[10px] font-bold text-gray-800 bg-white/70 px-2 py-0.5 rounded-md self-start">
                  Screen 1 &amp; 2
                </span>
                <div>
                  <div className="text-xs font-black text-gray-900">Homepage &amp; Hero</div>
                  <div className="text-[11px] text-gray-700">Responsive desktop + mobile</div>
                </div>
              </div>

              <div className="h-44 rounded-2xl bg-[#BBF7D0] p-4 flex flex-col justify-between hover:shadow-sm transition-shadow">
                <span className="text-[10px] font-bold text-gray-800 bg-white/70 px-2 py-0.5 rounded-md self-start">
                  Screen 3 &amp; 4
                </span>
                <div>
                  <div className="text-xs font-black text-gray-900">Nutrition Quiz &amp; Shop</div>
                  <div className="text-[11px] text-gray-700">Filter system &amp; product card</div>
                </div>
              </div>

              <div className="h-44 rounded-2xl bg-[#FED7AA] p-4 flex flex-col justify-between hover:shadow-sm transition-shadow">
                <span className="text-[10px] font-bold text-gray-800 bg-white/70 px-2 py-0.5 rounded-md self-start">
                  Screen 5 &amp; 6
                </span>
                <div>
                  <div className="text-xs font-black text-gray-900">Checkout &amp; Confirmation</div>
                  <div className="text-[11px] text-gray-700">WCAG AAA Accessible UI</div>
                </div>
              </div>
            </div>
          </div>

          {/* Files List matching PDF 2 Page 12 */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-3">
            <h3 className="font-extrabold text-base text-[#110D17]">Files</h3>

            <div className="space-y-2.5">
              {[
                { name: 'Noble-Paws-website.fig', detail: 'Figma file · 12.4 MB', icon: 'FIG' },
                { name: 'Clickable-prototype-link.txt', detail: 'Prototype link · Figma Cloud URL', icon: 'URL' },
                { name: 'Component-library.zip', detail: 'ZIP · 3.8 MB', icon: 'ZIP' },
                { name: 'Handover-notes.pdf', detail: 'PDF · 0.6 MB', icon: 'PDF' },
              ].map((file, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-gray-50/70 border border-gray-100 flex items-center justify-between hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-100 text-[#6E3FF3] text-[10px] font-bold flex items-center justify-center">
                      {file.icon}
                    </span>
                    <div>
                      <strong className="text-xs text-gray-900 block">{file.name}</strong>
                      <span className="text-[11px] text-gray-500">{file.detail}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(file.name)}
                    className="p-2 rounded-xl text-gray-500 hover:text-[#6E3FF3] hover:bg-purple-50 transition-colors"
                    title={`Download ${file.name}`}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables Checklist matching PDF 2 Page 12 */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-3">
            <h3 className="font-extrabold text-base text-[#110D17]">Deliverables checklist</h3>

            <div className="space-y-2 text-xs">
              {[
                '6 high-fidelity screens',
                'Clickable prototype',
                'Reusable component library',
                'AI usage matches disclosure (ideation only)',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-gray-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Release final payment Card (PDF 2 Page 12) */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-5">
            <div>
              <h3 className="font-extrabold text-base text-[#110D17]">Release final payment</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Review work before releasing escrow
              </p>
            </div>

            <div className="space-y-2.5 py-3 border-y border-gray-100 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Contract total</span>
                <span className="font-semibold text-gray-800">
                  ₹{contractTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-gray-500">
                <span>10% advance (paid)</span>
                <span>- ₹{advancePaid.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-sm">
                <span className="font-bold text-[#110D17]">Final payment (90%)</span>
                <span className="font-black text-base text-[#6E3FF3]">
                  ₹{finalPayment.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions matching PDF 2 Page 12 */}
            <div className="space-y-2.5">
              <button
                onClick={onApproveAndReleasePayment}
                className="w-full py-3 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md shadow-[#6E3FF3]/25 flex items-center justify-center gap-1.5 transition-all active:scale-98"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Approve &amp; release ₹{finalPayment.toLocaleString()}</span>
              </button>

              <button
                onClick={() => setShowRevisionModal(true)}
                className="w-full py-2.5 bg-white hover:bg-gray-50 border border-gray-300 text-xs font-semibold text-gray-700 rounded-2xl transition-colors"
              >
                Request changes
              </button>
            </div>

            <div className="text-[11px] text-gray-500 text-center">
              Revisions used: <strong>{project.revisionsUsed} of {project.totalRevisions}</strong>
            </div>

            {/* Protected by Escrow banner (Page 12) */}
            <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-100 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#6E3FF3]">
                <ShieldCheck className="w-4 h-4" />
                <span>Protected by escrow</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-normal">
                The money goes to {freelancer?.name.split(' ')[0] || 'Umang'} only after you approve.
                You will rate the project on the next step.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Request Changes Modal */}
      {showRevisionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100">
            <h3 className="font-extrabold text-base text-[#110D17] mb-1">Request changes</h3>
            <p className="text-xs text-gray-500 mb-4">
              Round {project.revisionsUsed + 1} of {project.totalRevisions} included revisions
            </p>

            <textarea
              rows={4}
              value={revisionNotes}
              onChange={(e) => setRevisionNotes(e.target.value)}
              placeholder="Detail the exact adjustments needed (e.g. adjust hero typography spacing, make cart button wider on mobile)..."
              className="w-full p-3 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#6E3FF3] mb-4"
            />

            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setShowRevisionModal(false)}
                className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={submitRevision}
                className="px-5 py-2.5 rounded-xl bg-[#6E3FF3] text-white font-semibold"
              >
                Send revision notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
