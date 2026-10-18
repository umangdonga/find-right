import React, { useState } from 'react';
import { Project, Milestone, NavView } from '../types';
import { ArrowLeft, MessageSquare, Video, CheckCircle2, Clock, FileText, ShieldCheck, ChevronRight, AlertCircle, Eye, Download } from 'lucide-react';

interface ProjectDetailViewProps {
  project: Project;
  onNavigate: (view: NavView) => void;
  onOpenChat: (freelancerId: string) => void;
  onStartVideoCall: () => void;
  onReviewMilestone: (milestoneId: string) => void;
  onOpenExitPolicy: () => void;
  onGoToFinalSubmission: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onNavigate,
  onOpenChat,
  onStartVideoCall,
  onReviewMilestone,
  onOpenExitPolicy,
  onGoToFinalSubmission,
}) => {
  const [selectedMilestoneFile, setSelectedMilestoneFile] = useState<Milestone | null>(null);

  const freelancer = project.hiredFreelancer;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header matching PDF 2 Page 11 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#6E3FF3] mb-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all projects</span>
          </button>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#110D17]">
              {project.title}
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-[#6E3FF3] text-xs font-semibold border border-purple-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6E3FF3]" />
              In progress
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Freelancer: <strong>{freelancer?.name || 'Umang Donga'}</strong> · Deadline {project.deadline}
          </p>
        </div>

        {/* Chat & Video Call quick action buttons matching PDF 2 Page 11 */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => freelancer && onOpenChat(freelancer.id)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:border-[#6E3FF3] hover:text-[#6E3FF3] text-xs font-semibold text-gray-700 transition-colors shadow-2xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>

          <button
            onClick={onStartVideoCall}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold shadow-xs transition-all active:scale-98"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video call</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Progress, Milestones list, Recent Activity */}
        <div className="lg:col-span-8 space-y-6">
          {/* Overall progress card matching PDF 2 Page 11 */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-[#110D17]">Overall progress</h3>
              <span className="text-2xl font-black text-[#6E3FF3]">
                {project.progressPercent}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#6E3FF3] h-full rounded-full transition-all duration-500"
                style={{ width: `${project.progressPercent}%` }}
              />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-gray-100 text-xs">
              <div>
                <span className="text-gray-400 block text-[11px]">Started</span>
                <strong className="text-gray-800">Oct 17</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Days left</span>
                <strong className="text-gray-800">19 days</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Milestones</span>
                <strong className="text-gray-800">2 of 5 done</strong>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Revisions used</span>
                <strong className="text-gray-800">
                  {project.revisionsUsed} of {project.totalRevisions}
                </strong>
              </div>
            </div>
          </div>

          {/* Milestones checklist matching PDF 2 Page 11 */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-[#110D17]">Milestones</h3>
              <button
                onClick={onGoToFinalSubmission}
                className="text-xs font-semibold text-[#6E3FF3] hover:underline"
              >
                Review Final Deliverables →
              </button>
            </div>

            <div className="space-y-3">
              {project.milestones.map((m, idx) => {
                const isDone = m.status === 'done';
                const isInReview = m.status === 'in_review';
                const isUpcoming = m.status === 'upcoming';

                return (
                  <div
                    key={m.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isInReview
                        ? 'border-purple-300 bg-[#FAF7FF]'
                        : isDone
                        ? 'border-gray-200 bg-white'
                        : 'border-gray-100 bg-gray-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {isDone && (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        )}
                        {isInReview && (
                          <div className="w-5 h-5 rounded-full bg-[#6E3FF3] text-white flex items-center justify-center text-[10px] font-bold">
                            <Clock className="w-3 h-3" />
                          </div>
                        )}
                        {isUpcoming && (
                          <div className="w-5 h-5 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center text-[10px] font-bold">
                            {idx + 1}
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs sm:text-sm text-[#110D17]">
                            {m.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          {isDone ? `Completed ${m.completedDate}` : `Due ${m.dueDate}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {isDone && (
                        <>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Done
                          </span>
                          <button
                            onClick={() => setSelectedMilestoneFile(m)}
                            className="px-3 py-1 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:border-[#6E3FF3] hover:text-[#6E3FF3]"
                          >
                            View files
                          </button>
                        </>
                      )}

                      {isInReview && (
                        <>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            In review
                          </span>
                          <button
                            onClick={onGoToFinalSubmission}
                            className="px-3.5 py-1 rounded-xl bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold shadow-2xs"
                          >
                            Review
                          </button>
                        </>
                      )}

                      {isUpcoming && (
                        <span className="text-[11px] text-gray-400 font-medium">Upcoming</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent activity matching PDF 2 Page 11 */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs">
            <h3 className="font-extrabold text-base text-[#110D17] mb-4">Recent activity</h3>
            <div className="space-y-3">
              {project.recentActivity.map((act, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50 last:border-b-0">
                  <div className="flex items-center gap-2 text-gray-800 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6E3FF3]" />
                    <span>{act.text}</span>
                  </div>
                  <span className="text-[11px] text-gray-400">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Escrow payments, Freelancer card, Agreed terms (PDF 2 Page 11) */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          {/* Escrow payments card */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Escrow payments</span>
              </span>
            </div>

            <div className="pb-3 border-b border-gray-100">
              <span className="text-[11px] text-gray-400 block">Contract total</span>
              <div className="text-2xl font-black text-[#110D17]">
                ₹{(project.contractTotal || 6800).toLocaleString()}
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <strong className="text-gray-900 block">
                    10% advance · ₹{(project.advancePaid || 680).toLocaleString()}
                  </strong>
                  <span className="text-[11px] text-emerald-600 font-medium">
                    Paid and held in escrow
                  </span>
                </div>
                <span className="text-emerald-600 font-bold">✓</span>
              </div>

              <div className="flex items-start justify-between pt-2 border-t border-gray-100">
                <div>
                  <strong className="text-gray-900 block">
                    90% final · ₹{(project.finalPending || 6120).toLocaleString()}
                  </strong>
                  <span className="text-[11px] text-gray-400">
                    Released when you approve final work
                  </span>
                </div>
                <span className="text-gray-400">⏳</span>
              </div>
            </div>

            <button
              onClick={onGoToFinalSubmission}
              className="w-full py-2.5 rounded-xl bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold shadow-2xs"
            >
              Approve Final Work &amp; Release 90%
            </button>
          </div>

          {/* Freelancer mini card */}
          {freelancer && (
            <div className="bg-white rounded-3xl border border-[#ECE7F2] p-5 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6E3FF3] font-bold text-xs flex items-center justify-center">
                  {freelancer.initials}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#110D17]">{freelancer.name}</h4>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                    <span>{freelancer.role}</span>
                    <span>•</span>
                    <span className="text-amber-500 font-bold">★ {freelancer.rating}</span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-purple-50 text-[10px] font-semibold text-[#6E3FF3] border border-purple-100">
                {freelancer.primaryTag}
              </span>
            </div>
          )}

          {/* Agreed terms card matching PDF 2 Page 11 */}
          <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-3 text-xs">
            <h4 className="font-extrabold text-xs text-gray-900 uppercase tracking-wider">
              Agreed terms
            </h4>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>10% advance + 90% on approval</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{project.totalRevisions} revision rounds</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Full rights transfer after payment</span>
              </div>
            </div>

            {/* Exit & cancellation policy button (Page 11) */}
            <div className="pt-3 border-t border-gray-100">
              <button
                onClick={onOpenExitPolicy}
                className="w-full py-2 rounded-xl bg-gray-50 hover:bg-purple-50 text-gray-700 hover:text-[#6E3FF3] font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <AlertCircle className="w-3.5 h-3.5 text-[#6E3FF3]" />
                <span>Exit &amp; cancellation policy</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Milestone File Preview Modal */}
      {selectedMilestoneFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
              <h3 className="font-bold text-sm text-[#110D17]">
                Milestone Deliverable: {selectedMilestoneFile.title}
              </h3>
              <button
                onClick={() => setSelectedMilestoneFile(null)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-4">{selectedMilestoneFile.deliverableNotes}</p>
            <div className="p-3 rounded-xl bg-gray-50 flex items-center justify-between text-xs mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#6E3FF3]" />
                <span>Noble-Paws-screen-v1.fig (8.4 MB)</span>
              </div>
              <button className="text-[#6E3FF3] font-bold hover:underline flex items-center gap-1">
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
            <button
              onClick={() => setSelectedMilestoneFile(null)}
              className="w-full py-2 bg-[#6E3FF3] text-white rounded-xl text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
