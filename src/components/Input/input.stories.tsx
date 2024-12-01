import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { within, userEvent, expect } from '@storybook/test'

import Input from './input'

const meta = {
  title: 'Library/Input',
  component: Input,
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Normal: Story = {
  args: {
    placeholder: 'Normal text input ',
    onTextEnter: fn(),
  },
}

const onEnterTextHandler = fn()

export const FullWidth: Story = {
  args: {
    placeholder: 'Long input that takes full width',
    onTextEnter: onEnterTextHandler,
    classes: 'w-full',
    id: 'full',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText(
      'Long input that takes full width',
    )
    await userEvent.type(input, 'Updated text with long words')
    await expect(input).toHaveValue(
      'Updated text with long words',
    )
    await userEvent.keyboard('{Enter}')
    await expect(onEnterTextHandler).toHaveBeenCalledWith(
      'Updated text with long words',
    )
    await expect(onEnterTextHandler).toHaveBeenCalledTimes(1)
  },
}
