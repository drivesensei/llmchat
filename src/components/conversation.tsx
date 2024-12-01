import { conversations } from '../store/conversation'
import { setActiveConversation } from '../actions/conversation'

import Button from '@/components/Button/button'
import type { Conversation } from '@/types/conversation'

export default function Conversations() {
  return conversations.value.map(
    (conversation: Conversation, index: number) => (
      <div key={conversation.id} className=" my-1">
        <Button
          classes="btn rounded-none w-full border-2 border-white"
          key={conversation.id}
          onClick={() => setActiveConversation(conversation)}
        >
          Conversation #{index}
        </Button>
      </div>
    ),
  )
}
