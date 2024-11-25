import { signal } from '@preact/signals-react';
import type { Question } from '../types/question';

export const activeQuestion = signal<Question | null>(null);
export const questions = signal<Question[]>([]);
