import React, { useState } from 'react';
import { Mic, MicOff, Video as VideoIcon, VideoOff, Monitor, MessageSquare, Users, PhoneOff, Check, Lock, Sparkles } from 'lucide-react';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle?: string;
  freelancerName?: string;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  isOpen,
  onClose,
  projectTitle = 'Noble Paws',
  freelancerName = 'Umang Donga',
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [showCallChat, setShowCallChat] = useState<boolean>(false);

  const [agendaItems, setAgendaItems] = useState([
    { id: '1', text: 'Review moodboard v1', done: true },
    { id: '2', text: 'Confirm brand colours', done: true },
    { id: '3', text: 'Agree on milestones', done: false },
    { id: '4', text: 'Next check-in date', done: false },
  ]);

  if (!isOpen) return null;

  const toggleAgendaItem = (id: string) => {
    setAgendaItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#140E26] text-white flex flex-col select-none">
      {/* Top Bar matching PDF 2 Page 10 */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="font-bold text-sm sm:text-base text-white">
            Moodboard walkthrough · {projectTitle}
          </h2>
          <span className="text-xs text-gray-400">12:41 · Recording off</span>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encrypted call</span>
        </div>
      </header>

      {/* Main Video Call Area + Agenda Drawer */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Main Video Stage */}
        <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 bg-[#1A1333]">
          {/* Main Remote Participant (Umang Donga) */}
          <div className="w-full h-full max-w-4xl max-h-[600px] rounded-3xl bg-[#231A45] border border-white/10 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
            <div className="w-32 h-32 rounded-full bg-[#6E3FF3] text-white font-black text-4xl flex items-center justify-center shadow-xl ring-8 ring-white/5">
              UD
            </div>
            <div className="mt-4 text-sm font-bold text-gray-200">
              {freelancerName}
            </div>

            {/* Remote Mic Indicator Tag */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 backdrop-blur-md text-xs font-medium text-white border border-white/10">
              <Mic className="w-3.5 h-3.5 text-emerald-400" />
              <span>{freelancerName}</span>
            </div>
          </div>

          {/* Floating Self Inset Thumbnail (MP - You) matching Page 10 */}
          <div className="absolute top-8 right-8 w-36 h-28 sm:w-48 sm:h-36 rounded-2xl bg-[#2C2154] border-2 border-white/20 shadow-2xl flex flex-col items-center justify-center overflow-hidden z-20">
            <div className="w-12 h-12 rounded-full bg-[#110D17] text-white font-bold text-sm flex items-center justify-center border border-white/20">
              MP
            </div>
            <span className="text-[11px] text-gray-300 mt-2 font-medium">You</span>

            <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] bg-black/40 px-2 py-0.5 rounded-md">
              {isMuted ? (
                <MicOff className="w-3 h-3 text-red-400" />
              ) : (
                <Mic className="w-3 h-3 text-emerald-400" />
              )}
            </div>
          </div>
        </div>

        {/* Right Call Agenda & Shared Notes Drawer matching PDF 2 Page 10 */}
        <div className="hidden md:flex flex-col w-80 bg-[#1C1538] border-l border-white/10 p-6 shrink-0 overflow-y-auto space-y-6">
          {/* Agenda Checklist */}
          <div>
            <h3 className="font-extrabold text-sm text-white mb-3">Agenda</h3>
            <div className="space-y-2">
              {agendaItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleAgendaItem(item.id)}
                  className="flex items-center gap-2.5 text-xs text-gray-300 cursor-pointer hover:text-white"
                >
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                      item.done
                        ? 'border-[#6E3FF3] bg-[#6E3FF3] text-white'
                        : 'border-gray-500'
                    }`}
                  >
                    {item.done && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={item.done ? 'line-through text-gray-400' : ''}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Shared Notes matching Page 10 */}
          <div>
            <h3 className="font-extrabold text-sm text-white mb-3">Shared notes</h3>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-gray-300 leading-relaxed">
              <p>• Warm palette, soft rounded shapes</p>
              <p>• Final design stays human-made</p>
              <p>• Next milestone: wireframes by Friday</p>
            </div>
          </div>

          {/* AI Disclosure reminder badge (Page 10) */}
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span>AI used in this project: ideation only</span>
          </div>
        </div>
      </div>

      {/* Bottom Call Controls Toolbar matching PDF 2 Page 10 */}
      <footer className="px-6 py-4 bg-[#140E26] border-t border-white/10 flex items-center justify-center gap-3 shrink-0">
        {/* Mic Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isMuted ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Camera Toggle */}
        <button
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isVideoOff ? 'bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
          title={isVideoOff ? 'Turn on video' : 'Turn off video'}
        >
          {isVideoOff ? <VideoOff className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
        </button>

        {/* Screen Share */}
        <button
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isScreenSharing ? 'bg-[#6E3FF3] text-white' : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
          title="Share screen"
        >
          <Monitor className="w-5 h-5" />
        </button>

        {/* End Call Button matching Page 10 */}
        <button
          onClick={onClose}
          className="px-6 h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-full flex items-center gap-2 shadow-lg transition-transform active:scale-95"
        >
          <PhoneOff className="w-4 h-4" />
          <span>End call</span>
        </button>
      </footer>
    </div>
  );
};
