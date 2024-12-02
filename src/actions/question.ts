import { effect } from '@preact/signals-react'

import type { Question } from '../types/question'
import { questions, activeQuestion } from '../store/question'
import { setToggleAnswerMessage } from '../actions/answer'

export const setActiveQuestion = (question: Question) => {
  const s: HTMLElement | null =
    document.querySelector('#question')
  if (s?.focus) s.focus()

  activeQuestion.value = question
  setToggleAnswerMessage(false)
}

type CreatedQuestionType = (t: string) => Question

export const createQuestion: CreatedQuestionType = (
  text: string = '',
) => {
  const question: Question = {
    id: Date.now(),
    text,
  }
  questions.value = [...questions.value, question]
  return question
}

export const getQuestion: (q: number) => Question = (
  questionId: number,
) => {
  const idx = questions.value.findIndex(
    (q: Question) => q.id === questionId,
  )
  return questions.value[idx]
}

effect(() => {
  if (questions.value?.length > 0) {
    const commitQuestions = JSON.stringify({
      questions: questions.value,
    })

    localStorage.setItem('oli:questions', commitQuestions)
  }
})
