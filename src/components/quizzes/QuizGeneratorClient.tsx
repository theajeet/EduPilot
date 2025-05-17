
"use client";

import { useState } from 'react';
import type { Quiz } from '@/lib/types';
import { generateQuiz, type GenerateQuizInput } from '@/ai/flows/quiz-generator-flow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from '@/components/ui/badge';
import { Loader2, AlertCircle, Sparkles, CheckCircle, XCircle, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils'; // Added cn import

type QuizState = 'topic_selection' | 'generating' | 'in_progress' | 'submitted' | 'error';
type DifficultyLevel = "easy" | "medium" | "hard";

export function QuizGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("medium");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizState, setQuizState] = useState<QuizState>('topic_selection');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);

  const { toast } = useToast();

  const handleGenerateQuiz = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic.trim()) {
      toast({ title: "Topic Required", description: "Please enter a topic for the quiz.", variant: "destructive" });
      return;
    }
    setQuizState('generating');
    setErrorMessage(null);
    setQuiz(null);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setScore(null);

    try {
      const input: GenerateQuizInput = { topic, numQuestions, difficulty };
      const generatedQuizData = await generateQuiz(input);
      if (generatedQuizData && generatedQuizData.questions && generatedQuizData.questions.length > 0) {
        setQuiz(generatedQuizData);
        setQuizState('in_progress');
        toast({ title: "Quiz Generated!", description: `Your quiz on "${generatedQuizData.title}" is ready.` });
      } else {
        throw new Error("AI did not return any questions.");
      }
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      const message = error instanceof Error ? error.message : "An unknown error occurred.";
      setErrorMessage(`Failed to generate quiz: ${message}`);
      setQuizState('error');
      toast({ title: "Quiz Generation Failed", description: message, variant: "destructive" });
    }
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitQuiz = () => {
    if (!quiz) return;
    let correctAnswers = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setQuizState('submitted');
    toast({ title: "Quiz Submitted!", description: `You scored ${correctAnswers} out of ${quiz.questions.length}.`});
  };

  const handleTryAnotherQuiz = () => {
    setQuizState('topic_selection');
    setTopic('');
    // setNumQuestions(5); // Keep previous numQuestions or reset? Resetting for now.
    // setDifficulty("medium"); // Keep previous difficulty or reset? Resetting.
    setQuiz(null);
    setErrorMessage(null);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setScore(null);
  };
  
  const currentQuestion = quiz?.questions[currentQuestionIndex];

  if (quizState === 'generating') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-semibold">Generating your {difficulty} quiz on &quot;{topic}&quot;...</p>
        <p className="text-muted-foreground">Please wait a moment.</p>
      </div>
    );
  }

  if (quizState === 'error') {
    return (
      <Alert variant="destructive" className="max-w-lg mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Generating Quiz</AlertTitle>
        <AlertDescription>
          {errorMessage || "Something went wrong. Please try again."}
        </AlertDescription>
        <Button onClick={handleTryAnotherQuiz} variant="outline" className="mt-4">Try Again</Button>
      </Alert>
    );
  }
  
  if (quizState === 'topic_selection') {
    return (
      <Card className="w-full max-w-lg mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center"><Sparkles className="h-6 w-6 mr-2 text-accent" /> AI Quiz Generator</CardTitle>
          <CardDescription>Enter a topic, number of questions, and difficulty to generate a quiz.</CardDescription>
        </CardHeader>
        <form onSubmit={handleGenerateQuiz}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topic">Quiz Topic</Label>
              <Input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., General Knowledge, Computer Science Basics"
                required
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numQuestions">Number of Questions (1-10)</Label>
                <Input
                  id="numQuestions"
                  type="number"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Math.max(1, Math.min(10, parseInt(e.target.value, 10) || 1)))}
                  min="1"
                  max="10"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select value={difficulty} onValueChange={(value: DifficultyLevel) => setDifficulty(value)}>
                  <SelectTrigger id="difficulty" className="mt-1">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Generate Quiz</Button>
          </CardFooter>
        </form>
      </Card>
    );
  }

  if (quizState === 'in_progress' && quiz && currentQuestion) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">{quiz.title}</CardTitle>
          <div className="flex justify-between items-center">
            <CardDescription>Question {currentQuestionIndex + 1} of {quiz.questions.length}</CardDescription>
            {quiz.difficulty && (
              <Badge variant="outline" className="capitalize flex items-center">
                <Brain className="h-4 w-4 mr-1.5" /> {quiz.difficulty}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">{currentQuestion.questionText}</h3>
            <RadioGroup
              value={selectedAnswers[currentQuestion.id] || ""}
              onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
              className="space-y-2"
            >
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-center space-x-3 p-3 border rounded-md hover:bg-muted/50 transition-colors",
                    "has-[[data-state=checked]]:bg-primary/10 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:ring-2 has-[[data-state=checked]]:ring-primary/50"
                  )}
                >
                  <RadioGroupItem value={option} id={`${currentQuestion.id}-option-${index}`} />
                  <Label htmlFor={`${currentQuestion.id}-option-${index}`} className="flex-1 cursor-pointer text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          {currentQuestionIndex < quiz.questions.length - 1 ? (
            <Button onClick={() => setCurrentQuestionIndex(prev => Math.min(quiz.questions.length - 1, prev + 1))}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmitQuiz} className="bg-green-600 hover:bg-green-700">
              Submit Quiz
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }
  
  if (quizState === 'submitted' && quiz && score !== null) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Quiz Completed!</CardTitle>
          <CardDescription>You scored <span className="font-bold text-primary text-xl">{score}</span> out of <span className="font-bold text-primary text-xl">{quiz.questions.length}</span> on this {quiz.difficulty || 'medium'} difficulty quiz.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {quiz.questions.map((q, index) => (
            <div key={q.id} className="p-4 border rounded-lg">
              <p className="font-semibold mb-1">Question {index + 1}: {q.questionText}</p>
              <ul className="list-none space-y-1 mb-2">
                {q.options.map((opt, i) => (
                  <li key={i} className={`flex items-center p-2 rounded-md text-sm ${
                    opt === q.correctAnswer 
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 font-medium' 
                      : ''
                  } ${
                    opt === selectedAnswers[q.id] && opt !== q.correctAnswer 
                      ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 line-through' 
                      : ''
                  } ${
                    opt !== q.correctAnswer && opt !== selectedAnswers[q.id]
                      ? 'text-muted-foreground'
                      : ''
                  }`}>
                    {opt === q.correctAnswer && <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />}
                    {opt !== q.correctAnswer && opt === selectedAnswers[q.id] && <XCircle className="h-4 w-4 mr-2 flex-shrink-0" />}
                    {opt !== q.correctAnswer && opt !== selectedAnswers[q.id] && <span className="w-[16px] h-[16px] mr-2 flex-shrink-0"></span>} {/* Placeholder for alignment */}
                    <span>{opt}</span>
                    {opt === selectedAnswers[q.id] && opt !== q.correctAnswer && <span className="ml-2 text-xs text-red-500 dark:text-red-400">(Your incorrect answer)</span>}
                    {opt === q.correctAnswer && opt === selectedAnswers[q.id] && <span className="ml-2 text-xs text-green-600 dark:text-green-400">(Correct!)</span>}
                     {opt === q.correctAnswer && opt !== selectedAnswers[q.id] && <span className="ml-2 text-xs text-green-600 dark:text-green-400">(Correct Answer)</span>}
                  </li>
                ))}
              </ul>
              {q.explanation && (
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                  <span className="font-medium text-foreground">Explanation:</span> {q.explanation}
                </p>
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={handleTryAnotherQuiz} className="w-full">Take Another Quiz</Button>
        </CardFooter>
      </Card>
    );
  }

  return null; // Should not reach here
}
