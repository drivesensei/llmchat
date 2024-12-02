import { Menu, X } from 'lucide-react'
import { FC, memo } from 'react'

import { addConversation } from '../actions/conversation'
// import { sidebarOpen, toggleSidebar } from '../store/sidebar'

import Conversations from './conversation'
import Button from './Button/button'

type Props = {
  open: boolean
  onToggle: () => void
}

const Sidebar: FC<Props> = ({ open, onToggle }: Props) => {
  return (
    <>
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          classes=""
          onClick={onToggle}
          aria={{ label: 'Open menu' }}
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg border-r-2 lg:static transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 border-r-2 overflow-y-auto`}
      >
        <div className="p-4">
          <Button
            classes="btn btn-primary btn-block"
            onClick={() => addConversation()}
          >
            New Conversation
          </Button>
        </div>

        <div className="grid items-center">
          <Conversations />
        </div>
      </aside>
    </>
  )
}

export default memo(Sidebar)
