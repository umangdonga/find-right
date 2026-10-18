import React, { useState } from 'react';
import { Plus, Bookmark, ArrowRight, Sparkles, ShieldCheck, ChevronRight, FileText, Users, MessageSquare, Clock } from 'lucide-react';
import { Project, Freelancer, NavView } from '../types';

interface DashboardViewProps {
  projects: Project[];
  freelancers: Freelancer[];
  onNavigate: (view: NavView) => void;
  onSelectProject: (projectId: string) => void;
  onSelectFreelancer: (freelancerId: string) => void;
  onCreateProject: () => void;
  savedFreelancerIds: string[];
  onToggleSaveFreelancer: (id: string) => void;
  clientProfile?: import('../types').ClientProfile;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  freelancers,
  onNavigate,
  onSelectProject,
  onSelectFreelancer,
  onCreateProject,
  savedFreelancerIds,
  onToggleSaveFreelancer,
  clientProfile,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('UI/UX Design');
  const [dashboardTab, setDashboardTab] = useState<'all' | 'posted_jobs' | 'active_contracts'>('all');
  const [briefModalProject, setBriefModalProject] = useState<Project | null>(null);

  const categories = ['UI/UX Design', 'Graphic Design', 'Product Design', 'Motion Design'];

  const postedJobs = projects.filter((p) => p.status === 'hiring');
  const activeContracts = projects.filter(
    (p) => p.status === 'in_progress' || p.status === 'in_review'
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Welcome & Category Tabs (Page 10) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#110D17] tracking-tight">
              Welcome, {clientProfile?.name || 'Mr.Parekh'}
            </h1>
            {clientProfile?.verification?.status === 'verified' && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Real Company
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {clientProfile?.company || 'Noble Paws Pet Health Co.'} • Manage active projects, escrow contracts &amp; verified rising designers
          </p>
        </div>

        {/* Category Pills matching Page 10 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#6E3FF3] text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-[#E5E0EE] hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick View Switcher: Posted Jobs vs Active Contracts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setDashboardTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            dashboardTab === 'all'
              ? 'bg-[#110D17] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }`}
        >
          All Activity ({projects.length})
        </button>

        <button
          onClick={() => setDashboardTab('posted_jobs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            dashboardTab === 'posted_jobs'
              ? 'bg-[#6E3FF3] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }`}
        >
          <span>Posted Jobs &amp; Applicants</span>
          <span className="px-2 py-0.5 rounded-full bg-purple-100 text-[#6E3FF3] font-bold text-[10px]">
            {postedJobs.length} live
          </span>
        </button>

        <button
          onClick={() => setDashboardTab('active_contracts')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            dashboardTab === 'active_contracts'
              ? 'bg-[#6E3FF3] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }`}
        >
          <span>Active Contracts</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
            {activeContracts.length} in escrow
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Posted Jobs & Active Projects */}
        <div className="lg:col-span-7 space-y-6">
          {/* SECTION 1: Posted Jobs & Who Replied (Directly answers user requirement!) */}
          {(dashboardTab === 'all' || dashboardTab === 'posted_jobs') && postedJobs.length > 0 && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
                  <h2 className="text-base font-extrabold text-[#110D17]">
                    Your Posted Jobs &amp; Replies ({postedJobs.length})
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onNavigate('posted_jobs')}
                    className="text-xs font-bold text-[#6E3FF3] hover:underline flex items-center gap-1"
                  >
                    <span>All Posted Jobs &amp; Applicants →</span>
                  </button>
                  <button
                    onClick={onCreateProject}
                    className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1 pl-3 border-l border-gray-200"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Post Job</span>
                  </button>
                </div>
              </div>

              {postedJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-3xl border-2 border-purple-200 p-5 sm:p-6 shadow-xs hover:border-[#6E3FF3] transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                          ● Open for Proposals
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold">
                          {job.category}
                        </span>
                      </div>
                      <h3
                        onClick={() => {
                          onSelectProject(job.id);
                          onNavigate('hire_requests');
                        }}
                        className="font-bold text-base text-[#110D17] hover:text-[#6E3FF3] cursor-pointer"
                      >
                        {job.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Budget: <strong>₹{job.budgetMin.toLocaleString()} – ₹{job.budgetMax.toLocaleString()}</strong> · Due {job.deadline}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onSelectProject(job.id);
                        onNavigate('hire_requests');
                      }}
                      className="px-4 py-2 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Review Proposals ({job.applicantCount || 4})</span>
                    </button>
                  </div>

                  {/* Who Replied / Applicant Avatars banner matching requirement */}
                  <div className="p-3.5 rounded-2xl bg-[#FCFAFF] border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2 overflow-hidden">
                        <div className="w-7 h-7 rounded-full bg-purple-200 text-[#6E3FF3] font-bold text-[10px] flex items-center justify-center ring-2 ring-white">
                          UD
                        </div>
                        <div className="w-7 h-7 rounded-full bg-emerald-200 text-emerald-800 font-bold text-[10px] flex items-center justify-center ring-2 ring-white">
                          YG
                        </div>
                        <div className="w-7 h-7 rounded-full bg-amber-200 text-amber-800 font-bold text-[10px] flex items-center justify-center ring-2 ring-white">
                          DS
                        </div>
                        <div className="w-7 h-7 rounded-full bg-pink-200 text-pink-800 font-bold text-[10px] flex items-center justify-center ring-2 ring-white">
                          RP
                        </div>
                      </div>
                      <div>
                        <strong className="text-gray-900 block font-bold">
                          {job.applicantCount || 4} Freelancers Replied &amp; Sent Proposals
                        </strong>
                        <span className="text-[11px] text-gray-500">
                          Umang Donga (₹7,500), Yashraj Gohil (₹8,000), Darshan Solanki (₹9,500)...
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectProject(job.id);
                        onNavigate('posted_jobs');
                      }}
                      className="text-xs font-bold text-[#6E3FF3] hover:underline whitespace-nowrap"
                    >
                      View All Replies &amp; Proposals →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 2: Active Contracts in Escrow */}
          {(dashboardTab === 'all' || dashboardTab === 'active_contracts') && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-[#110D17]">
                  Active Projects &amp; Escrow Contracts ({activeContracts.length})
                </h2>
                <button
                  onClick={onCreateProject}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create Project</span>
                </button>
              </div>

              {activeContracts.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-3xl border border-[#ECE7F2] p-5 sm:p-6 shadow-xs hover:border-[#6E3FF3]/40 transition-all space-y-3.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3
                          onClick={() => {
                            onSelectProject(project.id);
                            onNavigate('project_detail');
                          }}
                          className="font-bold text-base text-[#110D17] hover:text-[#6E3FF3] cursor-pointer"
                        >
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {project.briefSummary}
                      </p>
                    </div>

                    <button
                      onClick={() => setBriefModalProject(project)}
                      className="px-3.5 py-1.5 rounded-xl border border-gray-200 hover:border-[#6E3FF3] text-xs font-semibold text-gray-700 hover:text-[#6E3FF3] transition-colors shrink-0"
                    >
                      Read Brief
                    </button>
                  </div>

                  {/* Details row */}
                  <div className="flex items-center justify-between gap-3 text-xs flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F3F4F6] text-gray-700 text-[11px] font-medium border border-gray-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        {project.aiPolicy}
                      </span>

                      {project.hiredFreelancer && (
                        <span className="text-gray-500 text-[11px]">
                          Freelancer:{' '}
                          <strong className="text-gray-800">{project.hiredFreelancer.name}</strong>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-gray-600 font-medium text-xs">
                      <span>
                        Contract: <strong className="text-gray-900">₹{(project.contractTotal || project.budgetMin).toLocaleString()}</strong>
                      </span>
                      <span>
                        Timeline: <strong className="text-gray-900">{project.deadline}</strong>
                      </span>
                      <span className="text-[#6E3FF3] font-bold">{project.progressPercent}%</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#6E3FF3] h-full rounded-full transition-all duration-500"
                      style={{ width: `${project.progressPercent}%` }}
                    />
                  </div>

                  {/* Actions Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                    <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>10% Advance Escrow: ₹{project.advancePaid || 680} funded</span>
                    </span>

                    <button
                      onClick={() => {
                        onSelectProject(project.id);
                        if (project.progressPercent >= 90) {
                          onNavigate('final_submission');
                        } else {
                          onNavigate('project_detail');
                        }
                      }}
                      className="text-xs font-semibold text-[#6E3FF3] hover:underline flex items-center gap-1"
                    >
                      {project.progressPercent >= 90
                        ? 'Review Final Submission →'
                        : 'Manage Milestones & Escrow →'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Recommended Talent (Page 10) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between mb-1">
            <div>
              <h2 className="text-base font-extrabold text-[#110D17]">Recommended Talent</h2>
              <p className="text-xs text-gray-500">Verified rising designers eligible for 15% credit</p>
            </div>
            <button
              onClick={() => onNavigate('find')}
              className="text-xs font-semibold text-[#6E3FF3] hover:underline"
            >
              View all
            </button>
          </div>

          {freelancers.slice(0, 3).map((designer) => {
            const isSaved = savedFreelancerIds.includes(designer.id);

            return (
              <div
                key={designer.id}
                className="bg-white rounded-3xl border border-[#ECE7F2] p-5 shadow-xs hover:border-[#6E3FF3]/40 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#F3E8FF] text-[#6E3FF3] font-bold text-sm flex items-center justify-center shrink-0 border border-purple-200">
                      {designer.initials}
                    </div>
                    <div>
                      <h4
                        onClick={() => {
                          onSelectFreelancer(designer.id);
                          onNavigate('freelancer_profile');
                        }}
                        className="font-bold text-sm text-[#110D17] hover:text-[#6E3FF3] cursor-pointer"
                      >
                        {designer.name}
                      </h4>
                      <div className="text-xs text-gray-500">{designer.role}</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      ★ {designer.rating}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-50 text-[10px] font-semibold text-[#6E3FF3] border border-purple-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6E3FF3]" />
                      {designer.primaryTag}
                    </span>
                  </div>
                </div>

                {/* 3 Portfolio preview squares */}
                <div className="grid grid-cols-3 gap-2">
                  {designer.portfolio.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectFreelancer(designer.id);
                        onNavigate('freelancer_profile');
                      }}
                      className="h-16 rounded-xl cursor-pointer hover:opacity-90 transition-opacity p-1.5 flex flex-col justify-between"
                      style={{ backgroundColor: item.bgColor }}
                    >
                      <span className="text-[9px] font-bold text-gray-800 line-clamp-1">
                        {item.title}
                      </span>
                      <span className="text-[8px] text-gray-600">{item.category}</span>
                    </div>
                  ))}
                </div>

                {/* Actions row */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <span className="text-gray-500 text-xs">
                    • {designer.completedProjects} completed projects
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleSaveFreelancer(designer.id)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                        isSaved
                          ? 'border-[#6E3FF3] bg-purple-50 text-[#6E3FF3]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {isSaved ? 'Saved' : 'Save'}
                    </button>

                    <button
                      onClick={() => {
                        onSelectFreelancer(designer.id);
                        onNavigate('freelancer_profile');
                      }}
                      className="px-3.5 py-1.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold rounded-xl shadow-xs"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Read Brief Modal */}
      {briefModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-base text-[#110D17]">
                Project Brief: {briefModalProject.title}
              </h3>
              <button
                onClick={() => setBriefModalProject(null)}
                className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed mb-4">
              {briefModalProject.briefSummary}
            </p>
            <div className="space-y-1.5 text-xs text-gray-600 mb-6">
              <strong className="text-gray-900 block">Deliverables:</strong>
              {briefModalProject.deliverables.map((d, i) => (
                <div key={i}>• {d}</div>
              ))}
            </div>
            <button
              onClick={() => setBriefModalProject(null)}
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
