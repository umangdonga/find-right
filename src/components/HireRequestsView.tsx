import React, { useState } from 'react';
import { Project, HireRequest, NavView, Freelancer } from '../types';
import { ArrowLeft, MessageSquare, Star, Sparkles, Check, X, ShieldAlert, ArrowRight, User } from 'lucide-react';

interface HireRequestsViewProps {
  project: Project;
  hireRequests: HireRequest[];
  onSelectRequestForReview: (request: HireRequest) => void;
  onSelectFreelancer: (freelancerId: string) => void;
  onOpenChat: (freelancerId: string) => void;
  onQuickReject: (requestId: string) => void;
  onNavigate: (view: NavView) => void;
  onBack: () => void;
}

export const HireRequestsView: React.FC<HireRequestsViewProps> = ({
  project,
  hireRequests,
  onSelectRequestForReview,
  onSelectFreelancer,
  onOpenChat,
  onQuickReject,
  onNavigate,
  onBack,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'new' | 'shortlisted' | 'rejected'>('all');

  const projectRequests = hireRequests.filter((r) => r.projectId === project.id || true);

  const filteredRequests = projectRequests.filter((req) => {
    if (filterTab === 'all') return true;
    return req.status === filterTab;
  });

  const countNew = projectRequests.filter((r) => r.status === 'new').length;
  const countShortlisted = projectRequests.filter((r) => r.status === 'shortlisted').length;
  const countRejected = projectRequests.filter((r) => r.status === 'rejected').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header matching PDF 2 Page 5 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#6E3FF3] mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to projects</span>
          </button>
          <h1 className="text-2xl font-extrabold text-[#110D17]">Hire requests</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            {project.title} · <strong>{projectRequests.length} freelancers applied</strong>
          </p>
        </div>

        <button
          onClick={() => onNavigate('post_job')}
          className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 self-start sm:self-auto"
        >
          Edit job post
        </button>
      </div>

      {/* Filter Tabs matching PDF 2 Page 5 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilterTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filterTab === 'all'
              ? 'bg-[#6E3FF3] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }`}
        >
          All requests {projectRequests.length}
        </button>

        <button
          onClick={() => setFilterTab('new')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filterTab === 'new'
              ? 'bg-[#6E3FF3] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }`}
        >
          New {countNew}
        </button>

        <button
          onClick={() => setFilterTab('shortlisted')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filterTab === 'shortlisted'
              ? 'bg-[#6E3FF3] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }`}
        >
          Shortlisted {countShortlisted}
        </button>

        <button
          onClick={() => setFilterTab('rejected')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filterTab === 'rejected'
              ? 'bg-[#6E3FF3] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }`}
        >
          Rejected {countRejected}
        </button>
      </div>

      {/* Proposal Cards List matching PDF 2 Page 5 */}
      <div className="space-y-4">
        {filteredRequests.map((req) => {
          const isHired = req.status === 'hired';
          const isRejected = req.status === 'rejected';

          return (
            <div
              key={req.id}
              className={`bg-white rounded-3xl border p-5 sm:p-6 shadow-xs transition-all ${
                isHired
                  ? 'border-emerald-300 bg-emerald-50/20'
                  : isRejected
                  ? 'border-gray-200 opacity-75'
                  : 'border-[#ECE7F2] hover:border-[#6E3FF3]/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] text-[#6E3FF3] font-bold text-sm flex items-center justify-center shrink-0 border border-purple-200">
                    {req.freelancer.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        onClick={() => {
                          onSelectFreelancer(req.freelancer.id);
                          onNavigate('freelancer_profile');
                        }}
                        className="font-bold text-sm sm:text-base text-[#110D17] hover:text-[#6E3FF3] cursor-pointer"
                      >
                        {req.freelancer.name}
                      </h3>
                      <span className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
                        ★ {req.freelancer.rating}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5 flex-wrap">
                      <span>{req.freelancer.role}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6E3FF3]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6E3FF3]" />
                        {req.freelancer.primaryTag}
                      </span>
                      {req.status === 'new' && (
                        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">
                          New
                        </span>
                      )}
                      {req.status === 'shortlisted' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                          Shortlisted
                        </span>
                      )}
                      {req.status === 'hired' && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Hired &amp; In Progress
                        </span>
                      )}
                      {req.status === 'rejected' && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Proposed Price & delivery */}
                <div className="text-left sm:text-right shrink-0">
                  <div className="text-lg sm:text-xl font-black text-[#110D17]">
                    ₹{req.proposedPrice.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">in {req.deliveryWeeks} weeks</div>
                </div>
              </div>

              {/* Cover note snippet */}
              <p className="text-xs text-gray-600 leading-relaxed mb-4 pl-0 sm:pl-15">
                {req.coverNote}
              </p>

              {/* Actions row matching PDF 2 Page 5 */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectFreelancer(req.freelancer.id);
                      onNavigate('freelancer_profile');
                    }}
                    className="px-3 py-1.5 rounded-xl border border-gray-200 text-gray-700 hover:border-gray-400 font-medium"
                  >
                    View profile
                  </button>

                  <button
                    onClick={() => onOpenChat(req.freelancer.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-gray-700 hover:border-[#6E3FF3] hover:text-[#6E3FF3] font-medium"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {isRejected ? (
                    <span className="text-xs text-gray-400 italic">Declined with feedback</span>
                  ) : isHired ? (
                    <button
                      onClick={() => onNavigate('project_detail')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs"
                    >
                      Track Project Escrow
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => onQuickReject(req.id)}
                        className="px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 font-medium transition-colors"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() => onSelectRequestForReview(req)}
                        className="px-4 py-2 rounded-xl bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white font-semibold shadow-xs transition-all active:scale-98"
                      >
                        Review request
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
