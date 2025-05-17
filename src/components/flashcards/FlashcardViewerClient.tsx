"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Flashcard as FlashcardType } from '@/lib/types';
import { FlashcardClient } from './FlashcardClient';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, RotateCcw, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LOCAL_STORAGE_KEY = 'edupilot-flashcards-data';

// Helper to get today's date as YYYY-MM-DD string
const getTodaysDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Helper to add days to a YYYY-MM-DD date string
const addDaysToDateString = (dateString: string, days: number): string => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

interface FlashcardViewerClientProps {
  initialFlashcards: FlashcardType[];
  courseTopics?: string[];
}

export function FlashcardViewerClient({ initialFlashcards, courseTopics = [] }: FlashcardViewerClientProps) {
  // Initialize state based *only* on props for consistent server/client initial render.
  const [allFlashcards, setAllFlashcards] = useState<FlashcardType[]>(() =>
    initialFlashcards.map(fc => ({
      ...fc,
      intervalDays: fc.intervalDays || 1,
      nextReviewDate: fc.nextReviewDate || getTodaysDateString(),
    }))
  );

  const [clientStateLoaded, setClientStateLoaded] = useState(false);

  // Effect to load from localStorage and merge with initialFlashcards.
  // Runs once on client mount after the initial render.
  useEffect(() => {
    const storedFlashcardsRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedFlashcardsRaw) {
      try {
        const storedFlashcardsParsed = JSON.parse(storedFlashcardsRaw) as FlashcardType[];
        if (Array.isArray(storedFlashcardsParsed) && storedFlashcardsParsed.every(fc => fc.id)) {
          // Optimized merge logic:
          // Create a Map of stored flashcards for efficient lookup
          const storedFlashcardsMap = new Map(storedFlashcardsParsed.map(fc => [fc.id, fc]));

          const mergedData = initialFlashcards.map(initFc => {
            const storedFc = storedFlashcardsMap.get(initFc.id);
            const baseCard = storedFc ? { ...initFc, ...storedFc } : { ...initFc };
            return {
              ...baseCard,
              intervalDays: baseCard.intervalDays || 1,
              nextReviewDate: baseCard.nextReviewDate || getTodaysDateString(),
            };
          });
          setAllFlashcards(mergedData);
        }
      } catch (e) {
        console.error("Failed to parse flashcards from localStorage during load", e);
        // If localStorage is corrupt, allFlashcards remains as initialized from props.
      }
    }
    setClientStateLoaded(true); // Signal that client-side loading attempt is done.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFlashcards]); // Rerun this effect if initialFlashcards prop changes.

  // Effect to save to localStorage.
  useEffect(() => {
    if (clientStateLoaded) { // Only save after the initial load attempt.
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allFlashcards));
    }
  }, [allFlashcards, clientStateLoaded]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDeck, setSelectedDeck] = useState<string>("All");

  const decks = useMemo(() => {
    const uniqueDecksFromFlashcards = new Set(allFlashcards.map(fc => fc.deck || "Uncategorized"));
    const allPossibleDecks = new Set(["All", ...courseTopics, ...Array.from(uniqueDecksFromFlashcards)]);
    if (!allFlashcards.some(fc => !fc.deck)) {
        allPossibleDecks.add("Uncategorized");
    }
    return Array.from(allPossibleDecks);
  }, [allFlashcards, courseTopics]);

  const dueFlashcards = useMemo(() => {
    const todayStr = getTodaysDateString();
    return allFlashcards.filter(fc => {
      const isDeckMatch = selectedDeck === "All" || (fc.deck || "Uncategorized") === selectedDeck;
      if (!isDeckMatch) return false;
      
      return !fc.nextReviewDate || fc.nextReviewDate <= todayStr;
    });
  }, [allFlashcards, selectedDeck]);
  
  const currentFlashcard = dueFlashcards[currentIndex];

  const goToNextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dueFlashcards.length);
  };

  const goToPreviousCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + dueFlashcards.length) % dueFlashcards.length);
  };
  
  const handleDeckChange = (deck: string) => {
    setSelectedDeck(deck);
    setCurrentIndex(0); 
  };

  const updateFlashcardReviewData = (cardId: string, knewIt: boolean) => {
    setAllFlashcards(prevAllFlashcards => 
      prevAllFlashcards.map(fc => {
        if (fc.id === cardId) {
          const todayStr = getTodaysDateString();
          let newIntervalDays = fc.intervalDays || 1;
          let newNextReviewDate: string;

          if (knewIt) {
            newIntervalDays = Math.min(Math.max(1, newIntervalDays) * 2, 180); 
            newNextReviewDate = addDaysToDateString(todayStr, newIntervalDays);
          } else {
            newIntervalDays = 1; 
            newNextReviewDate = addDaysToDateString(todayStr, 1); 
          }
          return { ...fc, intervalDays: newIntervalDays, nextReviewDate: newNextReviewDate, lastReviewed: todayStr };
        }
        return fc;
      })
    );
  };

  const handleKnow = () => {
    if (!currentFlashcard) return;
    updateFlashcardReviewData(currentFlashcard.id, true);
    if (currentIndex >= dueFlashcards.length - 1 && dueFlashcards.length > 0) {
      // Handled by dueFlashcards re-calculation
    } else if (dueFlashcards.length > 1) {
       goToNextCard();
    }
  };

  const handleDontKnow = () => {
    if (!currentFlashcard) return;
    updateFlashcardReviewData(currentFlashcard.id, false);
     if (dueFlashcards.length > 1) { 
        goToNextCard();
    }
  };
  
  const resetDeckProgress = () => {
    const todayStr = getTodaysDateString();
    setAllFlashcards(prevAllFlashcards =>
      prevAllFlashcards.map(fc => {
        if (selectedDeck === "All" || (fc.deck || "Uncategorized") === selectedDeck) {
          return { ...fc, nextReviewDate: todayStr, intervalDays: 1, lastReviewed: undefined };
        }
        return fc;
      })
    );
    setCurrentIndex(0);
  };

  if (!initialFlashcards.length && courseTopics.length === 0 && !clientStateLoaded) {
    // Show a basic loading or minimal UI if nothing is available and client state hasn't resolved
    return <Card><CardContent><p className="p-4 text-center text-muted-foreground">Loading flashcards...</p></CardContent></Card>;
  }
  
  if (initialFlashcards.length === 0 && courseTopics.length === 0 && clientStateLoaded && allFlashcards.length === 0) {
    return <Card><CardContent><p className="p-4 text-center text-muted-foreground">No flashcards or course topics available to create decks.</p></CardContent></Card>;
  }


  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-card rounded-lg shadow">
        <DeckSelector decks={decks} selectedDeck={selectedDeck} onDeckChange={handleDeckChange} />
        <div className="text-sm text-muted-foreground">
          Review Stat: <span className="font-semibold text-primary">{dueFlashcards.length}</span> cards due
        </div>
      </div>
      
      {!currentFlashcard && selectedDeck !== "All" && clientStateLoaded && (
         <Card className="shadow-md">
            <CardContent className="p-6 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">No Cards Due</h3>
                <p className="mt-1 text-muted-foreground">There are no cards currently due for review in the &quot;{selectedDeck}&quot; deck.</p>
                 { !allFlashcards.some(fc => (fc.deck || "Uncategorized") === selectedDeck) && courseTopics.includes(selectedDeck) && (
                    <p className="mt-1 text-sm text-muted-foreground">This deck is based on a course topic. Add flashcards to it to start learning!</p>
                )}
            </CardContent>
         </Card>
      )}
      {!currentFlashcard && selectedDeck === "All" && dueFlashcards.length === 0 && clientStateLoaded && (
         <Card className="shadow-md">
            <CardContent className="p-6 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">All Caught Up!</h3>
                <p className="mt-1 text-muted-foreground">You&apos;ve reviewed all due cards across all decks. Great job!</p>
            </CardContent>
         </Card>
      )}
      
      {!currentFlashcard && selectedDeck !== "All" && !dueFlashcards.length && allFlashcards.filter(fc => (fc.deck || "Uncategorized") === selectedDeck).length === 0 && courseTopics.includes(selectedDeck) && clientStateLoaded && (
        <Card className="shadow-md">
            <CardContent className="p-6 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium">Empty Deck</h3>
                <p className="mt-1 text-muted-foreground">The deck &quot;{selectedDeck}&quot; (from your course topics) currently has no flashcards. Add some to start learning!</p>
            </CardContent>
        </Card>
      )}


      {currentFlashcard && (
        <>
          <FlashcardClient flashcard={currentFlashcard} />

          <div className="flex justify-around items-center mt-4 space-x-2">
            <Button variant="outline" size="icon" onClick={goToPreviousCard} disabled={dueFlashcards.length <= 1} aria-label="Previous card">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button onClick={handleDontKnow} variant="destructive" className="flex-1">
              Don&apos;t Know
            </Button>
            <Button onClick={handleKnow} variant="default" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              Know
            </Button>
            <Button variant="outline" size="icon" onClick={goToNextCard} disabled={dueFlashcards.length <= 1} aria-label="Next card">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            Card {dueFlashcards.length > 0 ? currentIndex + 1 : 0} of {dueFlashcards.length} (Due)
          </div>
        </>
      )}

      {clientStateLoaded && ( // Only show reset button if client state is loaded
        <div className="flex justify-center mt-2">
          <Button variant="ghost" onClick={resetDeckProgress}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset Review Progress for Deck
          </Button>
        </div>
      )}
    </div>
  );
}

function DeckSelector({ decks, selectedDeck, onDeckChange }: { decks: string[], selectedDeck: string, onDeckChange: (deck: string) => void }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
      <label htmlFor="deck-select" className="text-sm font-medium whitespace-nowrap">Select Deck:</label>
      <Select value={selectedDeck} onValueChange={onDeckChange}>
        <SelectTrigger id="deck-select" className="w-full sm:min-w-[180px] bg-background">
          <SelectValue placeholder="Select deck" />
        </SelectTrigger>
        <SelectContent>
          {decks.map(deck => (
            <SelectItem key={deck} value={deck}>{deck}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}