import { CourseCatalogClient } from '@/components/courses/CourseCatalogClient';
import { mockCourses } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Course Catalog</CardTitle>
          <CardDescription>Explore our wide range of courses. Filter by topic or estimated time to find your next learning adventure.</CardDescription>
        </CardHeader>
      </Card>
      <CourseCatalogClient courses={mockCourses} />
    </div>
  );
}
