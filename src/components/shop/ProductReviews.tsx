'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Star, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface Props {
  productId: number | string;
}

export default function ProductReviews({ productId }: Props) {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, rating, title, content }),
      });
      const data = await res.json();

      if (res.ok) {
        setSubmitMessage({ type: 'success', text: 'Thank you! Your review has been submitted and is pending moderation.' });
        setTitle('');
        setContent('');
        setRating(5);
      } else {
        setSubmitMessage({ type: 'error', text: data.error || 'Failed to submit review.' });
      }
    } catch (err) {
      setSubmitMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
      />
    ));
  };

  // Calculate aggregates
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mt-10">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#FF4500]" />
            Customer Reviews
          </h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">{renderStars(Math.round(Number(avgRating)))}</div>
              <span className="text-sm font-bold text-gray-900">{avgRating} out of 5</span>
              <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        <div className="p-6 md:col-span-2 space-y-6">
          {loading ? (
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm font-semibold text-gray-900">{review.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{review.content}</p>
                  <p className="text-xs text-gray-400">
                    By <span className="font-medium text-gray-600">{review.customer?.name || 'Verified Buyer'}</span> on{' '}
                    {new Date(review.date_created).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium text-sm">No reviews yet.</p>
              <p className="text-xs text-gray-400 mt-1">Be the first to share your thoughts!</p>
            </div>
          )}
        </div>

        {/* Submit Form */}
        <div className="p-6 bg-gray-50 relative">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Write a Review</h3>
          
          {status === 'loading' ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : session ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'text-amber-400 fill-amber-400 hover:scale-110' : 'text-gray-300 hover:text-amber-200'
                        } transition-all`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Review Title (Optional)
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] outline-none transition-colors"
                  placeholder="Summarize your experience"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] outline-none transition-colors resize-none"
                  placeholder="What did you like or dislike?"
                />
              </div>

              {submitMessage && (
                <div className={`p-3 rounded-lg text-sm ${submitMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {submitMessage.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#FF4500] to-orange-500 hover:from-orange-600 hover:to-orange-400 text-white font-bold text-sm px-4 py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-orange-200"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-gray-600 mb-4">You need to be logged in to write a review.</p>
              <Link
                href="/login"
                className="inline-block bg-white text-[#FF4500] border border-[#FF4500] font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
