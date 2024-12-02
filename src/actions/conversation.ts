import { batch, effect, computed } from '@preact/signals-react'

import {
  activeConversation,
  conversations,
} from '../store/conversation'
import type { Question } from '../types/question'
import type { Conversation } from '../types/conversation'

import { getAnswer } from './answer'
import { getQuestion } from './question'

export const addConversation = () => {
  const c: Conversation = {
    id: Date.now(),
    questionIds: [],
    answerIds: [],
  }

  activeConversation.value = c
  conversations.value = [...conversations.value, c]
}

export const addQuestionToActiveConversation = (
  questionId: number,
) => {
  if (!activeConversation.value?.questionIds) return

  activeConversation.value = {
    ...activeConversation.value,
    questionIds: [
      ...activeConversation.value.questionIds,
      questionId,
    ],
  }

  conversations.value = [
    ...conversations.value.filter(
      (c: Conversation) => c.id !== activeConversation.value?.id,
    ),
    activeConversation.value,
  ]
}

export const addAnswerToActiveConversation = (
  answerId: number,
) => {
  batch(() => {
    if (!activeConversation.value?.answerIds) return

    activeConversation.value = {
      ...activeConversation.value,
      answerIds: [
        ...activeConversation.value.answerIds,
        answerId,
      ],
    }

    conversations.value = [
      ...conversations.value.filter(
        (c: Conversation) =>
          c.id !== activeConversation.value?.id,
      ),
      activeConversation.value,
    ]
  })
}

export const setActiveConversation = (
  conversation: Conversation,
) => {
  activeConversation.value = conversation
}

export const setQuestionsForActiveConversation = (
  questions: Question[],
) => {
  batch(() => {
    const id = activeConversation.value?.id
    const updatedConversation: Conversation | undefined =
      conversations.value.find((c: Conversation) => c.id === id)
    if (!updatedConversation) return

    updatedConversation['questionIds'] = questions.map(
      (q) => q.id,
    )

    setActiveConversation(updatedConversation)
    conversations.value = [...conversations.value]
  })
}

export const fullConversationTextToFeedLLM = computed(() => {
  const questionIds: number[] =
    activeConversation.value?.questionIds || []
  const answerIds: number[] =
    activeConversation.value?.answerIds || []

  let text = ''
  for (let i = 0; i < questionIds.length; i++) {
    const questionId = questionIds[i]
    const answerId = answerIds[i]
    const questionText = getQuestion(questionId)?.text
    const answerText = getAnswer(answerId)?.text

    if (!questionId || !answerId || !questionText || !answerText)
      continue

    text += ' ' + questionText + ' ' + answerText
  }

  return text
})

effect(() => {
  if (conversations.value?.length > 0) {
    const commitConversations = JSON.stringify({
      conversations: conversations.value,
    })

    localStorage.setItem(
      'oli:conversations',
      commitConversations,
    )
  }
})
