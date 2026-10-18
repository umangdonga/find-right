import React, { useState } from 'react';
import { Search, Calendar, Video, Paperclip, Send, Download, ExternalLink, ShieldCheck, Clock, FileText } from 'lucide-react';
import { Freelancer, Project, ChatMessage, NavView } from '../types';

interface ChatViewProps {
  freelancers: Freelancer[];
  activeFreelancerId: string;
  onSelectFreelancer: (id: string) => void;
  messages: Record<string, ChatMessage[]>;
  onSendMessage: (freelancerId: string, text: string) => void;
  onStartVideoCall: () => void;
  project: Project;
  onNavigate: (view: NavView) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  freelancers,
  activeFreelancerId,
  onSelectFreelancer,
  messages,
  onSendMessage,
  onStartVideoCall,
  project,
  onNavigate,
}) => {
  const [inputText, setInputText] = useState('');
  const [searchChat, setSearchChat] = useState('');

  const currentFreelancer =
    freelancers.find((f) => f.id === activeFreelancerId) || freelancers[0];

  const currentMessages = messages[currentFreelancer.id] || [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(currentFreelancer.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="h-[calc(100vh-65px)] flex flex-col md:flex-row bg-[#FAF8F5] overflow-hidden">
      {/* LEFT COLUMN: Chats List matching PDF 2 Page 9 */}
      <div className="w-full md:w-80 bg-white border-r border-[#ECE7F2] flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#110D17] mb-3">Messages</h2>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchChat}
              onChange={(e) => setSearchChat(e.target.value)}
              placeholder="Search chats"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#6E3FF3]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {freelancers.map((f) => {
            const isSelected = f.id === currentFreelancer.id;
            const freelancerMsgs = messages[f.id] || [];
            const lastMsg = freelancerMsgs[freelancerMsgs.length - 1];

            return (
              <div
                key={f.id}
                onClick={() => onSelectFreelancer(f.id)}
                className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${
                  isSelected ? 'bg-purple-50/70 border-l-4 border-[#6E3FF3]' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6E3FF3] font-bold text-xs flex items-center justify-center">
                      {f.initials}
                    </div>
                    {f.id === 'umang-donga' && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-xs text-[#110D17] truncate">{f.name}</h4>
                    <p className="text-[11px] text-gray-500 truncate max-w-[150px]">
                      {lastMsg ? lastMsg.text : 'Sharing initial concepts...'}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] text-gray-400 font-medium shrink-0">
                  {lastMsg?.time || '2m'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MIDDLE COLUMN: Active Chat Conversation matching PDF 2 Page 9 */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#ECE7F2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#6E3FF3] font-bold text-xs flex items-center justify-center">
              {currentFreelancer.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-[#110D17]">{currentFreelancer.name}</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px] text-emerald-600 font-medium">Online</span>
              </div>
              <p className="text-[11px] text-gray-500">{project.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onStartVideoCall}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden sm:inline">Schedule meeting</span>
            </button>

            <button
              onClick={onStartVideoCall}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold shadow-2xs transition-all active:scale-95"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Video call</span>
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FBF9F6]">
          {/* Escrow banner matching PDF 2 Page 9 */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Hire accepted · ₹{project.advancePaid || 680} advance held in escrow</span>
            </div>
          </div>

          {currentMessages.map((msg) => {
            const isClient = msg.sender === 'client';
            const isSystem = msg.sender === 'system';

            if (isSystem) {
              return (
                <div key={msg.id} className="flex justify-center my-2">
                  <span className="text-[11px] text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {msg.text}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex items-end gap-2.5 ${isClient ? 'justify-end' : 'justify-start'}`}
              >
                {!isClient && (
                  <div className="w-7 h-7 rounded-xl bg-purple-100 text-[#6E3FF3] text-[10px] font-bold flex items-center justify-center shrink-0">
                    {currentFreelancer.initials}
                  </div>
                )}

                <div
                  className={`max-w-md rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    isClient
                      ? 'bg-[#6E3FF3] text-white rounded-br-xs'
                      : 'bg-white text-gray-800 border border-[#ECE7F2] rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Attachment Card if present */}
                  {msg.attachment && (
                    <div
                      className={`mt-2.5 p-2.5 rounded-xl flex items-center justify-between text-xs ${
                        isClient ? 'bg-white/15 text-white' : 'bg-gray-50 text-gray-800 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#6E3FF3]" />
                        <div>
                          <strong className="block text-[11px]">{msg.attachment.name}</strong>
                          <span className="text-[10px] opacity-75">{msg.attachment.size}</span>
                        </div>
                      </div>
                      <Download className="w-3.5 h-3.5 cursor-pointer hover:opacity-80" />
                    </div>
                  )}

                  <div
                    className={`text-[10px] mt-1 text-right ${
                      isClient ? 'text-purple-200' : 'text-gray-400'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input Bar matching PDF 2 Page 9 */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 bg-white border-t border-[#ECE7F2] flex items-center gap-2">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100"
            title="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message…"
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#6E3FF3]"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-2xs active:scale-95"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN: Project Info Sidebar matching PDF 2 Page 9 */}
      <div className="hidden lg:flex flex-col w-80 bg-white border-l border-[#ECE7F2] p-5 shrink-0 overflow-y-auto space-y-6">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Project
          </span>
          <h3 className="font-extrabold text-sm text-[#110D17]">{project.title}</h3>
          <div className="flex items-center gap-1.5 text-xs text-purple-700 font-semibold mt-1">
            <span className="w-2 h-2 rounded-full bg-[#6E3FF3]" />
            <span>In progress</span>
          </div>
        </div>

        <div className="space-y-2 py-3 border-y border-gray-100 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">Contract</span>
            <strong className="text-gray-900">₹{(project.contractTotal || 6800).toLocaleString()}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Progress</span>
            <strong className="text-[#6E3FF3]">{project.progressPercent}%</strong>
          </div>
        </div>

        {/* Upcoming meeting card (Page 9) */}
        <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-100 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#6E3FF3]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Upcoming meeting</span>
          </div>
          <div className="text-xs font-bold text-gray-900">Moodboard walkthrough</div>
          <div className="text-[11px] text-gray-500">Tomorrow · 5:00 PM</div>

          <button
            onClick={onStartVideoCall}
            className="w-full py-2 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Join video call</span>
          </button>
        </div>

        {/* Shared Files (Page 9) */}
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
            Shared files
          </span>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer">
              <FileText className="w-4 h-4 text-[#6E3FF3]" />
              <span className="text-gray-700 truncate">Website brief.pdf</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer">
              <FileText className="w-4 h-4 text-[#6E3FF3]" />
              <span className="text-gray-700 truncate">Noble-Paws-moodboard-v1.pdf</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('project_detail')}
          className="text-xs font-semibold text-[#6E3FF3] hover:underline"
        >
          View Milestone Tracker →
        </button>
      </div>
    </div>
  );
};
