import { mockCourses } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Tag, PlayCircle, ListChecks } from 'lucide-react';

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const course = mockCourses.find(c => c.id === params.courseId);

  if (!course) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold">Course not found</h1>
        <Button asChild variant="link" className="mt-4">
          <Link href="/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="outline" size="sm" className="mb-4">
        <Link href="/courses"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses</Link>
      </Button>

      <Card className="shadow-lg overflow-hidden">
        {course.imageUrl && (
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={course.imageUrl}
              alt={course.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={course.dataAiHint || "education learning"}
            />
          </div>
        )}
        <CardHeader className="border-b">
          <CardTitle className="text-3xl font-bold text-primary">{course.title}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary" className="text-sm"><Tag className="h-4 w-4 mr-1.5" /> {course.topic}</Badge>
            <Badge variant="secondary" className="text-sm"><Clock className="h-4 w-4 mr-1.5" /> {course.estimatedTime}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-2">Course Description</h2>
          <p className="text-muted-foreground leading-relaxed">{course.description}</p>

          {course.modules && course.modules.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Course Modules</h2>
              <div className="space-y-4">
                {course.modules.map(module => (
                  <Card key={module.id} className="bg-secondary/30">
                    <CardHeader>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                    </CardHeader>
                    {module.lessons && module.lessons.length > 0 && (
                      <CardContent>
                        <ul className="space-y-2">
                          {module.lessons.map(lesson => (
                            <li key={lesson.id} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50">
                              <div className="flex items-center">
                                {lesson.type === 'video' && <PlayCircle className="h-5 w-5 mr-2 text-primary" />}
                                {lesson.type === 'reading' && <BookOpen className="h-5 w-5 mr-2 text-primary" />}
                                {lesson.type === 'quiz' && <ListChecks className="h-5 w-5 mr-2 text-primary" />}
                                <span>{lesson.title}</span>
                                {lesson.duration && <span className="ml-2 text-xs text-muted-foreground">({lesson.duration})</span>}
                              </div>
                              <Button variant="ghost" size="sm" disabled={lesson.isCompleted}>
                                {lesson.isCompleted ? 'Completed' : 'Start'}
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
            Enroll in this Course (Mock)
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Generate static paths for courses if using SSG, or handle dynamically
export async function generateStaticParams() {
  return mockCourses.map(course => ({
    courseId: course.id,
  }));
}
