import { signal } from '@preact/signals-react'

import type { Conversation } from '@/types/conversation'

const getConversations = () => {
  const str = localStorage.getItem('oli:conversations')
  if (!str) return []

  try {
    const parsedData: { conversations?: Conversation[] } =
      JSON.parse(str)

    return parsedData?.conversations ?? []
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.name, e.message)
    }
    return []
  }
}

export const conversations = signal<Conversation[]>(
  getConversations(),
)

export const activeConversation = signal<Conversation | null>()
