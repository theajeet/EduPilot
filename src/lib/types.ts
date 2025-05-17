
// export interface Flashcard {
//   id: string;
//   front: string;
//   back: string;
//   deck?: string;
//   // Spaced Repetition Fields
//   lastReviewed?: string; // ISO date string (YYYY-MM-DD)
//   nextReviewDate?: string; // ISO date string (YYYY-MM-DD), date the card is next due
//   intervalDays?: number; // Current review interval in days
//   easeFactor?: number; // Factor to adjust interval (optional for simpler version)
//   consecutiveCorrect?: number; // Number of times answered correctly in a row (optional)
// }

// export interface Habit {
//   id: string;
//   name: string;
//   description?: string;
//   completedDays: number; // count of completed days this week/month
//   targetDays: number; // e.g., 5 times a week
//   completed: boolean; // for today
// }

// export interface Course {
//   id: string;
//   title: string;
//   topic: string;
//   estimatedTime: string; // e.g., "2 hours", "3 weeks"
//   description: string;
//   imageUrl?: string;
//   dataAiHint?: string;
//   modules?: CourseModule[];
// }

// export interface CourseModule {
//   id: string;
//   title: string;
//   lessons: Lesson[];
// }

// export interface Lesson {
//   id: string;
//   title: string;
//   type: 'video' | 'reading' | 'quiz';
//   duration?: string; // e.g., "15 mins"
//   contentUrl?: string; // for video or reading material
//   isCompleted?: boolean;
// }

// export interface ReadingLogEntry {
//   id: string;
//   title: string;
//   author: string;
//   status: 'To Read' | 'Reading' | 'Read' | 'On Hold';
//   rating?: number; // 0-5
//   startDate?: string; // ISO date string
//   finishDate?: string; // ISO date string
//   notes?: string;
// }

// export interface Note {
//   id: string;
//   title: string;
//   content: string; // Markdown content
//   createdAt: string; // ISO date string
//   updatedAt: string; // ISO date string
//   tags?: string[];
// }

// export interface ScheduledItem {
//   id: string;
//   title: string;
//   startTime: string; // ISO date string
//   endTime: string; // ISO date string
//   description?: string;
//   type: 'lesson' | 'study' | 'exam' | 'break';
//   color?: string; // Optional color for the event
// }

// export interface QuizQuestion {
//   id: string;
//   questionText: string;
//   options: string[];
//   correctAnswer: string; // This should be one of the strings from the options array
//   explanation?: string;
// }

// export interface Quiz {
//   title: string;
//   topic: string;
//   questions: QuizQuestion[];
//   difficulty?: 'easy' | 'medium' | 'hard';
// }

// export type VideoCategory = 'motivational' | 'funny' | 'songs' | 'education' | 'movies' | 'other';

// export interface InteractiveVideo {
//   id: string;
//   title: string;
//   youtubeId: string; // YouTube video ID or Playlist ID for embedding
//   category: VideoCategory;
//   description?: string;
//   isPlaylist?: boolean; // Flag to indicate if youtubeId is a playlist ID
// }

// // Added for AI Learning Tip
// export interface LearningTip {
//   tip: string;
// }


export interface Flashcard {
  id: string;
  front: string;
  back: string;
  deck?: string;
  // Spaced Repetition Fields
  lastReviewed?: string; // ISO date string (YYYY-MM-DD)
  nextReviewDate?: string; // ISO date string (YYYY-MM-DD), date the card is next due
  intervalDays?: number; // Current review interval in days
  easeFactor?: number; // Factor to adjust interval (optional for simpler version)
  consecutiveCorrect?: number; // Number of times answered correctly in a row (optional)
}

export interface Habit {
  id: string;
  name: string;
  description?: string;
  completedDays: number; // count of completed days this week/month
  targetDays: number; // e.g., 5 times a week
  completed: boolean; // for today
}

export interface Course {
  id: string;
  title: string;
  topic: string;
  estimatedTime: string; // e.g., "2 hours", "3 weeks"
  description: string;
  imageUrl?: string;
  dataAiHint?: string;
  modules?: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz';
  duration?: string; // e.g., "15 mins"
  contentUrl?: string; // for video or reading material
  isCompleted?: boolean;
}

export interface ReadingLogEntry {
  id: string;
  title: string;
  author: string;
  status: 'To Read' | 'Reading' | 'Read' | 'On Hold';
  rating?: number; // 0-5
  startDate?: string; // ISO date string
  finishDate?: string; // ISO date string
  notes?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string; // Markdown content
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  tags?: string[];
}

export interface ScheduledItem {
  id: string;
  title: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  description?: string;
  type: 'lesson' | 'study' | 'exam' | 'break';
  color?: string; // Optional color for the event
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string; // This should be one of the strings from the options array
  explanation?: string;
}

export interface Quiz {
  title: string;
  topic: string;
  questions: QuizQuestion[];
  difficulty?: 'easy' | 'medium' | 'hard';
}

export type VideoCategory = 'all' | 'motivational' | 'funny' | 'songs' | 'education' | 'movies' | 'other';

export interface InteractiveVideo {
  id: string;
  title: string;
  youtubeId: string; // YouTube video ID or Playlist ID for embedding
  category: VideoCategory; // Make sure 'all' is not a valid category for individual videos
  description?: string;
  isPlaylist?: boolean; // Flag to indicate if youtubeId is a playlist ID
}

// Added for AI Learning Tip
export interface LearningTip {
  tip: string;
}