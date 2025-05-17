
'use server';
/**
 * @fileOverview A Genkit flow for generating quizzes based on a topic and difficulty.
 *
 * - generateQuiz - A function that handles quiz generation.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GeneratedQuizOutput - The return type for the generateQuiz function (represents a Quiz).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { Quiz } from '@/lib/types';

const GenerateQuizInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate the quiz.'),
  numQuestions: z.number().min(1).max(10).default(5).describe('The number of questions to generate.'),
  difficulty: z.enum(["easy", "medium", "hard"]).optional().describe('The desired difficulty level for the quiz questions. Defaults to medium if not specified.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const QuizQuestionSchema = z.object({
  id: z.string().describe('A unique identifier for the question (e.g., "q1", "q2").'),
  questionText: z.string().describe('The text of the quiz question.'),
  options: z.array(z.string()).length(4).describe('An array of exactly four distinct string options for the question.'),
  correctAnswer: z.string().describe('The text of the correct answer, which must be one of the provided options.'),
  explanation: z.string().optional().describe('A brief explanation for why the answer is correct.'),
});

const GeneratedQuizOutputSchema = z.object({
  title: z.string().describe('A suitable title for the generated quiz (e.g., "Quiz on [Topic]").'),
  topic: z.string().describe('The topic of the quiz, matching the input topic.'),
  questions: z.array(QuizQuestionSchema).describe('An array of quiz questions.'),
  difficulty: z.enum(["easy", "medium", "hard"]).optional().describe('The difficulty level of the generated quiz.'),
});
export type GeneratedQuizOutput = z.infer<typeof GeneratedQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GeneratedQuizOutput> {
  return quizGeneratorFlow(input);
}

const quizPrompt = ai.definePrompt({
  name: 'quizGeneratorPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GeneratedQuizOutputSchema},
  prompt: `You are an expert quiz creator.
Generate a quiz with {{numQuestions}} multiple-choice questions about the topic: {{{topic}}}.
{{#if difficulty}}
The questions should be of {{difficulty}} difficulty.
{{else}}
The questions should be of medium difficulty.
{{/if}}
Each question must have:
1. A unique ID (e.g., "q1", "q2", ... "q{{numQuestions}}").
2. The question text.
3. Exactly four distinct options.
4. A clearly indicated correct answer, which must be one of the provided options.
5. An optional brief explanation for the correct answer.

The overall quiz should have a title related to the topic.
The output should reflect the requested difficulty level.
Ensure the output is in the specified JSON format.
Example for one question:
{
  "id": "q1",
  "questionText": "What is the capital of France?",
  "options": ["Berlin", "Madrid", "Paris", "Rome"],
  "correctAnswer": "Paris",
  "explanation": "Paris is the capital and most populous city of France."
}
`,
});

const quizGeneratorFlow = ai.defineFlow(
  {
    name: 'quizGeneratorFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GeneratedQuizOutputSchema,
  },
  async (input) => {
    const {output} = await quizPrompt(input);
    if (!output) {
      throw new Error('AI failed to generate quiz content.');
    }
    // Ensure the topic and difficulty in the output matches the input, as the LLM might hallucinate it
    return { ...output, topic: input.topic, difficulty: input.difficulty || "medium" };
  }
);

