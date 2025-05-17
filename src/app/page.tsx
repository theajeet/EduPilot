
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Lightbulb, ListChecks, FileText, CalendarDays } from "lucide-react";
import { LearningTipCard } from "@/components/dashboard/LearningTipCard"; // Added import

export default function DashboardPage() {
  // Mock data for overview
  const coursesInProgress = 2;
  const habitsTracked = 4;
  const overallProgress = 65; // Example percentage

  return (
    <div className="space-y-8">
      <section className="bg-card p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-primary">Welcome back to EduPilot!</h1>
        <p className="text-muted-foreground mt-2">
          Your personalized dashboard to navigate your learning journey. Let&apos;s make today productive!
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <Lightbulb className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
            <Progress value={overallProgress} className="mt-2 h-3" />
            <p className="text-xs text-muted-foreground mt-1">
              Keep up the great work!
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses In Progress</CardTitle>
            <BookOpen className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coursesInProgress}</div>
            <p className="text-xs text-muted-foreground">
              Active courses you are currently taking.
            </p>
            <Button variant="ghost" size="sm" className="mt-2 -ml-2 text-primary hover:text-primary/80" asChild>
              <Link href="/courses">View Courses <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Habits Tracked</CardTitle>
            <ListChecks className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{habitsTracked}</div>
            <p className="text-xs text-muted-foreground">
              Daily habits you are building.
            </p>
             <Button variant="ghost" size="sm" className="mt-2 -ml-2 text-primary hover:text-primary/80" asChild>
              <Link href="/habits">Manage Habits <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <LearningTipCard /> {/* Added AI Learning Tip Card */}
      </section>

      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump right back into your learning activities.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/flashcards" passHref>
              <Button variant="outline" className="w-full justify-start py-6 text-left h-auto">
                <CheckCircle2 className="mr-3 h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold">Review Flashcards</p>
                  <p className="text-xs text-muted-foreground">Test your knowledge.</p>
                </div>
              </Button>
            </Link>
            <Link href="/notes" passHref>
              <Button variant="outline" className="w-full justify-start py-6 text-left h-auto">
                <FileText className="mr-3 h-6 w-6 text-primary" />
                 <div>
                  <p className="font-semibold">Create a Note</p>
                  <p className="text-xs text-muted-foreground">Jot down your thoughts.</p>
                </div>
              </Button>
            </Link>
             <Link href="/schedule" passHref>
              <Button variant="outline" className="w-full justify-start py-6 text-left h-auto">
                <CalendarDays className="mr-3 h-6 w-6 text-primary" />
                 <div>
                  <p className="font-semibold">View Schedule</p>
                  <p className="text-xs text-muted-foreground">Check your upcoming lessons.</p>
                </div>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
