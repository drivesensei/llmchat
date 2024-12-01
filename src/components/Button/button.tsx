import { FC, ReactNode } from 'react'

type Props = {
  classes: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  aria?: {
    label: string
  }
  children: ReactNode
}

const Button: FC<Props> = ({
  classes,
  onClick,
  aria,
  children,
}) => (
  <button
    aria-label={aria ? aria.label : ''}
    className={classes}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button
