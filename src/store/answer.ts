import { signal } from '@preact/signals-react';
import type { Answer } from '../types/answers';

const defaultAnswers = [
  {
    isCorrect: true,
    text: 'France',
  },
  {
    isCorrect: false,
    text: 'CDMX',
  },
];

export const answers = signal<Record<number, Answer[]>>({
  1: defaultAnswers,
});

export const selectedAnswer = signal<Answer | null>(null);
export const shouldShowIfAnswerIsCorrect = signal<boolean>(false);
