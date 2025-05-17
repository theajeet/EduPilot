"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Habit } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Edit3, Trash2 } from 'lucide-react';

export function HabitTrackerClient({ initialHabits }: { initialHabits: Habit[] }) {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [newHabitName, setNewHabitName] = useState('');

  const toggleHabit = (id: string) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const addHabit = () => {
    if (newHabitName.trim() === '') return;
    const newHabit: Habit = {
      id: String(Date.now()),
      name: newHabitName.trim(),
      completed: false,
      completedDays: 0,
      targetDays: 7, // Default target
    };
    setHabits([...habits, newHabit]);
    setNewHabitName('');
  };
  
  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const overallProgress = useMemo(() => {
    if (habits.length === 0) return 0;
    const completedCount = habits.filter((habit) => habit.completed).length;
    return Math.round((completedCount / habits.length) * 100);
  }, [habits]);
  
  // Persist habits to localStorage (example of client-side persistence)
  useEffect(() => {
    const storedHabits = localStorage.getItem('edupilot-habits');
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('edupilot-habits', JSON.stringify(habits));
  }, [habits]);


  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Today&apos;s Progress: {overallProgress}%</CardTitle>
          <Progress value={overallProgress} className="mt-2 h-3" />
        </CardHeader>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Add New Habit</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input 
            type="text" 
            placeholder="e.g. Drink 8 glasses of water" 
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            className="flex-grow"
            aria-label="New habit name"
          />
          <Button onClick={addHabit} aria-label="Add new habit">
            <PlusCircle className="mr-2 h-4 w-4" /> Add
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {habits.length > 0 ? habits.map((habit) => (
          <Card key={habit.id} className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={`habit-${habit.id}`}
                  checked={habit.completed}
                  onCheckedChange={() => toggleHabit(habit.id)}
                  aria-labelledby={`habit-label-${habit.id}`}
                />
                <Label htmlFor={`habit-${habit.id}`} id={`habit-label-${habit.id}`} className={`text-base ${habit.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {habit.name}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                {/* <Button variant="ghost" size="icon" aria-label={`Edit habit ${habit.name}`}>
                    <Edit3 className="h-4 w-4 text-muted-foreground hover:text-primary" />
                </Button> */}
                <Button variant="ghost" size="icon" onClick={() => deleteHabit(habit.id)} aria-label={`Delete habit ${habit.name}`}>
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            </CardContent>
            {/* Optional: display habit-specific progress, e.g., X/Y days this week */}
            {/* <div className="px-4 pb-3">
                <Progress value={(habit.completedDays / habit.targetDays) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">{habit.completedDays}/{habit.targetDays} days completed</p>
            </div> */}
          </Card>
        )) : (
          <Card><CardContent><p className="p-4 text-center text-muted-foreground">No habits added yet. Start building!</p></CardContent></Card>
        )}
      </div>
    </div>
  );
}
