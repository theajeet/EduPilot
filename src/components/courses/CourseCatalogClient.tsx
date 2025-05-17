"use client";

import { useState, useMemo } from 'react';
import type { Course } from '@/lib/types';
import { CourseCard } from './CourseCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

interface CourseCatalogClientProps {
  courses: Course[];
}

export function CourseCatalogClient({ courses }: CourseCatalogClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  // const [selectedTime, setSelectedTime] = useState('All'); // Example for time filter

  const topics = useMemo(() => {
    const uniqueTopics = new Set(courses.map(course => course.topic));
    return ['All', ...Array.from(uniqueTopics)];
  }, [courses]);

  // Add logic for estimated time options if needed
  // const timeOptions = ['All', '1-4 Weeks', '1-3 Months', '>3 Months'];

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearchTerm = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTopic = selectedTopic === 'All' || course.topic === selectedTopic;
      // Add time filter logic here if implemented
      // const matchesTime = selectedTime === 'All' || checkTime(course.estimatedTime, selectedTime);
      return matchesSearchTerm && matchesTopic;
    });
  }, [courses, searchTerm, selectedTopic]);

  return (
    <div className="space-y-8">
      <Card className="p-4 sm:p-6 shadow-md bg-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-1">
            <label htmlFor="search-courses" className="block text-sm font-medium text-foreground mb-1">
              Search Courses
            </label>
            <div className="relative">
              <Input
                id="search-courses"
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label htmlFor="topic-filter" className="block text-sm font-medium text-foreground mb-1">
              Filter by Topic
            </label>
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger id="topic-filter" className="w-full">
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map(topic => (
                  <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Example Time Filter - implement if needed
          <div>
            <label htmlFor="time-filter" className="block text-sm font-medium text-foreground mb-1">
              Filter by Estimated Time
            </label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger id="time-filter" className="w-full">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map(time => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          */}
        </div>
      </Card>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <Card><CardContent><p className="p-6 text-center text-muted-foreground">No courses match your criteria. Try adjusting your filters.</p></CardContent></Card>
      )}
    </div>
  );
}
