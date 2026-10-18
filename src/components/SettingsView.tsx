import React, { useState } from 'react';
import { ShieldCheck, Bell, CreditCard, Sparkles, Check, RefreshCw } from 'lucide-react';
import { ClientProfile } from '../types';

interface SettingsViewProps {
  profile: ClientProfile;
  onUpdateProfile: (updated: Partial<ClientProfile>) => void;
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  onUpdateProfile,
  onResetData,
}) => {
  const [name, setName] = useState(profile.name);
  const [company, setCompany] = useState(profile.company);
  const [email, setEmail] = useState(profile.email);
  const [website, setWebsite] = useState(profile.website);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name, company, email, website });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#110D17]">Settings</h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Manage your client organization, escrow security rules, and platform preferences
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#ECE7F2] p-6 sm:p-8 shadow-xs space-y-5">
        <h2 className="text-base font-extrabold text-[#110D17]">Account &amp; Company Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Contact Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#6E3FF3]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Company / Organization</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#6E3FF3]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#6E3FF3]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Website</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#6E3FF3]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-gray-100">
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold rounded-xl shadow-xs"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Escrow & Security Rules */}
      <div className="bg-white rounded-3xl border border-[#ECE7F2] p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-extrabold text-[#110D17]">Escrow Security Rules</h2>
        </div>

        <div className="space-y-3 text-xs text-gray-600">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
            <div>
              <strong className="text-gray-900 block">Upfront 10% Advance Protection</strong>
              <span>Advance stays in verified escrow until contract milestones begin.</span>
            </div>
            <span className="text-emerald-600 font-bold">Enabled</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
            <div>
              <strong className="text-gray-900 block">Transparent AI Disclosure Requirement</strong>
              <span>All applicants must disclose AI tool usage before proposal submission.</span>
            </div>
            <span className="text-purple-600 font-bold">Mandatory</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
            <div>
              <strong className="text-gray-900 block">Mid-Project Exit Settlement</strong>
              <span>Automated exit cut and remaining escrow return in accordance with FindRight rules.</span>
            </div>
            <span className="text-emerald-600 font-bold">Active</span>
          </div>
        </div>
      </div>

      {/* Demo Reset */}
      <div className="p-6 rounded-3xl bg-rose-50/50 border border-rose-100 flex items-center justify-between text-xs">
        <div>
          <strong className="text-rose-900 block font-bold">Reset Demo Workspace State</strong>
          <span className="text-rose-700">Restore projects, proposals, chat, and starter credits back to initial state.</span>
        </div>
        <button
          onClick={onResetData}
          className="px-4 py-2 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 font-semibold rounded-xl shadow-2xs"
        >
          Reset Data
        </button>
      </div>
    </div>
  );
};
