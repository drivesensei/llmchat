import { signal } from '@preact/signals-react'

import type { Answer } from '../types/answers'

const getAnswers: () => Record<number, Answer> = () => {
  const str = localStorage.getItem('oli:answers')
  if (!str) return []

  try {
    const parsedData: Record<number, Answer> = JSON.parse(str)
    return parsedData ?? {}
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.name, e.message)
    }
    return {}
  }
}

export const answers =
  signal<Record<number, Answer>>(getAnswers())

export const selectedAnswer = signal<Answer | null>(null)
export const shouldShowIfAnswerIsCorrect = signal<boolean>(false)
