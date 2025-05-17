
"use client";

import type { Flashcard as FlashcardType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface FlashcardProps {
  flashcard: FlashcardType;
}

export function FlashcardClient({ flashcard }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    // Dates are stored as YYYY-MM-DD, toLocaleDateString needs a proper Date object
    // and YYYY-MM-DD might be interpreted as UTC by Date constructor, so adjust if needed.
    // For YYYY-MM-DD, it's generally safe.
    return new Date(dateString + 'T00:00:00').toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };


  return (
    <div className="flashcard-container w-full h-64 sm:h-72 md:h-80" onClick={handleFlip}>
      <div className={cn('flashcard', { 'is-flipped': isFlipped })}>
        <div className="flashcard-face flashcard-front">
          <h3 className="text-xl md:text-2xl font-semibold text-center">{flashcard.front}</h3>
        </div>
        <div className="flashcard-face flashcard-back">
          <div className="flex flex-col justify-center items-center text-center h-full">
            <p className="text-lg md:text-xl">{flashcard.back}</p>
            <div className="mt-auto pt-4 text-xs text-muted-foreground space-y-1 w-full border-t border-muted-foreground/20">
              {flashcard.nextReviewDate && (
                <p>Next Review: {formatDate(flashcard.nextReviewDate)}</p>
              )}
              {flashcard.lastReviewed && (
                <p>Last Reviewed: {formatDate(flashcard.lastReviewed)}</p>
              )}
              {flashcard.intervalDays && typeof flashcard.intervalDays === 'number' && (
                <p>Current Interval: {flashcard.intervalDays} day(s)</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

