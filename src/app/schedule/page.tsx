
import { LessonTrackerClient } from '@/components/schedule/LessonTrackerClient';
import { mockSchedule } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Lesson & Study Schedule</CardTitle>
          <CardDescription>Manage your upcoming lessons, study sessions, and exams. Drag and drop to reschedule (basic reordering).</CardDescription>
        </CardHeader>
      </Card>
      <LessonTrackerClient initialSchedule={mockSchedule} />
    </div>
  );
}
