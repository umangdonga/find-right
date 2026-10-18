import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Check, FileUp, Loader2, Calendar, IndianRupee } from 'lucide-react';
import { Project, NavView } from '../types';

interface PostJobFlowProps {
  onJobCreated: (newJob: Project) => void;
  onNavigate: (view: NavView) => void;
  onCancel: () => void;
}

export const PostJobFlow: React.FC<PostJobFlowProps> = ({
  onJobCreated,
  onNavigate,
  onCancel,
}) => {
  const [step, setStep] = useState<number>(1); // 1: Details, 2: Description, 3: Budget, 4: Preview, 5: Live Success

  // Form State
  const [category, setCategory] = useState<'UI/UX Design' | 'Graphic Design' | 'Product Design' | 'Motion Design' | 'Brand Identity'>('UI/UX Design');
  const [jobType, setJobType] = useState<'Freelance project' | 'Part-time' | 'Full-time'>('Freelance project');
  const [experienceLevel, setExperienceLevel] = useState<'Fresher / Entry' | 'Intermediate' | 'High-level / Expert'>('Intermediate');
  const [title, setTitle] = useState('Design a responsive website for a wellness brand');
  const [description, setDescription] = useState(
    'We’re looking for a UI/UX designer to create a clean, welcoming website for Bloom, our wellness brand. Design the home, about and services pages for desktop and mobile in Figma.\n\nDeliverables: 6 high-fidelity screens, a clickable prototype and a reusable component library. Please share 2 relevant portfolio projects. Brand assets are included in the reference brief.'
  );
  const [deliverables, setDeliverables] = useState<string[]>([
    '6 high-fidelity screens in Figma',
    'Interactive clickable prototype',
    'Reusable component library & tokens',
    'AI usage matches disclosure (ideation only)',
  ]);
  const [budget, setBudget] = useState<number>(8000);
  const [deadline, setDeadline] = useState<string>('Nov 06, 2026');
  const [fileName, setFileName] = useState<string>('Website brief.pdf');
  const [useStarterCredit, setUseStarterCredit] = useState<boolean>(true);

  // AI Brief Assistant State
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [roughBrief, setRoughBrief] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const categories = ['UI/UX Design', 'Graphic Design', 'Product Design', 'Motion Design'];
  const jobTypes = ['Freelance project', 'Part-time', 'Full-time'];

  const handleGenerateBrief = async () => {
    if (!roughBrief.trim()) return;
    setIsGenerating(true);
    setAiError(null);

    try {
      const response = await fetch('/api/ai/enhance-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roughBrief,
          category,
          experienceLevel,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate brief');
      }

      const data = await response.json();
      if (data.title) setTitle(data.title);
      if (data.description) setDescription(data.description);
      if (data.deliverables && Array.isArray(data.deliverables)) {
        setDeliverables(data.deliverables);
      }
      if (data.suggestedBudget) setBudget(data.suggestedBudget);
      setIsAIOpen(false);
      setRoughBrief('');
    } catch (err: any) {
      console.error(err);
      // Fallback enhancement
      setTitle(`Design a modern ${category} solution for ${roughBrief.slice(0, 30)}`);
      setDescription(
        `We are seeking a talented ${experienceLevel} ${category} specialist to execute on this creative vision:\n\n${roughBrief}\n\nObjectives:\n- Thoughtful layout hierarchy and pristine design craftsmanship\n- Full upfront disclosure of any AI assistance\n- Seamless Figma handoff`
      );
      setDeliverables([
        '6 high-fidelity screens',
        'Interactive Figma prototype',
        'Reusable component library',
      ]);
      setIsAIOpen(false);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublishJob = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title,
      category,
      jobType,
      experienceLevel,
      budgetMin: budget,
      budgetMax: Math.round(budget * 1.3),
      deadline,
      progressPercent: 0,
      status: 'hiring',
      briefSummary: description.slice(0, 160) + '...',
      deliverables,
      aiPolicy: 'AI-assisted ideation only',
      revisionsUsed: 0,
      totalRevisions: 2,
      applicantCount: 0,
      milestones: [],
      files: [{ id: 'f-brief', name: fileName, size: '2.4 MB', type: 'PDF Reference', uploadedAt: 'Just now' }],
      recentActivity: [{ text: 'Job posted to verified freelancer pool', time: 'Just now' }],
    };

    onJobCreated(newProject);
    setStep(5); // Show success celebration
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#FAF8F5] py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#ECE7F2] shadow-xs p-6 sm:p-10">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between text-xs font-semibold text-[#6B7280] mb-8 pb-3 border-b border-gray-100">
          <span>
            {step === 1 && 'Step 1/4 : Job Details'}
            {step === 2 && 'Step 2/4 : Description'}
            {step === 3 && 'Step 3/4 : Budget & deadline'}
            {step === 4 && 'Step 4/4 : Preview & post'}
            {step === 5 && 'Job Published'}
          </span>
          <span className="text-[#6E3FF3]">
            {step === 5 ? 'Status: Active' : 'FindRight Job Creation'}
          </span>
        </div>

        {/* STEP 1: Job Details (Page 11) */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#110D17] mb-2">
                Let’s find the right talent
              </h2>
              <p className="text-xs text-gray-500">
                Choose the kind of work and experience your project needs.
              </p>
            </div>

            {/* Job Category */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-[#110D17] mb-2">Job category</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat as any)}
                    className={`py-3 px-3 rounded-xl border-2 text-xs font-semibold transition-all text-center ${
                      category === cat
                        ? 'border-[#6E3FF3] bg-[#6E3FF3] text-white'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Type */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-[#110D17] mb-2">Job type</label>
              <div className="grid grid-cols-3 gap-2.5">
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setJobType(type as any)}
                    className={`py-3 px-3 rounded-xl border-2 text-xs font-semibold transition-all text-center ${
                      jobType === type
                        ? 'border-[#6E3FF3] bg-[#6E3FF3] text-white'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Required Experience Level */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-[#110D17] mb-2">
                Required experience level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Fresher / Entry', sub: 'New talent, fresh ideas' },
                  { id: 'Intermediate', sub: 'Proven project experience' },
                  { id: 'High-level / Expert', sub: 'Deep expertise, complex work' },
                ].map((exp) => (
                  <div
                    key={exp.id}
                    onClick={() => setExperienceLevel(exp.id as any)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      experienceLevel === exp.id
                        ? 'border-[#6E3FF3] bg-[#FAF5FF]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-xs text-[#110D17]">{exp.id}</h4>
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          experienceLevel === exp.id
                            ? 'border-[#6E3FF3] bg-[#6E3FF3]'
                            : 'border-gray-300'
                        }`}
                      >
                        {experienceLevel === exp.id && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500">{exp.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button onClick={onCancel} className="text-xs font-medium text-gray-500 hover:text-gray-800">
                Cancel
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Description & AI Brief Generator (Page 12) */}
        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#110D17] mb-1.5">Tell us about your project</h2>
              <p className="text-xs text-gray-500">
                A clear brief helps the right freelancers understand your vision.
              </p>
            </div>

            {/* AI Brief Assistant Callout Bar (Key requirement requested by user) */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 border border-purple-200 shadow-xs">
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#6E3FF3] text-white flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#110D17]">AI Brief Generator</h4>
                    <p className="text-[11px] text-gray-600">
                      Give rough thoughts — Gemini structures it into a high-converting brief
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAIOpen(!isAIOpen)}
                  className="px-3 py-1.5 rounded-xl bg-[#6E3FF3] text-white text-xs font-semibold hover:bg-[#5D2EE0] transition-colors"
                >
                  {isAIOpen ? 'Close AI' : '✨ Write with AI'}
                </button>
              </div>

              {isAIOpen && (
                <div className="mt-3 pt-3 border-t border-purple-200">
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                    Your rough notes / requirements:
                  </label>
                  <textarea
                    rows={3}
                    value={roughBrief}
                    onChange={(e) => setRoughBrief(e.target.value)}
                    placeholder="e.g. Need a dog food brand wellness website, 6 pages in figma, calm earthy colors, clickable prototype, budget 8000, nov deadline..."
                    className="w-full p-2.5 rounded-xl border border-purple-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#6E3FF3]"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      type="button"
                      disabled={isGenerating || !roughBrief.trim()}
                      onClick={handleGenerateBrief}
                      className="px-4 py-2 bg-[#6E3FF3] hover:bg-[#5D2EE0] disabled:opacity-50 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Gemini is refining your brief...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Generate Professional Brief</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Job Title */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-[#110D17] mb-1.5">Job title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Design a responsive website for a wellness brand"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#6E3FF3]"
              />
            </div>

            {/* Job Description */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-[#110D17] mb-1.5">Job description</label>
              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Explain the background, target audience, deliverables, and expectations..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#6E3FF3] leading-relaxed"
              />
            </div>

            {/* Reference File upload */}
            <div className="mb-8 p-3.5 rounded-xl border border-dashed border-gray-300 bg-gray-50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-gray-600">
                <FileUp className="w-4 h-4 text-[#6E3FF3]" />
                <span>Reference Brief: <strong className="text-gray-900">{fileName}</strong></span>
              </div>
              <label className="cursor-pointer text-[#6E3FF3] font-semibold hover:underline">
                Upload new file
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFileName(e.target.files[0].name);
                    }
                  }}
                />
              </label>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button onClick={() => setStep(1)} className="text-xs font-medium text-gray-500 hover:text-gray-800">
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

        {/* STEP 3: Budget & Deadline (Page 13) */}
        {step === 3 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#110D17] mb-1.5">Set your budget and timeline</h2>
              <p className="text-xs text-gray-500">
                Let freelancers know what you’re investing and when you need the work.
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-xs font-bold text-[#110D17] mb-1.5">Project budget</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:border-[#6E3FF3]"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Total project budget in INR. Freelancers will propose within this amount.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#110D17] mb-1.5">
                  Project submission deadline
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="November 06, 2026"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-[#6E3FF3]"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Final deliverables are due by this date. Give your freelancer time to do their best work.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button onClick={() => setStep(2)} className="text-xs font-medium text-gray-500 hover:text-gray-800">
                ← Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-5 py-2.5 bg-[#6E3FF3] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Preview & Post (Page 14) */}
        {step === 4 && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#110D17] mb-1.5">Preview your job post</h2>
              <p className="text-xs text-gray-500">
                Everything look right? Your next great collaborator is one post away.
              </p>
            </div>

            {/* Preview Card matching Page 14 */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-[#FAFAFC] mb-8 space-y-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                JOB POST PREVIEW
              </span>

              <h3 className="text-xl font-extrabold text-[#110D17]">{title}</h3>

              {/* Badges */}
              <div className="grid grid-cols-3 gap-3 text-xs py-2 border-y border-gray-200">
                <div>
                  <span className="text-gray-400 text-[10px] block">Category</span>
                  <strong className="text-gray-800">{category}</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] block">Job type</span>
                  <strong className="text-gray-800">{jobType}</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] block">Experience</span>
                  <strong className="text-gray-800">{experienceLevel}</strong>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                {description}
              </p>

              <div>
                <span className="text-xs font-bold text-gray-800 block mb-1">Deliverables:</span>
                <ul className="text-xs text-gray-600 list-disc pl-4 space-y-0.5">
                  {deliverables.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200 text-xs">
                <div>
                  <span className="text-gray-400 text-[10px] block">Project budget · INR</span>
                  <strong className="text-gray-900 text-sm">₹{budget} · Fixed price</strong>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px] block">Submission deadline</span>
                  <strong className="text-gray-900 text-sm">{deadline}</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-gray-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-purple-50 text-[#6E3FF3] flex items-center justify-center font-bold text-[10px]">
                    PDF
                  </div>
                  <div>
                    <strong className="text-gray-800">{fileName}</strong>
                    <div className="text-[10px] text-gray-400">PDF · 2.4 MB · Reference file</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-xs font-semibold text-[#6E3FF3] hover:underline"
                >
                  View file
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button onClick={() => setStep(3)} className="text-xs font-medium text-gray-500 hover:text-gray-800">
                ← Back
              </button>
              <button
                onClick={handlePublishJob}
                className="px-6 py-2.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm active:scale-98"
              >
                <span>Post a Job</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Success Celebration (Page 16) */}
        {step === 5 && (
          <div className="text-center py-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <h2 className="text-2xl font-extrabold text-[#110D17] mb-1">Your job is live</h2>
            <p className="text-xs text-gray-500 mb-6">
              Freelancers can now see your post and send hire requests.
            </p>

            {/* Summary card */}
            <div className="p-5 rounded-2xl bg-[#FCFAFF] border border-purple-200 text-left max-w-md mx-auto mb-6">
              <h4 className="font-bold text-sm text-[#110D17] mb-1.5">{title}</h4>
              <div className="flex gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-md bg-purple-100 text-[10px] text-[#6E3FF3] font-medium">
                  {category}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] text-gray-600 font-medium">
                  {jobType}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] text-gray-600 font-medium">
                  {experienceLevel}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-purple-100">
                <div>
                  <span className="text-gray-400 text-[10px]">Budget</span>
                  <div className="font-bold text-gray-800">₹{budget}</div>
                </div>
                <div>
                  <span className="text-gray-400 text-[10px]">Deadline</span>
                  <div className="font-bold text-gray-800">{deadline}</div>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="max-w-md mx-auto text-left mb-8 space-y-3">
              <h5 className="text-xs font-bold text-gray-900">What happens next</h5>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-purple-100 text-[#6E3FF3] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-xs text-gray-800 block">Freelancers apply</strong>
                  <p className="text-[11px] text-gray-500">You get a notification for every new hire request.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-purple-100 text-[#6E3FF3] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-xs text-gray-800 block">Review requests</strong>
                  <p className="text-[11px] text-gray-500">Check profile, AI disclosure and proposal. Accept, give feedback, or reject.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-purple-100 text-[#6E3FF3] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-xs text-gray-800 block">Hire &amp; pay 10%</strong>
                  <p className="text-[11px] text-gray-500">Pick a starter credit, choose terms and start the project.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('home')}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Back to dashboard
              </button>
              <button
                onClick={() => onNavigate('find')}
                className="px-4 py-2.5 rounded-xl border border-[#6E3FF3] text-xs font-semibold text-[#6E3FF3] hover:bg-purple-50"
              >
                &amp; Invite freelancers
              </button>
              <button
                onClick={() => onNavigate('hire_requests')}
                className="px-5 py-2.5 rounded-xl bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold shadow-sm"
              >
                → View hire requests
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
