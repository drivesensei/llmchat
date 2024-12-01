import { batch, effect } from '@preact/signals-react'

import {
  activeConversation,
  conversations,
} from '@/store/conversation'
import type { Question } from '@/types/question'
import type { Conversation } from '@/types/conversation'

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
    const id = activeConversation.value.id
    const updatedConversation = conversations.value.find(
      (c: Conversation) => c.id === id,
    )
    updatedConversation['questions'] = questions

    setActiveConversation(
      conversations.value[updatedConversation],
    )
    conversations.value = [...conversations.value]
  })
}

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
