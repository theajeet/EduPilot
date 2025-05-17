"use client";

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number; // 0-5
  onRatingChange?: (rating: number) => void;
  size?: number;
  className?: string;
  readOnly?: boolean;
}

export function StarRating({ rating, onRatingChange, size = 20, className, readOnly = false }: StarRatingProps) {
  return (
    <div className={cn("flex items-center space-x-0.5", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={cn(
            "transition-colors",
            star <= rating ? 'text-accent fill-accent' : 'text-muted-foreground fill-muted',
            !readOnly && 'cursor-pointer hover:text-accent/80'
          )}
          onClick={() => !readOnly && onRatingChange?.(star)}
          aria-label={readOnly ? `${rating} out of 5 stars` : `Rate ${star} out of 5 stars`}
        />
      ))}
    </div>
  );
}
