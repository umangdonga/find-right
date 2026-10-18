import React, { useState } from 'react';
import { Check, Star, Sparkles, Send } from 'lucide-react';
import { Freelancer, Project } from '../types';

interface ReviewRatingModalProps {
  isOpen: boolean;
  freelancer: Freelancer;
  project: Project;
  onClose: () => void;
  onSubmitReview: (reviewData: {
    overallScore: number;
    quality: number;
    communication: number;
    timeliness: number;
    value: number;
    aiDisclosureVerified: 'Yes, as disclosed' | 'Partly' | 'No';
    comment: string;
  }) => void;
}

export const ReviewRatingModal: React.FC<ReviewRatingModalProps> = ({
  isOpen,
  freelancer,
  project,
  onClose,
  onSubmitReview,
}) => {
  const [quality, setQuality] = useState<number>(5);
  const [communication, setCommunication] = useState<number>(5);
  const [timeliness, setTimeliness] = useState<number>(4);
  const [value, setValue] = useState<number>(5);
  const [aiVerified, setAiVerified] = useState<'Yes, as disclosed' | 'Partly' | 'No'>('Yes, as disclosed');
  const [comment, setComment] = useState<string>(
    'Umang delivered clean screens on time and communicated clearly at every milestone.'
  );

  if (!isOpen) return null;

  const overallScore = Number(((quality + communication + timeliness + value) / 4).toFixed(1));

  const renderStars = (rating: number, setRating: (r: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="p-1 hover:scale-110 transition-transform"
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-200 stroke-[1.5]'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const handleSubmit = () => {
    onSubmitReview({
      overallScore,
      quality,
      communication,
      timeliness,
      value,
      aiDisclosureVerified: aiVerified,
      comment,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-xl w-full shadow-2xl border border-gray-100 my-8">
        {/* Top Success Badge matching PDF 2 Page 13 */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <Check className="w-6 h-6 stroke-[3]" />
          </div>

          <div className="text-xs font-semibold text-emerald-600 mb-1">
            Payment released · Project complete
          </div>

          <h2 className="text-2xl font-extrabold text-[#110D17]">
            Rate your experience with {freelancer.name}
          </h2>
          <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
            Your rating adds points to {freelancer.name.split(' ')[0]}&apos;s FindRight score and helps
            other clients.
          </p>
        </div>

        {/* 4 Rating Criteria Categories matching PDF 2 Page 13 */}
        <div className="space-y-4 py-4 border-y border-gray-100 text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">Quality of work</span>
            {renderStars(quality, setQuality)}
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">Communication</span>
            {renderStars(communication, setCommunication)}
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">Timeliness</span>
            {renderStars(timeliness, setTimeliness)}
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">Value for money</span>
            {renderStars(value, setValue)}
          </div>
        </div>

        {/* Aggregate Score Display matching PDF 2 Page 13 */}
        <div className="p-3.5 my-5 rounded-2xl bg-[#FCFAFF] border border-purple-100 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-800">Score given to freelancer</span>
          <div className="flex items-center gap-1.5 font-black text-sm text-[#6E3FF3]">
            <Star className="w-4 h-4 fill-[#6E3FF3]" />
            <span>{overallScore} / 5</span>
          </div>
        </div>

        {/* AI Disclosure Verification (Key FindRight differentiator) */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-[#110D17] mb-2">
            Was the AI usage as disclosed?
          </label>
          <div className="flex items-center gap-2">
            {[
              { id: 'Yes, as disclosed', color: 'emerald' },
              { id: 'Partly', color: 'amber' },
              { id: 'No', color: 'rose' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAiVerified(opt.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  aiVerified === opt.id
                    ? opt.id === 'Yes, as disclosed'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : opt.id === 'Partly'
                      ? 'bg-amber-500 text-white'
                      : 'bg-rose-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt.id === 'Yes, as disclosed' ? '● Yes, as disclosed' : opt.id}
              </button>
            ))}
          </div>
        </div>

        {/* Written Review */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-[#110D17] mb-1.5">Write a review</label>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-gray-300 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#6E3FF3] leading-relaxed"
          />
        </div>

        {/* Modal actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-[#6E3FF3] hover:bg-[#5D2EE0] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm active:scale-98"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit review</span>
          </button>
        </div>
      </div>
    </div>
  );
};
