import React, { useState } from 'react';
import { Search, SlidersHorizontal, Bookmark, Plus, Sparkles, Check, ChevronRight } from 'lucide-react';
import { Freelancer, StarterCredit, NavView } from '../types';

interface FindFreelancersViewProps {
  freelancers: Freelancer[];
  credits: StarterCredit[];
  onSelectFreelancer: (id: string) => void;
  onNavigate: (view: NavView) => void;
  onCreateProject: () => void;
  onOpenCreditsModal: () => void;
  savedFreelancerIds: string[];
  onToggleSaveFreelancer: (id: string) => void;
}

export const FindFreelancersView: React.FC<FindFreelancersViewProps> = ({
  freelancers,
  credits,
  onSelectFreelancer,
  onNavigate,
  onCreateProject,
  onOpenCreditsModal,
  savedFreelancerIds,
  onToggleSaveFreelancer,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('UI/UX Design');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');
  const [selectedAIUsage, setSelectedAIUsage] = useState<string>('All');
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);
  const [showFiltersDrawer, setShowFiltersDrawer] = useState<boolean>(false);

  const categories = ['UI/UX Design', 'Graphic Design', 'Product Design', 'Motion Design', 'Brand Identity'];
  const experienceLevels = ['All', 'Fresher / Entry', 'Intermediate', 'High-level / Expert'];
  const aiUsageOptions = ['All', 'No AI (100% human-made)', 'AI-assisted ideation', 'AI-supported design'];

  const availableCreditsCount = credits.filter((c) => c.status === 'available').length;

  const filteredFreelancers = freelancers.filter((f) => {
    if (showSavedOnly && !savedFreelancerIds.includes(f.id)) return false;
    if (searchTerm) {
      const matchName = f.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchRole = f.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSkills = f.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
      if (!matchName && !matchRole && !matchSkills) return false;
    }
    if (selectedExperience !== 'All' && f.experienceLevel !== selectedExperience) return false;
    if (selectedAIUsage !== 'All' && f.primaryTag !== selectedAIUsage) return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header matching PDF 2 Page 1 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#110D17] tracking-tight">
            Find freelancers
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Search verified designers by category, experience level and AI usage
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

      {/* Search Bar & Filter toggles */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search designers, skills or tools…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs sm:text-sm focus:outline-none focus:border-[#6E3FF3] shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
              showFiltersDrawer || selectedExperience !== 'All' || selectedAIUsage !== 'All'
                ? 'border-[#6E3FF3] bg-purple-50 text-[#6E3FF3]'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <button
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
              showSavedOnly
                ? 'border-[#6E3FF3] bg-purple-50 text-[#6E3FF3]'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showSavedOnly ? 'fill-[#6E3FF3]' : ''}`} />
            <span>Saved designers</span>
            {savedFreelancerIds.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#6E3FF3] text-white text-[10px] flex items-center justify-center font-bold">
                {savedFreelancerIds.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Pills (PDF 2 Page 1) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#6E3FF3] text-white shadow-xs'
                  : 'bg-white text-gray-700 border border-[#ECE7F2] hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Experience & AI Usage Pill Filters */}
      <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-400 font-medium text-[11px]">Experience:</span>
          {experienceLevels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedExperience(lvl)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedExperience === lvl
                  ? 'bg-[#110D17] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-400 font-medium text-[11px]">AI usage:</span>
          {aiUsageOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setSelectedAIUsage(opt)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedAIUsage === opt
                  ? 'bg-[#6E3FF3] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Designer Count & Sorting label */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
        <span>
          Showing <strong>{filteredFreelancers.length}</strong> designers · Sorted by top rated
        </span>
      </div>

      {/* Designer Cards Grid (PDF 2 Page 1) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFreelancers.map((designer) => {
          const isSaved = savedFreelancerIds.includes(designer.id);

          return (
            <div
              key={designer.id}
              className="bg-white rounded-3xl border border-[#ECE7F2] p-5 shadow-xs hover:border-[#6E3FF3]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] text-[#6E3FF3] font-extrabold text-sm flex items-center justify-center shrink-0 border border-purple-200">
                      {designer.initials}
                    </div>
                    <div>
                      <h3
                        onClick={() => {
                          onSelectFreelancer(designer.id);
                          onNavigate('freelancer_profile');
                        }}
                        className="font-bold text-sm text-[#110D17] hover:text-[#6E3FF3] cursor-pointer transition-colors"
                      >
                        {designer.name}
                      </h3>
                      <p className="text-xs text-gray-500">{designer.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 font-bold text-xs text-amber-500">
                    <span>★</span>
                    <span>{designer.rating}</span>
                  </div>
                </div>

                {/* AI & Rising Talent Tags (PDF 2 Page 1) */}
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-[10px] font-semibold text-[#6E3FF3] border border-purple-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6E3FF3]" />
                    {designer.primaryTag}
                  </span>

                  {designer.isRisingTalent && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-[10px] font-semibold text-amber-700 border border-amber-200">
                      Rising talent · 15% credit
                    </span>
                  )}
                </div>

                {/* 3 Portfolio preview rectangles matching PDF 2 Page 1 */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {designer.portfolio.slice(0, 3).map((work) => (
                    <div
                      key={work.id}
                      onClick={() => {
                        onSelectFreelancer(designer.id);
                        onNavigate('freelancer_profile');
                      }}
                      className="h-20 rounded-xl cursor-pointer hover:opacity-90 transition-opacity p-2 flex flex-col justify-between"
                      style={{ backgroundColor: work.bgColor }}
                    >
                      <span className="text-[10px] font-bold text-gray-800 line-clamp-2">
                        {work.title}
                      </span>
                      <span className="text-[9px] text-gray-600 font-medium">{work.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats & Actions matching PDF 2 Page 1 */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
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
                    className="px-3.5 py-1.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold rounded-xl shadow-xs transition-all active:scale-95"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3 Starter Hire Credits Bottom Banner matching PDF 2 Page 1 */}
      <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#FAF5FF] via-[#F3E8FF] to-[#FAF5FF] border border-[#E9D5FF] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#6E3FF3] text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-[#110D17]">
              {availableCreditsCount} starter hire credits available
            </h4>
            <p className="text-xs text-gray-600 mt-0.5">
              15% off up to ₹5,000 when you hire rising talent. Pick one credit at checkout.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCreditsModal}
          className="px-5 py-2.5 rounded-xl border border-[#6E3FF3] bg-white text-xs font-bold text-[#6E3FF3] hover:bg-purple-50 transition-colors shadow-2xs whitespace-nowrap self-stretch sm:self-auto text-center"
        >
          View my credits
        </button>
      </div>
    </div>
  );
};
