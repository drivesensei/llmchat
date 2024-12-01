import { signal } from '@preact/signals-react'

import type { Question } from '../types/question'

const getQuestions: () => Question[] = () => {
  const str = localStorage.getItem('oli:questions')
  if (!str) return []

  try {
    const parsedData: Question[] | undefined =
      JSON.parse(str)?.questions

    return parsedData ?? []
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.name, e.message)
    }
    return []
  }
}

export const activeQuestion = signal<Question | null>(null)
export const questions = signal<Question[]>(getQuestions())
