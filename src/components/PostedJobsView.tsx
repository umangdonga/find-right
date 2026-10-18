import React, { useState } from 'react';
import { Project, HireRequest, NavView, Freelancer } from '../types';
import {
  Plus,
  Briefcase,
  Users,
  MessageSquare,
  Video,
  Star,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Clock,
  ShieldCheck,
  ArrowRight,
  FileText,
  CheckCircle2,
  Filter,
  Check,
} from 'lucide-react';

interface PostedJobsViewProps {
  projects: Project[];
  hireRequests: HireRequest[];
  onSelectJob: (projectId: string) => void;
  onSelectRequestForReview: (request: HireRequest, project: Project) => void;
  onStartConsultation: (freelancer: Freelancer, project: Project) => void;
  onStartVideoCall: (freelancer: Freelancer, project: Project) => void;
  onStartFinalization: (freelancer: Freelancer, project: Project, request?: HireRequest) => void;
  onViewFreelancerProfile: (freelancerId: string) => void;
  onCreateNewJob: () => void;
  onNavigate: (view: NavView) => void;
}

export const PostedJobsView: React.FC<PostedJobsViewProps> = ({
  projects,
  hireRequests,
  onSelectJob,
  onSelectRequestForReview,
  onStartConsultation,
  onStartVideoCall,
  onStartFinalization,
  onViewFreelancerProfile,
  onCreateNewJob,
  onNavigate,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'accepting' | 'in_discussion' | 'hired'>('all');
  const [expandedJobIds, setExpandedJobIds] = useState<string[]>([projects[0]?.id || 'proj-1', 'proj-4']);
  const [selectedApplicantFilter, setSelectedApplicantFilter] = useState<'all' | 'new' | 'shortlisted'>('all');

  const toggleExpandJob = (jobId: string) => {
    setExpandedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  // Group requests by project ID
  const getRequestsForProject = (projectId: string) => {
    return hireRequests.filter((r) => r.projectId === projectId);
  };

  const filteredProjects = projects.filter((p) => {
    if (filterTab === 'all') return true;
    if (filterTab === 'accepting') return p.status === 'hiring';
    if (filterTab === 'in_discussion') return p.status === 'hiring' || p.status === 'in_progress';
    if (filterTab === 'hired') return p.status === 'in_progress' || p.status === 'completed';
    return true;
  });

  const totalApplicantsCount = hireRequests.length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6E3FF3]" />
            <span className="text-xs font-bold text-[#6E3FF3] uppercase tracking-wider">
              Client Hiring Workspace
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#110D17] tracking-tight">
            Posted Jobs &amp; Applicants
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            View all jobs you have posted, inspect freelancer responses, and collaborate via chat &amp; video before hiring.
          </p>
        </div>

        <button
          onClick={onCreateNewJob}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold shadow-sm hover:shadow transition-all active:scale-98 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post a New Job</span>
        </button>
      </div>

      {/* 7-Step Hiring Flow Visual Guide Banner */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/60 to-purple-50 border border-purple-200/80 rounded-3xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#6E3FF3]" />
            <h3 className="font-extrabold text-xs sm:text-sm text-[#110D17]">
              FindRight Transparent 7-Step Hiring Journey
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-[#6E3FF3]">
            No Blind “Hire → Pay”
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-[11px]">
          <div className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-[#6E3FF3] font-bold text-[10px] inline-flex items-center justify-center mb-1">1</span>
            <div className="font-bold text-gray-900 leading-tight">Review Applicants</div>
            <div className="text-[10px] text-gray-500 mt-0.5">View all proposals</div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-[#6E3FF3] font-bold text-[10px] inline-flex items-center justify-center mb-1">2</span>
            <div className="font-bold text-gray-900 leading-tight">Select Freelancer</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Audit portfolio &amp; AI</div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-[#6E3FF3] font-bold text-[10px] inline-flex items-center justify-center mb-1">3</span>
            <div className="font-bold text-gray-900 leading-tight">Chat &amp; Discuss</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Message requirements</div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-[#6E3FF3] font-bold text-[10px] inline-flex items-center justify-center mb-1">4</span>
            <div className="font-bold text-gray-900 leading-tight">Video Call</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Walk through ideas</div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-[#6E3FF3] font-bold text-[10px] inline-flex items-center justify-center mb-1">5</span>
            <div className="font-bold text-gray-900 leading-tight">Finalize Details</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Scope, price &amp; dates</div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-[#6E3FF3] font-bold text-[10px] inline-flex items-center justify-center mb-1">6</span>
            <div className="font-bold text-gray-900 leading-tight">Confirm Hiring</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Lock mutual terms</div>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-emerald-200 bg-emerald-50/50 shadow-2xs">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] inline-flex items-center justify-center mb-1">7</span>
            <div className="font-bold text-emerald-950 leading-tight">10% Escrow Pay</div>
            <div className="text-[10px] text-emerald-700 mt-0.5">Token credits applied</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              filterTab === 'all'
                ? 'bg-[#6E3FF3] text-white shadow-xs'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
            }`}
          >
            All Posted Jobs ({projects.length})
          </button>

          <button
            onClick={() => setFilterTab('accepting')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              filterTab === 'accepting'
                ? 'bg-[#6E3FF3] text-white shadow-xs'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
            }`}
          >
            Accepting Proposals ({projects.filter((p) => p.status === 'hiring').length})
          </button>

          <button
            onClick={() => setFilterTab('in_discussion')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              filterTab === 'in_discussion'
                ? 'bg-[#6E3FF3] text-white shadow-xs'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
            }`}
          >
            In Discussion / Active ({projects.filter((p) => p.status === 'in_progress').length})
          </button>
        </div>

        <div className="text-xs text-gray-500 font-medium">
          Total Responses: <strong className="text-gray-900">{totalApplicantsCount} Proposals</strong>
        </div>
      </div>

      {/* Posted Jobs Cards List */}
      <div className="space-y-6">
        {filteredProjects.map((job) => {
          const requests = getRequestsForProject(job.id);
          const isExpanded = expandedJobIds.includes(job.id);
          const isHiring = job.status === 'hiring';
          const isInProgress = job.status === 'in_progress';

          return (
            <div
              key={job.id}
              className="bg-white rounded-3xl border border-[#ECE7F2] shadow-xs overflow-hidden transition-all hover:border-purple-200"
            >
              {/* Job Summary Banner */}
              <div className="p-5 sm:p-6 bg-gradient-to-b from-white to-[#FAF9FC] border-b border-gray-100">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-[#6E3FF3] text-[10px] font-bold border border-purple-200">
                        {job.category}
                      </span>
                      <span className="text-[11px] text-gray-400">•</span>
                      <span className="text-xs text-gray-500 font-medium">{job.jobType}</span>
                      <span className="text-[11px] text-gray-400">•</span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {job.aiPolicy}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-extrabold text-[#110D17] hover:text-[#6E3FF3] cursor-pointer">
                      {job.title}
                    </h2>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {job.briefSummary}
                    </p>
                  </div>

                  {/* Right Meta & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:text-right shrink-0">
                    <div>
                      <div className="text-xs text-gray-400 font-medium">Budget Range</div>
                      <div className="text-base sm:text-lg font-black text-[#110D17]">
                        ₹{job.budgetMin.toLocaleString()} – ₹{job.budgetMax.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-gray-500">Deadline: {job.deadline}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleExpandJob(job.id)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isExpanded
                            ? 'bg-purple-100 text-[#6E3FF3]'
                            : 'bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white shadow-xs'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>
                          {requests.length > 0
                            ? `${requests.length} Responded Freelancers`
                            : '0 Applicants'}
                        </span>
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Applicants Avatars strip */}
                {requests.length > 0 && (
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-gray-500">
                        Applicants responding:
                      </span>
                      <div className="flex -space-x-1.5 overflow-hidden">
                        {requests.map((r) => (
                          <div
                            key={r.id}
                            title={`${r.freelancer.name} (Proposed ₹${r.proposedPrice})`}
                            className="w-7 h-7 rounded-full bg-purple-200 border-2 border-white text-[#6E3FF3] font-bold text-[10px] flex items-center justify-center shadow-2xs"
                          >
                            {r.freelancer.initials}
                          </div>
                        ))}
                      </div>
                      <span className="text-[11px] text-gray-500 ml-1">
                        {requests.map((r) => r.freelancer.name.split(' ')[0]).join(', ')}
                      </span>
                    </div>

                    <span className="text-[11px] text-[#6E3FF3] font-semibold">
                      {isExpanded ? 'Showing proposals below' : 'Click to inspect applicants & proposals'}
                    </span>
                  </div>
                )}
              </div>

              {/* EXPANDED APPLICANTS LIST (STEP 1: REVIEW APPLICANTS) */}
              {isExpanded && (
                <div className="p-5 sm:p-6 bg-white space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-extrabold text-sm text-[#110D17] flex items-center gap-2">
                        <span>Freelancer Proposals &amp; Response Details</span>
                        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-[#6E3FF3] text-[10px] font-bold">
                          {requests.length} Submissions
                        </span>
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Follow steps 1 to 7: Select applicant → Chat &amp; discuss → Schedule video call → Finalize scope &amp; price → Confirm hire → Escrow payment.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs">
                      <button
                        onClick={() => setSelectedApplicantFilter('all')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
                          selectedApplicantFilter === 'all'
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setSelectedApplicantFilter('new')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
                          selectedApplicantFilter === 'new'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        New
                      </button>
                      <button
                        onClick={() => setSelectedApplicantFilter('shortlisted')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
                          selectedApplicantFilter === 'shortlisted'
                            ? 'bg-amber-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Shortlisted
                      </button>
                    </div>
                  </div>

                  {requests.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-xs">
                      No freelancers have responded to this job post yet. You can promote the brief or invite rising talent.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {requests
                        .filter((r) =>
                          selectedApplicantFilter === 'all' ? true : r.status === selectedApplicantFilter
                        )
                        .map((req) => {
                          const freelancer = req.freelancer;

                          return (
                            <div
                              key={req.id}
                              className="p-5 rounded-2xl border border-gray-200 hover:border-[#6E3FF3]/50 transition-all bg-[#FCFAFF]/40 space-y-4 shadow-2xs"
                            >
                              {/* Applicant Profile Header */}
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                <div className="flex items-start gap-3.5">
                                  <div
                                    onClick={() => onViewFreelancerProfile(freelancer.id)}
                                    className="w-12 h-12 rounded-2xl bg-[#6E3FF3]/10 text-[#6E3FF3] font-black text-sm flex items-center justify-center shrink-0 border border-purple-200 cursor-pointer hover:scale-105 transition-transform"
                                  >
                                    {freelancer.initials}
                                  </div>

                                  <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h4
                                        onClick={() => onViewFreelancerProfile(freelancer.id)}
                                        className="font-extrabold text-sm sm:text-base text-[#110D17] hover:text-[#6E3FF3] cursor-pointer"
                                      >
                                        {freelancer.name}
                                      </h4>
                                      <span className="text-xs text-amber-500 font-bold flex items-center gap-0.5">
                                        ★ {freelancer.rating}
                                      </span>
                                      <span className="text-[11px] text-gray-400">
                                        ({freelancer.reviewCount} reviews)
                                      </span>

                                      {freelancer.isRisingTalent && (
                                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                                          Rising Talent (15% Credit Eligible)
                                        </span>
                                      )}
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 flex-wrap">
                                      <span>{freelancer.role}</span>
                                      <span>•</span>
                                      <span>{freelancer.location}</span>
                                      <span>•</span>
                                      <span>{freelancer.completedProjects} completed projects</span>
                                      <span>•</span>
                                      <span className="inline-flex items-center gap-1 font-semibold text-[#6E3FF3] bg-purple-50 px-2 py-0.5 rounded-md text-[10px]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#6E3FF3]" />
                                        {freelancer.primaryTag}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Proposed Quote & Timeline */}
                                <div className="sm:text-right shrink-0 bg-white p-3 rounded-xl border border-gray-100">
                                  <div className="text-xs text-gray-400">Proposed Price</div>
                                  <div className="text-lg sm:text-xl font-black text-[#110D17]">
                                    ₹{req.proposedPrice.toLocaleString()}
                                  </div>
                                  <div className="text-[11px] text-gray-500 font-medium">
                                    Delivery in {req.deliveryWeeks} weeks
                                  </div>
                                </div>
                              </div>

                              {/* Proposal Cover Note & Deliverables */}
                              <div className="p-4 rounded-xl bg-white border border-gray-100 text-xs space-y-2">
                                <div className="font-bold text-gray-900 flex items-center justify-between">
                                  <span>Cover Note from Freelancer:</span>
                                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                                    AI Disclosure: {req.aiUsageDetail}
                                  </span>
                                </div>
                                <p className="text-gray-700 leading-relaxed italic">
                                  &ldquo;{req.coverNote}&rdquo;
                                </p>

                                <div className="pt-2 border-t border-gray-100 flex items-center gap-2 flex-wrap text-[11px] text-gray-600">
                                  <strong>Deliverables Included:</strong>
                                  <span>{req.deliverablesText}</span>
                                </div>
                              </div>

                              {/* 7-STEP ACTION WORKFLOW BUTTONS */}
                              <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                      req.status === 'hired'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : req.status === 'shortlisted'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-purple-100 text-purple-700'
                                    }`}
                                  >
                                    Status: {req.status.toUpperCase()}
                                  </span>

                                  <button
                                    onClick={() => onSelectRequestForReview(req, job)}
                                    className="px-3 py-1.5 rounded-xl border border-gray-200 text-gray-700 hover:border-[#6E3FF3] hover:text-[#6E3FF3] font-semibold transition-colors flex items-center gap-1"
                                    title="Step 1-2: Full proposal & portfolio audit"
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                    <span>Review Proposal</span>
                                  </button>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                  {/* Step 3: Chat & Discuss */}
                                  <button
                                    onClick={() => onStartConsultation(freelancer, job)}
                                    className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6E3FF3] font-semibold flex items-center gap-1.5 transition-colors"
                                    title="Step 3: Direct chat with applicant"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    <span>Chat &amp; Discuss</span>
                                  </button>

                                  {/* Step 4: Schedule Video Call */}
                                  <button
                                    onClick={() => onStartVideoCall(freelancer, job)}
                                    className="px-3.5 py-2 rounded-xl bg-white border border-[#6E3FF3] text-[#6E3FF3] hover:bg-purple-50 font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                                    title="Step 4: Interactive video conference"
                                  >
                                    <Video className="w-3.5 h-3.5" />
                                    <span>Video Call</span>
                                  </button>

                                  {/* Step 5-7: Finalize & Hire */}
                                  <button
                                    onClick={() => onStartFinalization(freelancer, job, req)}
                                    className="px-4 py-2 rounded-xl bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white font-bold flex items-center gap-1.5 shadow-sm hover:shadow transition-all active:scale-95"
                                    title="Step 5-7: Finalize project scope, confirm hiring & pay escrow"
                                  >
                                    <span>Finalize &amp; Hire</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
