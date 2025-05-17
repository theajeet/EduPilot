
import { QuizGeneratorClient } from '@/components/quizzes/QuizGeneratorClient';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function QuizzesPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">AI Powered Quizzes</CardTitle>
          <CardDescription>
            Generate quizzes on any topic using AI. Test your knowledge and learn new things!
          </CardDescription>
        </CardHeader>
      </Card>
      <QuizGeneratorClient />
    </div>
  );
}
