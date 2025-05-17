
import { FlashcardViewerClient } from '@/components/flashcards/FlashcardViewerClient';
import { mockFlashcards, mockCourses } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function FlashcardsPage() {
  const courseTopics = Array.from(new Set(mockCourses.map(course => course.topic)));

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Flashcard Decks</CardTitle>
          <CardDescription>Select a deck to start reviewing your flashcards. Decks are automatically created from your course topics. Uses a spaced repetition system to help you learn efficiently. Click a card to flip it.</CardDescription>
        </CardHeader>
      </Card>
      <FlashcardViewerClient initialFlashcards={mockFlashcards} courseTopics={courseTopics} />
    </div>
  );
}
