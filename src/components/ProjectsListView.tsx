import React, { useState } from 'react';
import { Project, NavView } from '../types';
import { Plus, ArrowRight, ShieldCheck, ChevronRight, Clock, CheckCircle2 } from 'lucide-react';

interface ProjectsListViewProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onCreateProject: () => void;
  onNavigate: (view: NavView) => void;
}

export const ProjectsListView: React.FC<ProjectsListViewProps> = ({
  projects,
  onSelectProject,
  onCreateProject,
  onNavigate,
}) => {
  const [filterTab, setFilterTab] = useState<'active' | 'hiring' | 'completed' | 'drafts'>('active');

  const activeProjects = projects.filter((p) => p.status === 'in_progress' || p.status === 'in_review');
  const hiringProjects = projects.filter((p) => p.status === 'hiring');
  const completedProjects = projects.filter((p) => p.status === 'completed');
  const draftProjects = projects.filter((p) => p.status === 'draft');

  const getFilteredList = () => {
    switch (filterTab) {
      case 'active':
        return activeProjects;
      case 'hiring':
        return hiringProjects;
      case 'completed':
        return completedProjects;
      case 'drafts':
        return draftProjects;
      default:
        return activeProjects;
    }
  };

  const displayedProjects = getFilteredList();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header matching PDF 2 Page 17 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#110D17]">Projects</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Track every job you posted and every freelancer you hired
          </p>
        </div>

        <button
          onClick={onCreateProject}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold shadow-xs transition-all active:scale-98 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create a new project</span>
        </button>
      </div>

      {/* Filter Tabs matching PDF 2 Page 17 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilterTab('active')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filterTab === 'active'
              ? 'bg-[#6E3FF3] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }`}
        >
          Active {activeProjects.length}
        </button>

        <button
          onClick={() => setFilterTab('hiring')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filterTab === 'hiring'
              ? 'bg-[#6E3FF3] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }`}
        >
          Hiring {hiringProjects.length}
        </button>

        <button
          onClick={() => setFilterTab('completed')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filterTab === 'completed'
              ? 'bg-[#6E3FF3] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }`}
        >
          Completed {completedProjects.length}
        </button>

        <button
          onClick={() => setFilterTab('drafts')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            filterTab === 'drafts'
              ? 'bg-[#6E3FF3] text-white shadow-xs'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
          }`}
        >
          Drafts {draftProjects.length || 1}
        </button>
      </div>

      {/* Projects List matching PDF 2 Page 17 */}
      <div className="space-y-4">
        {displayedProjects.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-gray-200">
            <p className="text-xs text-gray-500 mb-4">No projects in this category.</p>
            <button
              onClick={onCreateProject}
              className="px-4 py-2 bg-[#6E3FF3] text-white rounded-xl text-xs font-semibold"
            >
              Post a New Project
            </button>
          </div>
        ) : (
          displayedProjects.map((p) => {
            const isHiring = p.status === 'hiring';
            const isFinalApproval = p.progressPercent >= 90;
            const isCompleted = p.status === 'completed';

            return (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-[#ECE7F2] p-5 sm:p-6 shadow-xs hover:border-[#6E3FF3]/40 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3
                      onClick={() => {
                        onSelectProject(p.id);
                        if (isHiring) onNavigate('hire_requests');
                        else if (isFinalApproval) onNavigate('final_submission');
                        else onNavigate('project_detail');
                      }}
                      className="font-extrabold text-base text-[#110D17] hover:text-[#6E3FF3] cursor-pointer"
                    >
                      {p.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      {p.hiredFreelancer ? (
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-purple-100 text-[#6E3FF3] text-[10px] font-bold flex items-center justify-center">
                            {p.hiredFreelancer.initials}
                          </span>
                          <strong className="text-gray-800">{p.hiredFreelancer.name}</strong>
                        </div>
                      ) : (
                        <span>No one hired yet</span>
                      )}
                    </div>
                  </div>

                  {/* Status badge & action button matching Page 17 */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        isHiring
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : isFinalApproval
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : isCompleted
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-purple-50 text-[#6E3FF3] border border-purple-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isHiring
                            ? 'bg-blue-500'
                            : isFinalApproval
                            ? 'bg-amber-500'
                            : isCompleted
                            ? 'bg-emerald-500'
                            : 'bg-[#6E3FF3]'
                        }`}
                      />
                      {isHiring
                        ? 'Hiring'
                        : isFinalApproval
                        ? 'Final approval'
                        : isCompleted
                        ? 'Completed'
                        : 'In progress'}
                    </span>

                    <button
                      onClick={() => {
                        onSelectProject(p.id);
                        if (isHiring) onNavigate('hire_requests');
                        else if (isFinalApproval) onNavigate('final_submission');
                        else onNavigate('project_detail');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold shadow-2xs transition-all active:scale-95"
                    >
                      {isHiring
                        ? 'View requests'
                        : isFinalApproval
                        ? 'Approve'
                        : isCompleted
                        ? 'View summary'
                        : 'Review'}
                    </button>
                  </div>
                </div>

                {/* Progress bar matching PDF 2 Page 17 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>
                        {isHiring
                          ? `${p.applicantCount || 4} new hire requests`
                          : isFinalApproval
                          ? 'Final files ready to approve'
                          : isCompleted
                          ? 'Project delivered & escrow completed'
                          : p.recentActivity?.[0]?.text || 'Work progressing smoothly'}
                      </span>
                    </span>
                    <span className="font-bold text-[#6E3FF3]">{p.progressPercent}%</span>
                  </div>

                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#6E3FF3] h-full rounded-full transition-all duration-500"
                      style={{ width: `${p.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Contract Price row matching Page 17 */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                  <span className="text-gray-500">
                    Category: <strong className="text-gray-700">{p.category}</strong>
                  </span>
                  <div>
                    <span className="text-gray-500">Contract: </span>
                    <strong className="text-[#110D17] font-black text-sm">
                      {isHiring
                        ? `₹${p.budgetMin.toLocaleString()} – ₹${p.budgetMax.toLocaleString()}`
                        : `₹${(p.contractTotal || p.agreedPrice || p.budgetMin).toLocaleString()}`}
                    </strong>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
