import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import Button from './button'

const meta = {
  title: 'Library/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    classes: 'btn btn-primary',
    onClick: fn,
    children: 'local',
  },
}

export const Squared: Story = {
  args: {
    classes: 'btn rounded-none',
    onClick: fn,
    children: 'hello',
  },
}
