import React, { useState } from 'react';
import { NavView, Role, Project, Freelancer, HireRequest, StarterCredit, ChatMessage, ClientProfile } from './types';
import {
  initialProjects,
  mockFreelancers,
  initialHireRequests,
  initialCredits,
  initialChatMessages,
  initialClientProfile,
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { OnboardingFlow } from './components/OnboardingFlow';
import { DashboardView } from './components/DashboardView';
import { FindFreelancersView } from './components/FindFreelancersView';
import { FreelancerProfileView } from './components/FreelancerProfileView';
import { PostJobFlow } from './components/PostJobFlow';
import { HireRequestsView } from './components/HireRequestsView';
import { ReviewRequestView } from './components/ReviewRequestView';
import { ConsultationView } from './components/ConsultationView';
import { HireCheckoutFlow } from './components/HireCheckoutFlow';
import { ProjectDetailView } from './components/ProjectDetailView';
import { FinalSubmissionView } from './components/FinalSubmissionView';
import { ExitPolicyView } from './components/ExitPolicyView';
import { ChatView } from './components/ChatView';
import { VideoCallModal } from './components/VideoCallModal';
import { ReviewRatingModal } from './components/ReviewRatingModal';
import { CreditsModal } from './components/CreditsModal';
import { ProjectsListView } from './components/ProjectsListView';
import { ClientProfileView } from './components/ClientProfileView';
import { SettingsView } from './components/SettingsView';
import { ClientAuthView } from './components/ClientAuthView';
import { PostedJobsView } from './components/PostedJobsView';
import { FinalizeProjectDetailsView } from './components/FinalizeProjectDetailsView';

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<NavView>('home');
  const [role, setRole] = useState<Role>('client');

  // Application Data State
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [freelancers, setFreelancers] = useState<Freelancer[]>(mockFreelancers);
  const [hireRequests, setHireRequests] = useState<HireRequest[]>(initialHireRequests);
  const [credits, setCredits] = useState<StarterCredit[]>(initialCredits);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(initialChatMessages);
  const [clientProfile, setClientProfile] = useState<ClientProfile>(initialClientProfile);
  const [savedFreelancerIds, setSavedFreelancerIds] = useState<string[]>(['umang-donga']);

  // Selected Active Entities
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-1');
  const [selectedFreelancerId, setSelectedFreelancerId] = useState<string>('umang-donga');
  const [selectedRequest, setSelectedRequest] = useState<HireRequest | null>(initialHireRequests[0]);

  // Modals
  const [isVideoCallOpen, setIsVideoCallOpen] = useState<boolean>(false);
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState<boolean>(false);
  const [isReviewRatingOpen, setIsReviewRatingOpen] = useState<boolean>(false);

  // Active Project & Freelancer Lookups
  const activeProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  const activeFreelancer =
    freelancers.find((f) => f.id === selectedFreelancerId) || freelancers[0];

  // Handlers
  const handleToggleSaveFreelancer = (id: string) => {
    setSavedFreelancerIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSendMessage = (freelancerId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'client',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => ({
      ...prev,
      [freelancerId]: [...(prev[freelancerId] || []), newMsg],
    }));

    // Auto simulated reply from designer
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'freelancer',
        text: `Thanks for the note! I'm reviewing the updates and will make sure our design meets the brand standard.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => ({
        ...prev,
        [freelancerId]: [...(prev[freelancerId] || []), replyMsg],
      }));
    }, 1800);
  };

  const handleStartHire = (targetFreelancer: Freelancer) => {
    setSelectedFreelancerId(targetFreelancer.id);
    setCurrentView('consultation');
  };

  const handleFinalizedTermsAgreed = (finalizedTerms: {
    agreedPrice: number;
    deliverables: string[];
    deadline: string;
    aiPolicy: Project['aiPolicy'];
    revisionRounds: number;
    scopeNotes: string;
  }) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProjectId
          ? {
              ...p,
              agreedPrice: finalizedTerms.agreedPrice,
              contractTotal: finalizedTerms.agreedPrice,
              deadline: finalizedTerms.deadline,
              deliverables: finalizedTerms.deliverables,
              aiPolicy: finalizedTerms.aiPolicy,
              totalRevisions: finalizedTerms.revisionRounds,
              hiredFreelancer: activeFreelancer,
            }
          : p
      )
    );
    setCurrentView('hire_checkout');
  };

  const handleCompleteHire = (updatedProject: Project, usedCreditId: string) => {
    // Update project state
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );

    // Mark credit as applied/used
    setCredits((prev) =>
      prev.map((c) => (c.id === usedCreditId ? { ...c, status: 'applied' } : c))
    );

    // Update hire request status
    setHireRequests((prev) =>
      prev.map((r) =>
        r.projectId === updatedProject.id && r.freelancerId === updatedProject.hiredFreelancer?.id
          ? { ...r, status: 'hired' }
          : r
      )
    );

    // Add kickoff chat message
    if (updatedProject.hiredFreelancer) {
      const fId = updatedProject.hiredFreelancer.id;
      const sysMsg: ChatMessage = {
        id: `sys-${Date.now()}`,
        sender: 'system',
        text: `Hire accepted · ₹${updatedProject.advancePaid} advance held in escrow`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => ({
        ...prev,
        [fId]: [sysMsg, ...(prev[fId] || [])],
      }));
    }

    setCurrentView('project_detail');
  };

  const handleRejectWithFeedback = (
    requestId: string,
    tags: string[],
    message: string,
    sentThankYou: boolean
  ) => {
    setHireRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'rejected',
              rejectionFeedback: { tags, message, sentThankYou },
            }
          : r
      )
    );
    setCurrentView('hire_requests');
  };

  const handleQuickReject = (requestId: string) => {
    setHireRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: 'rejected' } : r))
    );
  };

  const handleApproveFinalSubmission = () => {
    setIsReviewRatingOpen(true);
  };

  const handleReviewSubmitted = (reviewData: any) => {
    setIsReviewRatingOpen(false);

    // Complete project
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProjectId
          ? {
              ...p,
              status: 'completed',
              progressPercent: 100,
              finalPending: 0,
              recentActivity: [
                { text: `90% final payment ₹${p.finalPending} released`, time: 'Just now' },
                { text: 'Project marked as complete and rated 4.5/5', time: 'Just now' },
                ...p.recentActivity,
              ],
            }
          : p
      )
    );

    // Add review to freelancer profile
    setFreelancers((prev) =>
      prev.map((f) =>
        f.id === selectedFreelancerId
          ? {
              ...f,
              rating: Number(((f.rating * f.reviewCount + reviewData.overallScore) / (f.reviewCount + 1)).toFixed(1)),
              reviewCount: f.reviewCount + 1,
              completedProjects: f.completedProjects + 1,
              reviews: [
                {
                  id: `rev-${Date.now()}`,
                  clientName: clientProfile.name,
                  avatarText: 'MP',
                  rating: reviewData.overallScore,
                  comment: reviewData.comment,
                  date: 'Just now',
                  aiUsageVerified: reviewData.aiDisclosureVerified,
                  projectTitle: activeProject.title,
                },
                ...f.reviews,
              ],
            }
          : f
      )
    );

    setCurrentView('projects');
  };

  const handleSimulateFreelancerExit = (exitProgress: number) => {
    const contract = activeProject.contractTotal || 6800;
    const advance = activeProject.advancePaid || 680;

    let exitCutPct = 0.2;
    if (exitProgress < 25) exitCutPct = 0.5;
    else if (exitProgress < 50) exitCutPct = 0.3;
    else if (exitProgress < 75) exitCutPct = 0.2;
    else if (exitProgress < 100) exitCutPct = 0.1;

    const earned = Math.round(contract * (exitProgress / 100));
    const cut = Math.round(earned * exitCutPct);
    const freelancerPayout = earned - cut;
    const clientSettlement = Math.max(0, advance - freelancerPayout);

    // Restore starter credit
    setCredits((prev) =>
      prev.map((c) =>
        c.status === 'applied' ? { ...c, status: 'available' } : c
      )
    );

    // Update project state
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProjectId
          ? {
              ...p,
              status: 'cancelled_exit',
              progressPercent: exitProgress,
              exitDetails: {
                exitProgress,
                earnedAmount: earned,
                exitCutAmount: cut,
                freelancerPayout,
                clientSettlement,
                reason: 'Freelancer left mid-project',
              },
              recentActivity: [
                {
                  text: `Mid-project exit: Freelancer received ₹${freelancerPayout}. Remaining escrow refunded to client.`,
                  time: 'Just now',
                },
                { text: '15% Starter Credit restored to wallet', time: 'Just now' },
                ...p.recentActivity,
              ],
            }
          : p
      )
    );
  };

  const handleResetData = () => {
    setProjects(initialProjects);
    setFreelancers(mockFreelancers);
    setHireRequests(initialHireRequests);
    setCredits(initialCredits);
    setMessages(initialChatMessages);
    setClientProfile(initialClientProfile);
    setCurrentView('home');
  };

  const handleJobCreated = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
    setSelectedProjectId(newProject.id);
  };

  const handleOpenChat = (freelancerId: string) => {
    setSelectedFreelancerId(freelancerId);
    setCurrentView('chat');
  };

  const handleLoginSuccess = (profile: ClientProfile) => {
    setClientProfile(profile);
    setCurrentView('home');
  };

  const isFullBleedView =
    currentView === 'landing' || currentView === 'onboarding' || currentView === 'login';

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#110D17] flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        role={role}
        onToggleRole={() => setRole((r) => (r === 'client' ? 'freelancer' : 'client'))}
        credits={credits}
        onOpenCreditsModal={() => setIsCreditsModalOpen(true)}
        onPostJobClick={() => setCurrentView('post_job')}
        clientProfile={clientProfile}
        onOpenLogin={() => setCurrentView('login')}
      />

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar only appears in dashboard/in-app views matching Figma design */}
        {!isFullBleedView && (
          <Sidebar
            currentView={currentView}
            onNavigate={setCurrentView}
            activeProjectsCount={projects.filter((p) => p.status === 'in_progress').length}
            unreadChatCount={1}
            postedJobsCount={hireRequests.length}
          />
        )}

        {/* View Router */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
          {currentView === 'landing' && (
            <LandingPage
              onStartOnboarding={() => setCurrentView('onboarding')}
              onGoToDashboard={() => setCurrentView('home')}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'login' && (
            <ClientAuthView
              onLoginSuccess={handleLoginSuccess}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'onboarding' && (
            <OnboardingFlow
              onComplete={() => setCurrentView('home')}
              onSkip={() => setCurrentView('home')}
              onRoleSelected={(r) => setRole(r)}
              onNavigateToLogin={() => setCurrentView('login')}
            />
          )}

          {currentView === 'home' && (
            <DashboardView
              projects={projects}
              freelancers={freelancers}
              onNavigate={setCurrentView}
              onSelectProject={(id) => setSelectedProjectId(id)}
              onSelectFreelancer={(id) => setSelectedFreelancerId(id)}
              onCreateProject={() => setCurrentView('post_job')}
              savedFreelancerIds={savedFreelancerIds}
              onToggleSaveFreelancer={handleToggleSaveFreelancer}
              clientProfile={clientProfile}
            />
          )}

          {/* STEP 1: POSTED JOBS & APPLICANT RESPONSES PIPELINE */}
          {currentView === 'posted_jobs' && (
            <PostedJobsView
              projects={projects}
              hireRequests={hireRequests}
              onSelectJob={(id) => setSelectedProjectId(id)}
              onSelectRequestForReview={(req, proj) => {
                setSelectedProjectId(proj.id);
                setSelectedFreelancerId(req.freelancer.id);
                setSelectedRequest(req);
                setCurrentView('review_request');
              }}
              onStartConsultation={(f, proj) => {
                setSelectedProjectId(proj.id);
                setSelectedFreelancerId(f.id);
                setCurrentView('consultation');
              }}
              onStartVideoCall={(f, proj) => {
                setSelectedProjectId(proj.id);
                setSelectedFreelancerId(f.id);
                setIsVideoCallOpen(true);
              }}
              onStartFinalization={(f, proj, req) => {
                setSelectedProjectId(proj.id);
                setSelectedFreelancerId(f.id);
                if (req) setSelectedRequest(req);
                setCurrentView('finalize_project');
              }}
              onViewFreelancerProfile={(id) => {
                setSelectedFreelancerId(id);
                setCurrentView('freelancer_profile');
              }}
              onCreateNewJob={() => setCurrentView('post_job')}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'find' && (
            <FindFreelancersView
              freelancers={freelancers}
              credits={credits}
              onSelectFreelancer={(id) => {
                setSelectedFreelancerId(id);
                setCurrentView('freelancer_profile');
              }}
              onNavigate={setCurrentView}
              onCreateProject={() => setCurrentView('post_job')}
              onOpenCreditsModal={() => setIsCreditsModalOpen(true)}
              savedFreelancerIds={savedFreelancerIds}
              onToggleSaveFreelancer={handleToggleSaveFreelancer}
            />
          )}

          {currentView === 'freelancer_profile' && (
            <FreelancerProfileView
              freelancer={activeFreelancer}
              onBack={() => setCurrentView('find')}
              onStartHire={handleStartHire}
              onSendMessage={handleOpenChat}
              isSaved={savedFreelancerIds.includes(activeFreelancer.id)}
              onToggleSave={() => handleToggleSaveFreelancer(activeFreelancer.id)}
            />
          )}

          {currentView === 'post_job' && (
            <PostJobFlow
              onJobCreated={handleJobCreated}
              onNavigate={setCurrentView}
              onCancel={() => setCurrentView('posted_jobs')}
            />
          )}

          {currentView === 'hire_requests' && (
            <HireRequestsView
              project={activeProject}
              hireRequests={hireRequests}
              onSelectRequestForReview={(req) => {
                setSelectedRequest(req);
                setSelectedFreelancerId(req.freelancer.id);
                setCurrentView('review_request');
              }}
              onSelectFreelancer={(id) => {
                setSelectedFreelancerId(id);
                setCurrentView('freelancer_profile');
              }}
              onOpenChat={handleOpenChat}
              onQuickReject={handleQuickReject}
              onNavigate={setCurrentView}
              onBack={() => setCurrentView('posted_jobs')}
            />
          )}

          {/* STEP 2: REVIEW PROPOSAL & PORTFOLIO */}
          {currentView === 'review_request' && selectedRequest && (
            <ReviewRequestView
              request={selectedRequest}
              project={activeProject}
              onBack={() => setCurrentView('posted_jobs')}
              onAcceptAndHire={(req) => {
                setSelectedFreelancerId(req.freelancer.id);
                setCurrentView('finalize_project');
              }}
              onStartFinalization={(req) => {
                setSelectedFreelancerId(req.freelancer.id);
                setCurrentView('finalize_project');
              }}
              onStartConsultation={(req) => {
                setSelectedFreelancerId(req.freelancer.id);
                setCurrentView('consultation');
              }}
              onRejectWithFeedback={handleRejectWithFeedback}
              onQuickReject={handleQuickReject}
              onOpenChat={handleOpenChat}
              onScheduleVideoCall={() => setIsVideoCallOpen(true)}
              onViewProfile={(id) => {
                setSelectedFreelancerId(id);
                setCurrentView('freelancer_profile');
              }}
            />
          )}

          {/* STEP 3 & 4: CHAT & VIDEO REQUIREMENTS CONSULTATION */}
          {currentView === 'consultation' && (
            <ConsultationView
              project={activeProject}
              freelancer={activeFreelancer}
              messages={messages[activeFreelancer.id] || []}
              onSendMessage={handleSendMessage}
              onStartVideoCall={() => setIsVideoCallOpen(true)}
              onProceedToTerms={() => setCurrentView('finalize_project')}
              onBack={() => setCurrentView('posted_jobs')}
            />
          )}

          {/* STEP 5 & 6: FINALIZE PROJECT DETAILS & CONFIRM HIRING */}
          {currentView === 'finalize_project' && (
            <FinalizeProjectDetailsView
              project={activeProject}
              freelancer={activeFreelancer}
              request={selectedRequest}
              credits={credits}
              onBack={() => setCurrentView('posted_jobs')}
              onProceedToHireAndPayment={handleFinalizedTermsAgreed}
              onOpenChat={handleOpenChat}
              onStartVideoCall={() => setIsVideoCallOpen(true)}
            />
          )}

          {/* STEP 7: ESCROW ADVANCE PAYMENT & STARTER CREDIT DISCOUNT */}
          {currentView === 'hire_checkout' && (
            <HireCheckoutFlow
              project={activeProject}
              freelancer={activeFreelancer}
              credits={credits}
              onCompleteHire={handleCompleteHire}
              onNavigate={setCurrentView}
              onBack={() => setCurrentView('finalize_project')}
              onOpenExitPolicy={() => setCurrentView('exit_policy')}
            />
          )}

          {currentView === 'project_detail' && (
            <ProjectDetailView
              project={activeProject}
              onNavigate={setCurrentView}
              onOpenChat={handleOpenChat}
              onStartVideoCall={() => setIsVideoCallOpen(true)}
              onReviewMilestone={() => setCurrentView('final_submission')}
              onOpenExitPolicy={() => setCurrentView('exit_policy')}
              onGoToFinalSubmission={() => setCurrentView('final_submission')}
            />
          )}

          {currentView === 'final_submission' && (
            <FinalSubmissionView
              project={activeProject}
              onApproveAndReleasePayment={handleApproveFinalSubmission}
              onRequestRevisions={(notes) => {
                setProjects((prev) =>
                  prev.map((p) =>
                    p.id === activeProject.id
                      ? {
                          ...p,
                          revisionsUsed: p.revisionsUsed + 1,
                          recentActivity: [
                            { text: `Client requested revision round ${p.revisionsUsed + 1}`, time: 'Just now' },
                            ...p.recentActivity,
                          ],
                        }
                      : p
                  )
                );
              }}
              onNavigate={setCurrentView}
              onBack={() => setCurrentView('project_detail')}
            />
          )}

          {currentView === 'exit_policy' && (
            <ExitPolicyView
              project={activeProject}
              onNavigate={setCurrentView}
              onBack={() => setCurrentView('project_detail')}
              onSimulateFreelancerExit={handleSimulateFreelancerExit}
            />
          )}

          {currentView === 'chat' && (
            <ChatView
              freelancers={freelancers}
              activeFreelancerId={selectedFreelancerId}
              onSelectFreelancer={(id) => setSelectedFreelancerId(id)}
              messages={messages}
              onSendMessage={handleSendMessage}
              onStartVideoCall={() => setIsVideoCallOpen(true)}
              project={activeProject}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'projects' && (
            <ProjectsListView
              projects={projects}
              onSelectProject={(id) => setSelectedProjectId(id)}
              onCreateProject={() => setCurrentView('post_job')}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'profile' && (
            <ClientProfileView
              profile={clientProfile}
              credits={credits}
              projects={projects}
              onNavigate={setCurrentView}
              onOpenCreditsModal={() => setIsCreditsModalOpen(true)}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView
              profile={clientProfile}
              onUpdateProfile={(updated) =>
                setClientProfile((prev) => ({ ...prev, ...updated }))
              }
              onResetData={handleResetData}
            />
          )}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <VideoCallModal
        isOpen={isVideoCallOpen}
        onClose={() => setIsVideoCallOpen(false)}
        projectTitle={activeProject.title}
        freelancerName={activeFreelancer.name}
      />

      <ReviewRatingModal
        isOpen={isReviewRatingOpen}
        freelancer={activeFreelancer}
        project={activeProject}
        onClose={() => setIsReviewRatingOpen(false)}
        onSubmitReview={handleReviewSubmitted}
      />

      <CreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
        credits={credits}
        onUseCreditClick={() => setCurrentView('find')}
      />
    </div>
  );
}
