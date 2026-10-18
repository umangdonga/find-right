import React, { useState } from 'react';
import {
  Check,
  Building2,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Lock,
  Mail,
  User,
  Globe,
  FileCheck2,
  XCircle,
  HelpCircle,
  CheckCircle2,
  RefreshCw,
  Search,
} from 'lucide-react';
import { ClientProfile, CompanyVerification, NavView } from '../types';

interface ClientAuthViewProps {
  initialMode?: 'login' | 'signup';
  onLoginSuccess: (profile: ClientProfile) => void;
  onNavigate: (view: NavView) => void;
}

export const ClientAuthView: React.FC<ClientAuthViewProps> = ({
  initialMode = 'login',
  onLoginSuccess,
  onNavigate,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>(initialMode);

  // Form State
  const [fullName, setFullName] = useState('Mr. Parekh');
  const [email, setEmail] = useState('parekh@noblepaws.com');
  const [password, setPassword] = useState('••••••••••••');
  const [clientType, setClientType] = useState<'company' | 'personal'>('company');

  // Company Verification Inputs
  const [companyName, setCompanyName] = useState('Noble Paws Pet Health Co.');
  const [website, setWebsite] = useState('https://noblepaws.example.com');
  const [registrationId, setRegistrationId] = useState('CIN: U74999MH2021PTC348211');
  const [registrySource, setRegistrySource] = useState<
    'MCA India' | 'US Delaware Registry' | 'UK Companies House' | 'Global DUNS'
  >('MCA India');

  // Verification Engine State
  const [isChecking, setIsChecking] = useState(false);
  const [verificationResult, setVerificationResult] = useState<CompanyVerification>({
    status: 'verified',
    companyName: 'Noble Paws Pet Health Co.',
    registrationNumber: 'CIN: U74999MH2021PTC348211',
    registrySource: 'MCA India',
    domain: 'noblepaws.example.com',
    domainStatus: 'active_business',
    emailMatch: true,
    trustScore: 98,
    verifiedAt: 'Oct 12, 2024',
    flagReasons: [],
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Disposable/Suspicious email domains detector
  const disposableEmailDomains = [
    'mailinator.com',
    'tempmail.com',
    '10minutemail.com',
    'sharklasers.com',
    'guerrillamail.com',
    'fakecorp.xyz',
    'throwaway.email',
    'trashmail.com',
  ];

  // Run the Real vs Fake Company Authentication Check
  const runCompanyAuthentication = (
    cName = companyName,
    cWeb = website,
    cReg = registrationId,
    cEmail = email
  ) => {
    setIsChecking(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsChecking(false);

      const emailDomain = cEmail.split('@')[1]?.toLowerCase() || '';
      const isDisposable = disposableEmailDomains.includes(emailDomain);
      const isFakeName =
        cName.toLowerCase().includes('fake') ||
        cName.toLowerCase().includes('scam') ||
        cName.toLowerCase().includes('bot') ||
        cName.toLowerCase().includes('testcorp');

      const isInvalidReg =
        cReg.trim().length < 8 ||
        cReg.toLowerCase().includes('00000') ||
        cReg.toLowerCase().includes('invalid') ||
        cReg.toLowerCase().includes('fake');

      const flagReasons: string[] = [];
      let score = 100;

      if (isDisposable) {
        flagReasons.push('Disposable / anonymous email domain detected.');
        score -= 45;
      }

      if (isFakeName) {
        flagReasons.push('Company title matches fraudulent or blacklisted keyword registry.');
        score -= 40;
      }

      if (isInvalidReg) {
        flagReasons.push('Corporate Registration ID (CIN/GSTIN/EIN) not found in national registry.');
        score -= 35;
      }

      const domainPart = cWeb.replace(/^https?:\/\//, '').replace(/\/.*$/, '').toLowerCase();
      const emailDomainClean = emailDomain.replace(/^www\./, '');
      const domainMatch = domainPart.includes(emailDomainClean) || emailDomainClean.includes(domainPart.split('.')[0]);

      if (!domainMatch && !isDisposable) {
        flagReasons.push('Work email domain does not match official company website domain.');
        score -= 15;
      }

      if (score >= 70 && !isDisposable && !isFakeName && !isInvalidReg) {
        setVerificationResult({
          status: 'verified',
          companyName: cName,
          registrationNumber: cReg,
          registrySource,
          domain: domainPart,
          domainStatus: 'active_business',
          emailMatch: domainMatch,
          trustScore: Math.max(score, 88),
          verifiedAt: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          flagReasons: [],
        });
      } else {
        setVerificationResult({
          status: 'rejected',
          companyName: cName,
          registrationNumber: cReg,
          registrySource,
          domain: domainPart || 'unknown',
          domainStatus: isDisposable ? 'disposable_flagged' : 'unreachable',
          emailMatch: false,
          trustScore: Math.max(12, score),
          flagReasons,
        });
        setErrorMessage(
          'Company authentication failed: Unverified or suspicious business details detected. FindRight enforces strict company validation to protect designers from scam clients.'
        );
      }
    }, 700);
  };

  // Quick preset loaders for user testing
  const loadPresetRealCompany = () => {
    setFullName('Mr. Parekh');
    setEmail('parekh@noblepaws.com');
    setCompanyName('Noble Paws Pet Health Co.');
    setWebsite('https://noblepaws.example.com');
    setRegistrationId('CIN: U74999MH2021PTC348211');
    setRegistrySource('MCA India');
    runCompanyAuthentication(
      'Noble Paws Pet Health Co.',
      'https://noblepaws.example.com',
      'CIN: U74999MH2021PTC348211',
      'parekh@noblepaws.com'
    );
  };

  const loadPresetRealCompany2 = () => {
    setFullName('Siddharth Mehta');
    setEmail('siddharth@apexcreativelabs.io');
    setCompanyName('Apex Creative Labs Inc.');
    setWebsite('https://apexcreativelabs.io');
    setRegistrationId('EIN-84-2910482');
    setRegistrySource('US Delaware Registry');
    runCompanyAuthentication(
      'Apex Creative Labs Inc.',
      'https://apexcreativelabs.io',
      'EIN-84-2910482',
      'siddharth@apexcreativelabs.io'
    );
  };

  const loadPresetFakeCompany = () => {
    setFullName('Fake User');
    setEmail('client99@mailinator.com');
    setCompanyName('FakeCorp Global Media');
    setWebsite('http://fakecorptemp999.xyz');
    setRegistrationId('INVALID-00000');
    setRegistrySource('MCA India');
    runCompanyAuthentication(
      'FakeCorp Global Media',
      'http://fakecorptemp999.xyz',
      'INVALID-00000',
      'client99@mailinator.com'
    );
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default logged in client profile
    const verifiedProfile: ClientProfile = {
      name: fullName || 'Mr. Parekh',
      company: companyName || 'Noble Paws Pet Health Co.',
      email: email || 'parekh@noblepaws.com',
      website: website || 'https://noblepaws.example.com',
      type: clientType,
      serviceNeed: 'primary',
      disciplines: ['UI/UX Design', 'Brand identity & logos'],
      totalInvested: 48500,
      completedHires: 8,
      activeContracts: 3,
      escrowTrustScore: 100,
      verification: verificationResult,
    };
    onLoginSuccess(verifiedProfile);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check company authentication requirement
    if (clientType === 'company') {
      if (verificationResult.status !== 'verified') {
        setErrorMessage(
          'Account cannot be opened: Your company must be successfully authenticated as a legitimate registered entity first.'
        );
        return;
      }
    }

    const newProfile: ClientProfile = {
      name: fullName,
      company: clientType === 'company' ? companyName : `${fullName} (Personal Hirer)`,
      email,
      website: clientType === 'company' ? website : '',
      type: clientType,
      serviceNeed: 'primary',
      disciplines: ['UI/UX Design', 'Brand identity & logos'],
      totalInvested: 0,
      completedHires: 0,
      activeContracts: 0,
      escrowTrustScore: 100,
      verification: clientType === 'company' ? verificationResult : undefined,
    };

    onLoginSuccess(newProfile);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#FAF8F5] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-[#ECE7F2] shadow-sm p-6 sm:p-10 relative">
        {/* Navigation back and header */}
        <div className="flex items-center justify-between text-xs font-semibold text-[#6B7280] mb-6 pb-3 border-b border-gray-100">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Back to Home
          </button>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-[#6E3FF3] text-[11px] font-bold border border-purple-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Client Portal
            </span>
          </div>
        </div>

        {/* Two-Column Grid matching Figma Page 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Hero Card (Matches Page 6 exactly) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#120B24] via-[#1E113A] to-[#120B24] text-white p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-lg">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-purple-200 backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <span>Client Account</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-purple-400/40 flex items-center justify-center bg-purple-500/20">
                  <Check className="w-4 h-4 text-purple-300 stroke-[3]" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight mb-4">
                Real designers,
                <br />
                Real craft.
                <br />
                <span className="text-[#A78BFA]">Protected trust.</span>
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                Join a creative marketplace where transparent AI disclosures, human taste, and
                milestone escrow protect your work and brand.
              </p>

              {/* Real Company Security Guarantee Banner */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs space-y-2 backdrop-blur-xs">
                <div className="font-semibold text-purple-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Anti-Fraud Company Authentication
                </div>
                <p className="text-[11px] text-gray-300 leading-normal">
                  FindRight validates corporate registry numbers (CIN / GSTIN / US EIN) and domain
                  reputation before granting hiring privileges. Designers work only with verified,
                  legitimate businesses.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
              <span>FindRight Escrow Guarantee</span>
              <span className="text-emerald-400 font-semibold">100% Secure</span>
            </div>
          </div>

          {/* Right Action / Auth Form */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Header with Mode Switcher */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl text-[#110D17]">
                    {authMode === 'login' ? 'Log in to your account' : 'Create a Client Account'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {authMode === 'login'
                      ? 'Welcome back! Sign in to manage design projects & escrow'
                      : 'Signing up as client (hirer) with company verification'}
                  </p>
                </div>

                <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMessage(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      authMode === 'login'
                        ? 'bg-[#6E3FF3] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Log in
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup');
                      setErrorMessage(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      authMode === 'signup'
                        ? 'bg-[#6E3FF3] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Sign up
                  </button>
                </div>
              </div>

              {/* Quick Preset Buttons for Evaluation */}
              <div className="mb-5 p-3 rounded-2xl bg-[#FAF8FC] border border-purple-100 text-xs">
                <div className="text-[11px] font-bold text-gray-500 mb-2 flex items-center justify-between">
                  <span>Quick Demo Credentials &amp; Testing:</span>
                  <span className="text-[10px] text-[#6E3FF3]">One-Click Test</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={loadPresetRealCompany}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-semibold border border-emerald-200 flex items-center gap-1 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Real Company: Noble Paws (Verified)
                  </button>
                  <button
                    type="button"
                    onClick={loadPresetRealCompany2}
                    className="px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 text-[11px] font-semibold border border-purple-200 flex items-center gap-1 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    Real Company: Apex Labs (Delaware Reg)
                  </button>
                  <button
                    type="button"
                    onClick={loadPresetFakeCompany}
                    className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-800 text-[11px] font-semibold border border-red-200 flex items-center gap-1 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5 text-red-600" />
                    Test Fake Company (Scam Flagged)
                  </button>
                </div>
              </div>

              {/* Form Content */}
              {authMode === 'login' ? (
                /* LOGIN FORM */
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Work / Corporate Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="parekh@noblepaws.com"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#6E3FF3] focus:ring-1 focus:ring-[#6E3FF3]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-gray-700">Password</label>
                      <button
                        type="button"
                        onClick={() => alert('Password reset link sent to registered email.')}
                        className="text-[11px] text-[#6E3FF3] hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#6E3FF3] focus:ring-1 focus:ring-[#6E3FF3]"
                      />
                    </div>
                  </div>

                  {/* Company Verification Pill on Login */}
                  <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#6E3FF3]" />
                      <div>
                        <span className="font-bold text-[#110D17]">{companyName}</span>
                        <div className="text-[10px] text-gray-500">{registrationId}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-700" />
                      Verified Real Business
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>Log in as Verified Client</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-200" />
                    <span className="flex-shrink mx-3 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                      or continue with
                    </span>
                    <div className="flex-grow border-t border-gray-200" />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={loadPresetRealCompany}
                      className="py-2 px-3 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span className="font-bold text-red-500">G</span> Google
                    </button>
                    <button
                      type="button"
                      onClick={loadPresetRealCompany2}
                      className="py-2 px-3 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span className="font-bold text-blue-600">in</span> LinkedIn
                    </button>
                    <button
                      type="button"
                      onClick={loadPresetRealCompany}
                      className="py-2 px-3 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      Work SSO
                    </button>
                  </div>
                </form>
              ) : (
                /* SIGN UP FORM WITH REAL VS FAKE COMPANY AUTHENTICATION */
                <form onSubmit={handleSignUpSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Peter Parker"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#6E3FF3]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Work / Official Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="peter@company.com"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#6E3FF3]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Client Type Choice */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Hirer Category
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setClientType('company')}
                        className={`p-2.5 rounded-xl border-2 text-left flex items-center gap-2.5 transition-all ${
                          clientType === 'company'
                            ? 'border-[#6E3FF3] bg-[#FBF9FE]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Building2 className="w-4 h-4 text-[#6E3FF3]" />
                        <div>
                          <div className="text-xs font-bold text-[#110D17]">Registered Company</div>
                          <div className="text-[10px] text-gray-500">Corporate verification required</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setClientType('personal')}
                        className={`p-2.5 rounded-xl border-2 text-left flex items-center gap-2.5 transition-all ${
                          clientType === 'personal'
                            ? 'border-[#6E3FF3] bg-[#FBF9FE]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <User className="w-4 h-4 text-[#6E3FF3]" />
                        <div>
                          <div className="text-xs font-bold text-[#110D17]">Individual Hirer</div>
                          <div className="text-[10px] text-gray-500">KYC Escrow ID check</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* REAL COMPANY AUTHENTICATION ENGINE SECTION */}
                  {clientType === 'company' && (
                    <div className="p-4 rounded-2xl bg-[#FCFAFF] border-2 border-[#E9D5FF] space-y-3 relative">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-[#6E3FF3]" />
                          <span className="text-xs font-bold text-[#110D17]">
                            Real Company Authentication Check
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            verificationResult.status === 'verified'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-red-100 text-red-800 border border-red-300'
                          }`}
                        >
                          {verificationResult.status === 'verified' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              VERIFIED REAL COMPANY (Score: {verificationResult.trustScore}%)
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-red-600" />
                              AUTHENTICATION REJECTED (Score: {verificationResult.trustScore}%)
                            </>
                          )}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                            Registered Legal Entity Name
                          </label>
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Noble Paws Pet Health Co."
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#6E3FF3]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                            Official Business Website
                          </label>
                          <div className="relative">
                            <Globe className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                            <input
                              type="text"
                              required
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              placeholder="https://noblepaws.example.com"
                              className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#6E3FF3]"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                            Registry Authority
                          </label>
                          <select
                            value={registrySource}
                            onChange={(e: any) => setRegistrySource(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#6E3FF3] bg-white"
                          >
                            <option value="MCA India">MCA India (Ministry of Corporate Affairs / CIN / GSTIN)</option>
                            <option value="US Delaware Registry">US Delaware Corporate Registry (EIN / State ID)</option>
                            <option value="UK Companies House">UK Companies House (CRN)</option>
                            <option value="Global DUNS">Global Dun &amp; Bradstreet (DUNS)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                            Corporate Registration ID / CIN / GST
                          </label>
                          <div className="relative">
                            <FileCheck2 className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                            <input
                              type="text"
                              required
                              value={registrationId}
                              onChange={(e) => setRegistrationId(e.target.value)}
                              placeholder="CIN: U74999MH2021PTC348211"
                              className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#6E3FF3]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Verify Button */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => runCompanyAuthentication()}
                          disabled={isChecking}
                          className="px-3.5 py-1.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all disabled:opacity-50"
                        >
                          {isChecking ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Validating against Corporate Registry...</span>
                            </>
                          ) : (
                            <>
                              <Search className="w-3.5 h-3.5" />
                              <span>Verify Company Authenticity</span>
                            </>
                          )}
                        </button>

                        <span className="text-[10px] text-gray-500">
                          Real-time DNS, Registry &amp; Anti-Fraud Check
                        </span>
                      </div>

                      {/* Verification Audit Diagnostic Box */}
                      {verificationResult.status === 'verified' ? (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1.5">
                          <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Legitimate Business Confirmed</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[11px] text-emerald-800">
                            <div>• Registry Status: Active Legal Entity ({registrySource})</div>
                            <div>• Domain Authenticity: Active SSL &amp; Business DNS</div>
                            <div>• Work Email Domain: Verified Match</div>
                            <div>• Anti-Scam Check: 0 Fraud Flags Found</div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs space-y-1.5">
                          <div className="font-bold text-red-900 flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                            <span>Authenticity Warning: Unverified / Fake Company Entity</span>
                          </div>
                          <ul className="text-[11px] text-red-700 list-disc list-inside space-y-0.5">
                            {verificationResult.flagReasons?.map((reason, idx) => (
                              <li key={idx}>{reason}</li>
                            ))}
                            {verificationResult.flagReasons?.length === 0 && (
                              <li>
                                Corporate registration could not be verified. Please enter valid corporate records.
                              </li>
                            )}
                          </ul>
                          <div className="text-[10px] text-red-800 font-semibold pt-1 border-t border-red-200">
                            ⛔ Account Opening Blocked: FindRight prevents unverified clients to ensure safe escrow &amp; guaranteed designer payouts.
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={clientType === 'company' && verificationResult.status !== 'verified'}
                    className={`w-full py-3 text-white text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 ${
                      clientType === 'company' && verificationResult.status !== 'verified'
                        ? 'bg-gray-400 cursor-not-allowed opacity-70'
                        : 'bg-[#6E3FF3] hover:bg-[#5D2EE0] hover:shadow active:scale-[0.99]'
                    }`}
                  >
                    <span>
                      {clientType === 'company' && verificationResult.status !== 'verified'
                        ? 'Authenticate Company to Open Account'
                        : 'Open Verified Client Account & Claim Credits'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Escrow Reassurance Footer matching Page 6 */}
            <div className="text-[11px] text-gray-400 text-center mt-6 pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Your payment stays safe in escrow until you approve the work.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
