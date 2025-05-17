
import type { Course } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image'; // Re-added Image import
import Link from 'next/link';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      {course.imageUrl && ( // Re-added Image rendering section
        <div className="relative w-full h-48">
          <Image
            src={course.imageUrl}
            alt={course.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={course.dataAiHint || "education learning"} // Use existing data-ai-hint
            className="transition-transform duration-300 group-hover:scale-105" // Added simple hover effect
          />
        </div>
      )}
      <CardHeader className={course.imageUrl ? "pt-4" : ""}> {/* Adjust padding if image exists */}
        <CardTitle className="text-xl">{course.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground h-16 overflow-hidden text-ellipsis">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div className="flex items-center text-xs text-muted-foreground">
          <Tag className="h-4 w-4 mr-1.5 text-primary" />
          Topic: <Badge variant="secondary" className="ml-1">{course.topic}</Badge>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-4 w-4 mr-1.5 text-primary" />
          Est. Time: {course.estimatedTime}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/courses/${course.id}`}>
            View Course <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
