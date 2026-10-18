import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, UserCheck, RefreshCw, FileText } from 'lucide-react';
import { NavView } from '../types';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onGoToDashboard: () => void;
  onNavigate: (view: NavView) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartOnboarding,
  onGoToDashboard,
  onNavigate,
}) => {
  return (
    <div className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center px-4 py-12 md:py-20 relative overflow-hidden bg-radial from-white via-[#FAF8F5] to-[#F5F1EB]">
      {/* Subtle background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#6E3FF3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Pill Badge matching Page 2 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E9E4F0] text-xs font-medium text-[#4B5563] mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#6E3FF3]" />
          <span>FindRight</span>
          <span className="text-gray-300">•</span>
          <span>Transparent Freelancer find and hire platform</span>
        </div>

        {/* Hero Title matching Page 2 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#110D17] tracking-tight leading-[1.15] mb-6">
          Real designers. Real work.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E3FF3] via-[#8545F7] to-[#A855F7]">
            Real portfolios.
          </span>
        </h1>

        {/* Subtitle matching Page 2 */}
        <p className="max-w-2xl text-base sm:text-lg text-[#6B7280] font-normal leading-relaxed mb-10">
          The human, brand-aware alternative to generic AI imagery. Designers disclose
          their AI usage upfront, so you always know what you&apos;re paying for.
        </p>

        {/* CTAs matching Page 2 */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={onStartOnboarding}
            className="flex items-center gap-2 px-7 py-3.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white font-semibold text-base rounded-2xl shadow-lg shadow-[#6E3FF3]/25 hover:shadow-xl hover:shadow-[#6E3FF3]/30 transition-all active:scale-98"
          >
            <span>Get started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('login')}
            className="px-7 py-3.5 bg-white hover:bg-gray-50 text-[#6E3FF3] border border-[#E4DCF5] font-semibold text-base rounded-2xl transition-all shadow-sm hover:border-[#6E3FF3]"
          >
            Sign in to your account
          </button>
        </div>

        {/* Highlight Feature Badges matching user prompt details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-3xl text-left">
          <div
            onClick={() => onNavigate('find')}
            className="p-4 rounded-2xl bg-white border border-[#EBE6F3] shadow-xs hover:border-[#6E3FF3]/40 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#6E3FF3] flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-[#110D17] mb-1">AI Disclosures</h3>
            <p className="text-xs text-gray-500 leading-normal">
              100% human craft vs AI-assisted ideation upfront.
            </p>
          </div>

          <div
            onClick={() => onNavigate('project_detail')}
            className="p-4 rounded-2xl bg-white border border-[#EBE6F3] shadow-xs hover:border-[#6E3FF3]/40 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-[#110D17] mb-1">10% Advance Escrow</h3>
            <p className="text-xs text-gray-500 leading-normal">
              Pay 10% to start, 90% only after you approve final work.
            </p>
          </div>

          <div
            onClick={() => onNavigate('exit_policy')}
            className="p-4 rounded-2xl bg-white border border-[#EBE6F3] shadow-xs hover:border-[#6E3FF3]/40 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <RefreshCw className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-[#110D17] mb-1">Mid-Project Exit Rule</h3>
            <p className="text-xs text-gray-500 leading-normal">
              Clear exit cut &amp; unused escrow refund if freelancer leaves.
            </p>
          </div>

          <div
            onClick={() => onNavigate('post_job')}
            className="p-4 rounded-2xl bg-white border border-[#EBE6F3] shadow-xs hover:border-[#6E3FF3]/40 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-[#110D17] mb-1">AI Brief Assistant</h3>
            <p className="text-xs text-gray-500 leading-normal">
              Rough thoughts turned into high converting briefs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
