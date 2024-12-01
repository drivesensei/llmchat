import { memo } from 'react'

type Props = {
  text: string
}

function ChatBubble(props: Props) {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble">{props.text}</div>
    </div>
  )
}

export default memo(ChatBubble)
