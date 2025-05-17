
'use server';
/**
 * @fileOverview A Genkit flow for generating a daily learning tip.
 *
 * - generateLearningTip - A function that returns a learning tip.
 * - LearningTipOutput - The return type for the generateLearningTip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { LearningTip } from '@/lib/types';

const LearningTipOutputSchema = z.object({
  tip: z.string().describe("A concise and encouraging learning tip or a suggestion for using the EduPilot app. It should be engaging and under 150 characters."),
});
export type LearningTipOutput = z.infer<typeof LearningTipOutputSchema>;

export async function generateLearningTip(): Promise<LearningTipOutput> {
  return learningTipFlow();
}

const learningTipPrompt = ai.definePrompt({
  name: 'dailyLearningTipPrompt',
  output: {schema: LearningTipOutputSchema},
  prompt: `You are an encouraging and insightful learning coach for an app called EduPilot.
Generate a single, short (under 150 characters), and actionable learning tip for a student.
Alternatively, you can suggest a useful feature within the EduPilot app (like Flashcards, Quizzes, Course Catalog, Note Editor, Habit Tracker, Lesson Tracker, or Reading Log) and briefly mention how it can help them.
Make it sound positive and motivational.

Examples:
- "Struggling with a concept? Try explaining it to a friend! EduPilot's Note Editor can help you draft your thoughts."
- "Break down big study sessions! Use EduPilot's Lesson Tracker to schedule focused learning blocks and short breaks."
- "Turn learning into a game! Challenge yourself with EduPilot's AI Quiz Generator on any topic."
- "Consistent review is key! Check your Flashcards in EduPilot today to strengthen your memory."
- "Don't forget to celebrate small wins on your learning journey! Track your progress with EduPilot."
`,
});

const learningTipFlow = ai.defineFlow(
  {
    name: 'learningTipFlow',
    outputSchema: LearningTipOutputSchema,
  },
  async () => {
    const {output} = await learningTipPrompt({});
    if (!output) {
      throw new Error('AI failed to generate a learning tip.');
    }
    return output;
  }
);
