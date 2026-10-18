import React from 'react';
import { ClientProfile, StarterCredit, Project, NavView } from '../types';
import { Building2, ShieldCheck, Sparkles, FolderKanban, CheckCircle2, ExternalLink, CreditCard, Star, FileText } from 'lucide-react';

interface ClientProfileViewProps {
  profile: ClientProfile;
  credits: StarterCredit[];
  projects: Project[];
  onNavigate: (view: NavView) => void;
  onOpenCreditsModal: () => void;
}

export const ClientProfileView: React.FC<ClientProfileViewProps> = ({
  profile,
  credits,
  projects,
  onNavigate,
  onOpenCreditsModal,
}) => {
  const availableCredits = credits.filter((c) => c.status === 'available').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* Top Profile Card */}
      <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-[#110D17] text-white font-black text-2xl flex items-center justify-center border-4 border-purple-100 shadow-md">
              MP
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-black text-[#110D17]">{profile.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-[#6E3FF3] text-xs font-bold">
                  Verified Hirer
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-gray-400" />
                <span>{profile.company}</span>
                <span>•</span>
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#6E3FF3] hover:underline"
                >
                  {profile.website.replace('https://', '')}
                </a>
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Escrow Trust Score
                </span>
                <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
                  ★ 4.9 (8 reviews from designers)
                </span>
              </div>

              {/* Company Authentication Badge */}
              <div className="mt-3 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-emerald-950">
                      Corporate Authenticity: {profile.verification?.status === 'verified' ? 'Verified Real Company' : 'Standard Account'}
                    </span>
                    <span className="text-[11px] text-emerald-800 ml-2">
                      {profile.verification?.registrationNumber || 'CIN: U74999MH2021PTC348211'} • {profile.verification?.registrySource || 'MCA India'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-[11px] font-bold text-[#6E3FF3] hover:underline self-start sm:self-auto"
                >
                  Switch / Re-authenticate
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('settings')}
            className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:border-gray-300 self-start sm:self-auto"
          >
            Edit profile
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100 text-xs">
          <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-purple-50">
            <span className="text-gray-400 block text-[11px] mb-1">Total invested</span>
            <div className="text-xl font-black text-[#110D17]">
              ₹{profile.totalInvested.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">100% protected escrow</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-purple-50">
            <span className="text-gray-400 block text-[11px] mb-1">Completed hires</span>
            <div className="text-xl font-black text-[#110D17]">{profile.completedHires}</div>
            <span className="text-[10px] text-gray-500 font-medium">8 verified handoffs</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-purple-50">
            <span className="text-gray-400 block text-[11px] mb-1">Active contracts</span>
            <div className="text-xl font-black text-[#6E3FF3]">{profile.activeContracts}</div>
            <span className="text-[10px] text-purple-600 font-semibold">Currently in progress</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-purple-50">
            <span className="text-gray-400 block text-[11px] mb-1">Starter credits</span>
            <div className="text-xl font-black text-[#6E3FF3]">{availableCredits} left</div>
            <span className="text-[10px] text-gray-500 font-medium">15% off rising talent</span>
          </div>
        </div>
      </div>

      {/* Starter Credits Wallet Card */}
      <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#6E3FF3]" />
            <h2 className="text-base font-extrabold text-[#110D17]">
              Starter Hire Credits Wallet
            </h2>
          </div>
          <button
            onClick={onOpenCreditsModal}
            className="text-xs font-semibold text-[#6E3FF3] hover:underline"
          >
            How credits work →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {credits.map((c, i) => (
            <div
              key={c.id}
              className={`p-4 rounded-2xl border-2 flex flex-col justify-between ${
                c.status === 'applied'
                  ? 'border-purple-300 bg-purple-50/50'
                  : 'border-[#6E3FF3] bg-[#FCFAFF]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#6E3FF3] bg-purple-100 px-2 py-0.5 rounded-md">
                    {c.name}
                  </span>
                  <span
                    className={`text-[11px] font-semibold ${
                      c.status === 'applied' ? 'text-purple-700' : 'text-emerald-600'
                    }`}
                  >
                    {c.status === 'applied' ? 'Applied on Noble Paws' : '✓ Available'}
                  </span>
                </div>
                <div className="text-2xl font-black text-[#110D17] mb-1">
                  {c.discountPercent}% OFF
                </div>
                <div className="text-xs text-gray-600">
                  Up to ₹{c.maxAmount.toLocaleString()} on rising talent
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-purple-100 text-[10px] text-gray-400">
                {c.validFor}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commissioned Disciplines & Escrow History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-[#110D17]">Commissioned Disciplines</h3>
          <div className="flex flex-wrap gap-2">
            {profile.disciplines.map((d) => (
              <span
                key={d}
                className="px-3 py-1.5 rounded-xl bg-gray-100 text-xs font-medium text-gray-800"
              >
                {d}
              </span>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 text-xs text-gray-500 leading-relaxed">
            Noble Paws primarily commissions brand identities, pet nutrition packaging, and responsive
            e-commerce storefronts on FindRight.
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-[#110D17]">Escrow &amp; Invoices</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#6E3FF3]" />
                <span className="font-semibold text-gray-800">Invoice #FR-2026-104</span>
              </div>
              <span className="text-gray-500">₹6,800 · Paid</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#6E3FF3]" />
                <span className="font-semibold text-gray-800">Invoice #FR-2026-098</span>
              </div>
              <span className="text-gray-500">₹5,200 · In Escrow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
