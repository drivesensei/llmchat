import type { KeyboardEvent } from 'react'
import type { FC } from 'react'

type CallbackFn = (text: string) => void

type Props = {
  id?: string
  type?: string
  classes?: string
  disabled?: boolean
  placeholder: string
  onTextEnter: CallbackFn
}

const Input: FC<Props> = ({
  placeholder,
  onTextEnter,
  id = '',
  type = 'text',
  classes = '',
  disabled = false,
}) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    aria-label={placeholder}
    className={`input input-bordered ${classes}`}
    onKeyUp={onEnteredText(onTextEnter)}
    disabled={disabled}
  />
)

const onEnteredText =
  (fn: CallbackFn) =>
  (event: KeyboardEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.trim()
    if (event.code === 'Enter' && value != '' && value != null) {
      fn(value)
    }
  }

export default Input
