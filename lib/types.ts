// Type definitions for our application

export type Game = {
  id: string;
  userId: string;
  timeStarted: Date;
  topic: string;
  timeEnded?: Date | null;
  createdAt: Date;
  questions?: Question[];
  // Derived fields (calculated on server)
  score?: number;
  totalQuestions?: number;
}

export type Question = {
  id: string;
  question: string;
  answer: string;
  gameId: string;
  options: string; // JSON string of options array
  isCorrect?: boolean | null;
  userAnswer?: string | null;
}
