import React, { useState } from 'react';
import { ArrowLeft, Check, Shield, MessageSquare, Heart, Star, Sparkles, ShieldCheck } from 'lucide-react';
import { Freelancer, PortfolioItem, NavView } from '../types';

interface FreelancerProfileViewProps {
  freelancer: Freelancer;
  onBack: () => void;
  onStartHire: (freelancer: Freelancer) => void;
  onSendMessage: (freelancerId: string) => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

export const FreelancerProfileView: React.FC<FreelancerProfileViewProps> = ({
  freelancer,
  onBack,
  onStartHire,
  onSendMessage,
  isSaved,
  onToggleSave,
}) => {
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  // Exact 6 pastel portfolio colors matching Image 1
  const portfolioItems = [
    { id: '1', title: 'Fintech dashboard', bgColor: '#D4D0FE' },
    { id: '2', title: 'Travel app', bgColor: '#C7F0C7' },
    { id: '3', title: 'Weather app', bgColor: '#FCE0E8' },
    { id: '4', title: 'SaaS analytics', bgColor: '#D9E8FD' },
    { id: '5', title: 'E-commerce site', bgColor: '#FDE6BA' },
    { id: '6', title: 'Wellness app', bgColor: '#BFE2D5' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1240px] mx-auto space-y-4">
      {/* Back to results link matching Image 1 */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#6E3FF3] transition-colors"
        >
          <span>←</span>
          <span>Back to results</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: 5 stacked white cards matching Image 1 */}
        <div className="lg:col-span-8 space-y-4">
          {/* CARD 1: Profile Header Card */}
          <div className="bg-white rounded-2xl border border-[#ECE7F2] p-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Avatar UD circle matching Image 1 */}
                <div className="w-18 h-18 rounded-full bg-[#F3EFFF] text-[#6E3FF3] font-bold text-2xl flex items-center justify-center shrink-0">
                  UD
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[#110D17]">
                    {freelancer.name}
                  </h1>
                  <p className="text-xs text-gray-500 mt-1">
                    {freelancer.role} · India · Member since 2024
                  </p>

                  {/* 3 Pills Row matching Image 1 */}
                  <div className="flex items-center gap-2 flex-wrap mt-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2FF] text-[#6E3FF3] text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6E3FF3]" />
                      AI-assisted ideation
                    </span>

                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FEF3C7] text-[#D97706] text-xs font-medium">
                      Rising talent
                    </span>

                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-medium">
                      ID verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating on right matching Image 1 */}
              <div className="flex items-center gap-1 text-sm text-[#110D17]">
                <Star className="w-4 h-4 text-amber-400 stroke-amber-400 fill-amber-400" />
                <span className="font-bold">3.5</span>
                <span className="text-gray-400 text-xs">(24 reviews)</span>
              </div>
            </div>
          </div>

          {/* CARD 2: 4 Separate Stats Cards Row matching Image 1 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-[#ECE7F2] p-4 shadow-2xs">
              <div className="text-xl font-bold text-[#6E3FF3]">32</div>
              <div className="text-xs text-gray-500 mt-1">Completed projects</div>
            </div>

            <div className="bg-white rounded-2xl border border-[#ECE7F2] p-4 shadow-2xs">
              <div className="text-xl font-bold text-[#6E3FF3]">3.5</div>
              <div className="text-xs text-gray-500 mt-1">Average rating</div>
            </div>

            <div className="bg-white rounded-2xl border border-[#ECE7F2] p-4 shadow-2xs">
              <div className="text-xl font-bold text-[#6E3FF3]">96%</div>
              <div className="text-xs text-gray-500 mt-1">On-time delivery</div>
            </div>

            <div className="bg-white rounded-2xl border border-[#ECE7F2] p-4 shadow-2xs">
              <div className="text-xl font-bold text-[#6E3FF3]">&lt; 2 hrs</div>
              <div className="text-xs text-gray-500 mt-1">Avg. response time</div>
            </div>
          </div>

          {/* CARD 3: AI usage disclosure matching Image 1 */}
          <div className="bg-white rounded-2xl border border-[#ECE7F2] p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#6E3FF3]" />
              <h2 className="text-sm font-bold text-[#110D17]">AI usage disclosure</h2>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Ideation &amp; moodboards</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2FF] text-[#6E3FF3] text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6E3FF3]" />
                  AI-assisted
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700">Wireframes &amp; UI screens</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-[11px] font-medium border border-[#A7F3D0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  100% human-made
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700">Icons, copy &amp; final assets</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-[11px] font-medium border border-[#A7F3D0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  100% human-made
                </span>
              </div>
            </div>
          </div>

          {/* CARD 4: Portfolio matching Image 1 */}
          <div className="bg-white rounded-2xl border border-[#ECE7F2] p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#110D17]">Portfolio</h2>
              <span className="text-xs font-semibold text-[#6E3FF3] hover:underline cursor-pointer">
                View all 12
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {portfolioItems.map((item) => (
                <div key={item.id} className="space-y-1.5">
                  <div
                    className="h-28 rounded-2xl cursor-pointer hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: item.bgColor }}
                    onClick={() =>
                      setSelectedPortfolioItem({
                        id: item.id,
                        title: item.title,
                        category: 'UI/UX Design',
                        bgColor: item.bgColor,
                        tags: ['Figma', 'UI/UX'],
                        description: `Comprehensive design project for ${item.title} with handcrafted components and user-focused flows.`,
                      })
                    }
                  />
                  <div className="text-xs font-medium text-gray-800">{item.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 5: Client reviews matching Image 1 */}
          <div className="bg-white rounded-2xl border border-[#ECE7F2] p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold text-[#110D17]">Client reviews</h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F3EFFF] text-[#6E3FF3] font-bold text-xs flex items-center justify-center shrink-0">
                  M
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-gray-900">
                    <span>Mr. Sharma</span>
                    <span className="text-amber-500 flex items-center text-xs">★ 4.0</span>
                  </div>
                  <p className="text-gray-600 mt-0.5 leading-relaxed">
                    Clear communication and clean handoff. Delivered the app screens a day early.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F3EFFF] text-[#6E3FF3] font-bold text-xs flex items-center justify-center shrink-0">
                  P
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-gray-900">
                    <span>Priya M.</span>
                    <span className="text-amber-500 flex items-center text-xs">★ 4.0</span>
                  </div>
                  <p className="text-gray-600 mt-0.5 leading-relaxed">
                    Great at turning a rough brief into a polished UI. Revisions were quick.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 3 stacked cards matching Image 1 */}
        <div className="lg:col-span-4 space-y-4 sticky top-20">
          {/* RIGHT CARD 1: Pricing & Action Buttons */}
          <div className="bg-white rounded-2xl border border-[#ECE7F2] p-6 shadow-2xs space-y-5">
            <div>
              <span className="text-xs text-gray-400 block">Starting at</span>
              <div className="text-3xl font-extrabold text-[#110D17] mt-1">₹4,000</div>
            </div>

            <div className="space-y-3 py-3 border-y border-gray-100 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery</span>
                <span className="font-semibold text-gray-900">2–3 weeks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Experience</span>
                <span className="font-semibold text-gray-900">Intermediate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Revisions</span>
                <span className="font-semibold text-gray-900">2 rounds</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment</span>
                <span className="font-semibold text-gray-900">Milestone escrow</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => onStartHire(freelancer)}
                className="w-full py-3 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Hire Umang</span>
              </button>

              <button
                onClick={() => onSendMessage(freelancer.id)}
                className="w-full py-2.5 bg-white border border-[#6E3FF3] text-[#6E3FF3] hover:bg-purple-50 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Send message</span>
              </button>

              <button
                onClick={onToggleSave}
                className="w-full py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                <span>Save designer</span>
              </button>
            </div>
          </div>

          {/* RIGHT CARD 2: Starter credit eligible matching Image 1 */}
          <div className="bg-[#FAF5FF] rounded-2xl border border-[#F3E8FF] p-5 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-[#6E3FF3]">
              <Sparkles className="w-4 h-4" />
              <span>Starter credit eligible</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Use one 15% OFF credit (up to ₹5,000) on your first hire with rising talent.
            </p>
          </div>

          {/* RIGHT CARD 3: Protected by escrow matching Image 1 */}
          <div className="bg-white rounded-2xl border border-[#ECE7F2] p-5 text-xs space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-[#110D17]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Protected by escrow</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Pay only 10% to start. The rest is released after you approve the final work.
            </p>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedPortfolioItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-extrabold text-base text-[#110D17]">
                {selectedPortfolioItem.title}
              </h3>
              <button
                onClick={() => setSelectedPortfolioItem(null)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold"
              >
                ✕
              </button>
            </div>
            <div
              className="h-44 rounded-2xl flex items-center justify-center mb-4"
              style={{ backgroundColor: selectedPortfolioItem.bgColor }}
            >
              <span className="font-extrabold text-xl text-gray-800">
                {selectedPortfolioItem.title}
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-6">
              {selectedPortfolioItem.description}
            </p>
            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setSelectedPortfolioItem(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedPortfolioItem(null);
                  onStartHire(freelancer);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#6E3FF3] text-white font-semibold"
              >
                Hire for similar project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
