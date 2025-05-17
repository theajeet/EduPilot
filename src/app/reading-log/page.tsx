import { ReadingLogTableClient } from '@/components/reading-log/ReadingLogTableClient';
import { mockReadingLog } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ReadingLogPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">My Reading Log</CardTitle>
          <CardDescription>Track your reading journey. Add books, update your progress, and rate what you&apos;ve read.</CardDescription>
        </CardHeader>
      </Card>
      <ReadingLogTableClient initialEntries={mockReadingLog} />
    </div>
  );
}
