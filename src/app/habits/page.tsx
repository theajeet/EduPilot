import { HabitTrackerClient } from '@/components/habits/HabitTrackerClient';
import { mockHabits } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function HabitsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Daily Habit Tracker</CardTitle>
          <CardDescription>Stay consistent and build positive habits. Check off your completed habits for today.</CardDescription>
        </CardHeader>
      </Card>
      <HabitTrackerClient initialHabits={mockHabits} />
    </div>
  );
}
