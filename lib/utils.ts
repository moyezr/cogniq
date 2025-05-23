import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function promptGenerator(topic: string, questionNumber: number): string {
  const prompt: string = `
  You are a quiz master. 

        Generate ${questionNumber} multiple-choice type questions with random hardness on topic """${topic}""" with one answer and three other options.
        
        Put the result in a JSON array format as following:
        {
          "question": "<The question>",
          "answer": "<The exact answer. Don't write 'Option Number' here! >",
          "options": ["<option1>", "<option2>", "<option3>", "<option4>"]
        } under a "questions" key.
        
        Make sure the options array contains 3 incorrect options and one correct option shuffled randomly.
        Only answer with a JSON, nothing else.
  `;

  return prompt;
}
