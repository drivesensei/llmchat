type Props = {
  text: string
}

export default function ChatBubble(props: Props) {
  return <div className="chat chat-start">
  <div className="chat-bubble">
    {props.text}
  </div>
</div>
}