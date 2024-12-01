import { effect } from '@preact/signals-react'

import type { Answer } from '../types/answers'
import {
  answers,
  selectedAnswer,
  shouldShowIfAnswerIsCorrect,
} from '../store/answer'

export const setAnswer = (ans: Answer) => {
  const refAnswers = answers.value
  refAnswers[ans.id] = ans

  answers.value = {
    ...refAnswers,
  }
}

export const setSelectedAnswer = (a: Answer) => {
  setToggleAnswerMessage(false)
  selectedAnswer.value = a
}

export const setToggleAnswerMessage = (v: boolean = true) => {
  shouldShowIfAnswerIsCorrect.value = v
}

export function getAnswer(answerId: number) {
  return answers.value[answerId]
}

effect(() => {
  if (Object.keys(answers.value)?.length > 0) {
    const commitAnswers = JSON.stringify(answers.value)

    localStorage.setItem('oli:answers', commitAnswers)
  }
})
