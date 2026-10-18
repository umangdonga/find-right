import React, { useState } from 'react';
import { Project, Freelancer, StarterCredit, NavView } from '../types';
import { Check, ShieldCheck, Lock, AlertCircle, CreditCard, Smartphone, Building } from 'lucide-react';

interface HireCheckoutFlowProps {
  project: Project;
  freelancer: Freelancer;
  credits: StarterCredit[];
  onCompleteHire: (updatedProject: Project, usedCreditId: string) => void;
  onNavigate: (view: NavView) => void;
  onBack: () => void;
  onOpenExitPolicy: () => void;
}

export const HireCheckoutFlow: React.FC<HireCheckoutFlowProps> = ({
  project,
  freelancer,
  credits,
  onCompleteHire,
  onNavigate,
  onBack,
  onOpenExitPolicy,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(2); // 1: Project, 2: Choose credit (Image 2), 3: Terms, 4: Pay 10% advance

  // Credit selection (Default Credit 1 applied matching Image 2)
  const [selectedCreditId, setSelectedCreditId] = useState<string>('credit-1');

  // Terms selection (Step 3)
  const [paymentSchedule, setPaymentSchedule] = useState<'advance_and_final' | 'milestones'>('advance_and_final');
  const [revisionOption, setRevisionOption] = useState<'2' | '4' | 'unlimited'>('2');
  const [aiUsageOption, setAiUsageOption] = useState<'no_ai' | 'ideation_only' | 'ai_supported'>('ideation_only');
  const [ownershipOption, setOwnershipOption] = useState<'full_transfer' | 'licence_only'>('full_transfer');
  const [termsAgreed, setTermsAgreed] = useState<boolean>(true);

  // Payment method (Step 4)
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('parekh@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Math with dynamic agreed price from finalization step
  const agreedPrice = project.agreedPrice || 8000;
  const isCreditApplied = selectedCreditId !== '';
  const discountAmount = isCreditApplied ? Math.min(Math.round(agreedPrice * 0.15), 5000) : 0;
  const contractTotal = agreedPrice - discountAmount;
  const advance10 = Math.round(contractTotal * 0.1);
  const final90 = contractTotal - advance10;

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const updatedProject: Project = {
        ...project,
        agreedPrice,
        appliedCreditId: selectedCreditId,
        discountAmount,
        contractTotal,
        advancePaid: advance10,
        finalPending: final90,
        hiredFreelancer: freelancer,
        status: 'in_progress',
        progressPercent: 10,
        revisionsUsed: 0,
        totalRevisions: 2,
        aiPolicy: 'AI-assisted ideation only',
        recentActivity: [
          { text: `10% advance ₹${advance10} held in escrow`, time: 'Just now' },
          { text: `Contract started with ${freelancer.name}`, time: 'Just now' },
          ...project.recentActivity,
        ],
      };
      onCompleteHire(updatedProject, selectedCreditId);
    }, 1000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1240px] mx-auto space-y-6">
      {/* Page Title & Subtitle matching Image 2 */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#110D17]">
          Hire {freelancer.name}
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          {freelancer.role} · Rising talent · ₹{agreedPrice.toLocaleString()} agreed price
        </p>

        {/* Stepper matching Image 2 */}
        <div className="flex items-center gap-3 mt-6 text-xs font-semibold overflow-x-auto pb-1">
          {/* Step 1: Project */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-5 h-5 rounded-full bg-[#6E3FF3] text-white flex items-center justify-center text-[10px]">
              ✓
            </span>
            <span className="text-[#110D17]">Project</span>
          </div>

          <div className="w-16 sm:w-28 h-0.5 bg-[#6E3FF3] shrink-0" />

          {/* Step 2: Choose credit */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                currentStep >= 2 ? 'bg-[#6E3FF3] text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              2
            </span>
            <span className={currentStep >= 2 ? 'text-[#110D17] font-bold' : 'text-gray-400'}>
              Choose credit
            </span>
          </div>

          <div
            className={`w-16 sm:w-28 h-0.5 shrink-0 ${
              currentStep >= 3 ? 'bg-[#6E3FF3]' : 'bg-gray-200'
            }`}
          />

          {/* Step 3: Terms */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                currentStep >= 3 ? 'bg-[#6E3FF3] text-white' : 'border border-gray-300 text-gray-400'
              }`}
            >
              3
            </span>
            <span className={currentStep >= 3 ? 'text-[#110D17] font-bold' : 'text-gray-400'}>
              Terms
            </span>
          </div>

          <div
            className={`w-16 sm:w-28 h-0.5 shrink-0 ${
              currentStep >= 4 ? 'bg-[#6E3FF3]' : 'bg-gray-200'
            }`}
          />

          {/* Step 4: Pay 10% advance */}
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                currentStep >= 4 ? 'bg-[#6E3FF3] text-white' : 'border border-gray-300 text-gray-400'
              }`}
            >
              4
            </span>
            <span className={currentStep >= 4 ? 'text-[#110D17] font-bold' : 'text-gray-400'}>
              Pay 10% advance
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Main content based on currentStep */}
        <div className="lg:col-span-8 space-y-5">
          {/* STEP 2: Choose credit screen matching Image 2 */}
          {currentStep === 2 && (
            <>
              {/* CARD 1: Hiring for project matching Image 2 */}
              <div className="bg-white rounded-2xl border border-[#ECE7F2] p-6 shadow-2xs space-y-3">
                <h3 className="font-bold text-sm text-[#110D17]">Hiring for project</h3>
                <div className="p-4 rounded-xl border border-purple-200 bg-[#FCFAFF] flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-4 border-[#6E3FF3] bg-white shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#110D17]">
                      {project.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {project.category} · {project.jobType} · Due {project.deadline}
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 2: Choose a starter hire credit matching Image 2 */}
              <div className="bg-white rounded-2xl border border-[#ECE7F2] p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#110D17]">
                      Choose a starter hire credit
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      You have 3 credits. Apply one to this hire — the other two stay available.
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                    3 available
                  </span>
                </div>

                {/* 3 Credit Cards Grid matching Image 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  {/* CREDIT 1 */}
                  <div
                    onClick={() => setSelectedCreditId('credit-1')}
                    className={`rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between ${
                      selectedCreditId === 'credit-1'
                        ? 'border-2 border-[#6E3FF3] bg-[#FCFAFF]'
                        : 'border border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#F3EFFF] text-[#6E3FF3] text-[10px] font-bold">
                          CREDIT 1
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedCreditId === 'credit-1'
                              ? 'border-[#6E3FF3] bg-[#6E3FF3]'
                              : 'border-gray-300'
                          }`}
                        >
                          {selectedCreditId === 'credit-1' && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </div>

                      <div className="text-2xl font-black text-[#110D17] mb-1">15% OFF</div>
                      <div className="text-xs text-gray-600">Up to ₹5,000 on rising talent</div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-purple-100 text-[11px] font-medium text-[#6E3FF3]">
                      Applied to this hire
                    </div>
                  </div>

                  {/* CREDIT 2 */}
                  <div
                    onClick={() => setSelectedCreditId('credit-2')}
                    className={`rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between ${
                      selectedCreditId === 'credit-2'
                        ? 'border-2 border-[#6E3FF3] bg-[#FCFAFF]'
                        : 'border border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-500 text-[10px] font-bold">
                          CREDIT 2
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedCreditId === 'credit-2'
                              ? 'border-[#6E3FF3] bg-[#6E3FF3]'
                              : 'border-gray-300'
                          }`}
                        >
                          {selectedCreditId === 'credit-2' && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </div>

                      <div className="text-2xl font-black text-[#110D17] mb-1">15% OFF</div>
                      <div className="text-xs text-gray-600">Up to ₹5,000 on rising talent</div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-gray-100 text-[11px] text-gray-400">
                      Keep for next hire
                    </div>
                  </div>

                  {/* CREDIT 3 */}
                  <div
                    onClick={() => setSelectedCreditId('credit-3')}
                    className={`rounded-2xl p-5 cursor-pointer transition-all flex flex-col justify-between ${
                      selectedCreditId === 'credit-3'
                        ? 'border-2 border-[#6E3FF3] bg-[#FCFAFF]'
                        : 'border border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-500 text-[10px] font-bold">
                          CREDIT 3
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedCreditId === 'credit-3'
                              ? 'border-[#6E3FF3] bg-[#6E3FF3]'
                              : 'border-gray-300'
                          }`}
                        >
                          {selectedCreditId === 'credit-3' && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </div>

                      <div className="text-2xl font-black text-[#110D17] mb-1">15% OFF</div>
                      <div className="text-xs text-gray-600">Up to ₹5,000 on rising talent</div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-gray-100 text-[11px] text-gray-400">
                      Keep for next hire
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-400 pt-1">
                  <span>ⓘ</span>
                  <span>Credits apply only when hiring rising talent (Fresher / Intermediate).</span>
                </div>
              </div>
            </>
          )}

          {/* STEP 3: Choose your terms & conditions (PDF 2 Page 4) */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl border border-[#ECE7F2] p-6 shadow-2xs space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#110D17]">
                  Choose your terms &amp; conditions
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Pick the terms for this project. Umang will see and accept them before work starts.
                </p>
              </div>

              {/* Payment Schedule */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-800">Payment schedule</span>
                <div
                  onClick={() => setPaymentSchedule('advance_and_final')}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center justify-between ${
                    paymentSchedule === 'advance_and_final'
                      ? 'border-[#6E3FF3] bg-[#FCFAFF]'
                      : 'border-gray-200'
                  }`}
                >
                  <div>
                    <strong className="text-xs text-gray-900 block">
                      10% advance + 90% on final approval
                    </strong>
                    <span className="text-[11px] text-emerald-600">Recommended · protected by escrow</span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      paymentSchedule === 'advance_and_final' ? 'border-[#6E3FF3] bg-[#6E3FF3]' : 'border-gray-300'
                    }`}
                  >
                    {paymentSchedule === 'advance_and_final' && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                  </div>
                </div>

                <div
                  onClick={() => setPaymentSchedule('milestones')}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer flex items-center justify-between ${
                    paymentSchedule === 'milestones'
                      ? 'border-[#6E3FF3] bg-[#FCFAFF]'
                      : 'border-gray-200'
                  }`}
                >
                  <div>
                    <strong className="text-xs text-gray-900 block">
                      10% advance + milestone payments
                    </strong>
                    <span className="text-[11px] text-gray-500">Split the rest across milestones</span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      paymentSchedule === 'milestones' ? 'border-[#6E3FF3] bg-[#6E3FF3]' : 'border-gray-300'
                    }`}
                  >
                    {paymentSchedule === 'milestones' && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                  </div>
                </div>
              </div>

              {/* Revisions */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-800">Revisions</span>
                <div className="grid grid-cols-3 gap-2.5">
                  <div
                    onClick={() => setRevisionOption('2')}
                    className={`p-3 rounded-xl border-2 cursor-pointer ${
                      revisionOption === '2' ? 'border-[#6E3FF3] bg-[#FCFAFF]' : 'border-gray-200'
                    }`}
                  >
                    <strong className="text-xs text-gray-900 block">2 revision rounds</strong>
                    <span className="text-[10px] text-emerald-600">Included in the price</span>
                  </div>
                  <div
                    onClick={() => setRevisionOption('4')}
                    className={`p-3 rounded-xl border-2 cursor-pointer ${
                      revisionOption === '4' ? 'border-[#6E3FF3] bg-[#FCFAFF]' : 'border-gray-200'
                    }`}
                  >
                    <strong className="text-xs text-gray-900 block">4 revision rounds</strong>
                    <span className="text-[10px] text-gray-500">+ ₹800</span>
                  </div>
                  <div
                    onClick={() => setRevisionOption('unlimited')}
                    className={`p-3 rounded-xl border-2 cursor-pointer ${
                      revisionOption === 'unlimited' ? 'border-[#6E3FF3] bg-[#FCFAFF]' : 'border-gray-200'
                    }`}
                  >
                    <strong className="text-xs text-gray-900 block">Unlimited revisions</strong>
                    <span className="text-[10px] text-gray-500">+ ₹2,000</span>
                  </div>
                </div>
              </div>

              {/* AI Usage */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-800">AI usage allowed</span>
                <div
                  onClick={() => setAiUsageOption('ideation_only')}
                  className="p-3.5 rounded-xl border-2 border-[#6E3FF3] bg-[#FCFAFF] flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <strong className="text-xs text-gray-900 block">AI-assisted ideation only</strong>
                    <span className="text-[11px] text-gray-500">Final design stays human-made</span>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-[#6E3FF3] flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* Exit Policy box */}
              <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-gray-800">
                  <span>Freelancer exit policy</span>
                  <button onClick={onOpenExitPolicy} className="text-[#6E3FF3] hover:underline text-[11px]">
                    See full policy →
                  </button>
                </div>
                <p className="text-[11px] text-gray-600 leading-normal">
                  If the freelancer leaves mid-project, they are paid only for approved progress, minus an exit cut.
                </p>
              </div>

              {/* Agreement Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700 select-none">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="rounded text-[#6E3FF3] focus:ring-[#6E3FF3]"
                />
                <span>I agree to the FindRight terms and the selections above</span>
              </label>
            </div>
          )}

          {/* STEP 4: Pay 10% advance (PDF 2 Page 8) */}
          {currentStep === 4 && (
            <div className="bg-white rounded-2xl border border-[#ECE7F2] p-6 shadow-2xs space-y-5">
              <div>
                <h3 className="text-lg font-bold text-[#110D17]">Payment method</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Your money stays in escrow until you approve the work.
                </p>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-xl border-2 cursor-pointer ${
                    paymentMethod === 'upi' ? 'border-[#6E3FF3] bg-[#FCFAFF]' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-[#6E3FF3]" />
                      <div>
                        <strong className="text-xs text-gray-900 block">UPI</strong>
                        <span className="text-[11px] text-gray-500">Pay with any UPI app</span>
                      </div>
                    </div>
                    {paymentMethod === 'upi' && <Check className="w-4 h-4 text-[#6E3FF3] stroke-[3]" />}
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-purple-100">
                      <label className="block text-[11px] text-gray-600 mb-1">UPI ID</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white"
                      />
                    </div>
                  )}
                </div>

                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'card' ? 'border-[#6E3FF3] bg-[#FCFAFF]' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <div>
                      <strong className="text-xs text-gray-900 block">Debit / Credit card</strong>
                      <span className="text-[11px] text-gray-500">Visa, Mastercard, RuPay</span>
                    </div>
                  </div>
                  {paymentMethod === 'card' && <Check className="w-4 h-4 text-[#6E3FF3] stroke-[3]" />}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Order Summary matching Image 2 */}
        <div className="lg:col-span-4 sticky top-20">
          <div className="bg-white rounded-2xl border border-[#ECE7F2] p-6 shadow-2xs space-y-5">
            <h3 className="font-bold text-sm text-[#110D17]">Order summary</h3>

            {/* Freelancer badge */}
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#F3EFFF] text-[#6E3FF3] font-bold text-xs flex items-center justify-center">
                UD
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#110D17]">{freelancer.name}</h4>
                <p className="text-[11px] text-gray-500">UI Designer · 3.5 ★</p>
              </div>
            </div>

            {/* Price list matching Image 2 */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Agreed price</span>
                <span className="font-semibold text-gray-900">₹{agreedPrice.toLocaleString()}</span>
              </div>

              {isCreditApplied && (
                <div className="flex justify-between text-[#059669]">
                  <span>Starter credit (15% off)</span>
                  <span className="font-semibold">- ₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between font-bold text-sm text-[#110D17] pt-2 border-t border-gray-100">
                <span>Contract total</span>
                <span>₹{contractTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Lavender Box matching Image 2 */}
            <div className="p-4 rounded-xl bg-[#FAF5FF] space-y-2 text-xs">
              <div className="flex justify-between text-[#6E3FF3] font-bold">
                <span>Pay now · 10% advance</span>
                <span>₹{advance10.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-[11px]">
                <span>Pay after approval · 90%</span>
                <span>₹{final90.toLocaleString()}</span>
              </div>
            </div>

            {/* Escrow badge matching Image 2 */}
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Held safely in escrow</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              {currentStep === 2 && (
                <button
                  onClick={() => setCurrentStep(3)}
                  className="w-full py-3 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-98"
                >
                  Continue to terms
                </button>
              )}

              {currentStep === 3 && (
                <button
                  disabled={!termsAgreed}
                  onClick={() => setCurrentStep(4)}
                  className="w-full py-3 bg-[#6E3FF3] hover:bg-[#5D2EE0] disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-98"
                >
                  Continue to payment
                </button>
              )}

              {currentStep === 4 && (
                <button
                  disabled={isProcessing}
                  onClick={handlePayNow}
                  className="w-full py-3 bg-[#6E3FF3] hover:bg-[#5D2EE0] disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pay ₹{advance10.toLocaleString()} securely</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (currentStep > 2) setCurrentStep(currentStep - 1);
                  else onBack();
                }}
                className="w-full py-2 text-xs font-medium text-gray-600 hover:text-gray-900 text-center"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
