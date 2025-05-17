
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateLearningTip, type LearningTipOutput } from '@/ai/flows/daily-learning-tip-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function LearningTipCard() {
  const [tipData, setTipData] = useState<LearningTipOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTip() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await generateLearningTip();
        setTipData(data);
      } catch (err) {
        console.error("Failed to fetch learning tip:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchTip();
  }, []);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-primary">AI Learning Tip</CardTitle>
        <Sparkles className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        )}
        {error && !isLoading && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Tip Error</AlertTitle>
            <AlertDescription>Could not load a tip. Please try refreshing.</AlertDescription>
          </Alert>
        )}
        {!isLoading && !error && tipData && (
          <p className="text-sm text-muted-foreground pt-2 italic">
            &quot;{tipData.tip}&quot;
          </p>
        )}
      </CardContent>
    </Card>
  );
}
