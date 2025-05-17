
"use client";

import { useState, useEffect, DragEvent } from 'react';
import type { ScheduledItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Edit3, Trash2, CalendarDays, BookOpen, Brain, ClipboardCheck, Coffee } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const EventIcon = ({ type }: { type: ScheduledItem['type'] }) => {
  const iconProps = { className: "h-4 w-4 mr-1.5" };
  switch(type) {
    case 'lesson': return <BookOpen {...iconProps} />;
    case 'study': return <Brain {...iconProps} />;
    case 'exam': return <ClipboardCheck {...iconProps} />;
    case 'break': return <Coffee {...iconProps} />;
    default: return <CalendarDays {...iconProps} />;
  }
};

export function LessonTrackerClient({ initialSchedule }: { initialSchedule: ScheduledItem[] }) {
  const [schedule, setSchedule] = useState<ScheduledItem[]>(initialSchedule);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<ScheduledItem> | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  // Sort schedule by start time initially
  useEffect(() => {
    setSchedule(prevSchedule => [...prevSchedule].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()));
  }, []);
  
  // Persist schedule to localStorage
  useEffect(() => {
    const storedSchedule = localStorage.getItem('edupilot-schedule');
    if (storedSchedule) {
      try {
        const parsedSchedule = JSON.parse(storedSchedule);
        // Basic validation
        if (Array.isArray(parsedSchedule) && parsedSchedule.every(item => item.id && item.title && item.startTime && item.endTime && item.type)) {
          setSchedule(parsedSchedule.sort((a: ScheduledItem, b: ScheduledItem) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()));
        } else {
          localStorage.removeItem('edupilot-schedule'); // Clear invalid data
        }
      } catch (e) {
        console.error("Failed to parse schedule from localStorage", e);
        localStorage.removeItem('edupilot-schedule'); // Clear corrupted data
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('edupilot-schedule', JSON.stringify(schedule));
  }, [schedule]);


  const openModal = (item?: ScheduledItem) => {
    setCurrentItem(item || { title: '', type: 'lesson', startTime: new Date().toISOString(), endTime: new Date(Date.now() + 3600 * 1000).toISOString() });
    setIsModalOpen(true);
  };

  const handleSaveItem = () => {
    if (!currentItem || !currentItem.title || !currentItem.startTime || !currentItem.endTime) return;

    if (currentItem.id) { // Update existing
      setSchedule(schedule.map(i => i.id === currentItem!.id ? currentItem as ScheduledItem : i).sort((a,b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()));
    } else { // Add new
      const newItem = { ...currentItem, id: String(Date.now()) } as ScheduledItem;
      setSchedule([...schedule, newItem].sort((a,b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()));
    }
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleDeleteItem = (id: string) => {
    setSchedule(schedule.filter(item => item.id !== id));
  };

  const inputChange = (field: keyof ScheduledItem, value: string) => {
    setCurrentItem(prev => ({ ...prev, [field]: value })  as Partial<ScheduledItem>);
  };
  
  const handleDateChange = (field: 'startTime' | 'endTime', value: string) => {
    const existingDate = currentItem?.[field] ? new Date(currentItem[field]!) : new Date();
    const [hours, minutes] = [existingDate.getHours(), existingDate.getMinutes()];
    
    const newDate = new Date(value);
    newDate.setHours(hours, minutes, 0, 0); // Reset seconds and ms for consistency

    setCurrentItem(prev => ({ ...prev, [field]: newDate.toISOString() }) as Partial<ScheduledItem>);
  };

  const handleTimeChange = (field: 'startTime' | 'endTime', value: string) => {
    const existingDate = currentItem?.[field] ? new Date(currentItem[field]!) : new Date();
    const [hours, minutes] = value.split(':').map(Number);
    
    existingDate.setHours(hours, minutes, 0, 0); // Reset seconds and ms
    setCurrentItem(prev => ({ ...prev, [field]: existingDate.toISOString() }) as Partial<ScheduledItem>);
  };


  // Drag and Drop Handlers (basic list reordering)
  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: string) => {
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetItemId: string) => {
    e.preventDefault();
    if (!draggedItemId || draggedItemId === targetItemId) return;

    const draggedItemIndex = schedule.findIndex(item => item.id === draggedItemId);
    const targetItemIndex = schedule.findIndex(item => item.id === targetItemId);

    if (draggedItemIndex === -1 || targetItemIndex === -1) return;

    const newSchedule = [...schedule];
    const [draggedItem] = newSchedule.splice(draggedItemIndex, 1);
    newSchedule.splice(targetItemIndex, 0, draggedItem);
    
    // Simple reordering. For true timeline, one might adjust times or check for overlaps.
    setSchedule(newSchedule);
    setDraggedItemId(null);
  };
  
  const getEventStyling = (type: ScheduledItem['type']): { card: string, badge: string } => {
    switch(type) {
        case 'lesson': return { card: 'bg-primary/80 hover:bg-primary border-primary/90', badge: 'bg-primary text-primary-foreground' };
        case 'study': return { card: 'bg-accent/80 hover:bg-accent border-accent/90', badge: 'bg-accent text-accent-foreground' };
        case 'exam': return { card: 'bg-destructive/80 hover:bg-destructive border-destructive/90', badge: 'bg-destructive text-destructive-foreground' };
        case 'break': return { card: 'bg-green-500/80 hover:bg-green-600 border-green-600/90', badge: 'bg-green-600 text-white' };
        default: return { card: 'bg-secondary hover:bg-secondary/80 border-secondary/90', badge: 'bg-secondary text-secondary-foreground' };
    }
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
         <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <CardTitle>Your Schedule</CardTitle>
                <Button onClick={() => openModal()} className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Event
                </Button>
            </div>
        </CardHeader>
        <CardContent>
          {schedule.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Your schedule is empty. Add some events!</p>
          ) : (
            <div className="space-y-3">
              {schedule.map((item) => {
                const styling = getEventStyling(item.type);
                return (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, item.id)}
                  className={cn(
                    "p-4 rounded-lg shadow-sm cursor-grab transition-all duration-150 ease-in-out border-l-4",
                    styling.card,
                    "text-card-foreground", 
                    draggedItemId === item.id ? "opacity-50 ring-2 ring-offset-2 ring-ring" : "hover:scale-[1.01]"
                  )}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <div className="text-sm opacity-90 mt-1">
                        <span>
                            {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                            {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="ml-2 text-xs">({new Date(item.startTime).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })})</span>
                      </div>
                      <Badge variant="outline" className={cn("mt-2 text-xs capitalize", styling.badge, "border-transparent")}>
                        <EventIcon type={item.type}/>{item.type}
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-1 space-y-1 sm:space-y-0 shrink-0">
                       <Button variant="ghost" size="icon" onClick={() => openModal(item)} className="text-current hover:bg-black/10 dark:hover:bg-white/10 p-1 h-7 w-7" aria-label={`Edit ${item.title}`}>
                           <Edit3 className="h-4 w-4" />
                       </Button>
                       <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(item.id)} className="text-current hover:bg-black/10 dark:hover:bg-white/10 p-1 h-7 w-7" aria-label={`Delete ${item.title}`}>
                           <Trash2 className="h-4 w-4" />
                       </Button>
                    </div>
                  </div>
                  {item.description && <p className="mt-2 text-sm opacity-90">{item.description}</p>}
                </div>
              )})}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentItem?.id ? 'Edit Event' : 'Add New Event'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="event-title">Title</Label>
              <Input id="event-title" value={currentItem?.title || ''} onChange={(e) => inputChange('title', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="event-type">Type</Label>
              <Select value={currentItem?.type} onValueChange={(value) => inputChange('type', value as ScheduledItem['type'])}>
                <SelectTrigger id="event-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lesson">Lesson</SelectItem>
                  <SelectItem value="study">Study Session</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="break">Break</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="event-start-date">Start Date</Label>
                    <Input id="event-start-date" type="date" value={currentItem?.startTime ? new Date(currentItem.startTime).toISOString().split('T')[0] : ''} onChange={(e) => handleDateChange('startTime', e.target.value)} />
                </div>
                 <div>
                    <Label htmlFor="event-start-time">Start Time</Label>
                    <Input id="event-start-time" type="time" value={currentItem?.startTime ? new Date(currentItem.startTime).toLocaleTimeString([], {hour12: false, hour: '2-digit', minute:'2-digit'}) : ''} onChange={(e) => handleTimeChange('startTime', e.target.value)} />
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="event-end-date">End Date</Label>
                    <Input id="event-end-date" type="date" value={currentItem?.endTime ? new Date(currentItem.endTime).toISOString().split('T')[0] : ''} onChange={(e) => handleDateChange('endTime', e.target.value)} />
                </div>
                 <div>
                    <Label htmlFor="event-end-time">End Time</Label>
                    <Input id="event-end-time" type="time" value={currentItem?.endTime ? new Date(currentItem.endTime).toLocaleTimeString([], {hour12: false, hour: '2-digit', minute:'2-digit'}) : ''} onChange={(e) => handleTimeChange('endTime', e.target.value)} />
                </div>
            </div>
            <div>
              <Label htmlFor="event-description">Description (Optional)</Label>
              <Textarea id="event-description" value={currentItem?.description || ''} onChange={(e) => inputChange('description', e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
            <Button type="submit" onClick={handleSaveItem}>Save Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
