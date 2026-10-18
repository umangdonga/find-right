import React, { useState } from 'react';
import { Briefcase, Feather, Check, ArrowRight, ArrowLeft, Sparkles, Building2, User, Layers, Sparkle } from 'lucide-react';
import { Role, StarterCredit } from '../types';

interface OnboardingFlowProps {
  onComplete: () => void;
  onSkip: () => void;
  onRoleSelected: (role: Role) => void;
  onNavigateToLogin?: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onComplete,
  onSkip,
  onRoleSelected,
  onNavigateToLogin,
}) => {
  const [step, setStep] = useState<number>(1); // 1: Role, 2: Auth, 3: Profile, 4: Credits, 5: Topics
  const [selectedRole, setSelectedRole] = useState<Role>('client');
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [fullName, setFullName] = useState('Peter Parker');
  const [email, setEmail] = useState('peter.parker@noblepaws.com');
  const [hiringFor, setHiringFor] = useState<'company' | 'personal'>('company');
  const [companyName, setCompanyName] = useState('Noble Paws Pet Health Co.');
  const [website, setWebsite] = useState('https://noblepetnutrition.com');
  const [registrationId, setRegistrationId] = useState('CIN: U74999MH2021PTC348211');
  const [orderPurpose, setOrderPurpose] = useState<'primary' | 'secondary' | 'non_business'>('primary');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['UI/UX Design', 'Brand identity & logos']);
  const [isCompanyVerified, setIsCompanyVerified] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const handleRoleContinue = () => {
    onRoleSelected(selectedRole);
    setStep(2); // Go to signup/login
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#FAF8F5] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl bg-white rounded-3xl border border-[#ECE7F2] shadow-sm p-6 sm:p-10 relative">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between text-xs font-semibold text-[#6B7280] mb-8 pb-3 border-b border-gray-100">
          <span>
            {step === 1 && 'Step 1/4 : Role Selection'}
            {step === 2 && 'FindRight Account Access'}
            {step === 3 && 'Step 2/4 : Client profile'}
            {step === 4 && 'Step 3/4 : Starter talent reward'}
            {step === 5 && 'Step 4/4 : Creative disciplines'}
          </span>
          <span className="text-[#6E3FF3]">
            {step === 1 && 'FindRight Onboarding'}
            {step === 2 && 'Escrow Protected'}
            {step === 3 && 'FindRight Onboarding'}
            {step === 4 && 'FindRight hiring incentives'}
            {step === 5 && 'Hirer preferences'}
          </span>
        </div>

        {/* STEP 1: Role Selection (Page 4) */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#110D17] mb-2">
                What brings you to Findright?
              </h2>
              <p className="text-sm text-gray-500">
                We’ll tailor your experience to fit your needs
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Client option */}
              <div
                onClick={() => setSelectedRole('client')}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  selectedRole === 'client'
                    ? 'border-[#6E3FF3] bg-[#FBF9FE] shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6E3FF3] flex items-center justify-center">
                      <Briefcase className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedRole === 'client'
                          ? 'border-[#6E3FF3] bg-[#6E3FF3]'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedRole === 'client' && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>
                  </div>
                  <h3 className="font-bold text-base text-[#110D17] mb-1.5">I am a client</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Find the right designer for your project. Filter by human craft vs AI assistance,
                    manage contracts with protected escrow.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-gray-100 text-xs font-semibold text-[#6E3FF3]">
                  Hire Creative Talent
                </div>
              </div>

              {/* Freelancer option */}
              <div
                onClick={() => setSelectedRole('freelancer')}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  selectedRole === 'freelancer'
                    ? 'border-[#6E3FF3] bg-[#FBF9FE] shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6E3FF3] flex items-center justify-center">
                      <Feather className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedRole === 'freelancer'
                          ? 'border-[#6E3FF3] bg-[#6E3FF3]'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedRole === 'freelancer' && <Check className="w-3 h-3 text-white stroke-[3]" />}
                    </div>
                  </div>
                  <h3 className="font-bold text-base text-[#110D17] mb-1.5">I am a Freelancer</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Find real projects, build your verified portfolio, get paid. Publicly disclose
                    your AI usage and build durable reputation.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-gray-100 text-xs font-semibold text-[#6E3FF3]">
                  Start Freelancing &amp; get Verified
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={onSkip}
                className="text-xs font-medium text-gray-500 hover:text-gray-800"
              >
                ← Back
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={onSkip}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Skip to Dashboard
                </button>
                <button
                  onClick={handleRoleContinue}
                  className="px-5 py-2.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Account Creation (Page 6) */}
        {step === 2 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
              {/* Left brand card */}
              <div className="md:col-span-5 bg-gradient-to-br from-[#120B24] via-[#1E113A] to-[#120B24] text-white p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-medium text-purple-200 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>Client Account</span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight leading-tight mb-2">
                    Real designers,
                    <br />
                    Real craft.
                    <br />
                    <span className="text-purple-400">Protected trust.</span>
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed mt-4">
                    Join a creative marketplace where transparent AI disclosures, human taste, and
                    milestone escrow protect your work and brand.
                  </p>
                </div>

                <div className="relative z-10 pt-6 mt-6 border-t border-white/10 text-[11px] text-gray-400">
                  FindRight verified escrow
                </div>
              </div>

              {/* Right form card */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-[#110D17]">Create an account</h3>
                      <p className="text-xs text-gray-500">Signing up as client (hirer)</p>
                    </div>
                    <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-xs font-medium">
                      <button
                        onClick={() => setAuthMode('signup')}
                        className={`px-3 py-1 rounded-md transition-all ${
                          authMode === 'signup' ? 'bg-[#6E3FF3] text-white font-semibold' : 'text-gray-600'
                        }`}
                      >
                        Sign up
                      </button>
                      <button
                        onClick={() => {
                          if (onNavigateToLogin) {
                            onNavigateToLogin();
                          } else {
                            setAuthMode('login');
                          }
                        }}
                        className={`px-3 py-1 rounded-md transition-all ${
                          authMode === 'login' ? 'bg-[#6E3FF3] text-white font-semibold' : 'text-gray-600'
                        }`}
                      >
                        Log in
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3.5 mb-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="ex. Peter Parker"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#6E3FF3] focus:ring-1 focus:ring-[#6E3FF3]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#6E3FF3] focus:ring-1 focus:ring-[#6E3FF3]"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(3)}
                    className="w-full py-2.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold rounded-xl transition-all shadow-sm mb-4"
                  >
                    Continue
                  </button>

                  <div className="relative flex py-2 items-center mb-4">
                    <div className="flex-grow border-t border-gray-200" />
                    <span className="flex-shrink mx-3 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                      or
                    </span>
                    <div className="flex-grow border-t border-gray-200" />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setStep(3)}
                      className="py-2 px-3 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5"
                    >
                      <span className="font-bold text-red-500">G</span> Google
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="py-2 px-3 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5"
                    >
                      <span className="font-bold text-blue-600">in</span> LinkedIn
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="py-2 px-3 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5"
                    >
                      Mail
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-gray-400 text-center mt-5 pt-3 border-t border-gray-100">
                  Your payment stays safe in escrow until you approve the work.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-medium text-gray-500 hover:text-gray-800"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 bg-[#6E3FF3] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Client Profile (Page 7) */}
        {step === 3 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#110D17] mb-1.5">Who are you hiring for?</h2>
              <p className="text-xs text-gray-500">
                We customize your project templates and invoice receipts based on your setup.
              </p>
            </div>

            {/* Hiring for cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5">
              <div
                onClick={() => setHiringFor('company')}
                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                  hiringFor === 'company'
                    ? 'border-[#6E3FF3] bg-[#FBF9FE]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#6E3FF3] flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#110D17]">I&apos;m hiring for a company</h4>
                  <p className="text-[11px] text-gray-500">Brand, startup, or agency</p>
                </div>
              </div>

              <div
                onClick={() => setHiringFor('personal')}
                className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                  hiringFor === 'personal'
                    ? 'border-[#6E3FF3] bg-[#FBF9FE]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#6E3FF3] flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#110D17]">It&apos;s a personal project</h4>
                  <p className="text-[11px] text-gray-500">Independent or hobby work</p>
                </div>
              </div>
            </div>

            {/* Input row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#6E3FF3]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Work Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsCompanyVerified(false);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#6E3FF3]"
                />
              </div>
            </div>

            {/* If Hiring for a Company, require Company Authentication */}
            {hiringFor === 'company' && (
              <div className="p-4 rounded-2xl bg-[#FCFAFF] border-2 border-[#E9D5FF] mb-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#6E3FF3]" />
                    <span className="text-xs font-bold text-[#110D17]">
                      Company Authenticity Verification (Anti-Fraud)
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isCompanyVerified
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {isCompanyVerified ? '✓ Verified Real Business' : 'Verification Required'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                        setIsCompanyVerified(false);
                      }}
                      placeholder="Noble Paws Pet Health Co."
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#6E3FF3]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">Company Website</label>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => {
                        setWebsite(e.target.value);
                        setIsCompanyVerified(false);
                      }}
                      placeholder="https://noblepetnutrition.com"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#6E3FF3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Corporate Registration ID (CIN / GSTIN / US EIN)
                  </label>
                  <input
                    type="text"
                    value={registrationId}
                    onChange={(e) => {
                      setRegistrationId(e.target.value);
                      setIsCompanyVerified(false);
                    }}
                    placeholder="CIN: U74999MH2021PTC348211"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#6E3FF3]"
                  />
                </div>

                {/* Quick Check Button & Presets */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-purple-100 text-[11px]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsVerifying(true);
                      setVerificationError(null);
                      setTimeout(() => {
                        setIsVerifying(false);
                        const isFake =
                          companyName.toLowerCase().includes('fake') ||
                          companyName.toLowerCase().includes('scam') ||
                          email.includes('mailinator') ||
                          email.includes('tempmail') ||
                          registrationId.includes('00000');
                        if (isFake) {
                          setIsCompanyVerified(false);
                          setVerificationError('Authentication Failed: Unverified / Fake company credentials detected. Account cannot be opened.');
                        } else {
                          setIsCompanyVerified(true);
                          setVerificationError(null);
                        }
                      }, 600);
                    }}
                    className="px-3 py-1.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white font-semibold rounded-xl"
                  >
                    {isVerifying ? 'Verifying Corporate Registry...' : 'Validate Corporate Legitimacy'}
                  </button>

                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setCompanyName('Noble Paws Pet Health Co.');
                        setEmail('peter.parker@noblepaws.com');
                        setWebsite('https://noblepetnutrition.com');
                        setRegistrationId('CIN: U74999MH2021PTC348211');
                        setIsCompanyVerified(true);
                        setVerificationError(null);
                      }}
                      className="px-2 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-[10px] font-semibold border border-emerald-200"
                    >
                      Preset: Real Co.
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCompanyName('FakeCorp Scam Ltd');
                        setEmail('client@tempmail.com');
                        setWebsite('http://fake-site-999.xyz');
                        setRegistrationId('INVALID-00000');
                        setIsCompanyVerified(false);
                        setVerificationError('Authentication Failed: Disposable email & non-existent registration ID. Blocked!');
                      }}
                      className="px-2 py-1 bg-red-50 text-red-800 rounded-lg text-[10px] font-semibold border border-red-200"
                    >
                      Preset: Fake Co.
                    </button>
                  </div>
                </div>

                {verificationError && (
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[11px] font-medium">
                    ⚠ {verificationError}
                  </div>
                )}
              </div>
            )}

            {/* Order purpose selection */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-[#110D17] mb-0.5">
                What do you plan to order services for?
              </label>
              <p className="text-[11px] text-gray-500 mb-3">There&apos;s something for everyone</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderPurpose('primary')}
                  className={`p-3.5 rounded-xl border-2 text-center transition-all ${
                    orderPurpose === 'primary'
                      ? 'border-[#6E3FF3] bg-[#FBF9FE]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-7 h-7 mx-auto mb-2 text-[#6E3FF3] flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-[#110D17]">Primary job or business</div>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderPurpose('secondary')}
                  className={`p-3.5 rounded-xl border-2 text-center transition-all ${
                    orderPurpose === 'secondary'
                      ? 'border-[#6E3FF3] bg-[#FBF9FE]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-7 h-7 mx-auto mb-2 text-[#6E3FF3] flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-[#110D17]">Secondary business</div>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderPurpose('non_business')}
                  className={`p-3.5 rounded-xl border-2 text-center transition-all ${
                    orderPurpose === 'non_business'
                      ? 'border-[#6E3FF3] bg-[#FBF9FE]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-7 h-7 mx-auto mb-2 text-[#6E3FF3] flex items-center justify-center">
                    <Sparkle className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-[#110D17]">Non-business needs</div>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() => setStep(2)}
                className="text-xs font-medium text-gray-500 hover:text-gray-800"
              >
                ← Back
              </button>
              <button
                onClick={() => {
                  if (hiringFor === 'company' && !isCompanyVerified) {
                    setVerificationError('Authentication Required: Please validate that your company is a legitimate registered business before continuing.');
                    return;
                  }
                  setStep(4);
                }}
                className={`px-5 py-2.5 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm ${
                  hiringFor === 'company' && !isCompanyVerified
                    ? 'bg-gray-400 cursor-not-allowed opacity-80'
                    : 'bg-[#6E3FF3] hover:bg-[#5D2EE0]'
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Starter Talent Reward / 3 Token Discount (Page 8) */}
        {step === 4 && (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-[#6E3FF3] mb-2">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-[#110D17] mb-1.5">
                Your starter hire credits are unlocked
              </h2>
              <p className="text-xs text-gray-500">
                Try new talent with less risk. Give rising talent a chance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className="p-4 rounded-2xl border-2 border-[#6E3FF3] bg-[#FCFAFF] relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-[#6E3FF3] uppercase mb-2">
                      <span className="bg-[#6E3FF3]/10 px-2 py-0.5 rounded-md">CREDIT {num}</span>
                      <span className="text-emerald-600 flex items-center gap-0.5 font-semibold">
                        ✓ Available
                      </span>
                    </div>
                    <div className="text-2xl font-black text-[#110D17] mb-1">15% OFF</div>
                    <div className="text-xs text-gray-600 font-medium">Up to ₹5,000 on rising talent</div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-purple-100 text-[11px] text-gray-400">
                    Valid for your {num === 1 ? '1st' : num === 2 ? '2nd' : '3rd'} hire
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() => setStep(3)}
                className="text-xs font-medium text-gray-500 hover:text-gray-800"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(5)}
                className="px-5 py-2.5 bg-[#6E3FF3] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Creative Disciplines (Page 9) */}
        {step === 5 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#110D17] mb-1.5">Pick one or more topics</h2>
              <p className="text-xs text-gray-500">
                Select the design categories you typically commission or need creative support for.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
              {/* Brand identity & logos */}
              <div
                onClick={() => toggleTopic('Brand identity & logos')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  selectedTopics.includes('Brand identity & logos')
                    ? 'border-[#6E3FF3] bg-[#FBF9FE]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="h-20 rounded-xl bg-gradient-to-tr from-purple-200 via-indigo-200 to-pink-100 flex items-center justify-center mb-3">
                    <span className="font-black text-2xl text-purple-700/60 tracking-wider">BRAND</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-xs text-[#110D17]">Brand identity &amp; logos</h4>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedTopics.includes('Brand identity & logos')
                          ? 'border-[#6E3FF3] bg-[#6E3FF3]'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedTopics.includes('Brand identity & logos') && (
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 mb-3">
                    Visual identity systems, logos, guidelines, and typography.
                  </p>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] text-gray-600">
                    Logo Design
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] text-gray-600">
                    Brand Identity
                  </span>
                </div>
              </div>

              {/* Video Editing */}
              <div
                onClick={() => toggleTopic('Video Editing')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  selectedTopics.includes('Video Editing')
                    ? 'border-[#6E3FF3] bg-[#FBF9FE]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="h-20 rounded-xl bg-gradient-to-tr from-amber-100 via-rose-100 to-orange-100 flex items-center justify-center mb-3">
                    <span className="font-black text-2xl text-orange-600/60 tracking-wider">VIDEO</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-xs text-[#110D17]">Video Editing</h4>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedTopics.includes('Video Editing')
                          ? 'border-[#6E3FF3] bg-[#6E3FF3]'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedTopics.includes('Video Editing') && (
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 mb-3">
                    Custom character art, editorial art, product spots, and motion reels.
                  </p>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] text-gray-600">
                    Editing
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] text-gray-600">
                    After Effects
                  </span>
                </div>
              </div>

              {/* UI/UX Design */}
              <div
                onClick={() => toggleTopic('UI/UX Design')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  selectedTopics.includes('UI/UX Design')
                    ? 'border-[#6E3FF3] bg-[#FBF9FE]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="h-20 rounded-xl bg-gradient-to-tr from-emerald-100 via-teal-100 to-cyan-100 flex items-center justify-center mb-3">
                    <span className="font-black text-2xl text-teal-700/60 tracking-wider">UI/UX</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-xs text-[#110D17]">UI/UX Design</h4>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedTopics.includes('UI/UX Design')
                          ? 'border-[#6E3FF3] bg-[#6E3FF3]'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedTopics.includes('UI/UX Design') && (
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 mb-3">
                    Mobile apps, SaaS interfaces, websites, and design systems.
                  </p>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] text-gray-600">
                    App
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] text-gray-600">
                    Website
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() => setStep(4)}
                className="text-xs font-medium text-gray-500 hover:text-gray-800"
              >
                ← Back
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={onComplete}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800"
                >
                  Skip
                </button>
                <button
                  onClick={onComplete}
                  className="px-5 py-2.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <span>Go to Client Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
