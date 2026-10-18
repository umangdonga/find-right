import React from 'react';
import { Home, Search, Briefcase, FolderKanban, MessageSquare, User, Settings, Check } from 'lucide-react';
import { NavView } from '../types';

interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  unreadChatCount?: number;
  activeProjectsCount?: number;
  postedJobsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  unreadChatCount = 1,
  activeProjectsCount = 3,
  postedJobsCount = 6,
}) => {
  // Map specific detail views to their parent navigation item
  const getActiveTab = (): string => {
    if (['home'].includes(currentView)) return 'home';
    if (['find', 'freelancer_profile'].includes(currentView)) return 'find';
    if (['posted_jobs', 'post_job', 'hire_requests', 'review_request', 'consultation', 'finalize_project', 'hire_checkout'].includes(currentView)) return 'posted_jobs';
    if (['projects', 'project_detail', 'final_submission', 'exit_policy'].includes(currentView)) return 'projects';
    if (['chat'].includes(currentView)) return 'chat';
    if (['profile'].includes(currentView)) return 'profile';
    if (['settings'].includes(currentView)) return 'settings';
    return 'home';
  };

  const activeTab = getActiveTab();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, view: 'home' as NavView },
    { id: 'find', label: 'Find', icon: Search, view: 'find' as NavView },
    { id: 'posted_jobs', label: 'Jobs', icon: Briefcase, view: 'posted_jobs' as NavView, badge: postedJobsCount },
    { id: 'projects', label: 'Projects', icon: FolderKanban, view: 'projects' as NavView, badge: activeProjectsCount },
    { id: 'chat', label: 'Chat', icon: MessageSquare, view: 'chat' as NavView, badge: unreadChatCount },
    { id: 'profile', label: 'Profile', icon: User, view: 'profile' as NavView },
    { id: 'settings', label: 'Settings', icon: Settings, view: 'settings' as NavView },
  ];

  return (
    <>
      {/* Desktop Left Sidebar matching Figma Screenshots */}
      <aside className="hidden md:flex flex-col items-center w-[84px] py-6 bg-white border-r border-[#ECE7F2] shrink-0 min-h-screen select-none z-30">
        {/* Logo mark: Checkmark inside sleek curve */}
        <button
          onClick={() => onNavigate('home')}
          className="w-12 h-12 mb-6 flex items-center justify-center rounded-2xl bg-[#6E3FF3]/10 text-[#6E3FF3] hover:scale-105 transition-transform"
          title="FindRight Home"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#6E3FF3]">
            <Check className="w-5 h-5 text-[#6E3FF3] stroke-[3]" />
          </div>
        </button>

        {/* Top Navigation Items matching Image 1 & 2 */}
        <nav className="flex flex-col items-center gap-2.5 w-full px-3">
          {navItems.slice(0, 5).map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.view)}
                className={`relative group flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#6E3FF3] text-white shadow-md shadow-[#6E3FF3]/25'
                    : 'text-[#6B7280] hover:text-[#110D17] hover:bg-[#F5F2FC]'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
                <span className={`text-[10px] font-medium tracking-tight ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>

                {Boolean(item.badge && item.badge > 0 && !isActive) && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#6E3FF3] rounded-full ring-2 ring-white" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Navigation Items: Profile & Settings */}
        <div className="mt-auto flex flex-col items-center gap-2.5 w-full px-3 pt-4 border-t border-gray-100/50">
          {navItems.slice(5).map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.view)}
                className={`relative group flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#6E3FF3] text-white shadow-md shadow-[#6E3FF3]/25'
                    : 'text-[#6B7280] hover:text-[#110D17] hover:bg-[#F5F2FC]'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
                <span className={`text-[10px] font-medium tracking-tight ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#ECE7F2] flex items-center justify-around px-2 z-40 shadow-lg">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.view)}
              className={`flex flex-col items-center justify-center py-1 px-2 relative ${
                isActive ? 'text-[#6E3FF3]' : 'text-gray-500'
              }`}
            >
              <div className={`p-1 rounded-xl ${isActive ? 'bg-[#6E3FF3]/10' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
              {Boolean(item.badge && item.badge > 0) && (
                <span className="absolute top-1 right-2 w-2 h-2 bg-[#6E3FF3] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};
