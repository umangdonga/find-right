import React from 'react';
import { Check, Sparkles, Plus, Bell, ShieldCheck, ArrowRightLeft } from 'lucide-react';
import { NavView, Role, StarterCredit, ClientProfile } from '../types';

interface NavbarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  role: Role;
  onToggleRole: () => void;
  credits: StarterCredit[];
  onOpenCreditsModal: () => void;
  onPostJobClick: () => void;
  clientProfile?: ClientProfile;
  onOpenLogin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  role,
  onToggleRole,
  credits,
  onOpenCreditsModal,
  onPostJobClick,
  clientProfile,
  onOpenLogin,
}) => {
  const availableCreditsCount = credits.filter((c) => c.status === 'available').length;
  const isLanding = currentView === 'landing';
  const isLogin = currentView === 'login';

  const avatarInitials = clientProfile?.name
    ? clientProfile.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'MP';

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#ECE7F2] px-4 md:px-8 py-3.5 flex items-center justify-between">
      {/* Brand logo & tagline */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate(isLanding ? 'landing' : 'home')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-full border-2 border-[#6E3FF3] flex items-center justify-center bg-[#6E3FF3]/5 group-hover:bg-[#6E3FF3]/10 transition-colors">
            <Check className="w-4 h-4 text-[#6E3FF3] stroke-[3]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg md:text-xl text-[#110D17] tracking-tight">
              FindRight
            </span>
          </div>
        </button>

        {!isLanding && !isLogin && (
          <div className="hidden lg:flex items-center gap-2 pl-4 ml-3 border-l border-gray-200">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Escrow Protected
            </span>

            {clientProfile?.verification?.status === 'verified' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-purple-50 text-[#6E3FF3] border border-purple-200">
                <Check className="w-3 h-3 text-[#6E3FF3] stroke-[3]" />
                <span className="hidden xl:inline">Verified Co:</span> {clientProfile.company.slice(0, 16)}...
              </span>
            )}
          </div>
        )}
      </div>

      {/* Right controls */}
      {isLanding || isLogin ? (
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('login')}
            className={`text-sm font-semibold px-3.5 py-2 transition-colors ${
              isLogin ? 'text-[#6E3FF3]' : 'text-[#110D17] hover:text-[#6E3FF3]'
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => onNavigate('onboarding')}
            className="bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-sm font-semibold px-4 md:px-5 py-2 rounded-xl transition-all shadow-sm hover:shadow"
          >
            Get started
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2.5 md:gap-4">
          {/* 3 Starter credits badge */}
          <button
            onClick={onOpenCreditsModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF5FF] hover:bg-[#F3E8FF] border border-[#E9D5FF] rounded-xl text-xs font-semibold text-[#6E3FF3] transition-colors"
            title="View your starter hiring credits"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#9333EA]" />
            <span className="hidden sm:inline">Starter Credits:</span>
            <span className="bg-[#6E3FF3] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {availableCreditsCount}
            </span>
            <span className="text-gray-500 font-normal hidden md:inline">15% off</span>
          </button>

          {/* Role switcher toggle */}
          <button
            onClick={onToggleRole}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-medium text-gray-700 transition-colors"
            title="Toggle between Client view and Freelancer view"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-gray-500" />
            <span>Role:</span>
            <span className="font-semibold text-[#110D17] capitalize">{role}</span>
          </button>

          {/* Quick Create Project Button */}
          <button
            onClick={onPostJobClick}
            className="flex items-center gap-1.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs md:text-sm font-semibold px-3 md:px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Post a Job</span>
            <span className="sm:hidden">Post</span>
          </button>

          {/* Client Login / Switch profile */}
          <button
            onClick={() => onNavigate('login')}
            className="hidden md:inline-flex items-center px-2.5 py-1.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            title="Switch Client Account or Re-verify Company"
          >
            Switch Hirer
          </button>

          {/* Client Avatar */}
          <button
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-2 pl-1 group"
            title={`Go to ${clientProfile?.name || 'client'} profile`}
          >
            <div className="w-8 h-8 rounded-full bg-[#110D17] text-white flex items-center justify-center font-bold text-xs ring-2 ring-transparent group-hover:ring-[#6E3FF3] transition-all">
              {avatarInitials}
            </div>
          </button>
        </div>
      )}
    </header>
  );
};
