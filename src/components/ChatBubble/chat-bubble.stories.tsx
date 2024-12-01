import { Meta, StoryObj } from '@storybook/react'

import ChatBubble from './chat-bubble'

const meta = {
  title: 'Library/Chat bubble',
  component: ChatBubble,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
  },
} satisfies Meta<typeof ChatBubble>

export default meta

type Story = StoryObj<typeof meta>

export const WithText: Story = {
  args: {
    text: 'Hello question here',
  },
}
